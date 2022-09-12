const { app } = require("./app");
const { db } = require("./utils/database.util");
const { associationsModel } = require("./models/associations.model");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const startServer = async () => {
  try {
    await db.authenticate().then();
    //Established relationhips...
    associationsModel();
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
