import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

export class AuthRegisterDTO {
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

export class AuthTokenDTO {
  token: string;
}

export interface AuthTokenPayloadDTO {
  id: number;
  tenantId?: number | null;
}
