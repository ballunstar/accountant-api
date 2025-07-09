import { IsString, IsEmail, IsBoolean, IsOptional, MaxLength } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  siteName?: string;

  @IsOptional()
  @IsString()
  siteDescription?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  contactEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  contactPhone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  reviewApprovalRequired?: boolean;

  @IsOptional()
  @IsBoolean()
  allowGuestReviews?: boolean;
}

export class SettingsResponseDto {
  id: number;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  emailNotifications: boolean;
  reviewApprovalRequired: boolean;
  allowGuestReviews: boolean;
  createdAt: Date;
  updatedAt: Date;
}
