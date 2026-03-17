const { getMe, getWelcomeMessage } = require("../services/userService");

const getMyProfile = async (req, res) => {
  try {
    const user = await getMe(req.user.id);

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getWelcome = async (req, res) => {
  try {
    const message = await getWelcomeMessage(req.user.id);

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyProfile,
  getWelcome,
};