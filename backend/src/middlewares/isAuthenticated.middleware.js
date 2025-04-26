import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res
      .status(401)
      .json(
        new ApiError(401, "Unauthorized: Please login to access this resource")
      );
  }

  try {
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    if (!user) {
      return next(
        new ApiError(401, "Unauthorized: Invalid token, please login again")
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Unauthorized: Invalid or expired token"));
  }
});

export default isAuthenticated;
