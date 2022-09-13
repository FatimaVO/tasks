const { app } = require("./app");
const { db } = require("./utils/database.util");
const { initModels } = require("./models/initModels");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const startServer = async () => {
  try {
    await db.authenticate().then();
    initModels();
    await db.sync().then();
    const PORT = 4000;
    app.listen(PORT, () => {
      console.log("Express app running!");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
