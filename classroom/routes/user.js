const express = require("express");
const router = express.Router();

//Index-  Users
router.get("/", (req,res)=>{
    res.send("Get for users");
});

//Show-  Users
router.get("/:id", (req,res)=>{
    res.send("Get for user id");
});

//POST-  Users
router.post("/", (req,res)=>{
    res.send(" POST for users");
});

//DELETE-  Users
router.delete("/", (req,res)=>{
    res.send("DELETE for user id");
});


module.exports= router;