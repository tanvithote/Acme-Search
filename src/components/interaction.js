import React from "react";
import { AiFillPushpin, AiFillTag } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { IconContext } from "react-icons";

function Interaction({ pinned, card, data, updateState, cardType, from }) {
  const handleDelete = (card, data, updateState, cardType) => {
    var index = data.indexOf(card);
    data.splice(index, 1);
    updateState(cardType, data, "");
  };

  const handleTag = (component, event) => {};

  const handlePin = (card, pinned, updateState, data, cardType, from) => {
    console.log("From: ", from);
    if (from !== undefined) {
      if (card.pinned) {
        const index = pinned.indexOf(card);
        console.log(index);
        console.log(card);
        card.pinned = false;

        console.log("Before State Unpinned: ", pinned);
        pinned.splice(index, 1);
        console.log("Unpinned splice: ", pinned);

        updateState("pinned", pinned);
        console.log("After State Unpinned: ", pinned);
      } else {
        card.pinned = true;
        card.cardType = cardType;
        pinned.push(card);
        updateState("pinned", pinned);
        console.log("Pinned: ", pinned);
      }
    } else {
      if (card.pinned) {
        const index = data.indexOf(card);
        console.log(index);
        console.log(card);
        card.pinned = false;

        console.log("Before State Unpinned: ", data);
        data.splice(index, 1);
        console.log("Unpinned splice: ", data);

        updateState("pinned", data);
        console.log("After State Unpinned: ", data);
      } else {
        card.pinned = true;
        card.cardType = cardType;
        data.push(card);
        updateState("pinned", data);
        console.log("Pinned: ", data);
      }
    }
  };

  return (
    <IconContext.Provider value={{ color: "black", size: "30px" }}>
      {from !== "pinned" ? (
        <div>
          <TiDelete
            onMouseOver={({ target }) => (target.style.color = "blue")}
            onMouseOut={({ target }) => (target.style.color = "black")}
            onClick={() => handleDelete(card, data, updateState, cardType)}
          />
          <AiFillTag
            onMouseOver={({ target }) => (target.style.color = "blue")}
            onMouseOut={({ target }) => (target.style.color = "black")}
            onClick={() => handleTag(card)}
          />
          <AiFillPushpin
            //   style={{ display: card.pinned ? "none" : "" }}
            onMouseOver={({ target }) => (target.style.color = "blue")}
            onMouseOut={({ target }) => (target.style.color = "black")}
            onClick={() =>
              handlePin(card, pinned, updateState, data, cardType, from)
            }
          />
        </div>
      ) : (
        <div>
          <AiFillPushpin
            //   style={{ display: card.pinned ? "none" : "" }}
            onMouseOver={({ target }) => (target.style.color = "blue")}
            onMouseOut={({ target }) => (target.style.color = "black")}
            onClick={() => handlePin(card, pinned, updateState, data, cardType)}
          />
        </div>
      )}
    </IconContext.Provider>
  );
}

export default Interaction;
