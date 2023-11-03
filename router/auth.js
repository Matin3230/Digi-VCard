const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authenticate=require('../middleware/authenticate')
const router = express.Router();


const cookieParser = require('cookie-parser');
// var express = require('express')
const app = express();
router.use(cookieParser());
require("../db/conn")

const User=require("../model/userSchema")

router.get('/', (req, res)=> { 
    res.send("This is Router Page");
})



// Using Promises

// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword)
//     {
//         return(res.status(422).json({error:"Please fill all data"}))
//     }


//     User.findOne({email:email})
//         .then((userExist) => {
//             if (userExist)
//             {
//                 return(res.status(422).json({error:"Email Already Exist.."}))
//             }

//             const user = new User({ name, email, phone, work, password, cpassword })
            
//             user.save().then(() =>
//             {
//                 return(res.status(201).json({error:"User Registered Successfully"}))
//             }).catch(err=>{console.log(err)})


//         })
    

//     // console.log(req.body);
//     // res.json({message: req.body})

//     // res.send("Register Page ");
// })



// Using Asychronous

router.post('/register', async (req, res) => { 

    
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword)
    {
        return(res.status(422).json({error:"Please fill all data"}))
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist)
        {
            return(res.status(422).json({error:"Email Already Exist.."}))
        }
        else if (password != cpassword)
        {
            return(res.status(422).json({error:"Password and Confirm Password does not match"}))   
        }


        const user = new User({ name, email, phone, work, password, cpassword })

        await user.save();

        res.status(201).json({Message:"User Registered Successfully"})

    }
    catch (err) { console.log(err) }

   
})



router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
        {
            res.status(400).json({error:"Please Fill All Data"})
        }

        const userLogin = await User.findOne({ email: email })
        
        if (userLogin)
        {
            const isMatch = await bcrypt.compare(password, userLogin.password)
           
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" })
            }
            else { 
                const token = await userLogin.generateToken();
                
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly:true
                })

                res.status(201).json({ Message: "User Login Successfully" })
                
                // console.log(inspect(req.cookies['jwtoken']));
               
            }
            
        }
        else
        {
           res.status(400).json({ error: "Invalid Credentials" })
        }

    }
    catch (err)
    {
        console.log(err)
    }

    // console.log(req.body)
    // res.json({message:req.body})
})



// GET ABOUT PAGE DATA

router.get('/about',authenticate, (req, res) =>
{
    res.send(req.rootUser);   
})

// GET CONTACT PAGE DATA

router.get('/getData',authenticate, (req, res) =>
{
    res.send(req.rootUser);   
})

// SENDING MESSAGE CONTACT US PAGE

router.post('/contact', authenticate, async(req, res) =>
{
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message )
        {
            console.log("ERROR IN CONTACT US PAGE")
            return res.json({Error: "PLEASE FILL THE FORM PROPERLY"})
        }

        const userContact = await User.findOne({ _id: req.userID })
            
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);  
            
            await userContact.save();

            res.status(201).json({message:"MESSAGE SAVE SUCCESSFULLY"})
        }
    }
    catch (e)
    {
        console.log(e);
    } 
})


// CARD SAVING PROCESS

router.post('/download', authenticate, async(req, res) =>
{
    try {
        const {template_id, owner_name, company_name,desc,c_address,  c_phone, c_email,c_qrcode} = req.body;
        if (!template_id || !owner_name || !company_name || !desc || !c_phone ||!c_email || !c_address || !c_qrcode)
        {
            console.log("ERROR IN DOWNLOAD PAGE")
            return res.json({Error: "PLEASE FILL THE FORM PROPERLY"})
        }

        console.log(req.body);
        const usercard = await User.findOne({ _id: req.userID })
            
        if (usercard) {
            const usernewcard = await usercard.addcard(template_id, owner_name, company_name,desc,c_address,  c_phone, c_email,c_qrcode );  

            
            await usercard.save();

            res.status(201).json({message:"CARD SAVE SUCCESSFULLY"})
        }
    }
    catch (e)
    {
        console.log(e);
    } 
})

router.get('/logout', (req, res) =>
{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(201).send({message:"USER LOGOUT SUCCESFULLY"});   
})

module.exports = router;