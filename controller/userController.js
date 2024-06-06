//importing libraries
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
import dotenv from "dotenv";
dotenv.config();

const ga4 = process.env.GA4_MEASUREMENT_ID;

const handleError = (err) => {
  // console.log(err.message,err.code);
  let errors = { username: "", email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "This email already exist. Please login to continue.";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const SecretKey = process.env.SECRET_KEY;
const maxAge = process.env.MAX_AGE;

const createToken = (id) => {
  // console.log("maxAge is ",maxAge);
  // console.log("secreteKey ",SecretKey);
  return jwt.sign({ id }, SecretKey, {
    expiresIn: maxAge * 1000,
  });
};

export const signUp = async (req, res) => {
  // console.log(req.body);
  try {
    const userData = req.body;
    const newUser = new User(userData);
    await newUser.save();
    const token = createToken(newUser._id);
    // console.log("token generated is ",token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: newUser._id, ga4: ga4 });
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  // console.log("in signIn page",ga4);
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: maxAge * 1000,
    });
    // setCookie(token,res);
    // console.log(user,'userController.js',58);
    res
      .status(200)
      .json({
        user: user._id,
        name: user.username,
        email: user.email,
        ga4: ga4,
      });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ error: err });
  }
};

export const logoutUser = (req, res) => {
  // console.log(req.body);
  // const token = req.cookies.jwt;
  // console.log(token);
  res.cookie("jwt", "", { httpOnly: true, secure: false, maxAge: 1 });
  res.status(200).json({ message: "user signout successfully" });
};

export const getuser = (req, res) => {
  try {
    const token = req.cookies.jwt;
    const secreteKey = process.env.SECRET_KEY;
    // console.log(token,secreteKey,"userController.js",79);
    if (token) {
      jwt.verify(token, secreteKey, async (err, decodedToken) => {
        if (err) {
          // console.log("Error in getting user details",err);
          res.status(401).json({ message: "not authenicated" });
          // res.redirect("/");
        } else {
          // console.log(decodedToken,"userController.js",88);
          const user = await User.findById(decodedToken.id);
          if (user) {
            res
              .status(200)
              .json({ username: user.username, email: user.email, ga4: ga4 });
          } else {
            res.status(401).json({ message: "not authenticated" });
          }
          // console.log(user,'userController',88);
        }
      });
    } else {
      res.status(401).json({ message: "not authenticated" });
      // res.redirect("/");
    }
  } catch (err) {
    console.log(err, "userController", 99);
  }
};
