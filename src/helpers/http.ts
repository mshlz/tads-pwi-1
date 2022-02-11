class HttpError extends Error {
  public statusCode: number
  
  constructor(message: string, code = 400) {
    super(message);
    this.statusCode = code;
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
