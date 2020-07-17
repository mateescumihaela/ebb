require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);

hbs.registerHelper('inc', (value, options) => {
    return parseInt(value) + 1;
});

 hbs.registerHelper("prettifyDate", (timestamp) => {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
      return i;
    }
    let curr_date = timestamp.getDate();
    let curr_month = timestamp.getMonth();
    curr_month++;
    let curr_year = timestamp.getFullYear();
    let curr_hour = timestamp.getHours();
    let curr_minutes = timestamp.getMinutes();

    result = `${addZero(curr_date)}/${addZero(curr_month)}/${addZero(curr_year)}, ${addZero(curr_hour)}:${addZero(curr_minutes)}`;
    return result;
}); 

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Setting up authentication session
app.use(session({
  secret: "ebb-auth-secret",
  cookie: {max: 60000}, //cookie living on the  browser - 1 minute
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    resave: true,
    saveUninitialized: true,
    ttl: 24 * 60* 60, // session living on the server - 1day, 
  })
}));

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'EBB - Developed by Julia Carvalho and Mihaela Mateescu';


const auth = require('./routes/auth-routes');
const index = require('./routes/index');
const companies = require('./routes/companies');
const ratings = require('./routes/ratings');
const comments = require('./routes/comments');

app.use('/', auth);
app.use('/', index);
app.use('/', companies);
app.use('/', ratings);
app.use('/', comments);


module.exports = app;
