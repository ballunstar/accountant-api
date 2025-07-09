import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigDto } from './config.dto';

@Injectable()
export class AppConfigService {
  private readonly configDto: ConfigDto;

  constructor(private configService: ConfigService) {
    // Get all environment variables
    const envConfig = {
      DB_HOST: this.configService.get<string>('DB_HOST'),
      DB_PORT: this.configService.get<number>('DB_PORT'),
      DB_USERNAME: this.configService.get<string>('DB_USERNAME'),
      DB_PASSWORD: this.configService.get<string>('DB_PASSWORD'),
      DB_DATABASE: this.configService.get<string>('DB_DATABASE'),
      JWT_SECRET: this.configService.get<string>('JWT_SECRET'),
      JWT_EXPIRATION: this.configService.get<string>('JWT_EXPIRATION'),
      PORT: this.configService.get<number>('PORT'),
      NODE_ENV: this.configService.get<string>('NODE_ENV'),
      CORS_ORIGIN: this.configService.get<string>('CORS_ORIGIN'),
    };

    // Transform and validate
    this.configDto = plainToClass(ConfigDto, envConfig, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(this.configDto);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat()
        .join(', ');
      throw new Error(`Configuration validation failed: ${errorMessages}`);
    }
  }

  get dbHost(): string {
    return this.configDto.DB_HOST;
  }

  get dbPort(): number {
    return this.configDto.DB_PORT;
  }

  get dbUsername(): string {
    return this.configDto.DB_USERNAME;
  }

  get dbPassword(): string {
    return this.configDto.DB_PASSWORD;
  }

  get dbDatabase(): string {
    return this.configDto.DB_DATABASE;
  }

  get jwtSecret(): string {
    return this.configDto.JWT_SECRET;
  }

  get jwtExpiration(): string {
    return this.configDto.JWT_EXPIRATION;
  }

  get port(): number {
    return this.configDto.PORT;
  }

  get nodeEnv(): string {
    return this.configDto.NODE_ENV;
  }

  get corsOrigin(): string | undefined {
    return this.configDto.CORS_ORIGIN;
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }
}
