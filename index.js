const express = require("express");
const config = require("dotenv").config();
const connectDB = require("./services/db");
const app = express();
const usersRouting = require("./routes/user.routes");
const morgan = require("morgan");
// db connect
connectDB();

// middlewares
app.use(morgan("tiny"));
app.use(express.json());

// routes
app.use("/users", usersRouting);

app.listen(process.env.SERVER_PORT);
console.log("Server listening on port", process.env.SERVER_PORT);
