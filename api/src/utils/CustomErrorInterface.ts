// Custom Error
export default interface CustomError extends Error {
  statusCode?: number;
}
