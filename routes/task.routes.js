const express = require("express");

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStatus,
} = require("../controllers/task.controller");

const { taskExist } = require("../middlewares/task.middleware");

const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:status", getTasksByStatus);
taskRouter.post("/", createTask);
taskRouter.patch("/:id", taskExist, updateTask);
taskRouter.delete("/:id", taskExist, deleteTask);

module.exports = { taskRouter };
