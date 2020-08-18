import React from "react";
import ReactTimeAgo from "react-time-ago";
import Interaction from "./interaction";
import BestMatch from "./bestMatch";
import Tag from "./tag";

function Contacts({ from, contacts, pinned, updateContacts, tags }) {
  const result_contacts = contacts.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );

  function handleTag(e, c) {
    const tags = e.target.value;
    updateContacts("tags", tags);
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
    updateContacts("result_contacts", contacts);
  }
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
              {c.tags && c.tags.length > 0 ? (
                <div>
                  <Tag tagList={c.tags} />
                </div>
              ) : (
                <div></div>
              )}
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
              {c.isTagClicked ? (
                <div>
                  <input
                    className="form-control form-control-sm form-control-borderless"
                    type="tag"
                    placeholder="Enter tags"
                    onChange={e => handleTag(e, c)}
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleTagClick(event, c);
                      }
                    }}
                  />
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => handleTagClick(e, c)}
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

export default Contacts;
