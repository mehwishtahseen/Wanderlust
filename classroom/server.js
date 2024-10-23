const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts= require("./routes/post.js");
const cookieParser  = require("cookie-parser");
const session= require("express-session")

const sessionOptions ={
    secret: "mysupersecretstrng",
    resave:false,
    saveUnintialized: true,
};

app.use(session(sessionOptions));

app.get("/register" , (req,res)=>{
    let {name = "anonymous"} = req.query;
    res.send(name);
})

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie", (req,res)=>{
    res.cookie("made-in", "India", {signed:true});
    res.send("signed cookie send");
});

app.get("/verify", (req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
})

app.get("/getcookies" , (req,res) =>{
    
    res.cookie("MadeIn" , "Pakistan");
    res.cookie("greet" , "hello");
    res.send("send you some cookies");
});

app.get("/greet" , (req,res)=>{
    let {name = "anonymous"} = req.cookies;
    res.send(`Hi, ${name}`);
})

app.get("/", (req,res)=>{
    console.dir(req.cookies);
    res.send("Hi, I am root");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () =>{
    console.log("server is listening to port 3000");
});