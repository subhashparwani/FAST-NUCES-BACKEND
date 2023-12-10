require("dotenv").config();
const { connect } = require("mongoose");
const UserSchema = require("../Schema/users");

const signUp = async (req, res) => {
  const { username, email, password, gender } = req.body;

  console.log("test");

  if (username && email && password && gender) {
    try {
      console.log("All required fields are present"); // Log to check if the condition is met
      await connect(process.env.MONGO_URL);
      // const checkUser=await UserSchema.findOne({email});
      const checkUser = await UserSchema.exists({ email });
      if (!checkUser) {
        await UserSchema.create({ username, email, gender, password });
        res.status(201).json({ message: "user created succesfully" });
      } else {
        res.json({
          message: "user already exists",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  } else {
    console.log("Required field missing"); // Log if any required field is missing
    res.status(403).json({
      message: "required field missing",
    });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (email && password) {
    try {
      await connect(process.env.MONGO_URL);
      const checkUser = await UserSchema.findOne({ email });

      if (checkUser) {
        // Here you can use 'decryptpass' function to compare passwords securely
        // For now, simply compare the passwords directly for demonstration purposes
        if (checkUser.password === password) {
          // Passwords match, login successful
          res.status(200).json({ message: "Login successful" });
        } else {
          // Passwords don't match, login failed
          res.status(401).json({ message: "Incorrect password" });
        }
      } else {
        // User not found in database
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "Required field missing" });
  }
};

const user = async (req, res) => {
  res.status(200).json({ msg: "i am user." });
};

const allUsers = async (req, res) => {
  try {
    const db = await connect(process.env.MONGO_URL);
    const allUsers = await UserSchema.find();
    res.status(201).json({ users: allUsers });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const userByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const db = await connect(process.env.MONGO_URL);
    const user = await UserSchema.findOne({ email: email });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connect(process.env.MONGO_URL);
    const user = await UserSchema.findOne({ _id: id });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { email, username, profile_pic, gender } = req.body;

  try {
    const filter = { email };
    const update = { username, profile_pic, gender };
    await connect(process.env.MONGO_URL);
    const doc = await UserSchema.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.json({ user: doc, message: "Profile Updated Sucessfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  // res.json({ email: req.body.email })

  try {
    await connect(process.env.MONGO_URL);
    const deleteUser = await UserSchema.findOneAndDelete({
      email: req.body.email,
    });
    const updatedusers = await UserSchema.find();
    res.json({
      message: "Successfully Deleted",
      users: updatedusers,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  user,
  allUsers,
  userByEmail,
  userById,
  deleteUser,
  updateProfile,
  signUp,
  logIn,
};
