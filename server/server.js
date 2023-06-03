// Express module import 
const express = require('express');
const app = express();
const axios = require('axios')
// importing body parser module
const bodyParser = require('body-parser');

// port number to be used 
const port = 5000;

//API url and API key.

const API_URL = "http://api.openweathermap.org/data/2.5/weather?zip=0182,za&appid=298a3ab3b55539f0398ba22e87a4433b";
const secretKey = "298a3ab3b55539f0398ba22e87a4433b";


// Responding to a web request.
app.get("/api", (req,res)=> {

        axios.get(API_URL)
        .then(response => {
        res.json(response.data)

        })
        .catch(error => {
                console.error(error)
                res.status(500).send('Error while fetching weather data')
         })
})

//Starting the server.
app.listen(port, ()=> {
        console.log(`App listening at http://localhost:${port}`)
})