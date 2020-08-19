const uuid = require("uuid");

const HttpError = require("../models/http-error");

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

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(user => user.email === email)
  if(hasUser){
    throw new HttpError(
        "Email already registered",
        422
      );
  }
  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find(
    (user) => user.email === email
  );

  if(!identifiedUser || identifiedUser.password !== password){
    throw new HttpError(
        "Could not find a user with the provided credentials",
        401
      );
  }

  res.json({message:'Logged in!'})


};

module.exports = {
  getUsers,
  signup,
  login,
};
