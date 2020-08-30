const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = process.env.GOOGLE_API_KEY;

const getCoordsForAddress = async (address) => {
  // const response = await axios.get(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //     address
  //   )}&key=${API_KEY}`
  // );
  // const data = response.data;

  // if (!data || data.status === "ZERO_RESULTS") {
  //   const error = new HttpError(
  //     "Could not find a location for specified address.",
  //     422
  //   );
  //   throw error;
  // }
  // console.log(data);
  // const coordinates = data.results[0].geometry.location;
  // return coordinates;

  return {
    lat:24.8535222,
    lng:67.0122823
  }
};

module.exports = getCoordsForAddress;
