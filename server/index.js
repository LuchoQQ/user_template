const express = require("express");
const config = require("dotenv").config();
const connectDB = require("./services/db");
const app = express();
const morgan = require("morgan");
const usersRouting = require("./routes/user.routes");
const authRouting = require("./routes/auth.routes")


// db connect
connectDB();

// middlewares
app.use(morgan("tiny"));
app.use(express.json());

// 

// routes
app.use("/users", usersRouting);
app.use('/auth' , authRouting)
app.listen(process.env.SERVER_PORT);
console.log("Server listening on port", process.env.SERVER_PORT);
