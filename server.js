require('dotenv').config();
const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');

const app = express();
const cookieSecret = 'secret'

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: cookieSecret,
    saveUninitialized: true,
    resave: true,
    cookie: {
        // in milliseconds
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

const handlebars = require('./config/handlebars');
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server has started at port: ${process.env.PORT}`))
