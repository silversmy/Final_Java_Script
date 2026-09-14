const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize')

const Task = sequelize.define("task",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataType.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(["pending", "in-progress", "completed"]),
        defaultValue: "pending",
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    


},
{
    timeStamps: true
})