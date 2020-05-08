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

mongoose
  .connect('mongodb://localhost/ebb', {useNewUrlParser: true})
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
    saveUninitialized: false,
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
app.locals.title = 'EBB - CATCH PHRASE HERE :)';


const auth = require('./routes/auth-routes');
const index = require('./routes/index');
const companies = require('./routes/companies');


app.use('/', auth);
app.use('/', index);
app.use('/', companies);


module.exports = app;
