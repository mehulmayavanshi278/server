const express  = require("express");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser")
const suser = require("../../module/susers")
const authenticate = async(req,res,next)=>{
   try{
  
      const token = req.cookies.jwt;
      if(token){
         const verifyuser = jwt.verify(token,process.env.SECRETKEY);
         if(verifyuser){
          const rootuser = await suser.findOne({_id:verifyuser._id});
          req.rootuser = rootuser;
          req.token = token;
          req.id = rootuser.id;
          console.log(req.rootuser);
          next();
         }else{
           return res.status(201).send('token is' + token)
         }
      }else{
         return res.status(201).send("token not found");
      }

 

 
   }catch(err){
      return res.status(201).send("not valid");
    console.log(err);
   }
}

module.exports = authenticate