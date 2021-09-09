const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
        Name: {
            type: String
        },
        "Current Market Price": {
            type: String
        },
        "Market Cap": {
            type: String
        },
        "Stock P/E" : {
            type: String
        },
        "Dividend Yield" : {
            type: String
        },
        "ROCE %" : {
            type: String
        },
        "ROE Previous Annum" : {
            type: String
        },
        "Debt to Equity": {
            type: String
        },
        "EPS": {
            type: String
        },
        "Reserves": {
            type: String
        },
        "Debt": {
            type: String
        }
})

const nsereport = mongoose.model('nsereport', reportSchema)
module.exports = nsereport