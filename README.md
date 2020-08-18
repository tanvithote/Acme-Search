# Acme-Search

Acme-search is a search engine that supports searching (by keyword or tag) over the items contained in the below JSON files:

- contacts.json
- calendar.json
- dropbox.json
- slack.json
- tweet.json

# Features:

- Search results are categorized into calendar, contacts, dropbox, slack and tweet, for the user to easily distinguish the results.
- The best match (item that matches the most keywords entered in the search query) of each category is displayed at the beginning of the category.
- User can pin any search result. Once pinned, the search result appears in the pinned section which is at the beginning of the search results. The pinned items persist for all subsequent searches, until the page is refreshed/closed.
- User can unpin items. Once unpinned, the item disappears from the pinned section.
- User can delete a search result. Once deleted, the iteam disappears from the search result. However, the delete action is temporary. The item will appear in subsequent searches.
- User can assign tags to each search result. The assigned tags to each item appear as pills for the user to easily spot them.
- User can search items using tags.
- Added pagination to the pinned section for easy navigation among the pinned items.

# Code Structure

The code has been divided into two sections:

- The components folder consists of all the react components:
  - search.js: This is the most important component as it retrieves the search results and displays them on the UI.
  - calendar.js: Renders the calendar results on the UI
  - contacts.js: Renders contact results on the UI
  - dropbox.js: Renders dropbox results on the UI
  - slack.js: Renders slack results on the UI
  - tweet.js: Renders tweet results on the UI
  - searchTab.js: Renders the search box and the submit button and handles user interaction with the same.
  - BestMatch.js: Returns the "Best Match" label on items that match the most number of keywords/tags in the search query(displays only if there are more than 2 matches).
  - tag.js: Renders the tags of each item in the form of pills(tabs).
  - pinned.js: Renders the pinned items
  - interaction.js: Handles the user interaction with the search results (pin, delete, tagging)
- The data consists of all the JSON files

### Tech

Acme-search uses the below open source projects to work properly:

- [React JS] - HTML enhanced for web apps!
- [Bootstrap] - great UI boilerplate for modern web apps
- [CSS] - awesome styling to web documents

### Installation

Acme-search requires [Node.js](https://nodejs.org/) v4+ to run.

Open the root folder of the code.
Install the dependencies and devDependencies and start the server.

```sh
$ cd acme_search
$ npm install
$ npm start
```

### Get Started

You are all set to use acme-search. Instructions on how to use the search engine are given below:

| Feature                           | Instructions                                                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Search                            | Write the search query in the given search box and click on search or press enter                                                      |
| Clear Search                      | Click on the cross at the end of search box and press backspace to clear search                                                        |
| Delete                            | Click on the close icon on the item you wish to delete from the search results                                                         |
| Pin                               | Click on the pin icon on the item in the search results.                                                                               |
| Unpin                             | Click on the pin icon on the item in the pinned section.                                                                               |
| Tag                               | Click on the tag icon on the item in the search results. Enter tags (comma separated) and then click on Add Tag button on press enter. |
| Page navigation in pinned section | Page numbers will appear on top. Click on the required page number to navigate to that page.                                           |
