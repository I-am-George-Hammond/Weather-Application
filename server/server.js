const express = require('express');
const app = express();
const axios = require('axios');

const port = 5000;


app.get('/', (req,res)=>{
  res.send('Portnumber: ' + port)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const routes = require('./routes/routes'); 
app.use('/', routes)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});