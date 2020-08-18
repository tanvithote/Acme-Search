import React from "react";
import { AiFillPushpin, AiFillTag } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { IconContext } from "react-icons";

function Interaction({ pinned, card, data, updateState, cardType, from }) {
  const handleDelete = (card, data, updateState, cardType) => {
    var index = data.indexOf(card);
    data.splice(index, 1);
    updateState(cardType, data);
  };

  const handleTag = (card, cardType) => {
    if (card.isTagClicked) {
      card.isTagClicked = false;
    } else {
      card.isTagClicked = true;
    }

    updateState(cardType, data);
  };

  const handlePin = (card, pinned, updateState, data, cardType, from) => {
    if (from !== undefined) {
      if (card.pinned) {
        const index = pinned.indexOf(card);
        card.pinned = false;

        pinned.splice(index, 1);

        updateState("pinned", pinned);
      } else {
        card.pinned = true;
        card.cardType = cardType;
        pinned.push(card);
        updateState("pinned", pinned);
      }
    } else {
      if (card.pinned) {
        const index = data.indexOf(card);

        card.pinned = false;

        data.splice(index, 1);

        updateState("pinned", data);
      } else {
        card.pinned = true;
        card.cardType = cardType;
        data.push(card);
        updateState("pinned", data);
      }
    }
  };

  return (
    <div>
      <IconContext.Provider value={{ color: "black", size: "30px" }}>
        {from !== "pinned" ? (
          <div>
            <TiDelete
              onMouseOver={({ target }) => (target.style.color = "blue")}
              onMouseOut={({ target }) => (target.style.color = "black")}
              onClick={() => handleDelete(card, data, updateState, cardType)}
            />
            <AiFillPushpin
              onMouseOver={({ target }) => (target.style.color = "blue")}
              onMouseOut={({ target }) => (target.style.color = "black")}
              onClick={() =>
                handlePin(card, pinned, updateState, data, cardType, from)
              }
            />
            <AiFillTag
              onMouseOver={({ target }) => (target.style.color = "blue")}
              onMouseOut={({ target }) => (target.style.color = "black")}
              onClick={() => handleTag(card, cardType)}
            />
          </div>
        ) : (
          <div>
            <AiFillPushpin
              onMouseOver={({ target }) => (target.style.color = "blue")}
              onMouseOut={({ target }) => (target.style.color = "black")}
              onClick={() =>
                handlePin(card, pinned, updateState, data, cardType)
              }
            />
          </div>
        )}
      </IconContext.Provider>
    </div>
  );
}

export default Interaction;
