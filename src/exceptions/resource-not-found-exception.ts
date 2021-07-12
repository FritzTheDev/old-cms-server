import { HttpException } from './http-exception';

export class ResourceNotFoundException extends HttpException {
  public status: number;

  public message: string;

  constructor(resourceName: string, id: string) {
    super(404, `${resourceName} with id ${id} does not exist. They may have been deleted`);
  }
}
