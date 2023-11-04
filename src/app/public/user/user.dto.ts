import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly username: string;

  @MinLength(8)
  @IsString()
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly phone: string;

  @IsString()
  @IsOptional()
  public readonly country: string;

  @IsString()
  @IsOptional()
  public readonly city: string;

  @IsString()
  @IsOptional()
  public readonly address: string;
}

export class UpdateProfileDTO {
  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly username: string;

  @MinLength(8)
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly phone: string;

  @IsString()
  @IsOptional()
  public readonly country: string;

  @IsString()
  @IsOptional()
  public readonly city: string;

  @IsString()
  @IsOptional()
  public readonly address: string;
}

export class UpdatePasswordDTO {
  @IsString()
  @IsOptional()
  public readonly password?: string;
}
