const mongoose = require('mongoose')

const lectureSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    video:{
        type: Object,
        required: true
    },

    courseId:{
        type: String,
        required: true
    },

    
})

module.exports = Lecture = mongoose.model('lecture',lectureSchema) 