import React from "react";
import Calendar from "./calendar";
import Contacts from "./contacts";
import Dropbox from "./dropbox";
import Twitter from "./twitter";
import Slack from "./slack";
import Pagination from "react-js-pagination";

function pinned({ pinned, updateState, offset, perPage, currentPage }) {
  const handlePageChange = e => {
    const selectedPage = e;
    offset = (selectedPage - 1) * perPage;
    updateState("currentPage", selectedPage);
    updateState("offset", offset);
  };

  const renderSwitch = offset => {
    const data = pinned;
    const card = data.slice(offset, offset + perPage);
    var output = [];
    for (let i = 0; i < card.length; i++) {
      if (card[i] !== undefined) {
        if (card[i].cardType === "result_calendar") {
          output.push(
            <div className="calendar" key={i}>
              <Calendar
                from="pinned"
                calendar={[card[i]]}
                pinned={pinned}
                updateCalendar={updateState}
              />
            </div>
          );
        } else if (card[i].cardType === "result_contacts") {
          output.push(
            <div className="calendar" key={i}>
              <Contacts
                from="pinned"
                contacts={[card[i]]}
                pinned={pinned}
                updateContacts={updateState}
              />
            </div>
          );
        } else if (card[i].cardType === "result_dropbox") {
          output.push(
            <div className="calendar" key={i}>
              <Dropbox
                from="pinned"
                dropbox={[card[i]]}
                pinned={pinned}
                updateDropbox={updateState}
              />
            </div>
          );
        } else if (card[i].cardType === "result_slack") {
          output.push(
            <div className="calendar" key={i}>
              <Slack
                from="pinned"
                slack={[card[i]]}
                pinned={pinned}
                updateSlack={updateState}
              />
            </div>
          );
        } else if (card[i].cardType === "result_tweet") {
          output.push(
            <div className="calendar" key={i}>
              <Twitter
                from="pinned"
                tweet={[card[i]]}
                pinned={pinned}
                updateTweet={updateState}
              />
            </div>
          );
        }
      }
    }

    return output;
  };

  return (
    <div className="row">
      {renderSwitch(offset)}
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={perPage}
        totalItemsCount={pinned.length}
        pageRangeDisplayed={3}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default pinned;
