const express = require("express");
const {check} = require('express-validator')

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

router.post("/",[
  check('title').not().isEmpty(),
  check('description').isLength({min:5}),
  check('address').not().isEmpty(),
], createPlace);

router.patch('/:pid',updatePlaceById)

router.delete('/:pid',deletePlaceById)


module.exports = router;
