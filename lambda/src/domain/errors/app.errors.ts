export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = 'Unauthorized: Invalid or missing token') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConfigurationError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}
