import React from "react";

function SearchTab({ handleClick, handleOnInputChange }) {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">
        <form className="card card-sm">
          <div className="card-body row no-gutters align-items-center">
            <div className="col-auto">
              <i className="fas fa-search h4 text-body"></i>
            </div>
            <div className="col">
              <input
                className="form-control form-control-lg form-control-borderless"
                type="search"
                placeholder="Search keywords or tags"
                onChange={handleOnInputChange}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleClick();
                  }
                }}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-lg btn-info"
                type="button"
                onClick={handleClick}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchTab;
