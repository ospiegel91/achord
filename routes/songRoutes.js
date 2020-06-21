const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Song = mongoose.model('songs');
const Line = mongoose.model('lines');
const Chord = mongoose.model('chords');


const nextChordDict = {
    "cb": ["C", "Bb"],
    "c": ["Db", "B"],
    "c#": ["D", "C"],
    "db": ["D", "C"],
    "d": ["Eb", "C#"],
    "d#": ["E", "D"],
    "eb": ["E", "D"],
    "e": ["F", "D#"],
    "e#": ["Gb", "E"],
    "fb": ["F", "D#"],
    "f": ["Gb", "E"],
    "f#": ["G", "F"],
    "gb": ["G", "F"],
    "g": ["Ab", "F#"],
    "g#": ["A", "G"],
    "ab": ["A", "G"],
    "a": ["Bb", "G#"],
    "a#": ["B", "A"],
    "bb": ["B", "A"],
    "b": ["C", "A#"],
    "b#": ["Db", "B"]
};

module.exports = app => {
    app.get('/api/songs/song/:id', requireLogin, async (req, res) => {
        const song = await Song.findById(req.params.id);
        res.send(song);
    });

    app.get('/api/songs/song/:id/shift', requireLogin, async (req, res) => {
        function convertChordBase(chord){
            const value = chord.value.toLowerCase();
            if(value.length <= 1){
                return nextChordDict[value][0]
            };
            if (value.charAt(1) == "#" || value.charAt(1) == "b"){
                let ext = value.slice(2);
                return nextChordDict[value.slice(0,2)][0] + ext
            };
            let ext = value.slice(1);
            return nextChordDict[value.charAt(0)][0] + ext
        };
        function convertChordBaseValue(value){
            const index = value.indexOf('/');
            if(index > -1){
                let bass = value.slice(index+1);
                return value.slice(0, index) + '/' + nextChordDict[bass][0];
            }; 
            return value;
        };
        const song = await Song.findById(req.params.id);
        for(let part of song.parts){
            for(let line of part.lyrics){
                for(let chord of line.chords){
                    console.log(chord.value)
                    let base = convertChordBase(chord);
                    newChord = convertChordBaseValue(base);
                    chord.value = newChord;
                };
            };
        };
        song.save();
        res.send(song);
    });

    app.get('/api/songs/song/:id/publish', requireLogin, async (req, res) => {
        const song = await Song.findById(req.params.id);
        song.published = true;
        song.save();
        res.send(song);
    });

    app.get('/api/songs', requireLogin, async (req, res) => {
        const songs = await Song.find({_user:req.user.id}).select({parts: 0});
        res.send(songs);
    });

    app.get('/api/publishedSongs', async(req, res)=>{
        const songs = await Song.find({published: true}).select({parts: 0});
        res.send(songs);
    });

    app.post('/api/songs/search', requireLogin, async (req, res) => {
        const text = req.body.data;
        const songs = await Song.find({ name: { "$regex": text }}).select({parts: 0});
        res.send(songs);
    });

    app.post('/api/publishedSongs/search', async (req, res) => {
        const text = req.body.data;
        const songs = await Song.find({published: true, name: { "$regex": text }}).select({parts: 0});
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
        res.redirect('/songs/song/' + song._id);
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
        const lineID = req.body.line;
        const songID = req.body.song;
        const partID = req.body.part;
        const song = await Song.findById(songID);
        const part = await song.parts.id(partID);
        const line = await part.lyrics.id(lineID);
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

    app.post('/api/line_chord_unit/chord/paste', requireLogin, async (req, res) => {
        const chords = JSON.parse(req.body.chords).chords;
        console.log('chords:  ')
        console.log(chords)
        const lineID = req.body.line;
        const songID = req.body.song;
        const partID = req.body.part;
        const song = await Song.findById(songID);
        const part = await song.parts.id(partID);
        const line = await part.lyrics.id(lineID);
        line.chords = chords.map((chord)=> new Chord({value: chord.value, location: chord.location}));
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
        const chord = await line.chords.id(chordID);
        chord.value = value;
        song.save()
        res.send(song)
    });

    app.post('/api/line_chord_unit/chord/remove', requireLogin, async(req, res)=>{
        const chordID = req.body.chord;
        const lineID = req.body.line;
        const songID = req.body.song;
        const partID = req.body.part;
        const song = await Song.findById(songID);
        const part = await song.parts.id(partID);
        const line = await part.lyrics.id(lineID);
        await line.chords.id(chordID).remove();
        song.save()
        res.send(song);
    })


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