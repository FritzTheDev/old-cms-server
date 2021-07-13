import { IsEmail, Length } from 'class-validator';
import { DTO } from '../interfaces/dto-interface';

/** Defines what incoming "Create User" requests should look like */
export class LoginDTO extends DTO {
  @Length(8, 255)
  password: string;

  @IsEmail()
  email: string;
}
