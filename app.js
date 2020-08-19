const express = require("express");

const placesRoutes = require("./routes/places-routes");

const app = express();

app.use(express.json())

app.use("/api/places/", placesRoutes);

app.use((err, req, res, next) => {
  if (req.headerSent) {
    return next(err);
  }

  res
    .status(err.code || 500)
    .json({ message: err.message || "An unknown error occurred!" });
});

app.listen(5000);
