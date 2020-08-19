const express = require("express");

const {
  getPlaceById,
  getPlaces,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById
} = require("../controllers/places-controller");

const router = express.Router();

router.get("/", getPlaces);

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", createPlace);

router.patch('/:pid',updatePlaceById)

router.delete('/:pid',deletePlaceById)


module.exports = router;
