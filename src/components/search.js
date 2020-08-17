import React, { Component } from "react";
import "../../public/styles/style.css";
import calendar from "../data/calendar.json";
import contacts from "../data/contacts.json";
import dropbox from "../data/dropbox.json";
import slack from "../data/slack.json";
import tweet from "../data/tweet.json";
import Calendar from "./calendar";
import Contacts from "./contacts";
import Dropbox from "./dropbox";
import Twitter from "./twitter";
import Slack from "./slack";
import Pinned from "./pinned";
import SearchTab from "./searchTab";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      clicked: false,
      result_calendar: [],
      result_contacts: [],
      result_dropbox: [],
      result_slack: [],
      result_tweet: [],
      pinned: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  handleOnInputChange = event => {
    const query = event.target.value;
    this.setState({ query, loading: true, message: "", clicked: false });
    //   console.log(query)
  };

  filterFunction(c) {
    let val = 0;
    //if (!this.state.pinned.includes(c)) {
    c.matching_terms.forEach(item => {
      if (this.state.query.toLowerCase().indexOf(item.toLowerCase()) !== -1) {
        val += 1;
      }
    });
    if (val > 0) {
      c["match_value"] = val;
      // console.log(c);
      return c;
    }
    //}
  }

  updateState(state, data) {
    this.setState({ [state]: data });
  }

  handleClick = () => {
    this.setState({ clicked: true });
    this.setState({
      result_calendar: calendar.filter(c => this.filterFunction(c))
    });
    this.setState({
      result_contacts: contacts.filter(c => this.filterFunction(c))
    });
    this.setState({
      result_dropbox: dropbox.filter(c => this.filterFunction(c))
    });
    this.setState({ result_slack: slack.filter(c => this.filterFunction(c)) });
    this.setState({ result_tweet: tweet.filter(c => this.filterFunction(c)) });
  };

  render() {
    const {
      clicked,
      result_calendar,
      result_contacts,
      result_dropbox,
      result_slack,
      result_tweet
    } = this.state;
    // console.log(clicked);
    return (
      <div>
        <div className="container">
          <br />
          <SearchTab
            handleClick={this.handleClick}
            handleOnInputChange={this.handleOnInputChange}
          />
        </div>
        <div className="results">
          {clicked && (
            <div>
              <div
                className="no_results"
                style={{
                  display:
                    result_calendar.length === 0 &&
                    result_contacts.length === 0 &&
                    result_dropbox.length === 0 &&
                    result_slack.length === 0 &&
                    result_tweet.length === 0
                      ? ""
                      : "none"
                }}
              >
                <b>No Results found! Please refine your search.</b>
              </div>
              <div
                className="calendar"
                style={{ display: this.state.pinned.length > 0 ? "" : "none" }}
              >
                <h3>
                  <b>Pinned:</b>
                </h3>

                <Pinned
                  pinned={this.state.pinned}
                  updateState={this.updateState}
                />
              </div>
              <hr />
              <div
                className="calendar"
                style={{ display: result_calendar.length > 0 ? "" : "none" }}
              >
                <h6>Calendar Results:</h6>
                <Calendar
                  from="calendar"
                  calendar={this.state.result_calendar}
                  pinned={this.state.pinned}
                  updateCalendar={this.updateState}
                />
              </div>
              <div
                className="calendar"
                style={{ display: result_contacts.length > 0 ? "" : "none" }}
              >
                <h6>Contact Results:</h6>
                <Contacts
                  from="contacts"
                  contacts={this.state.result_contacts}
                  pinned={this.state.pinned}
                  updateContacts={this.updateState}
                />
              </div>
              <div
                className="calendar"
                style={{ display: result_dropbox.length > 0 ? "" : "none" }}
              >
                <h6>Dropbox Results:</h6>
                <Dropbox
                  from="dropbox"
                  dropbox={this.state.result_dropbox}
                  pinned={this.state.pinned}
                  updateDropbox={this.updateState}
                />
              </div>
              <div
                className="calendar"
                style={{ display: result_slack.length > 0 ? "" : "none" }}
              >
                <h6>Slack Results:</h6>
                <Slack
                  from="slack"
                  slack={this.state.result_slack}
                  pinned={this.state.pinned}
                  updateSlack={this.updateState}
                />
              </div>
              <div
                className="calendar"
                style={{ display: result_tweet.length > 0 ? "" : "none" }}
              >
                <h6>Tweet Results:</h6>
                <Twitter
                  from="tweet"
                  tweet={this.state.result_tweet}
                  pinned={this.state.pinned}
                  updateTweet={this.updateState}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
