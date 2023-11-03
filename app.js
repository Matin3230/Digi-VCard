const express = require('express');
// const mongoose = require('mongoose');
const dotenv=require('dotenv')
const app = express()

// Database link, Port Number
dotenv.config({ path: './config.env' })


// Database Connection
require('./db/conn')

// Conver Data from json format and show it
app.use(express.json())
app.use(require('./router/auth'))

// Database Schema
const User = require('./model/userSchema')


// middleware()
const middleware = (req, res, next) => {
    console.log("Middleware")
    next();
}


// app.get('/', (req, res) =>
// {
//     res.send('This is Homepage BRo');

// })

// app.get('/about',middleware, (req, res) =>
// {
//     res.send('This is AboutPage BRo');
//     console.log("About");
    
// })
// app.get('/contact', (req, res) =>
// {
//     res.cookie("Name","Matin")
//     res.send('This is ContactPage BRo');
// })
// app.get('/register', (req, res) =>
// {
//     res.send('This is LoginPage BRo');
// })

// console.log('Hello this is matin')


app.listen((process.env.PORT), () => {
    console.log('HOMEPAGE LOADED SUCCESSFULLY');
})

console.log("WORKING ON PORT NO "+ process.env.PORT)