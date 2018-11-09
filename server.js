
// Import Express

const express = require('express');

const app = express();


// Import Keys and Variables


const keys = require('./config/variables');

// Import Mongoose to Connect DB

const mongoose = require('mongoose');


// Connect to MongoDB

mongoose.connect(keys.mongoURI, {useNewUrlParser: true}).then(() => console.log('Mongo Connected')).catch(err => console.log(err));


app.get('/', (request,response) => {


    //response.send("{State:Up}");

    response.json({State:"Up"})

    console.log("Here");

});


app.listen(8000, ()=> console.log('Start'));