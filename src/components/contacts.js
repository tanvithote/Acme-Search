import React from "react";
import ReactTimeAgo from "react-time-ago";
import Interaction from "./interaction";
import BestMatch from "./bestMatch";

function Contacts({ from, contacts, pinned, updateContacts }) {
  const result_contacts = contacts.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );
  return (
    <div className="row">
      {result_contacts.map((c, i) => {
        return (
          <div className="card text-center" key={i}>
            <div className="card-header">
              <BestMatch index={i} card={c} data={result_contacts} />
              Name : {c.name}
              <br />
              Company: {c.company}
            </div>
            <div className="card-body">
              <h5 className="card-title">Email: </h5>
              {c.emails.map((email, i) => {
                return (
                  <p className="card-text" key={i}>
                    {email}
                  </p>
                );
              })}

              <h5 className="card-title">Phone: </h5>
              {c.phones.map((phone, i) => {
                return (
                  <p className="card-text" key={i}>
                    {phone}
                  </p>
                );
              })}
            </div>
            <div className="card-footer text-muted">
              Last Contacted: {<ReactTimeAgo date={c.last_contact} />}
              <br />
              {from === "pinned" ? (
                <Interaction
                  pinned={contacts}
                  data={pinned}
                  updateState={updateContacts}
                  cardType="result_contacts"
                  card={c}
                  from={from}
                />
              ) : (
                <Interaction
                  pinned={pinned}
                  data={contacts}
                  updateState={updateContacts}
                  cardType="result_contacts"
                  card={c}
                  from={from}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Contacts;
