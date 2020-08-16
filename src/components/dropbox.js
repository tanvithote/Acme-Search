import React from "react";
import ReactTimeAgo from "react-time-ago";
import Interaction from "./interaction";
import BestMatch from "./bestMatch";

function Dropbox({ dropbox, pinned, updateDropbox }) {
  const result_dropbox = dropbox.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );
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
            </div>
            <div className="card-footer text-muted">
              Created: {<ReactTimeAgo date={d.created} />}
              <br />
              <Interaction
                pinned={pinned}
                data={dropbox}
                updateState={updateDropbox}
                cardType="result_dropbox"
                card={d}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dropbox;
