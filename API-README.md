# Accountant Office API

API สำหรับเว็บไซต์สำนักงานบัญชี โดยใช้ NestJS + TypeORM + MySQL

## 🚀 การติดตั้งและรัน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Database
สร้าง MySQL database ชื่อ `accountant_db`

### 3. ตั้งค่า Environment Variables
คัดลอก `.env.example` เป็น `.env` และแก้ไขค่าต่างๆ

### 4. รัน Application
```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

### 5. สร้าง Admin User
```bash
npm run create-admin
```

## 📚 API Endpoints

### 🔐 Authentication
- `POST /api/auth/login` - เข้าสู่ระบบ
- `POST /api/auth/register` - สมัครสมาชิก

### 📞 Contacts
- `POST /api/contacts` - สร้างการติดต่อใหม่
- `GET /api/contacts` - ดูรายการติดต่อ (Admin เท่านั้น)
- `GET /api/contacts/:id` - ดูรายละเอียดการติดต่อ (Admin เท่านั้น)
- `PUT /api/contacts/:id/status` - อัพเดทสถานะ (Admin เท่านั้น)

### ⭐ Reviews
- `POST /api/reviews` - เพิ่มรีวิวใหม่
- `GET /api/reviews` - ดูรีวิวทั้งหมด
- `GET /api/reviews/stats` - ดูสถิติรีวิว
- `GET /api/reviews/:id` - ดูรายละเอียดรีวิว (Admin เท่านั้น)
- `PUT /api/reviews/:id/approve` - อนุมัติรีวิว (Admin เท่านั้น)
- `DELETE /api/reviews/:id` - ลบรีวิว (Admin เท่านั้น)

### 🛠 Services
- `GET /api/services` - ดูบริการทั้งหมด
- `POST /api/services` - เพิ่มบริการใหม่ (Admin เท่านั้น)
- `PUT /api/services/:id` - แก้ไขบริการ (Admin เท่านั้น)
- `DELETE /api/services/:id` - ลบบริการ (Admin เท่านั้น)

## 🗄️ Database Schema

### Users
- id, email, password, name, role, isActive, createdAt, updatedAt

### Contacts
- id, name, email, phone, company, service, message, status, adminNotes, createdAt, updatedAt

### Reviews
- id, name, company, rating, comment, isApproved, isActive, createdAt, updatedAt

### Services
- id, title, description, features, icon, isActive, sortOrder, createdAt, updatedAt

## 🔑 Authentication

ใช้ JWT token สำหรับการ authentication

Headers:
```
Authorization: Bearer <jwt_token>
```

## 🌍 CORS

API รองรับ CORS สำหรับ frontend ที่ `http://localhost:3001`

## 📝 Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=accountant_db

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h

# App
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

## 🚀 Default Admin User

- **Email**: admin@accountant-abc.com
- **Password**: admin123456

## 🛡️ Security Features

- Password hashing ด้วย bcrypt
- JWT token authentication
- Input validation ด้วย class-validator
- CORS protection
- TypeORM query builder ป้องกัน SQL injection

## 📊 API Response Format

### Success Response
```json
{
  "data": {...},
  "message": "Success"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

### Pagination Response
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "totalPages": 10
}
```
