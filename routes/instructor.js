const express = require('express')
const router = express.Router()
const Instructor = require('../models/Instructor')
const {cloudinary} = require('../utils/cloudinary')

// get all instructors
router.get('/',async (req,res)=>{
  try {
      const instructors = await Instructor.find()
      res.send(instructors)
  } catch (error) {
      console.log(error.message)
  }

})

// get  instructor by id
router.get('/:id',async (req,res)=>{
    const {id} = req.params
    try {
        const instructor = await Instructor.findById(id)
        res.send(instructor)
    } catch (error) {
        console.log(error.message)
    }
  
  })


//post an instructor
router.post('/',async (req,res)=>{
    const {name,about} = req.body
    const fileStr = req.body.previewSource
    let image = await cloudinary.v2.uploader.upload(fileStr, {folder: 'learnia/instructors'})
    try {
        const instructor = new Instructor({name,about,image:image.url})
        await instructor.save()
        res.send(instructor)
    } catch (error) {
        console.log(error.message)
    }
})




module.exports = router