
// Import the Express framework to create and manage the server application.
const express = require('express');

// Initialize an express application
const app = express();
// Select port number
const port = 3000;

// Import body-parser middleware to parse incoming request bodies.
const bodyParser = require('body-parser');



// serve static files from the styles directory
app.use(express.static("./style"));

app.use('/style', express.static('style'));
app.use("../node_modules/bootstrap/dist/css", express.static('style'));

const fs = require('fs')

// // define the template engine
// app.engine("perscholas", (filePath, options, callback) => {
//     fs.readFile(filePath, 'utf8', (err, content) => {
//         if (err) return callback(err);

//         const rendered = content.toString().replaceAll("#title#", `${options.title}`)
//         .replace("#content", `${options.content}`);
//         return callback(null, rendered)
//     });
// });

app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs"); // register the template engine

// Import diary entries from local database
const entries = require("./data/entries");







// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));


// // Middleware for logging requests
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });


// RESTful API routes
// GET all entries

app.get("/api", (req, res) => {
    res.send("Welcome to my Diary")
})
app.get('/api/entries', (req, res) => {
    res.render('index', {entries})    
});



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