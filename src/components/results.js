import React, { Component } from "react";
import "../../public/styles/style.css";
import Timestamp from "react-timestamp";
import ReactTimeAgo from "react-time-ago";
import { AiFillPushpin, AiFillTag } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { IconContext } from "react-icons";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: [],
      contacts: [],
      dropbox: [],
      slack: [],
      tweet: [],
      pinned: [],
      tagged: false
    };
  }

  componentDidMount() {
    // localStorage.setItem( 'pinned', [] );
    const result_calendar = this.props.calendar.sort(
      (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
    );
    // console.log("result calndar", result_calendar);
    const result_contacts = this.props.contacts.sort(
      (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
    );
    const result_dropbox = this.props.dropbox.sort(
      (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
    );
    const result_tweet = this.props.tweet.sort(
      (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
    );
    const result_slack = this.props.slack.sort(
      (a, b) => parseFloat(b.match_value) - parseFloat(a.match_value)
    );

    const pinned_local = JSON.parse(localStorage.getItem("pinned"));
    this.setState({
      calendar: result_calendar,
      contacts: result_contacts,
      dropbox: result_dropbox,
      slack: result_slack,
      tweet: result_tweet
    });
  }

  handleDelete = (component, event) => {
    var index = this.state.calendar.indexOf(component);
    this.state.calendar.splice(index, 1);
    this.setState({ calendar: this.state.calendar });
  };

  handleTag = (component, event) => {};

  handlePin = (component, event) => {
    //   console.log("initial", component);

    if (component.pinned === true) {
      var index = this.state.pinned.indexOf(component);
      component.pinned = false;
      this.state.pinned.splice(index, 1);
      this.setState({ pinned: this.state.pinned });
      console.log("unpin", this.state.pinned);
      localStorage.setItem("pinned", JSON.stringify(this.state.pinned));
      //   this.state.calendar.push(component);
      //   target.style.color='black';
    } else {
      component.pinned = true;
      this.state.pinned.push(component);
      // this.setStae({pinned: [...this.state.pinned, component]});
      this.setState({ pinned: this.state.pinned });
      console.log("pin", this.state.pinned);
      localStorage.setItem("pinned", JSON.stringify(this.state.pinned));
      // var index = this.state.calendar.indexOf(component);
      // this.state.calendar.splice(index, 1);
      // target.style.color='blue';
    }
    //   this.setState({pinned: this.state.pinned})

    // console.log("in pin",this.state.pinned, component)
  };

  renderPinned = pinned => {
    //   console.log("rendering...")
    return (
      <div class="row">
        {pinned.map((c, i) => {
          return (
            <div class="card text-center">
              <div class="card-header">
                <b
                  style={{
                    display:
                      (i === 0 && c.match_value > 1) ||
                      (i > 0 &&
                        c.match_value > 1 &&
                        c.match_value === pinned[i - 1].match_value)
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
                      (i === 0 && c.match_value > 1) ||
                      (i > 0 &&
                        c.match_value > 1 &&
                        c.match_value === pinned[i - 1].match_value)
                        ? ""
                        : "none",
                    color: "red"
                  }}
                />
                Title : {c.title}
              </div>
              <div class="card-body">
                <h5 class="card-title">Invitees: </h5>
                <p class="card-text">{c.invitees}</p>
              </div>
              <div class="card-footer text-muted">
                Date:{" "}
                {<Timestamp date={c.date} options={{ includeDay: true }} />}
                <br />
                <IconContext.Provider value={{ color: "black", size: "30px" }}>
                  <div>
                    <AiFillPushpin
                      onMouseOver={({ target }) =>
                        (target.style.color = "blue")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "black")
                      }
                      onClick={() => this.handlePin(c)}
                    />
                  </div>
                </IconContext.Provider>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderCalendar = calendar => {
    return (
      <div class="row">
        {calendar.map((c, i) => {
          return (
            <div class="card text-center">
              <div class="card-header">
                <b
                  style={{
                    display:
                      (i === 0 && c.match_value > 1) ||
                      (i > 0 &&
                        c.match_value > 1 &&
                        c.match_value === calendar[i - 1].match_value)
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
                      (i === 0 && c.match_value > 1) ||
                      (i > 0 &&
                        c.match_value > 1 &&
                        c.match_value === calendar[i - 1].match_value)
                        ? ""
                        : "none",
                    color: "red"
                  }}
                />
                Title : {c.title}
              </div>
              <div class="card-body">
                <h5 class="card-title">Invitees: </h5>
                <p class="card-text">{c.invitees}</p>
              </div>
              <div class="card-footer text-muted">
                Date:{" "}
                {<Timestamp date={c.date} options={{ includeDay: true }} />}
                <br />
                <IconContext.Provider value={{ color: "black", size: "30px" }}>
                  <div>
                    <TiDelete
                      onMouseOver={({ target }) =>
                        (target.style.color = "blue")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "black")
                      }
                      onClick={() => this.handleDelete(c)}
                    />
                    <AiFillPushpin
                      onMouseOver={({ target }) =>
                        (target.style.color = "blue")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "black")
                      }
                      onClick={() => this.handlePin(c)}
                    />
                    <AiFillTag
                      onMouseOver={({ target }) =>
                        (target.style.color = "blue")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "black")
                      }
                      onClick={() => this.handleTag(c)}
                    />
                  </div>
                </IconContext.Provider>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderContacts = contacts => {
    return (
      <div class="row">
        {contacts.map((c, i) => {
          return (
            <div class="card text-center">
              <div class="card-header">
                <b
                  style={{
                    display:
                      (i === 0 && c.match_value > 1) ||
                      (i > 0 &&
                        c.match_value > 1 &&
                        c.match_value === contacts[i - 1].match_value)
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
                      (i === 0 && c.match_value > 1) ||
                      (i > 0 &&
                        c.match_value > 1 &&
                        c.match_value === contacts[i - 1].match_value)
                        ? ""
                        : "none",
                    color: "red"
                  }}
                />
                Name : {c.name}
                <br />
                Company: {c.company}
              </div>
              <div class="card-body">
                <h5 class="card-title">Email: </h5>
                {c.emails.map(email => {
                  return <p class="card-text">{email}</p>;
                })}

                <h5 class="card-title">Phone: </h5>
                {c.phones.map(phone => {
                  return <p class="card-text">{phone}</p>;
                })}
              </div>
              <div class="card-footer text-muted">
                Last Contacted: {<ReactTimeAgo date={c.last_contact} />}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderDropbox = dropbox => {
    return (
      <div class="row">
        {dropbox.map((d, i) => {
          return (
            <div class="card text-center">
              <div class="card-header">
                <b
                  style={{
                    display:
                      (i === 0 && d.match_value > 1) ||
                      (i > 0 &&
                        d.match_value > 1 &&
                        d.match_value === dropbox[i - 1].match_value)
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
                      (i === 0 && d.match_value > 1) ||
                      (i > 0 &&
                        d.match_value > 1 &&
                        d.match_value === dropbox[i - 1].match_value)
                        ? ""
                        : "none",
                    color: "red"
                  }}
                />
                Title : {d.title}
                <br />
                Path: {d.path}
              </div>
              <div class="card-body">
                <h5 class="card-title">Shared with: </h5>
                <p class="card-text">{d.shared_with}</p>
              </div>
              <div class="card-footer text-muted">
                Created: {<ReactTimeAgo date={d.created} />}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderSlack = slack => {
    return (
      <div class="row">
        {slack.map((s, i) => {
          return (
            <div class="card text-center">
              <div class="card-header">
                <b
                  style={{
                    display:
                      (i === 0 && s.match_value > 1) ||
                      (i > 0 &&
                        s.match_value > 1 &&
                        s.match_value === slack[i - 1].match_value)
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
                      (i === 0 && s.match_value > 1) ||
                      (i > 0 &&
                        s.match_value > 1 &&
                        s.match_value === slack[i - 1].match_value)
                        ? ""
                        : "none",
                    color: "red"
                  }}
                />
                Channel : {s.channel}
                <br />
                Author: {s.author}
              </div>
              <div class="card-body">
                <h5 class="card-title">Message: </h5>
                <p class="card-text">{s.message}</p>
              </div>
              <div class="card-footer text-muted">
                Time:{" "}
                {
                  <Timestamp
                    date={s.timestamp}
                    options={{ includeDay: true }}
                  />
                }
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderTweet = tweet => {
    return (
      <div class="row">
        {tweet.map((s, i) => {
          return (
            <div class="card text-center">
              <div class="card-header">
                <b
                  style={{
                    display:
                      (i === 0 && s.match_value > 1) ||
                      (i > 0 &&
                        s.match_value > 1 &&
                        s.match_value === tweet[i - 1].match_value)
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
                      (i === 0 && s.match_value > 1) ||
                      (i > 0 &&
                        s.match_value > 1 &&
                        s.match_value === tweet[i - 1].match_value)
                        ? ""
                        : "none",
                    color: "red"
                  }}
                />
                User : {s.user}
              </div>
              <div class="card-body">
                <h5 class="card-title">Message: </h5>
                <p class="card-text">{s.message}</p>
              </div>
              <div class="card-footer text-muted">Time: {s.timestamp}</div>
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    const { calendar, contacts, dropbox, slack, tweet } = this.state;
    const pinned = JSON.parse(localStorage.getItem("pinned")) || [];
    return (
      <div>
        <div
          class="no_results"
          style={{
            display:
              calendar.length === 0 &&
              contacts.length === 0 &&
              dropbox.length === 0 &&
              slack.length === 0 &&
              tweet.length === 0
                ? ""
                : "none"
          }}
        >
          <b>No Results found! Please refine your search.</b>
        </div>
        <div
          class="calendar"
          style={{ display: pinned.length > 0 ? "" : "none" }}
        >
          <h6>Pinned:</h6>
          {this.renderPinned(pinned)}
        </div>
        {/* <div class="calendar" style={{display:calendar.length>0? "":"none"}}>
                    <h6>Calendar Results:</h6>
                    {this.renderCalendar(calendar)}
                </div> */}
        <div
          class="calendar"
          style={{ display: contacts.length > 0 ? "" : "none" }}
        >
          <h6>Contact Results:</h6>
          {this.renderContacts(contacts)}
        </div>
        <div
          class="calendar"
          style={{ display: dropbox.length > 0 ? "" : "none" }}
        >
          <h6>Dropbox Results:</h6>
          {this.renderDropbox(dropbox)}
        </div>
        <div
          class="calendar"
          style={{ display: slack.length > 0 ? "" : "none" }}
        >
          <h6>Slack Results:</h6>
          {this.renderSlack(slack)}
        </div>
        <div
          class="calendar"
          style={{ display: tweet.length > 0 ? "" : "none" }}
        >
          <h6>Tweet Results:</h6>
          {this.renderTweet(tweet)}
        </div>
      </div>
    );
  }
}

export default Results;
