const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'ipfs/courseCovers'
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    publishDate: {
        type: Date,
        required: true
    },

    coverImageName: {
        type: String,
        required: true
    }
})

courseSchema.virtual('coverImagePath').get(function(){
   if (this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName)
   }
})
module.exports = mongoose.model('Course', courseSchema)
module.exports.coverImageBasePath = coverImageBasePath