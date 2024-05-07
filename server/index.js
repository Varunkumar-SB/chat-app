// Importing Dependencies
require("dotenv").config();
import path from "path";
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Custom Imports
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/message");
const userRouter = require("./routes/user");
const { connectDB } = require("./db/connectDB");

// Init APP
const { app, server } = require("./socket/socket");

const __dirname = path.resolve();

// .env Values
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ error: `Can't find ${req.originalUrl} on this server!` });
});

// Starting API
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
