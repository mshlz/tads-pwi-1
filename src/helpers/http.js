class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.statusCode = code;
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    super(message || "NotFound", 404);
  }
}
exports.NotFoundError = NotFoundError;

class ValidationError extends HttpError {
  constructor(message, errors) {
    super(message || "Validation Error", 422);
    this.errors = errors;
  }
}
exports.ValidationError = ValidationError;
