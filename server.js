require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./models/user');
var hbs = require('express-handlebars');
var path = require('path');
var PORT = process.env.PORT || 3000;

// invoke an instance of express application.
var app = express();

// set our application port
//app.set('port', 9000);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({
    extended: true
}));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());
//Use public 
app.use(express.static("public"));
//Use public directory
app.use(express.static(__dirname + "/app/public"));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandomstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// handle bars config
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

var hbsContent = {
    userName: '',
    loggedin: false,
    title: "You are not logged in today",
    body: "Please login to continue!"
};

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {

        res.redirect('/dashboard');
    } else {
        next();
    }
};

//Routes
require('./routes/exercise-api-routes.js')(app);
require('./routes/user-api-routes.js')(app);


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});


// route for user signup
app.route('/signup')
    //.get(sessionChecker, (req, res) => {
    .get((req, res) => {
        //res.sendFile(__dirname + '/public/signup.html');
        res.render('signup', hbsContent);
    })
    .post((req, res) => {
        User.create({
                username: req.body.username,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            })
            .then(user => {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            })
            .catch(error => {
                res.redirect('/signup')
                console.log("Please enter a valid input")
            });
    });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        //res.sendFile(__dirname + '/public/login.html');
        res.render('login', hbsContent);
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = true;
        hbsContent.id = req.session.user.id;
        hbsContent.userName = req.session.user.username;
        hbsContent.first_name = req.session.user.first_name;
        hbsContent.last_name = req.session.user.last_name;
        hbsContent.email = req.session.user.email;
        //console.log(JSON.stringify(req.session.user)); 
        console.log(req.session.user.username);
        hbsContent.title = "You are logged in";
        res.render('dashboard', hbsContent);
    } else {
        res.redirect('/login');
    }
});

// route for exercise
app.get('/exercise', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = true;
        hbsContent.userName = req.session.user.username;       

        //console.log(JSON.stringify(req.session.user)); 
        console.log(req.session.user.username);
        hbsContent.title = "You are logged in";
        res.render('exercise', hbsContent);
    } else {
        res.redirect('/login');
    }
});


// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = false;
        hbsContent.title = "You are logged out!";
        res.clearCookie('user_sid');
        console.log(JSON.stringify(hbsContent));
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});


// start the express server
//app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  