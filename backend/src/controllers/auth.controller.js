import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import User from "../models/User.model.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, gender, isAdmin, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json(new ApiError(400, "User already exists"));
  }

  const user = await User.create({
    name,
    gender,
    isAdmin,
    email,
    password,
  });

  if (!user) {
    return res.status(400).json(new ApiError(400, "User creation failed"));
  }

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json(new ApiError(401, "Invalid email or password"));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(401).json(new ApiError(401, "Invalid email or password"));
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  if (!accessToken || !refreshToken) {
    return res.status(401).json(new ApiError(401, "Generate token failed"));
  }
  user.refreshToken = refreshToken;
  await user.save();
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.cookie("accessToken", accessToken, cookieOptions);

  res.status(200).json(
    new ApiResponse(200, "User logged in successfully", {
      id: user._id,
      name: user.name,
      gender: user.gender,
      isAdmin: user.isAdmin,
      email: user.email,
    })
  );
});
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res
      .status(401)
      .json(
        new ApiError(401, "Unauthorized: User information missing in token")
      );
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  user.refreshToken = undefined;
  await user.save();

  res.clearCookie("refreshToken", cookieOptions);
  res.clearCookie("accessToken", cookieOptions);

  res.status(200).json(new ApiResponse(200, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
