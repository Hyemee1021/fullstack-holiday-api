import jwt from "jsonwebtoken";
import { createSession } from "../models/session/SessionModel.js";
import { updateRefreshJWT } from "../models/user/UserModel.js";

//access jwt
export const signAccessJWT = (obj) => {
  const token = jwt.sign(obj, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  createSession({ token });
  return token;
};

//only to create accessJWT
export const signRefreshJWT = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    //I need to save refreshJWT in user data
    updateRefreshJWT(email, token);
    return token;
  } catch (error) {}
};

export const signJWTs = (email) => {
  return {
    accessJWT: signAccessJWT({ email }),
    refreshJWT: signRefreshJWT(email),
  };
};
