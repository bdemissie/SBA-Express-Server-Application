// Import the Express framework to create and manage the server application.

const express = require("express")

// Create a router module

const router = express.Router();

// Import diary entries from local database
const entries = require("../data/entries");


// GET all entries
router.get('/', (req, res) => {
    res.render('index', { entries });
});

// GET new entry form

router
.get('/new-entry', (req, res) => {
    res.render('new-entry')
})

// Post new entry form

.post('/new-entry', (req, res) => {
    const { date, title, content } = req.body;

    // Check for duplicate entry on the same date
    if (entries.find(entry =>
        entry.date === date)) {
        res.status(400).send("An entry with the same date already exists")

    }
    else if (title && content && date) {
        entries.push({
            date, title, content
        })
        res.redirect("/api/entries");
    }
    else {
        res.status(400).send("Provide all the required information")
    }

});

// Get search by Date Form

router
.get('/search', (req, res) => {
    res.render('search')
})

// Get search result

    .get('/search-result', (req, res) => {
        const date = req.query.date;

        console.log('Date from query:', date);
        
        if (!date) {
            return res.status(400).send("Please provide a date.");
        }

        const searchEntry = entries.find(entry => entry.date === date);
        
        if (searchEntry) {
            res.render('search-result', { searchEntry });
        } else {
            res.status(400).send(`There is no entry for date: ${date}`);
        }
    })

    // Delete entry

router.delete("/delete-entry/:date", (req, res) => {
    const date = req.params.date;
    console.log('Deleting entry for date:', date);
    console.log('Current entries:', entries);

    // Find the index of the entry with the matching date
    const entryIndex = entries.findIndex(entry => entry.date === date);

    console.log('Found index:', entryIndex);

    if (entryIndex !== -1) {
        // Remove the entry from the array
        entries.splice(entryIndex, 1);
        res.redirect('/api/entries');
    } else {
        res.status(400).send(`There is no entry for date: ${date}`);
    }
});

module.exports = router