const mongoose = require('mongoose');
const { Schema } = mongoose;
const LineSchema = require('./Line');

const partSchema = new Schema({
    tag: String,
    direction: String,
    lyrics: [LineSchema]

})

mongoose.model('parts', partSchema);