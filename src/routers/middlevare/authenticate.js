const express  = require("express");
const jwt = require("jsonwebtoken");
const suser = require("../../module/susers")
const authenticate = async(req,res,next)=>{
   try{
    const token = req.cookies.jwt;

    const verifyuser = jwt.verify(token,process.env.SECRETKEY);
    if(verifyuser){
     const rootuser = await suser.findOne({_id:verifyuser.id});
     req.rootuser = rootuser;
     req.token = token;
     req.id = rootuser.id;
     console.log(req.rootuser);
     next();
    }

   return res.status(201).send("not vailidate");
   }catch(err){
      return res.status(201).send("not valid");
    console.log(err);
   }
}

module.exports = authenticate