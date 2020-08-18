import React from "react";
import Interaction from "./interaction";
import BestMatch from "./bestMatch";
import Tag from "./tag";

function Twitter({ from, tweet, pinned, updateTweet, tags }) {
  const result_tweet = tweet.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );

  function handleTag(e, c) {
    const tags = e.target.value;
    updateTweet("tags", tags);
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
    updateTweet("result_tweet", tweet);
  }
  return (
    <div className="row">
      {result_tweet.map((s, i) => {
        return (
          <div className="card text-center" key={i}>
            <div className="card-header">
              <BestMatch index={i} card={s} data={result_tweet} />
              User : {s.user}
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
              Time: {s.timestamp}
              <br />
              {from === "pinned" ? (
                <Interaction
                  pinned={tweet}
                  data={pinned}
                  updateState={updateTweet}
                  cardType="result_tweet"
                  card={s}
                  from={from}
                />
              ) : (
                <Interaction
                  pinned={pinned}
                  data={tweet}
                  updateState={updateTweet}
                  cardType="result_tweet"
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

export default Twitter;
