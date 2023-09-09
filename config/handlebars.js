const exphbs = require('express-handlebars');

const hbs = exphbs.create({ extname: '.hbs' });
const engine = hbs.engine;

module.exports =  {
    hbs,
    engine
};