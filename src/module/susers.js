const mongoose  =require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
mongoose.set("strictQuery", false);
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    zender:{
        type:String,
        required:true
    },
    tokens:[
        {
           token:{
            type:String,
            required:true
           },
        }
    ]
})
userschema.methods.generatesauthtokens = async function(next){
    try{
     const token = await jwt.sign({id:this._id},process.env.SECRETKEY);
     this.tokens = this.tokens.concat({token});
     this.save();
     return token;
     next();
    
    }catch(err){
        console.log(err);
    }
}
userschema.pre("save",async function(next){
    try{
        if(this.isModified("password")){
            this.password = await  bcrypt.hash(this.password,10);
            next();
        }
    }catch(err){
        console.log(err);
    }
    
})
const suser  = new mongoose.model("suser",userschema);
module.exports = suser; 

