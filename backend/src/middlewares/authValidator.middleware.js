import { validationResult } from "express-validator";
import ApiError from "../utils/apiError.js";

const authValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => {
    extractedErrors.push({
      [err.path]: err.msg,
    });
  });
  return res
    .status(422)
    .json(new ApiError(422, "Validation Error", extractedErrors));
};

export default authValidator;
