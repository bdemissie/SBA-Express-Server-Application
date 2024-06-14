// Import the Express framework to create and manage the server application.
const express = require('express');

// Import body-parser middleware to parse incoming request bodies.
const bodyParser = require('body-parser');

const methodOverride = require('method-override');

// Import express routers

const diaryRoutes = require('./modules/diaryRoutes')

// Initialize an express application
const app = express();
// Select port number
const port = 3000;

// // Import diary entries from local database
// const entries = require("./data/entries");

// Set views path and view engines

app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs"); // register the template engine

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
// Use method-override middleware
app.use(methodOverride('_method'));

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



// RESTful API routes

app.use('/api/entries', diaryRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})