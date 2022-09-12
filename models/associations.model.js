const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const associationsModel = () => {
  //1 User----M Tasks
  User.hasMany(Task, { foreingKey: "userId" });
  Task.belongsTo(User);
};

module.exports = { associationsModel };
