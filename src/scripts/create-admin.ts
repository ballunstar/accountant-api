import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../entities/user.entity';

async function createAdminUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);

  try {
    const adminUser = await authService.register({
      email: 'admin@accountant-abc.com',
      password: 'admin123456',
      name: 'Admin User',
    });

    // Update role to admin
    adminUser.role = UserRole.ADMIN;
    await authService['userRepository'].save(adminUser);

    console.log('Admin user created successfully!');
    console.log('Email: admin@accountant-abc.com');
    console.log('Password: admin123456');
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }

  await app.close();
}

createAdminUser();
