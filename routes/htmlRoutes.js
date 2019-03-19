module.exports = function (app) {

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
                    //email: req.body.email,
                    password: req.body.password
                })
                .then(user => {
                    req.session.user = user.dataValues;
                    res.redirect('/dashboard');
                })
                .catch(error => {
                    res.redirect('/signup');
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
                    console.log("Please signup to continue!");
                    res.redirect('/signup');
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
            hbsContent.userName = req.session.user.username;
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

};