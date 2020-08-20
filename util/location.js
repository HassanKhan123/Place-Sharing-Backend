const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyBjKXSbZTIPppCJXy5HHBn_a1k3J0mDwIU";

const getCoordsForAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find a location for specified address.",
      422
    );
    throw error;
  }
console.log(data)
  const coordinates = data.results[0].geometry.location;
  return coordinates;
};

module.exports = getCoordsForAddress;
