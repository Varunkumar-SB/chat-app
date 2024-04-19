// Importing Dependencies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Custom Imports
const userRouter = require("./routes/users");
const messageRouter = require("./routes/messages");
const { connectDB } = require("./db/connectDB");

// Init APP
const app = express();

// .env Values
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ error: `Can't find ${req.originalUrl} on this server!` });
});

// Starting API
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
