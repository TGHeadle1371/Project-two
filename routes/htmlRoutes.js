var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // Load signup page
  app.get("/login", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("login", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // Load Home page
  app.get("/landing", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("landing", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // User Profiles
  app.get("/userprofile", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("userProfile", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // Load About page
  app.get("/about", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("about", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
