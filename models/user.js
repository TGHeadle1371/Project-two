var Sequelize = require('sequelize');
// Salted hash
var bcrypt = require('bcrypt');

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

// Set up user table
var User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        // can NOT be NULL
        allowNull: false,
        unique: true,
        // first name must be min  characters and max 30 characters
        validate: {
            len: [3, 30]
        }
    },
    last_name: {
        type: Sequelize.STRING,
        // can NOT be NULL
        allowNull: false,
        unique: true,
        // lastname must be min 3 characters and max 30 characters
        validate: {
            len: [3, 30]
        }
    },
    email: {
        type: Sequelize.STRING,
        // can NOT be NULL
        allowNull: false,
        unique: true,
        // EMAIL must be in the format (foo@bar.com)
        validate: {
            isEmail: true
        }
    },
});

User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Create all defined tables in the specified db
var syncOptions = {
    force: false
};

if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}


sequelize.sync(syncOptions)
    .then(function () {
        console.log('User tables successfully created if one didn\'t already exist!');
    })

//export User module for other files

module.exports = User;