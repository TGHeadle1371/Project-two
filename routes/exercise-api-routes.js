// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

var Exercise = require("../models/exercise.js");


// Routes
// =============================================================
module.exports = function(app) {
  app.get("/api/exercise", function(req, res) {
    // Here we add an "include" property to our options in our findAll query66
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Dashboard
    Exercise.findAll({}).then(function(dbExercise) {
      res.json(dbExercise);
    });
  });

  app.get("/api/exercise/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Dashboard
    Exercise.findOne({
      where: {
        id: req.params.id
      }
      //,
      //include: [db.Dashboard]
    }).then(function(dbExercise) {
      res.json(dbExercise);
    });
  });

  app.post("/api/exercise", function(req, res) {
    Exercise.create(req.body).then(function(dbExercise) {
      res.json(dbExercise);
    });
  });

  app.delete("/api/exercise/:id", function(req, res) {
    Exercise.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExercise) {
      res.json(dbExercise);
    });
  });

};