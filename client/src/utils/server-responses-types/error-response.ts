export default interface IServerErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}
