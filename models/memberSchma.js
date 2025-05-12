const mongoose = require('mongoose');
const {Schema} = mongoose;

const memberSchma = new Schema({
    name:String,
    image: String,
    year: Number,
    post: String,
    branch: String,
    skills:String,
    email:String,
})

module.exports = mongoose.model('Members',memberSchma);
