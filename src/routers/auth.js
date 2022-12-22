const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticate  = require("./middlevare/authenticate")
const jwt = require("jsonwebtoken")
const suser = require("../module/susers")

router.get("/",(req,res)=>{
    return res.send("hi");
})

router.get("/logoutt",authenticate,async (req,res)=>{
   try{
    res.clearCookie("jwt");
    req.rootuser.tokens = req.rootuser.tokens.filter((elm)=>{
        return elm.token !== req.token;
    })
    await req.rootuser.save();
    return res.status(200).send('logout successfully');
   }catch(err){
    console.log(err);
   }
})
router.get("/homee",authenticate,async(req,res)=>{
    try{
      return res.status(200).send(req.rootuser);
    }catch(err){
        console.log(err);
    }
})
router.post("/register",async (req,res)=>{
    try{
        const {name , email , password , phone , address , zender }=req.body;
        console.log(name +  email  + password)
        const newuser = new suser({
            name,email,password,phone,address,zender
        })
       
        await newuser.save();
        return res.send(newuser);
    }catch(err){
        console.log(err);
    }
   
})
router.post("/login",async(req,res)=>{
    const {email , password} = req.body;
    try{
        console.log(email + password)
      const check = await suser.findOne({email});
      const pwcheck = await bcrypt.compare(password , check.password);
      if(check && pwcheck){
        const token = await check.generatesauthtokens();
         res.cookie("jwt",token , {
            expires: new Date(new Date().getTime() + 31557600000),
			sameSite: 'lax',
            secure:true,
            domain:'https://mehulmayavanshifooddelieveryfrontend.netlify.app'
        });
        return res.status(200).send("done");
      }else{
        return res.status(201).send("invalid details");
      }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;