import React, { Component } from 'react';
import './search.css';
import calendar from './data/calendar.json';
import contacts from './data/contacts.json';
import dropbox from './data/dropbox.json';
import slack from './data/slack.json';
import tweet from './data/tweet.json';
import Results from './results';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendar: calendar,
            contacts: contacts,
            dropbox: dropbox,
            slack: slack,
            tweet: tweet,
            query: '',
            clicked: false,
            result_calendar: [],
            result_contacts: [],
            result_dropbox: [],
            result_slack: [],
            result_tweet: [],
            loading: false,
            message: '',
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleOnInputChange = (event) => {
        const query = event.target.value;
        this.setState({ query, loading: true, message: '', clicked: false });
        //   console.log(query)
    };

    handleClick = (event) => {
        // event.preventDefault();
        const calendar = this.state.calendar;
        const contacts = this.state.contacts;
        const dropbox = this.state.dropbox;
        const slack = this.state.slack;
        const tweet = this.state.tweet;
        event.stopPropagation();

        this.setState({ clicked: true });

        this.setState({
            result_calendar: calendar.filter(c => c["matching_terms"].includes(this.state.query))
        });

        this.setState({
            result_contacts: contacts.filter(c => c["matching_terms"].includes(this.state.query))
        });
        this.setState({
            result_dropbox: dropbox.filter(c => c["matching_terms"].includes(this.state.query))
        });
        this.setState({
            result_slack: slack.filter(c => c["matching_terms"].includes(this.state.query))
        });
        this.setState({
            result_tweet: tweet.filter(c => c["matching_terms"].includes(this.state.query))
        });
    }

    render() {
        const clicked = this.state.clicked;
        // console.log(clicked);
        return (
            <div>
                <div className="container">
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                            <form className="card card-sm">
                                <div className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div className="col">
                                        <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search keywords or tags" onChange={this.handleOnInputChange}
                                            onKeyPress={event => {
                                                if (event.key === 'Enter') {
                                                    event.preventDefault();
                                                    this.handleClick(event)
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-lg btn-info" type="button" onClick={this.handleClick}>Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="results">
                    {clicked &&
                        <Results calendar={this.state.result_calendar}
                            dropbox={this.state.result_dropbox}
                            contacts={this.state.result_contacts}
                            tweet={this.state.result_tweet}
                            slack={this.state.result_slack}
                        />
                    }
                </div>
            </div>

        );
    }
}

export default Search;
