const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Simple in-memory data store for diary entries
let diaryEntries = [];

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});



// RESTful API routes
// GET all entries
app.get('/api/entries', (req, res) => {
    res.json(diaryEntries);
});

// POST a new entry
app.post('/api/entries', (req, res) => {
    const entry = req.body;
    diaryEntries.push(entry);
    res.status(201).json(entry);
});

// PATCH an existing entry
app.patch('/api/entries/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedEntry = req.body;
    if (diaryEntries[id]) {
        diaryEntries[id] = { ...diaryEntries[id], ...updatedEntry };
        res.json(diaryEntries[id]);
    } else {
        res.status(404).json({ message: 'Entry not found' });
    }
});

// DELETE an entry
app.delete('/api/entries/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (diaryEntries[id]) {
        diaryEntries = diaryEntries.filter((_, index) => index !== id);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Entry not found' });
    }
});

// Routes for rendering views
app.get('/', (req, res) => {
    res.render('index', { diaryEntries });
});

app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const entry = diaryEntries[id];
    res.render('edit', { entry, id });
});

app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    diaryEntries[id] = req.body;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})