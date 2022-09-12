const express = require("express");

const { userRouter } = require("./routes/user.routes");
const { taskRouter } = require("./routes/task.routes");
const app = express();

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exist in our server`,
  });
});

module.exports = { app };
