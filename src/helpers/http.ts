class HttpError extends Error {
  public statusCode: number
  
  constructor(message: string, code = 400) {
    super(message);
    this.statusCode = code;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message || "BadRequest", 400);
  }
}

export class UnauthenticatedError extends HttpError {
  constructor(message: string) {
    super(message || "Unauthenticated", 401);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message || "NotFound", 404);
  }
}

export class ValidationError extends HttpError {
  constructor(message: string, public errors: any) {
    super(message || "Validation Error", 422);
  }
}
