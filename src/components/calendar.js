import React from "react";
import Interaction from "./interaction";
import Timestamp from "react-timestamp";
import BestMatch from "./bestMatch";

function Calendar({ calendar, pinned, updateCalendar }) {
  const result_calendar = calendar.sort(
    (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
  );
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
            </div>
            <div className="card-footer text-muted">
              Date: {<Timestamp date={c.date} options={{ includeDay: true }} />}
              <br />
              {/* {console.log(updateCalendar)} */}
              <Interaction
                pinned={pinned}
                data={calendar}
                updateState={updateCalendar}
                cardType="result_calendar"
                card={c}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Calendar;
