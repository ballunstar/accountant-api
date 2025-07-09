import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class ConfigDto {
  // Database Configuration
  @IsString()
  DB_HOST: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  // JWT Configuration
  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION: string;

  // Application Configuration
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  PORT: number;

  @IsString()
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: string;

  // CORS Configuration
  @IsString()
  @IsOptional()
  CORS_ORIGIN?: string;
}
