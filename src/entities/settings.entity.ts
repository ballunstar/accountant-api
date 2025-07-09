import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: 'สำนักงานบัญชี' })
  siteName: string;

  @Column({
    type: 'text',
  })
  siteDescription: string;

  @Column({ type: 'varchar', length: 255, default: 'contact@accountant.com' })
  contactEmail: string;

  @Column({ type: 'varchar', length: 20, default: '02-123-4567' })
  contactPhone: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({ type: 'boolean', default: true })
  emailNotifications: boolean;

  @Column({ type: 'boolean', default: true })
  reviewApprovalRequired: boolean;

  @Column({ type: 'boolean', default: true })
  allowGuestReviews: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
