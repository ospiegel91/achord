const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser')
require('./models/User');
require('./models/Song');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());

require('./routes/authRoutes')(app);
require('./routes/songRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
