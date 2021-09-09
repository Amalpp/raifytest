const mongoose = require("mongoose");

const userShema = mongoose.Schema({
    username : {
        type: String,
        required: [true, 'username missing']
    },
    password : {
        type: String,
        required: [true, 'password missing']
    }
})

const userDetails = mongoose.model("user",userShema)

module.exports = userDetails