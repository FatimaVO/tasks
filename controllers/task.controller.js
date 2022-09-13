const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: [
        "id",
        "userId",
        "title",
        "startDate",
        "limitDate",
        "finishDate",
        "status",
      ],
      include: { model: User, attributes: ["id", "name", "status"] },
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const taskStatus = ["active", "late", "cancelled", "completed"];
    const { status } = req.params;
    if (taskStatus.includes(status)) {
      const tasks = await Task.findAll({
        where: { status },
        include: { model: User, attributes: ["id", "name", "status"] },
      });
      res.status(200).json({
        status: "success",
        data: {
          tasks,
        },
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "The status you are trying to check does not exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;
    const newTask = await Task.create({
      title,
      userId,
      startDate,
      limitDate,
    });
    res.status(201).json({
      status: "success",
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { task } = req;
    const { finishDate } = req.body;
    if (task.status === "active") {
      const taskToUpdate = await task.update({ finishDate });
      const maximumDate = Date.parse(task.limitDate);
      const endDate = Date.parse(finishDate);
      if (maximumDate >= endDate) {
        taskToUpdate.update({ status: "completed" });
      } else {
        taskToUpdate.update({ status: "late" });
      }
      res.status(200).json({
        status: "success",
        data: { taskToUpdate },
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "The task has already been completed or cancelled",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;

    if (task.status === "cancelled") {
      return res.status(404).json({
        status: "error",
        message: "The task has already been cancelled",
      });
    } else {
      await task.update({ status: "cancelled" });
      res.status(204).json({
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStatus,
};
