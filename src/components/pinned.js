import React from "react";
import Calendar from "./calendar";

function pinned({ pinned, updateCalendar }) {
  return (
    <div class="row">
      <Calendar
        calendar={pinned}
        pinned={pinned}
        updateCalendar={updateCalendar}
      />
    </div>
  );
}

export default pinned;
