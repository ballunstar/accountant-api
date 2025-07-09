import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigDto } from './config.dto';

export function validateEnvironment() {
  const envConfig = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
  };

  // Transform and validate
  const configDto = plainToClass(ConfigDto, envConfig, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(configDto);
  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat()
      .join(', ');
    throw new Error(`❌ Environment validation failed: ${errorMessages}`);
  }

  console.log('✅ Environment validation passed!');
  return configDto;
}
