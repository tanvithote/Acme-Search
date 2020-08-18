import React from "react";
import Interaction from "./interaction";
import Timestamp from "react-timestamp";
import BestMatch from "./bestMatch";
import Tag from "./tag";

function Calendar({ from, calendar, pinned, updateCalendar, tags }) {
  //sort calendar results in descending value of the match_value so as to have the best match at the beginning of the array
  const result_calendar = calendar.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );

  function handleTag(e, c) {
    const tags = e.target.value;
    updateCalendar("tags", tags);
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
    updateCalendar("result_calendar", calendar);
  }

  return (
    <div className="row">
      {result_calendar.map((c, i) => {
        return (
          <div className="card text-center" key={i}>
            <div className="card-header">
              <BestMatch index={i} card={c} data={result_calendar} />
              Title : {c.title}
            </div>
            <div className="card-body">
              <h5 className="card-title">Invitees: </h5>
              <p className="card-text">{c.invitees}</p>
              {c.tags && c.tags.length > 0 ? (
                <div>
                  <Tag tagList={c.tags} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="card-footer text-muted">
              Date: {<Timestamp date={c.date} options={{ includeDay: true }} />}
              <br />
              {from === "pinned" ? (
                <Interaction
                  pinned={calendar}
                  data={pinned}
                  updateState={updateCalendar}
                  cardType="result_calendar"
                  card={c}
                  from={from}
                />
              ) : (
                <Interaction
                  pinned={pinned}
                  data={calendar}
                  updateState={updateCalendar}
                  cardType="result_calendar"
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

export default Calendar;
