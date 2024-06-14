// Import the Express framework
const express = require('express');

// Import body-parser middleware to parse incoming request bodies
const bodyParser = require('body-parser');

// Import method-override middleware to override HTTP methods
const methodOverride = require('method-override');

// Import custom routes from modules
const diaryRoutes = require('./modules/diaryRoutes')

// Initialize an express application
const app = express();

// Select port number
const port = 3000;

// Set views path and view engine setup
app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs"); // register the template engine

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Use method-override middleware to override HTTP methods with _method query parameter
app.use(methodOverride('_method'));

// Custom log Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something Broke")
})

// Serve static files from the 'style' directory
app.use(express.static("./style"));



// Use the diaryRoutes for API routes related to diary entries
app.use('/api/entries', diaryRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})