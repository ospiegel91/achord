const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Song = mongoose.model('songs');
const Line = mongoose.model('lines');
const Chord = mongoose.model('chords');

module.exports = app => {
    app.get('/api/songs/song/:id', requireLogin, async (req, res) => {
        const song = await Song.findById(req.params.id);
        res.send(song);
    });

    app.get('/api/songs', requireLogin, async (req, res) => {
        const songs = await Song.find({_user:req.user.id}).select({parts: 0});
        res.send(songs);
    });

    app.post('/api/songs/search', requireLogin, async (req, res) => {
        const text = req.body.data;
        const songs = await Song.find({name: { "$regex": text }}).select({parts: 0});
        res.send(songs);
    });

    app.post('/api/songs', requireLogin, (req, res) => {
        const { formTitle, formDirection, formLyrics} = JSON.parse(req.body.data);
        const song = new Song({
            name: formTitle,
            direction: formDirection,
            _user: req.user.id,
            dateLastSaved: Date.now(),
            parts: formLyrics.map((part ,i) =>{ return {
                tag: i,
                lyrics: part.map((line) => {return {words: line, direction: formDirection}})
            }})
        });
        song.save();
        console.log('song id is: ')
        console.log(song._id)
    });

    app.post('/api/line_chord_unit/words', requireLogin, async (req, res) => {
        const text = req.body.text;
        const lineID = req.body.line;
        const songID = req.body.song;
        const partID = req.body.part;
        const song = await Song.findById(songID);
        const part = await song.parts.id(partID);
        const line = await part.lyrics.id(lineID)
        line.words = text;
        song.save()
        res.send(song)
    });

    app.post('/api/line_chord_unit/chord/new', requireLogin, async (req, res) => {
        const location = req.body.location;
        const lineID = req.body.line;
        const songID = req.body.song;
        const partID = req.body.part;
        const song = await Song.findById(songID);
        const part = await song.parts.id(partID);
        const line = await part.lyrics.id(lineID);
        line.chords.push(new Chord({location: location}))
        song.save()
        res.send(song)
    });

    app.post('/api/line_chord_unit/dir', requireLogin, async (req, res)=>{
        console.log('hello from server')
        const lineID = req.body.line;
        const songID = req.body.song;
        const partID = req.body.part;
        const song = await Song.findById(songID);
        const part = await song.parts.id(partID);
        const line = await part.lyrics.id(lineID);
        console.log(line)
        line.direction == 'rtl' ? line.direction = 'ltr' : line.direction = 'rtl';
        song.save()
        res.send(song)     
    })

    app.post('/api/line_chord_unit/chord/empty', requireLogin, async (req, res) => {
        const lineID = req.body.line;
        const songID = req.body.song;
        const partID = req.body.part;
        const song = await Song.findById(songID);
        const part = await song.parts.id(partID);
        const line = await part.lyrics.id(lineID);
        line.chords = [];
        song.save()
        res.send(song)
    });

    app.post('/api/line_chord_unit/chord/value', requireLogin, async (req, res) => {
        const value = req.body.value;
        const chordID = req.body.chord;
        const lineID = req.body.line;
        const songID = req.body.song;
        const partID = req.body.part;
        const song = await Song.findById(songID);
        const part = await song.parts.id(partID);
        const line = await part.lyrics.id(lineID);
        console.log(line)
        console.log(chordID)
        const chord = await line.chords.id(chordID);
        chord.value = value;
        song.save()
        res.send(song)
    });


    app.post('/api/line_chord_unit/add', requireLogin, async (req, res) => {
        const position = req.body.position;
        const songID = req.body.song;
        const partID = req.body.part;
        const song = await Song.findById(songID);
        const part = await song.parts.id(partID);
        let newLines = []
        for(let i=0; i<part.lyrics.length+1; i++){
            if(i==position ){
                newLines.push(new Line({words: ""}))
                newLines.push(part.lyrics[i])
            } else if (part.lyrics[i]){
                newLines.push(part.lyrics[i])
            }
        }
        part.lyrics = newLines;
        song.save()
        res.send(song)
    });



};