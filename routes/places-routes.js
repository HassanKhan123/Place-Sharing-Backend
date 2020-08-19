const express = require("express");

const {
  getPlaceById,
  getPlaces,
  getPlaceByUserId,
  createPlace,
} = require("../controllers/places-controller");

const router = express.Router();

router.get("/", getPlaces);

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlaceByUserId);

router.post("/", createPlace);

module.exports = router;
