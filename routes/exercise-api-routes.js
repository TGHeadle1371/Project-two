var db = require("../models/exercise.js");

module.exports = function(app) {
  app.get("/api/exercises", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Dashboard
    db.Exercise.findAll({
      //include: [db.Dashboard]
    }).then(function(dbExercise) {
      res.json(dbExercise);
    });
  });

  app.get("/api/exercises/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Dashboard
    db.Exercise.findOne({
      where: {
        id: req.params.id
      }
      //,
      //include: [db.Dashboard]
    }).then(function(dbExercise) {
      res.json(dbExercise);
    });
  });

  app.post("/api/exercises", function(req, res) {
    db.Exercise.create(req.body).then(function(dbExercise) {
      res.json(dbExercise);
    });
  });

  app.delete("/api/exercises/:id", function(req, res) {
    db.Exercise.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExercise) {
      res.json(dbExercise);
    });
  });

};