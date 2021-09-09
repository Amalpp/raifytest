const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const path = require('path');
const fileUpload = require('express-fileupload')

const usersRoutes = require('./routes/user.js');


const app = express();
// const __dirname = path.resolve(path.dirname('')); 

app.use(express.json({ limit:"30mb",extended:true}));
app.use(express.urlencoded({ limit:"30mb",extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  createParentPath:true
}))


app.use(cors({origin:true,credentials:true}));
app.use('/',usersRoutes)

app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  
    next();
  })

const CONNECTION_URL = 'mongodb+srv://amal:amal*123@cluster0.abtle.mongodb.net/riafyTest?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000; 

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT,() => console.log(`server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));


