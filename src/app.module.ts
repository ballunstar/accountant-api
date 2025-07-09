import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Config
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { AppConfigService } from './config/app-config.service';

// Entities
import { Contact } from './entities/contact.entity';
import { Review } from './entities/review.entity';
import { Service } from './entities/service.entity';
import { User } from './entities/user.entity';
import { Settings } from './entities/settings.entity';

// Controllers
import { ContactsController } from './contacts/contacts.controller';
import { ReviewsController } from './reviews/reviews.controller';
import { AuthController } from './auth/auth.controller';

// Services
import { ContactsService } from './contacts/contacts.service';
import { ReviewsService } from './reviews/reviews.service';
import { AuthService } from './auth/auth.service';

// Auth
import { JwtStrategy } from './auth/jwt.strategy';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [Contact, Review, Service, User, Settings],
        synchronize: true, // Only for development
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([Contact, Review, Service, User, Settings]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
    }),
    SettingsModule,
  ],
  controllers: [
    AppController,
    ContactsController,
    ReviewsController,
    AuthController,
  ],
  providers: [
    AppService,
    ContactsService,
    ReviewsService,
    AuthService,
    JwtStrategy,
    AppConfigService,
  ],
})
export class AppModule {}
