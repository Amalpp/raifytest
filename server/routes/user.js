const express = require('express');
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user')

const router = express.Router()

const verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"];
    if(!token){
        req.send("Not authenticated");

    }else{
        jwt.verify(token,"RaifyTechnologies",(err,decoded)=>{
            if(err){
                console.log(err);
                res.json({auth:false,message:"failed to authenticate"});

            }else{
                req.userId = decoded.id;
                console.log("decoded");
                next()
            }
        })
    }
}


router.post("/login",userController.login)
router.post('/seed_user',userController.seed_user)
router.post('/search', userController.search)

router.post('/sample_insert', userController.insertReport)

module.exports = router;