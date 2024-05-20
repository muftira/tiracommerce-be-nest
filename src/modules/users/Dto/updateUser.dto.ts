import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  userName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  password: string;
}
