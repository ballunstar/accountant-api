import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';
import { UpdateSettingsDto, SettingsResponseDto } from '../dto/settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async getSettings(): Promise<SettingsResponseDto> {
    // ถ้าไม่มี settings record ให้สร้างขึ้นมาใหม่
    let settings = await this.settingsRepository.findOne({ where: { id: 1 } });
    
    if (!settings) {
      settings = this.settingsRepository.create({
        siteName: 'สำนักงานบัญชี',
        siteDescription: 'บริการทางด้านบัญชี การเงิน และการวางแผนภาษี อย่างครบครัน',
        contactEmail: 'contact@accountant.com',
        contactPhone: '02-123-4567',
        address: '123 ถนนสีลม แขวงสีลม เขตบางรัก กทม. 10500',
        emailNotifications: true,
        reviewApprovalRequired: true,
        allowGuestReviews: true,
      });
      settings = await this.settingsRepository.save(settings);
    }

    return settings;
  }

  async updateSettings(
    updateSettingsDto: UpdateSettingsDto,
  ): Promise<SettingsResponseDto> {
    let settings = await this.settingsRepository.findOne({ where: { id: 1 } });
    
    if (!settings) {
      // ถ้าไม่มี settings record ให้สร้างขึ้นมาใหม่
      settings = this.settingsRepository.create({
        siteName: 'สำนักงานบัญชี',
        siteDescription: 'บริการทางด้านบัญชี การเงิน และการวางแผนภาษี อย่างครบครัน',
        contactEmail: 'contact@accountant.com',
        contactPhone: '02-123-4567',
        address: '123 ถนนสีลม แขวงสีลม เขตบางรัก กทม. 10500',
        emailNotifications: true,
        reviewApprovalRequired: true,
        allowGuestReviews: true,
      });
    }

    // อัพเดตค่าที่ส่งมา
    Object.assign(settings, updateSettingsDto);
    
    return await this.settingsRepository.save(settings);
  }

  async initializeSettings(): Promise<void> {
    const existingSettings = await this.settingsRepository.findOne({
      where: { id: 1 },
    });
    
    if (!existingSettings) {
      const defaultSettings = this.settingsRepository.create({
        siteName: 'สำนักงานบัญชี',
        siteDescription: 'บริการทางด้านบัญชี การเงิน และการวางแผนภาษี อย่างครบครัน',
        contactEmail: 'contact@accountant.com',
        contactPhone: '02-123-4567',
        address: '123 ถนนสีลม แขวงสีลม เขตบางรัก กทม. 10500',
        emailNotifications: true,
        reviewApprovalRequired: true,
        allowGuestReviews: true,
      });
      
      await this.settingsRepository.save(defaultSettings);
    }
  }
}
