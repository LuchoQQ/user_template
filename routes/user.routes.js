const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");

router.get("/", getUsers); // get all users

router.get("/:id", getUserById); // get one user by id

router.post("/", createUser); // create a user

router.put("/:id", updateUser); // update a user by id

router.delete("/:id", deleteUser); // delete a user

module.exports = router;
