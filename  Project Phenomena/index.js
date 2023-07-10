// Use the dotenv package, to create environment variables

// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const { PORT = 3000 } = process.env

// Import express, and create a server
// Require morgan and body-parser middleware
// Have the server use morgan with setting 'dev'
const express = require('express');
const server = express();
const morgan = require('morgan');
const { application_name } = require('pg/lib/defaults');
server.use(morgan('dev'));
server.use(express.json())


// Import cors
// Have the server use cors()
const cors = require('cors');
server.use(cors);

// Have the server use bodyParser.json()
server.use(bodyParser.json());

// Have the server use your api router with prefix '/api'
const apiRouter = require('./api');
server.use('/api', apiRouter);

// Import the client from your db/index.js
const { client } = require('./db/index');

// Create custom 404 handler that sets the status code to 404.      WORK ON 404 
server.use(function (req, res, next) {
    res.status(404).send("Oof, can't find that!")
  })

// Create custom error handling that sets the status code to 500    WORK ON 500
// and returns the error as an object
server.use(function (req, res, next) {
    res.status(500).send({name: 'Error', message: 'oops'})
  })

// Start the server listening on port PORT
// On success, connect to the database
server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
  });