const jwt = require('jsonwebtoken')
const User = require('../model/userSchema') 

const cookieParser = require('cookie-parser');
var express = require('express')
const app = express();
app.use(cookieParser());

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        if(token)
        { 
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

            const rootUser = await User.    findOne({ _id: verifyToken._id, "tokens.token": token });

            if (!rootUser) { throw new Error("USER NOT FOUND") }
            
            req.token = token;
            req.rootUser = rootUser;
            req.userID = rootUser._id;
       }
        next();

    }
    catch(err) {
        res.status(401).send("UNAUTHORIZED TOKEN PROVIDED");
        console.log(err);
    }
}

module.exports = Authenticate;