const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");


const User = class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,

    email:{ 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Temporary123'
    },

    role:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue: 'User'
    }

  }, {
    sequelize,
    modelName: 'User',
  });

module.exports = User;