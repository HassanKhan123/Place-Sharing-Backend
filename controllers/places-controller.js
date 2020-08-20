const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Most popular builiding",
    location: {
      lat: 1222,
      long: -02020,
    },
    address: "ABC Address",
    creator: "u1",
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "Most popular builiding",
    location: {
      lat: 1222,
      long: -02020,
    },
    address: "ABC Address",
    creator: "u1",
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "Most popular builiding",
    location: {
      lat: 1222,
      long: -02020,
    },
    address: "ABC Address",
    creator: "u2",
  },
];

const getPlaces = (req, res, next) => {
  res.json({ places: DUMMY_PLACES });
};

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError(
      "Could not find a place with the provided place id",
      404
    );
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id", 404)
    );
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuid.v4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  const { title, description } = req.body;
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ updatedPlace });
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Place deleted successfully" });
};

exports.getPlaces = getPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
