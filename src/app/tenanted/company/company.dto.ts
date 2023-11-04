import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDTO {
  @IsString()
  @IsOptional()
  public readonly title: string;

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

export class CreateCompanyDTO {
  @IsString()
  @IsOptional()
  public readonly title: string;

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
