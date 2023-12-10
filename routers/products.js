const express = require("express");
const router = express.Router();

const {
  user,
  allUsers,
  userByEmail,
  userById,
} = require("../controllers/users");

router.get("/", user);
router.get("/all-users", allUsers);
router.get("/user-by-email", userByEmail);
router.get("/user-by-id/:id", userById);

module.exports = router;
