const User = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const verifyEmail = await User.findOne({ email: email });
  if (verifyEmail !== null) {
    res.json({ error: "email is already in use" });
  } else {
    try {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
      res.json(newUser);
    } catch (error) {
      const msgs = [];
      function recorrerObjeto(obj) {
        for (let key in obj) {
          if (key === "message") {
            msgs.push(obj[key]);
          }
          if (typeof obj[key] === "object") {
            recorrerObjeto(obj[key]);
          }
        }
      }
      recorrerObjeto(error);
      console.log(msgs);
      res.json(error);
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;
  try {
    const newUser = await User.updateOne(
      { id: id },
      { firstName, lastName, email, password },
      { runValidators: true }
    );
    res.json({
      msg: "user updated sucessfull",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    } else {
      await User.destroy({ id: id });
      res.json({
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
