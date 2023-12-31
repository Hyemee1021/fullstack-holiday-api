import SessionSchema from "./SessionSchema.js";

//Create
export const createSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

//read
export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};

//update

//delete
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
