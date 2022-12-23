require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cookieparser = require("cookie-parser")
const app = express();
const port = process.env.PORT || 5000
const router = require("./routers/auth");

app.use(express.urlencoded({extended:true}));
app.use(require("cors")({
    credentials:true,
    origin: 'https://mehulmayavanshifooddelieveryfrontend.netlify.app'
}))
app.use(express.json());
app.use(cookieparser());
app.use(router);



const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://mehul:mehul@cluster0.g7nraiq.mongodb.net/?retryWrites=true&w=majority')
        app.listen(port ,()=>console.log("start"))
    } catch (e) {
        console.log(e)
    }
}

start()