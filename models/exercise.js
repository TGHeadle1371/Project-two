// Dependencies
// =============================================================

var Sequelize = require('sequelize');

// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Set up exercise table
var Exercise = sequelize.define("Exercise", {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Exercise: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});


// Create all defined tables in the specified db
var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

Exercise.sync(syncOptions)
.then(function (){
    console.log('User tables successfully created if one didn\'t already exist!');
})

//export User module for other files

module.exports = Exercise;