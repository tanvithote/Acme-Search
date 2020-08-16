import React from "react";
import Timestamp from "react-timestamp";
import Interaction from "./interaction";
import BestMatch from "./bestMatch";

function Slack({ slack, pinned, updateSlack }) {
  const result_slack = slack.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );
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
            </div>
            <div className="card-footer text-muted">
              Time:{" "}
              {<Timestamp date={s.timestamp} options={{ includeDay: true }} />}
              <br />
              <Interaction
                pinned={pinned}
                data={slack}
                updateState={updateSlack}
                cardType="result_slack"
                card={s}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Slack;
