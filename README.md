# SBA-Express-Server-Application

DiaryEntry Web Application Documentation

Overview

DiaryEntry is a web application that allows users to manage diary entries. It provides functionalities to create, view, update, and delete diary entries via a RESTful API.

File Distribution

The DiaryEntry application consists of the following main files and directories:

* app.js: Entry point of the application where the Express server is configured.
* data/entries.js: Contains sample diary entries used by the application.
* views/: Directory containing EJS view templates for rendering HTML responses
* modules/: Directory containing custom route modules for specific API endpoints.

View Templates

The views/ directory contains the following EJS view templates:

* index.ejs: Renders the list of all diary entries.
* new-entry.ejs: Provides a form to add a new diary entry.
* search.ejs: Displays a form to search for entries by date.
* search-result.ejs: Shows the search result of entries matching a specific date. Also allows user to delete an entry from a search result.

Custom Route Modules

The modules/ directory contains modules that define custom routes for specific functionalities:

* diaryRoutes.js: Defines routes for handling diary entries, including creation, deletion, and searching.
Add any other modules here with a brief description of their purpose if applicable.

Usage

* Creating Entries: Use /api/entries/new-entry to add a new diary entry.

* Viewing Entries: Access /api/entries to see all diary entries.

* Searching Entries: Use /api/entries/search-result with a date parameter to find entries.

* Updating and Deleting Entries: Update or delete entries via the corresponding API endpoints.

API Endpoints

* GET /api/entries: Retrieve all diary entries.

* POST /api/entries/new-entry: Create a new diary entry.

* GET /api/entries/search: Display a form to search entries by date.

* GET /api/entries/search-result: Search for entries by date.

* DELETE /api/entries/delete-entry/:date: Delete an entry by its date


#SBA 318: REFLECTION

1) What could you have done differently during the planning stages of your project to make the execution easier?

    * I could have spent more time defining the data structure and API endpoints clearly upfront. This would have made it easier to implement functionalities and avoid frequent changes during development.

2) Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?
    * Implementing error handling and validation consistently across all endpoints was challenging. Using middleware libraries specifically designed for validation and error handling could streamline this process in future projects.

3) What would you add to or change about your application if given more time?

    * Given more time, I would enhance the user interface with more interactive features such as sorting entries, filtering by categories, adding multiple users and integrating user authentication for secure access to diary entries.