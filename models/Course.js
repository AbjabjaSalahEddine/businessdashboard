const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    subtitle:{
        type:String,
        required: true
    },

    thumbnail:{
        type: String,
        required: true
    },
    
    category:{
        type: String,
        required:true
    },
    
    language:{
        type: String,
        required:true
    },
    
    description:{
        type: String,
        required:true
    },
    prerequisites:{
        type: [String],
        required: true
    },
    wylearn:{
        type: [Object],
        required: true
    },
    instructor:{
        type: String,
        required:true
    },
    level:{
        type: String,
        required:true
    }

    
})

module.exports = Course = mongoose.model('course',courseSchema) 