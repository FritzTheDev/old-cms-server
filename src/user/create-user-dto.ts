import { IsEmail, Length } from 'class-validator';

/** Defines what incoming "Create User" requests should look like */
export class CreateUserDTO {
  @Length(3, 10)
  username: string;

  @Length(8, 255)
  password: string;

  @IsEmail()
  email: string;
}
