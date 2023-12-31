import express from "express";
import { createUser, getUserByEmail } from "../models/user/UserModel.js";
import { compairPassword, hashPassword } from "../utils/bcrypt.js";
import {
  loginValidation,
  newUserValidation,
} from "../middlewares/joiValidation.js";
import { signAccessJWT, signJWTs } from "../utils/jwtHelper.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to do create new user user",
    });
  } catch (error) {
    next(error);
  }
});
router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // get user by email
    const user = await getUserByEmail(email);
    console.log(user);

    if (user?._id) {
      //check if passsword from db and plaintext matches

      const isMatched = compairPassword(password, user.password);

      if (isMatched) {
        //jwts
        const jwts = signJWTs(user.email);

        return res.json({
          status: "success",
          message: "Logined in successfully",
          jwts,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login details",
    });
  } catch (error) {
    next(error);
  }
});

//this router should be private
router.post("/admin-user", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);

    req.body.role = "admin";
    const user = await createUser(req.body);

    if (user?._id) {
      return res.json({
        status: "success",
        message: "The admin  user has been created successfully",
      });
    }

    res.json({
      status: "error",
      message: "Unable to create the user, try again later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "There is already an user used this meail in our system";
      error.errorCode = 200;
    }
    next(error);
  }
});

router.get("/", userAuth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to do get user",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
