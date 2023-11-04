import { IsOptional, IsString } from 'class-validator';

export class CreateTenantDTO {
  @IsString()
  @IsOptional()
  public readonly title: string;
}

export class UpdateTenantDTO {
  @IsString()
  @IsOptional()
  public readonly title: string;
}
