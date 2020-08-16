import React from "react";

function BestMatch({ index, card, data }) {
  return (
    <div>
      <b
        style={{
          display:
            (index === 0 && card.match_value > 1) ||
            (index > 0 &&
              card.match_value > 1 &&
              card.match_value === data[index - 1].match_value)
              ? ""
              : "none",
          color: "red"
        }}
      >
        Best Match
      </b>
      <br
        style={{
          display:
            (index === 0 && card.match_value > 1) ||
            (index > 0 &&
              card.match_value > 1 &&
              card.match_value === data[index - 1].match_value)
              ? ""
              : "none",
          color: "red"
        }}
      />
    </div>
  );
}

export default BestMatch;
