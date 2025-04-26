class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors, success) {
    super(message);
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }

  toJSON() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors || null,
    };
  }
}

export default ApiError;
