// src/middleware/errorHandler.js
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      errors: err.errors || [],
      data: null,
    });
  }

  // fallback for other unexpected errors
  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
    data: null,
  });
};
