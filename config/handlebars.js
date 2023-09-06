const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const engine = exphbs.engine();

module.exports =  {
    hbs,
    engine
};