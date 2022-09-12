const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { userExist } = require("../middlewares/user.middleware");
const { userValidators } = require("../middlewares/validators.middlewares");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", userValidators, createUser);
userRouter.patch("/:id", userExist, updateUser);
userRouter.delete("/:id", userExist, deleteUser);

module.exports = { userRouter };
