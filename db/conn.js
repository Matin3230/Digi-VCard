const mongoose=require('mongoose')

const DB = process.env.DATABASE


mongoose.connect(DB).
    then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY")}
).catch((err) => { console.log("NO DATABASE CONNECTION")})

