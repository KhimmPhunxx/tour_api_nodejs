// first NodeJS API
const express = require('express'); // import express
const app = express(); // extend
const cors = require("cors") // import cors

// allow origin (npm install cors)
app.use(cors({
  origin : "*"
}))
app.use(express.json()); // for parsing application/json
app.get("/",(req,res)=>{res.send("Hello PREYCODEBACKEND API");})

const category = require("./src/route/category.route");
const transportation = require("./src/route/transportation.rt");
const transfering = require('./src/route/transfering.rt');
const accomodation = require('./src/route/accomodation.rt');
const staff = require('./src/route/staff.rt');

category(app, "/server_api/category"); // call function
transportation(app, "/server_api/transportation"); // call function
transfering(app, "/server_api/transfering"); // call function
accomodation(app, "/server_api/accomodation"); // call function
staff(app, "/server_api/staff"); // call function

app.listen(8081, () => {
  console.log('server http localhost:8081 is started...');
});
