const mongoose = require('mongoose');
const { Schema } = mongoose;



const chordSchema = new Schema({
    value: String,
    location: Number,

})

const lineSchema = new Schema({
    words: String,
    chords: [chordSchema],
    direction: String,
})

const partSchema = new Schema({
    tag: String,
    lyrics: [lineSchema],
    direction: {type: String, default: 'rtl'},

})

const songSchema = new Schema({
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    published: {type: Boolean, default: false},
    name: String,
    parts: [partSchema],
    direction: {type: String, default: 'ltr'},
    dateLastSaved: Date
})

mongoose.model('chords', chordSchema);
mongoose.model('lines', lineSchema);
mongoose.model('songs', songSchema);