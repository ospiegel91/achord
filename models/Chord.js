const mongoose = require('mongoose');
const { Schema } = mongoose;

const chordSchema = new Schema({
    value: String,
    bass: String,
    location: Number,

})

mongoose.model('chords', chordSchema);