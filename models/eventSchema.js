const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchma = new Schema({
    type:String,
    title:String,
    image: String,
    date: String,
    description: String,
    participants: Number,
    winners:String,
    includedYear:String,
    includedBranch:String,
    venue:String,
})

module.exports = mongoose.model('Events',eventSchma);
