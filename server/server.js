const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
 
const port = 5000;

const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '298a3ab3b55539f0398ba22e87a4433b';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/api", (req, res) => {
//   const { zipCode } = req.query;
//   const apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=7100,za&appid=298a3ab3b55539f0398ba22e87a4433b'
//   axios
//     .get(apiURL)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('Error while fetching weather data');
//     });
// });

let zipcode = undefined;


app.get('/', (req,res)=>{
  res.send('Portnumber: ' + port)
})

app.post('/search', (req,res)=>{
    zipcode = req.body.zipcode;

    res.redirect('/current-weather');
})
     
app.get("/get-weatherdata", (req,res)=>{
  const mainURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';	
  const secretKey = ',za&appid=298a3ab3b55539f0398ba22e87a4433b'

  let apiURL = mainURL + zipcode + secretKey
  console.log(apiURL)

  axios
  .get(apiURL)
  .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error while fetching weather data');
    });
  })
 

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });

 