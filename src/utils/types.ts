declare module 'express-session' {
  interface SessionData {
    jwt: string;
  }
}

export interface ErrorException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
