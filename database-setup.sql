-- สร้าง database สำหรับ Accountant Office API
CREATE DATABASE IF NOT EXISTS accountant_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ใช้ database
USE accountant_db;

-- สร้างตาราง settings
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    siteName VARCHAR(255) NOT NULL DEFAULT 'สำนักงานบัญชี',
    siteDescription TEXT NOT NULL DEFAULT 'บริการทางด้านบัญชี การเงิน และการวางแผนภาษี อย่างครบครัน',
    contactEmail VARCHAR(255) NOT NULL DEFAULT 'contact@accountant.com',
    contactPhone VARCHAR(20) NOT NULL DEFAULT '02-123-4567',
    address TEXT NOT NULL DEFAULT '123 ถนนสีลม แขวงสีลม เขตบางรัก กทม. 10500',
    emailNotifications BOOLEAN NOT NULL DEFAULT TRUE,
    reviewApprovalRequired BOOLEAN NOT NULL DEFAULT TRUE,
    allowGuestReviews BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- เพิ่มข้อมูล default settings
INSERT INTO settings (id, siteName, siteDescription, contactEmail, contactPhone, address, emailNotifications, reviewApprovalRequired, allowGuestReviews) 
VALUES (1, 'สำนักงานบัญชี', 'บริการทางด้านบัญชี การเงิน และการวางแผนภาษี อย่างครบครัน', 'contact@accountant.com', '02-123-4567', '123 ถนนสีลม แขวงสีลม เขตบางรัก กทม. 10500', TRUE, TRUE, TRUE)
ON DUPLICATE KEY UPDATE id = id;

-- แสดงข้อมูล database ที่สร้าง
SHOW DATABASES;
