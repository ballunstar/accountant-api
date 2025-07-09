# Settings API Documentation

## Overview
API สำหรับจัดการ Settings ของเว็บไซต์สำนักงานบัญชี

## Endpoints

### 1. Get Settings (Public)
**GET** `/settings`

ใช้สำหรับเว็บไซต์เรียกข้อมูล settings

**Response:**
```json
{
  "id": 1,
  "siteName": "สำนักงานบัญชี",
  "siteDescription": "บริการทางด้านบัญชี การเงิน และการวางแผนภาษี อย่างครบครัน",
  "contactEmail": "contact@accountant.com",
  "contactPhone": "02-123-4567",
  "address": "123 ถนนสีลม แขวงสีลม เขตบางรัก กทม. 10500",
  "emailNotifications": true,
  "reviewApprovalRequired": true,
  "allowGuestReviews": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 2. Update Settings (Admin Only)
**PUT** `/settings`

ใช้สำหรับ admin อัพเดต settings (ต้องมี JWT token)

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "siteName": "ชื่อสำนักงานใหม่",
  "siteDescription": "คำอธิบายใหม่",
  "contactEmail": "new@email.com",
  "contactPhone": "02-999-9999",
  "address": "ที่อยู่ใหม่",
  "emailNotifications": false,
  "reviewApprovalRequired": false,
  "allowGuestReviews": false
}
```

**Response:**
```json
{
  "id": 1,
  "siteName": "ชื่อสำนักงานใหม่",
  "siteDescription": "คำอธิบายใหม่",
  "contactEmail": "new@email.com",
  "contactPhone": "02-999-9999",
  "address": "ที่อยู่ใหม่",
  "emailNotifications": false,
  "reviewApprovalRequired": false,
  "allowGuestReviews": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

## Usage Examples

### Frontend (Website) - Get Settings
```javascript
// ใช้ในเว็บไซต์เพื่อแสดงข้อมูลติดต่อ
const response = await fetch('/api/settings');
const settings = await response.json();

// แสดงข้อมูลในเว็บไซต์
document.getElementById('site-name').textContent = settings.siteName;
document.getElementById('contact-email').textContent = settings.contactEmail;
document.getElementById('contact-phone').textContent = settings.contactPhone;
```

### Admin Panel - Update Settings
```javascript
// ใช้ในหน้า admin เพื่ออัพเดต settings
const token = localStorage.getItem('jwt_token');

const response = await fetch('/api/settings', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    siteName: 'ชื่อใหม่',
    contactEmail: 'new@email.com',
    emailNotifications: false
  })
});

const updatedSettings = await response.json();
```

## Database Schema

```sql
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    siteName VARCHAR(255) NOT NULL DEFAULT 'สำนักงานบัญชี',
    siteDescription TEXT NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    contactPhone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    emailNotifications BOOLEAN NOT NULL DEFAULT TRUE,
    reviewApprovalRequired BOOLEAN NOT NULL DEFAULT TRUE,
    allowGuestReviews BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Setup Instructions

1. รัน database setup: `mysql -u root -p < database-setup.sql`
2. Initialize settings: `npm run initialize-settings`
3. Start server: `npm run start:dev`

## Notes

- Settings จะมีแค่ 1 record (id = 1) เท่านั้น
- GET `/settings` เป็น public API ไม่ต้องมี authentication
- PUT `/settings` ต้องมี JWT token ของ admin
- ถ้าไม่มี settings record ระบบจะสร้างให้อัตโนมัติ
