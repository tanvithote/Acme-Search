import React from "react";
import Calendar from "./calendar";
import Contacts from "./contacts";
import Dropbox from "./dropbox";
import Twitter from "./twitter";
import Slack from "./slack";

function pinned({ pinned, updateState }) {
  const renderSwitch = card => {
    // console.log("Pinned length", card.length);
    var output = [];
    for (let i = 0; i < card.length; i++) {
      if (card[i] != undefined) {
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
          // console.log("dropbox", card[i]);
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
    <div class="row">
      {renderSwitch(pinned)}
      {/* <Dropbox
        from="dropbox"
        dropbox={pinned}
        pinned={dropbox}
        updateDropbox={updateState}
      />

      <Slack
        from="slack"
        slack={pinned}
        pinned={slack}
        updateSlack={updateState}
      />
      <Twitter
        from="tweet"
        tweet={pinned}
        pinned={tweet}
        updateTweet={updateState}
      /> */}
    </div>
  );
}

export default pinned;
