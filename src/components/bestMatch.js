import React from "react";

// This function is used to display "Best Match" above cards in each category with the maximum match_value
// (match_value is the number of matches for the entered search query).

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
