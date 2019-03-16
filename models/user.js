module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // eslint-disable-next-line camelcase
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // eslint-disable-next-line camelcase
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // eslint-disable-next-line camelcase
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // eslint-disable-next-line camelcase
      desired_goal: DataTypes.STRING,
      // eslint-disable-next-line prettier/prettier
        image: DataTypes.STRING	
    });
    return User;
  };
  