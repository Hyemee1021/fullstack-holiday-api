import UserSchema from "./UserSchema.js";

//Create
export const createUser = (userObj) => {
  return UserSchema(userObj).save();
};

//read
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

//update

//delete

//add refreshJWT
export const updateRefreshJWT = async (email, refreshJWT) => {
  return await UserSchema.findOneAndUpdate({ email }, { refreshJWT });
};
