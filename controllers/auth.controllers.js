const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const verifyEmail = await User.findOne({ email: email });

  if (verifyEmail !== null) {
    res.json({ error: "email is already in use" });
  } else {
    try {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });
      newUser.password = await newUser.encryptPassword(newUser.password);
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, config.secret, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({
        auth: true,
        message: "User created sucessfull!.",
        token: token,
      });
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
      res.json(msgs);
    }
  }
};


module.exports = { createUser }