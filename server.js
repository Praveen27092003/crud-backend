const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const Students = require("./controllers/students");
const Staff = require("./controllers/staff");
const port = 3001;



// Database Address 
const url = "mongodb://localhost:27017/new-test";
  
// Connecting to database 
mongoose.connect(url).then((result) => { 
    console.log("Connected Successful") 
}).catch((err) => { 
    console.log("Error in the Connection") 
}) 


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use("/students", Students);
app.use("/staff", Staff);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




