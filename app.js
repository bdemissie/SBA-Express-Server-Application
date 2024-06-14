
// Import the Express framework to create and manage the server application.
const express = require('express');
// Import body-parser middleware to parse incoming request bodies.
const bodyParser = require('body-parser');


// Initialize an express application
const app = express();
// Select port number
const port = 3000;

// Import diary entries from local database
const entries = require("./data/entries");

// Set views path and view engines
app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs"); // register the template engine

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Custom log Middleware

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something Broke")
})

// serve static files from the styles directory
app.use(express.static("./style"));

// app.use('/style', express.static('style'));

// RESTful API routes
// GET all entries

app.get("/api", (req, res) => {
    res.send("Welcome to my Diary")
})

app.get('/api/entries', (req, res) => {
    res.render('index', {entries})    
});

app.get('/api/entries/new-entry', (req, res) => {
    res.render('new-entry')
});

app.post('/api/entries/new-entry', (req, res) => {
    const {date, title, content} = req.body;
    if (title && content) {
        entries.push({
            date: new Date(date), title, content})
        res.redirect("/api/entries")
        res.status(201).json({ message: "Entry added successfully", entries })
    }
    else {
        res.status(400).send("Provide all the required information")
    }
        
})


// // POST a new entry
// app.post('/api/entries', (req, res) => {
//     const entry = req.body;
//     diaryEntries.push(entry);
//     res.status(201).json(entry);
// });

// // PATCH an existing entry
// app.patch('/api/entries/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const updatedEntry = req.body;
//     if (diaryEntries[id]) {
//         diaryEntries[id] = { ...diaryEntries[id], ...updatedEntry };
//         res.json(diaryEntries[id]);
//     } else {
//         res.status(404).json({ message: 'Entry not found' });
//     }
// });

// // DELETE an entry
// app.delete('/api/entries/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     if (diaryEntries[id]) {
//         diaryEntries = diaryEntries.filter((_, index) => index !== id);
//         res.status(204).send();
//     } else {
//         res.status(404).json({ message: 'Entry not found' });
//     }
// });

// // Routes for rendering views
// app.get('/', (req, res) => {
//     res.render('index', { diaryEntries });
// });

// app.get('/edit/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const entry = diaryEntries[id];
//     res.render('edit', { entry, id });
// });

// app.post('/edit/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     diaryEntries[id] = req.body;
//     res.redirect('/');
// });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})