const { Task } = require("./task.model");
const { User } = require("./user.model");

const initModels = () => {
  //1 User----M Tasks
  User.hasMany(Task, { foreingKey: "userId" });
  Task.belongsTo(User);
};

module.exports = { initModels };
