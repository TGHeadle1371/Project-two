// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require('sequelize');
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};


if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    var sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }
  

// Exports the connection for other files to use
module.exports = sequelize;
