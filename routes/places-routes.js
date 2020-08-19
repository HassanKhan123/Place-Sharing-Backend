const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
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
];

router.get("/", (req, res, next) => {
  res.json({ places: DUMMY_PLACES });
});

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    const error = new Error(
      "Could not find a place with the provided place id"
    );
    error.code = 404;
    throw error;
  }
  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);
  if (!place) {
    const error = new Error("Could not find a place with the provided user id");
    error.code = 404;
    return next(error);
  }
  res.json({ place });
});

// router.post('/',(req,res,next) => {
//     console.log('POST request in places')
//     res.json({message:'It works'})
// })

// router.patch('/',(req,res,next) => {
//     console.log('PATCH request in places')
//     res.json({message:'It works'})
// })

// router.delete('/',(req,res,next) => {
//     console.log('DELETE request in places')
//     res.json({message:'It works'})
// })

module.exports = router;
