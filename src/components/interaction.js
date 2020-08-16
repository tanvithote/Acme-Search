import React from "react";
import { AiFillPushpin, AiFillTag } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { IconContext } from "react-icons";

function Interaction({ pinned, card, data, updateState, cardType }) {
  const handleDelete = (card, data, updateState, cardType) => {
    var index = data.indexOf(card);
    data.splice(index, 1);
    updateState(cardType, data);
  };

  const handleTag = (component, event) => {};

  const handlePin = (card, pinned, updateState) => {
    console.log("initial:", card);

    if (card.pinned) {
      var index = pinned.indexOf(card);
      card.pinned = false;
      pinned.splice(index, 1);
      console.log(pinned);
      updateState("pinned", pinned);
      //   this.setState({ pinned: this.state.pinned });
      console.log("unpin", pinned);
      //   localStorage.setItem("pinned", JSON.stringify(pinned));
      //   this.state.calendar.push(component);
      //   target.style.color='black';
    } else {
      var dup = card;
      dup.pinned = true;
      //card.pinned = true;
      pinned.push(dup);
      updateState("pinned", pinned);
      // this.setStae({pinned: [...this.state.pinned, component]});
      // this.setState({ pinned: this.state.pinned });
      console.log("pin", pinned);
      //   localStorage.setItem("pinned", JSON.stringify(pinned));
      // var index = this.state.calendar.indexOf(component);
      // this.state.calendar.splice(index, 1);
      // target.style.color='blue';
    }
  };

  return (
    <IconContext.Provider value={{ color: "black", size: "30px" }}>
      <div>
        <TiDelete
          onMouseOver={({ target }) => (target.style.color = "blue")}
          onMouseOut={({ target }) => (target.style.color = "black")}
          onClick={() => handleDelete(card, data, updateState, cardType)}
        />
        <AiFillPushpin
          //   style={{ display: card.pinned ? "none" : "" }}
          onMouseOver={({ target }) => (target.style.color = "blue")}
          onMouseOut={({ target }) => (target.style.color = "black")}
          onClick={() => handlePin(card, pinned, updateState)}
        />
        <AiFillTag
          onMouseOver={({ target }) => (target.style.color = "blue")}
          onMouseOut={({ target }) => (target.style.color = "black")}
          onClick={() => handleTag(card)}
        />
      </div>
    </IconContext.Provider>
  );
}

export default Interaction;
