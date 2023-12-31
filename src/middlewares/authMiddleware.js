export const userAuth = (req, res, next) => {
  try {
    console.log(req.headers);
  } catch (error) {
    next(error);
  }
};
