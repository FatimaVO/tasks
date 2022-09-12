const { db, DataTypes } = require("../utils/database.util");

const Task = db.define("task", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  startDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  limitDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  finishDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  status: {
    allowNull: false,
    defaultValue: "active",
    type: DataTypes.STRING,
  },
});

module.exports = { Task };
