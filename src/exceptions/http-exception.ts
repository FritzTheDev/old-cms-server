export class HttpException extends Error {
  public status: number;

  public message: string;

  constructor(status = 500, message = 'An unknown error occured. Contact Support') {
    super(message);
    this.status = status;
    this.message = message;
  }
}
