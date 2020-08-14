import React, { Component } from 'react';
import './results.css';
import Timestamp from 'react-timestamp';
import ReactTimeAgo from 'react-time-ago';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendar: [],
            contacts: [],
            dropbox: [],
            slack: [],
            tweet: [],

        };
    }

    componentDidMount() {
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


        this.setState({ calendar: result_calendar, contacts: result_contacts, dropbox: result_dropbox, slack: result_slack, tweet: result_tweet })
    }

    renderCalendar = calendar => {
        return (
            <div className="row">
                {calendar.map((c, i) => {
                    // console.log(calendar[i+1])
                    return (
                        <div className="card text-center">
                            <div className="card-header">
                                <b style={{
                                    display: (i === 0 && c.match_value > 1) ||
                                        (i > 0 && c.match_value > 1 && c.match_value === calendar[i - 1].match_value) ? "" : "none", color: "red"
                                }}>Best Match</b>
                                <br style={{
                                    display: (i === 0 && c.match_value > 1) ||
                                        (i > 0 && c.match_value > 1 && c.match_value === calendar[i - 1].match_value) ? "" : "none", color: "red"
                                }} />
                            Title : {c.title}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Invitees: </h5>
                                <p className="card-text">{c.invitees}</p>
                            </div>
                            <div className="card-footer text-muted">
                                Date: {<Timestamp date={c.date} options={{ includeDay: true }} />
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    renderContacts = contacts => {
        return (
            <div className="row">
                {contacts.map((c, i) => {
                    return (
                        <div className="card text-center">
                            <div className="card-header">
                                <b style={{
                                    display: (i === 0 && c.match_value > 1) ||
                                        (i > 0 && c.match_value > 1 && c.match_value === contacts[i - 1].match_value) ? "" : "none", color: "red"
                                }}>Best Match</b>
                                <br style={{
                                    display: (i === 0 && c.match_value > 1) ||
                                        (i > 0 && c.match_value > 1 && c.match_value === contacts[i - 1].match_value) ? "" : "none", color: "red"
                                }} />
                            Name : {c.name}
                                <br />
                            Company: {c.company}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Email: </h5>
                                {c.emails.map((email) => {
                                    return (
                                        <p className="card-text">{email}</p>
                                    )
                                }
                                )}

                                <h5 className="card-title">Phone: </h5>
                                {c.phones.map((phone) => {
                                    return (
                                        <p className="card-text">{phone}</p>
                                    )
                                }
                                )}
                            </div>
                            <div className="card-footer text-muted">
                                Last Contacted: {<ReactTimeAgo date={c.last_contact} />
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    renderDropbox = dropbox => {
        return (
            <div className="row">
                {dropbox.map((d, i) => {
                    return (
                        <div className="card text-center">
                            <div className="card-header">
                                <b style={{
                                    display: (i === 0 && d.match_value > 1) ||
                                        (i > 0 && d.match_value > 1 && d.match_value === dropbox[i - 1].match_value) ? "" : "none", color: "red"
                                }}>Best Match</b>
                                <br style={{
                                    display: (i === 0 && d.match_value > 1) ||
                                        (i > 0 && d.match_value > 1 && d.match_value === dropbox[i - 1].match_value) ? "" : "none", color: "red"
                                }} />
                            Title : {d.title}
                                <br />
                            Path: {d.path}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Shared with: </h5>
                                <p className="card-text">{d.shared_with}</p>
                            </div>
                            <div className="card-footer text-muted">
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
            <div className="row">
                {slack.map((s, i) => {
                    return (
                        <div className="card text-center">
                            <div className="card-header">
                                <b style={{
                                    display: (i === 0 && s.match_value > 1) ||
                                        (i > 0 && s.match_value > 1 && s.match_value === slack[i - 1].match_value) ? "" : "none", color: "red"
                                }}>Best Match</b>
                                <br style={{
                                    display: (i === 0 && s.match_value > 1) ||
                                        (i > 0 && s.match_value > 1 && s.match_value === slack[i - 1].match_value) ? "" : "none", color: "red"
                                }} />
                            Channel : {s.channel}
                                <br />
                            Author: {s.author}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Message: </h5>
                                <p className="card-text">{s.message}</p>
                            </div>
                            <div className="card-footer text-muted">
                                Time: {<Timestamp date={s.timestamp} options={{ includeDay: true }} />}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    renderTweet = tweet => {
        return (
            <div className="row">
                {tweet.map((s, i) => {
                    return (
                        <div className="card text-center">
                            <div className="card-header">
                                <b style={{
                                    display: (i === 0 && s.match_value > 1) ||
                                        (i > 0 && s.match_value > 1 && s.match_value === tweet[i - 1].match_value) ? "" : "none", color: "red"
                                }}>Best Match</b>
                                <br style={{
                                    display: (i === 0 && s.match_value > 1) ||
                                        (i > 0 && s.match_value > 1 && s.match_value === tweet[i - 1].match_value) ? "" : "none", color: "red"
                                }} />
                            User : {s.user}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Message: </h5>
                                <p className="card-text">{s.message}</p>
                            </div>
                            <div className="card-footer text-muted">
                                Time: {s.timestamp}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };
    render() {
        const { calendar, contacts, dropbox, slack, tweet } = this.state;
        return (
            <div>
                <div className="no_results" style={{
                    display: calendar.length === 0 &&
                        contacts.length === 0 &&
                        dropbox.length === 0 &&
                        slack.length === 0 &&
                        tweet.length === 0
                        ? "" : "none"
                }}>
                    No Results found! Please search for something else.

                </div>
                <div className="calendar" style={{ display: calendar.length > 0 ? "" : "none" }}>
                    <h6>Calendar Results:</h6>
                    {this.renderCalendar(calendar)}
                </div>
                <div className="calendar" style={{ display: contacts.length > 0 ? "" : "none" }}>
                    <h6>Contact Results:</h6>
                    {this.renderContacts(contacts)}
                </div>
                <div className="calendar" style={{ display: dropbox.length > 0 ? "" : "none" }}>
                    <h6>Dropbox Results:</h6>
                    {this.renderDropbox(dropbox)}
                </div>
                <div className="calendar" style={{ display: slack.length > 0 ? "" : "none" }}>
                    <h6>Slack Results:</h6>
                    {this.renderSlack(slack)}
                </div>
                <div className="calendar" style={{ display: tweet.length > 0 ? "" : "none" }}>
                    <h6>Tweet Results:</h6>
                    {this.renderTweet(tweet)}
                </div>
            </div>
        )
    }
}

export default Results;