require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})
module.exports = mongoose;
