/**
 * Filename: user/user-service.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: A collection of Data Transfer Objects related to users.
 */
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
