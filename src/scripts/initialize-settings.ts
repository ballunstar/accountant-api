import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SettingsService } from '../settings/settings.service';

async function initializeSettings() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const settingsService = app.get(SettingsService);

  try {
    await settingsService.initializeSettings();
    console.log('Settings initialized successfully');
  } catch (error) {
    console.error('Error initializing settings:', error);
  }

  await app.close();
}

initializeSettings();
