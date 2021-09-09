const express = require('express');
const userDetails = require('../model/user')
const nsereport = require('../model/nsereport')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    seed_user : async (req,res) => {
        try {
            console.log("values vaan",req.body);
            if(req.body.username && req.body.password) {
                let userDetail = req.body;

                let existing = await userDetails.findOne({username: userDetail.username})

                if(!existing) {
                    userDetail.password = await bcrypt.hash(userDetail.password, 10)
                    console.log("pass",userDetail.password);
                    const newUser = new userDetails(userDetail)
                
                    newUser.save()
                    .then((response) => {
                        console.log("newuser",response);
                        
                        res.status(200).json({
                            error: false,
                            message: 'success',
                            data: {
                                username: response.username
                            }      
                        }) 
                    }).catch((error)=>{
                        console.log('backinval', error);
                        res.status(422).json({
                            error: true,
                            message: error+''
                        })
                    })  
                } else {
                    res.status(422).json({
                        error: true,
                        message: 'Existing user'
                    })
                }
                
            } else {
                res.status(422).json({
                    error: true,
                    message: 'username or password missing'
                })
            }
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error+''
            })
        }
    },
    login : async (req, res) => {
    console.log("login",req.body)
    let response = {}

    try {
        let loginDetails = req.body
        console.log('in',loginDetails);


        let user = await userDetails.find({
            email: loginDetails.email
        })

        console.log('user details',user)


        if (user.length > 0) {
            console.log('**i**')
       
            bcrypt.compare(loginDetails.password, user[0].password).then((status) => {
                if (status) {
                    response.valid = true
                    console.log('in back valid', status);

                    const id = user[0]._id
                    const token = jwt.sign({
                        id
                    }, "lectoriemSecret", {
                        expiresIn: 300000000000,
                    })
                    console.log('456', user[0]);
                    res.json({
                        auth: true,
                        token: token,
                        userId: user[0]._id,
                        username: user[0].username,
                        user: user[0]
                    })
                } else {
                    console.log('in back wrong', status);

                    res.json({
                        auth: false,
                        message: "invalid credentials",
                        wrong: true
                    })
                }
            })
        } else {
            response.notUser = true
            console.log('in back not user');
            res.json({
                auth: false,
                message: "no user exists",
                notUser: true
            })
        }
    } catch (error) {

    }
},

    insertReport: async (req, res) => {
        try {
            let data = {
                "Name": "Bhansali Engg.",
                "Current Market Price": "158.25",
                "Market Cap": "2625.46",
                "Stock P/E": "7.86",
                "Dividend Yield": "0.63",
                "ROCE %": "86.18",
                "ROE Previous Annum": "20.21",
                "Debt to Equity": "0",
                "EPS": "20.13",
                "Reserves": "664.76",
                "Debt": "0"
            }

            let schemaObj = nsereport(data)

            schemaObj.save().then((response) => {
                res.status(200).json({
                    umer: true,
                    amal: response
                })
            })
        } catch (error) {
            console.log(error)
        }
    },
    search: async (req, res) => {
        try {
            if(req.body.keyword) {
                let all = await nsereport.find()
                let searchResult = await nsereport.aggregate([
                    {
                        $match: {
                            $or: 
                                [
                                    {Name: { $regex: `^${req.body.keyword}`, $options: "i" }},
                                ]
                        }     
                    }
            ])

                res.status(200).json({
                    error: false,
                    message: 'success',
                    data: {
                        result: searchResult
                    }
                })
                
            } else {
                res.status(422).json({
                    error: true,
                    message: 'keyword missing'
                })
            }
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error+''
            })
        }
    }
}