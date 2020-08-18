import React from "react";
import ReactTimeAgo from "react-time-ago";
import Interaction from "./interaction";
import BestMatch from "./bestMatch";
import Tag from "./tag";

function Dropbox({ from, dropbox, pinned, updateDropbox, tags }) {
  const result_dropbox = dropbox.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );

  function handleTag(e) {
    const tags = e.target.value;
    updateDropbox("tags", tags);
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
    updateDropbox("result_dropbox", dropbox);
  }
  return (
    <div className="row">
      {result_dropbox.map((d, i) => {
        return (
          <div className="card text-center" key={i}>
            <div className="card-header">
              <BestMatch index={i} card={d} data={result_dropbox} />
              Title : {d.title}
              <br />
              Path: {d.path}
            </div>
            <div className="card-body">
              <h5 className="card-title">Shared with: </h5>
              <p className="card-text">{d.shared_with}</p>
              {d.tags && d.tags.length > 0 ? (
                <div>
                  <Tag tagList={d.tags} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="card-footer text-muted">
              Created: {<ReactTimeAgo date={d.created} />}
              <br />
              {from === "pinned" ? (
                <Interaction
                  pinned={dropbox}
                  data={pinned}
                  updateState={updateDropbox}
                  cardType="result_dropbox"
                  card={d}
                  from={from}
                />
              ) : (
                <Interaction
                  pinned={pinned}
                  data={dropbox}
                  updateState={updateDropbox}
                  cardType="result_dropbox"
                  card={d}
                  from={from}
                />
              )}
              {d.isTagClicked ? (
                <div>
                  <input
                    className="form-control form-control-sm form-control-borderless"
                    type="tag"
                    placeholder="Enter tags"
                    onChange={e => handleTag(e, d)}
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleTagClick(event, d);
                      }
                    }}
                  />
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => handleTagClick(e, d)}
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

export default Dropbox;
