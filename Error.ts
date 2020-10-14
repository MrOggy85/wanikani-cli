export type ErrorType = {
  UNKNOWN: 'UNKNOWN',
  UNAUTHORIZED: 'UNAUTHORIZED',
}

export interface HandledError extends Error {
  isHandled: boolean;
  code: keyof ErrorType;
}

export function createError(error: Error, code: keyof ErrorType): HandledError {
  return {
    ...error,
    isHandled: true,
    code,
  };
}
