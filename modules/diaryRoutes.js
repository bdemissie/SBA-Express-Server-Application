// Import the express framework
const express = require("express")

// Create a router module
const router = express.Router();

// Import diary entries from local database
const entries = require("../data/entries");

// All routes below

// Route to get all entries
router.get('/', (req, res) => {
    // Render the 'index' view template with all entries
    res.render('index', { entries });
});

// Route to render the form for creating a new entry
router
    // Render the 'new-entry' form view
    .get('/new-entry', (req, res) => {
        res.render('new-entry')
    })

    // Route to handle submission of the new entry form
    .post('/new-entry', (req, res) => {

        // Extract date, title, and content from request body
        const { date, title, content } = req.body;

        // Check if an entry with the same date already exists
        if (entries.find(entry =>
            entry.date === date)) {
            res.status(400).send("An entry with the same date already exists")

        }
        // If all required fields are provided, add the new entry to the 'entries' array
        else if (title && content && date) {
            entries.push({
                date, title, content
            })
            // Redirect to the main entries page
            res.redirect("/api/entries");
        }
        else {
            // If any required field is missing, send an error message
            res.status(400).send("Provide all the required information")
        }

    });

// Route to render the search form
router
    .get('/search', (req, res) => {
        // Render the 'search' form view
        res.render('search')
    })

    // Route to handle search result based on date query
    .get('/search-result', (req, res) => {

        // Extract the date from query parameters
        const date = req.query.date;

        console.log('Date from query:', date);

        // Check if date is provided
        if (!date) {
            return res.status(400).send("Please provide a date.");
        }

        // Find the entry matching the provided date
        const searchEntry = entries.find(entry => entry.date === date);

        // Render search result if found, otherwise send an error message
        if (searchEntry) {
            res.render('search-result', { searchEntry });
        } else {
            res.status(400).send(`There is no entry for date: ${date}`);
        }
    })

// Route to delete an entry based on date parameter
router.delete("/delete-entry/:date", (req, res) => {

    // Extract the date parameter from request params
    const date = req.params.date;

    console.log('Deleting entry for date:', date);
    console.log('Current entries:', entries);

    // Find the index of the entry with the matching date
    const entryIndex = entries.findIndex(entry => entry.date === date);

    console.log('Found index:', entryIndex);

    // If entry exists, remove it from the 'entries' array and redirect
    if (entryIndex !== -1) {
        // Remove the entry from the array
        entries.splice(entryIndex, 1);
        res.redirect('/api/entries');
        // If entry does not exist, send an error message
    } else {
        res.status(400).send(`There is no entry for date: ${date}`);
    }
});

// Export the router module to be used in the main application
module.exports = router