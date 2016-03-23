/**
 * Created by crystal on 3/16/16.
 * Functionalities：
 * 1. Register
 * 2. Login
 * 3. After login redirect to home page
 */

var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');//The flash is a special area of the session used for storing messages
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var settings = require('./settings');

//get config object
var app = express();

//set template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//load and parse urlencoded request body's middleware
app.use(bodyParser.urlencoded({extended:false}));
//set the directory public as static files directory
app.use(express.static(path.join(__dirname, 'public')));
//flash
app.use(flash());
app.use(session({
    secret: settings.cookieSecret,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        url:'mongodb://localhost:27017/myuser',
        ttl: 14 * 24 * 60 * 60
    })
}));

routes(app);

app.listen(3000, function(){
    console.log('Express server listening on port 3000.');
});
