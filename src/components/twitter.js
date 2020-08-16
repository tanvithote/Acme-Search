import React from "react";
import Interaction from "./interaction";
import BestMatch from "./bestMatch";

function Twitter({ tweet, pinned, updateTweet }) {
  const result_tweet = tweet.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );
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
            </div>
            <div className="card-footer text-muted">
              Time: {s.timestamp}
              <br />
              <Interaction
                pinned={pinned}
                data={tweet}
                updateState={updateTweet}
                cardType="result_tweet"
                card={s}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Twitter;
