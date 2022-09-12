const { User } = require("../models/user.model");

const userExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userExist };
