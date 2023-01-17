// @desc Registered User
// @route POST /api/users
// @access Public
exports.createUser = async (req, res) => {
	res.send("test");
};

// @desc get all users
// @route POST /api/users
// @access Private

exports.getUsers = async (req, res) => {
	res.send("users");
};
