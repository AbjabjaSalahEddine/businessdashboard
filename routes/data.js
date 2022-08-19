const express = require('express')
const router = express.Router()
const pool = require("../db/db");
const functions = require("../methodes/functions");
const fs = require('fs');

// Blocks the event loop

const {isLogged}=functions


router.get('/data',async (req,res)=>{
    const { chart } = req.body;
    try {
        var path="../data/tobedisplayed/"+chart+".json"
        var data = require(path);
        console.log(data)
        if(data){
            res.send(data)
        }else{
            res.status(404).send("this chart's data is not found !")
        }
    } catch (error) {
        console.log(error.message)
        res.send(error.message.split("\n")[0])
    }
  
  })

module.exports = router


