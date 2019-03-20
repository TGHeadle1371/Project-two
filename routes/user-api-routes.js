// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

var User = require("../models/user.js");


// Routes
// =============================================================
module.exports = function (app) {
    app.get("/api/User", function (req, res) {
        // Here we add an "include" property to our options in our findAll query66
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Dashboard
        User.findAll({}).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/User/:id", function (req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Dashboard
        User.findOne({
            where: {
                id: req.params.id
            }
            //,
            //include: [db.Dashboard]
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/User", function (req, res) {
        User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.put("/api/User/:id", function (req, res) {
        User.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            }).then(function (dbUser) {
            res.json(dbUser);
        });
    });


    app.delete("/api/User/:id", function (req, res) {
        User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });
};