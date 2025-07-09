import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto, SettingsResponseDto } from '../dto/settings.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/api/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // API สำหรับ website เรียกใช้ค่า Settings (public)
  @Get()
  async getSettings(): Promise<SettingsResponseDto> {
    return this.settingsService.getSettings();
  }

  // API สำหรับ admin update ค่า Settings (protected)
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateSettings(
    @Body() updateSettingsDto: UpdateSettingsDto,
  ): Promise<SettingsResponseDto> {
    return this.settingsService.updateSettings(updateSettingsDto);
  }
}
