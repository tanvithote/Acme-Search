import React from "react";
import Timestamp from "react-timestamp";
import Interaction from "./interaction";
import BestMatch from "./bestMatch";
import Tag from "./tag";

function Slack({ from, slack, pinned, updateSlack, tags }) {
  const result_slack = slack.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );

  function handleTag(e, c) {
    const tags = e.target.value;
    updateSlack("tags", tags);
  }

  function handleTagClick(e, c) {
    const tagList = tags.split(",").map(function(tag) {
      return tag.trim();
    });
    if (c.tags === undefined) {
      c["tags"] = [];
    }

    tagList.forEach(tag => {
      !c.matching_terms.includes(tag) ? c.matching_terms.push(tag) : {};
      !c.tags.includes(tag) ? c.tags.push(tag) : {};
    });

    c.isTagClicked = false;
    updateSlack("result_slack", slack);
  }
  return (
    <div className="row">
      {result_slack.map((s, i) => {
        return (
          <div className="card text-center" key={i}>
            <div className="card-header">
              <BestMatch index={i} card={s} data={result_slack} />
              Channel : {s.channel}
              <br />
              Author: {s.author}
            </div>
            <div className="card-body">
              <h5 className="card-title">Message: </h5>
              <p className="card-text">{s.message}</p>
              {s.tags && s.tags.length > 0 ? (
                <div>
                  <Tag tagList={s.tags} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="card-footer text-muted">
              Time:{" "}
              {<Timestamp date={s.timestamp} options={{ includeDay: true }} />}
              <br />
              {from === "pinned" ? (
                <Interaction
                  pinned={slack}
                  data={pinned}
                  updateState={updateSlack}
                  cardType="result_slack"
                  card={s}
                  from={from}
                />
              ) : (
                <Interaction
                  pinned={pinned}
                  data={slack}
                  updateState={updateSlack}
                  cardType="result_slack"
                  card={s}
                  from={from}
                />
              )}
              {s.isTagClicked ? (
                <div>
                  <input
                    className="form-control form-control-sm form-control-borderless"
                    type="tag"
                    placeholder="Enter tags"
                    onChange={e => handleTag(e, s)}
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleTagClick(event, s);
                      }
                    }}
                  />
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => handleTagClick(e, s)}
                  >
                    Add Tag
                  </button>
                  <small id="tagHelp" className="form-text text-muted">
                    If entering multiple tags, please separate each tag by
                    comma(,)
                  </small>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Slack;
