const axios = require('axios')
const express = require('express');
const router = express.Router();

let zipcode = undefined;

router.post('/search', (req,res)=>{
    zipcode = req.body.zipcode;
    res.redirect('/current-weather');
})
     
router.get("/get-weatherdata", (req,res)=>{
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
 
  router.get('*', (req,res)=>{

    res.redirect('/error');
})
    

  module.exports = router;