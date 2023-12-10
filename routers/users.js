const express = require("express");
const router = express.Router();

const {
  user,
  allUsers,
  userByEmail,
  userById,
  signUp,
  logIn,
  updateProfile,
  deleteUser,
} = require("../controllers/users");

router.get("/", user);
router.get("/all-users", allUsers);
router.get("/user-by-email", userByEmail);
router.get("/user-by-id/:id", userById);

router.post("/login", logIn);
router.post("/signup", signUp);

router.put("/update-profile", updateProfile);

router.delete("/delete-user", deleteUser);

module.exports = router;
