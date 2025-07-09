import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { validateEnvironment } from './config/validate-env';

async function bootstrap() {
  // Validate environment variables before starting the application
  const config = validateEnvironment();

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: config.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(config.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
