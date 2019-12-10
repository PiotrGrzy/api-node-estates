const { promisify } = require("util");
const User = require("../models/userMOdel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = id =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // check if user exists && password is correct
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // if everything is ok send token
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token
  });
};

let token;

exports.protect = async (req, res, next) => {
  // checking for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access")
    );
  }
  // Verify the token
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch (err) {
    return next(new AppError("Invalid token!"));
  }

  // Check if user still exists
  // const freshUser = await User.findById(decoded.id);
  // if (!freshUser) next(new AppError("The user no longer exists"));
  // Check if user changed password after JWT was created

  next();
};
