const express = require('express')
const router = express.Router()
const data = require('../db/projects.json')
const fs = require('fs')
const projects = JSON.parse(JSON.stringify(data));



// get all courses
router.get('/',async (req,res)=>{
    try {
        
        console.log(projects)
        res.send(projects)
    } catch (error) {
        console.log(error.message)
    }
  
  })


router.get('/:id',async (req,res)=>{
    try {
        const id=req.params.id
        const requiredIndex = data.findIndex(el => {
            return el.id === id;
        });
        if(requiredIndex === -1){
            console.log(data.project_id);
            res.status(400).json({ msg :'Not found' });
        }else{
            return projects[requiredIndex]
        }
        
    } catch (error) {
        console.log(error.message)
    }

})

  module.exports = router


