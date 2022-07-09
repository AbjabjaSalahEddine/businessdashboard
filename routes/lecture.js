const express = require('express')
const router = express.Router()
const {cloudinary} = require('../utils/cloudinary')
let streamifier = require('streamifier');
const Lecture = require('../models/Lecture')


// Add lecture
router.post('/', async (req, res) => {
  
  const title = req.body.title 
  const courseId = req.body.courseId

  if (req.files === null) {

    return res.status(400).json({ msg: 'No file uploaded' });
  }
   
  if (!title) {

    return res.status(400).json({ msg: 'You need to add a title '});
  }
  



  const file = req.files.file.data;



  
  let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
    {
      folder: "learnia/videos",
      resource_type: "video"
    },
    async function(error, result) {
        if(!error && result){
          const lecture = new  Lecture({title, courseId, video:{url: result.url, duration:result.duration, id: result.public_id}})
          await lecture.save()
        }

        res.send({error,result})
    }
);

streamifier.createReadStream(file).pipe(cld_upload_stream);




});


//get lectures
router.get('/:courseId', async (req, res) => {

  try {
   const courseId = req.params.courseId
   const lectures = await Lecture.find({courseId: courseId})
   res.status(200).send(lectures)
  } catch (error) {
    console.log(error)
  }
   
})
  
 
  
module.exports = router