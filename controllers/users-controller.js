const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Hassan Khan",
    email: "hassan@gmail.com",
    password: "Hassan",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }
  const { name, email, password,places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError("Signup failed, please try again", 500));
  }

  if (existingUser) {
    return next(
      new HttpError("User already exists, Please login instead", 422)
    );
  }

  const createdUser = new User({
    name,
    email,
    password,
    image:
      "https://images.pexels.com/photos/4473796/pexels-photo-4473796.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    places,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError("Signup failed, please try again", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not find a user with the provided credentials",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

module.exports = {
  getUsers,
  signup,
  login,
};
