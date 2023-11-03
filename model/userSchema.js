const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    },

    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            name: {
                type: String,
                required:true
            },
            email: {
                type: String,
                required:true
            },
            phone: {
                type: Number,
                required:true
            },
            message: {
                type: String,
                required:true
            },
        }
    ],
    tokens: [
        {
        
            token:{
                type: String,
                required: true
            }
        }
    ],
    cards: [
        {
            template_id:{
                type: String,
                required: true
            },
            owner_name:{
                type: String,
                required: true
            },
            company_name:{
                type: String,
                required: true
            },
            desc:{
                type: String,
                required: true
            },
            c_address:{
                type: String,
                required: true
            },
            c_phone:{
                type: String,
                required: true
            },
            c_email:{
                type: String,
                required: true
            },
            c_qrcode:{
                type: String,
                // required: true
            },
        }
    ],

})

// HASHING PASSWORD

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
});

// GENERATING TOKENS

userSchema.methods.generateToken = async function () { 
    try { 

        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
        
    }
    catch (err) {
        console.log(err);
        
    }
}


// STORE USER MESSAGE


userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {

        this.messages = this.messages.concat({ name, email, phone, message })
        
        await this.save();
        return this.messages;
        
    }
    catch (e)
    {
        console.log(e)
    }
    
}

// STORE USER CARDS
userSchema.methods.addcard = async function (template_id, owner_name, company_name,desc,c_address,  c_phone, c_email,c_qrcode ) {
    try {

        this.cards = this.cards.concat({ template_id, owner_name, company_name,desc,c_address,  c_phone, c_email,c_qrcode  })
        
        await this.save();
 

        return this.cards;
        
    }
    catch (e)
    {
        console.log(e)
    }
    
}


// COLLECTION CREATION
module.exports = User = mongoose.model("Users", userSchema);