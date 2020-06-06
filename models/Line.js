const mongoose = require('mongoose');
const { Schema } = mongoose;
const ChordSchema = require('./Chord');

const lineSchema = new Schema({
    words: String,
    chords: [ChordSchema],
})

mongoose.model('lines', lineSchema);