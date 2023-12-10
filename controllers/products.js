const user = async (req, res) => {
  res.status(200).json({ msg: "i am user." });
};

const allUsers = async (req, res) => {
  res.status(200).json({ msg: "I am allUsers" });
};

const userByEmail = async (req, res) => {
  res.status(200).json({ msg: "I am userByEmail" });
};

const userById = async (req, res) => {
  res.status(200).json({ msg: "I am userById" });
};

module.exports = { user, allUsers, userByEmail, userById };
