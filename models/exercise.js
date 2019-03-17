var Sequelize = require('sequelize');

var sequelize = new Sequelize('ourDatabase', 'root', 'password', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

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

sequelize.sync(syncOptions)
.then(function (){
    console.log('User tables successfully created if one didn\'t already exist!');
})

//export User module for other files

module.exports = Exercise;