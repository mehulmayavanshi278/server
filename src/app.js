require("dotenv").config();
const express = require("express");
const cookieparser = require("cookie-parser")
const app = express();
const port = process.env.PORT || 5000
const router = require("./routers/auth");
require("./db/Conn");
app.use(express.json());
app.use(cookieparser());
app.use(router);
app.use(express.urlencoded({extended:true}));

app.listen(port ,()=>{
    console.log("running at port 5000");
})