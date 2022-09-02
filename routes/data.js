const express = require('express')
const router = express.Router()
const pool = require("../db/db");
const functions = require("../methodes/functions");
const fs = require('fs');

// Blocks the event loop

const {isLogged}=functions


router.post('/data',async (req,res)=>{
    const {chart} =req.body
    try {
        
        var path="./data/tobedisplayed/"+chart+".json"
        const data =JSON.parse( fs.readFileSync(path,
        {encoding:'utf8', flag:'r'}));
        if(data){
            res.send(data)
        }else{
            res.status(404).send("this chart's data is not found !")
        }
    } catch (error) {
        res.send(error.message.split("\n")[0])
    }
  
  })

module.exports = router


