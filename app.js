const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use("/api/places/", placesRoutes);
app.use("/api/users/", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (req.headerSent) {
    return next(err);
  }

  res
    .status(err.code || 500)
    .json({ message: err.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://Hassan123:Hassan123@cluster0.qigep.mongodb.net/mern?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
