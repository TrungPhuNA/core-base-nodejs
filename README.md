# Backend API - Node.js + Express + MySQL

Backend API với Node.js, Express, MySQL và Sequelize ORM. Hỗ trợ 3 nhóm API: Web (Public), User, và Admin.

## 🚀 Tech Stack

- **Node.js** v18+ - Runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Joi** - Validation
- **Swagger** - API Documentation
- **bcrypt** - Password hashing

## 📁 Cấu trúc API

### 1. Web API (`/api/web`)
Public routes - không cần authentication
- `POST /api/web/auth/register` - Đăng ký
- `POST /api/web/auth/login` - Đăng nhập
- `GET /api/web/public/info` - Thông tin app
- `GET /api/web/public/contact` - Thông tin liên hệ

### 2. User API (`/api/user`)
Protected routes - cần JWT token với role USER
- `GET /api/user/profile` - Xem profile
- `PUT /api/user/profile` - Cập nhật profile
- `PUT /api/user/profile/password` - Đổi mật khẩu
- `GET /api/user/dashboard` - Dashboard data

### 3. Admin API (`/api/admin`)
Protected routes - cần JWT token với role ADMIN
- `GET /api/admin/users` - Danh sách users (có pagination, filter, search)
- `POST /api/admin/users` - Tạo user mới
- `PUT /api/admin/users/:id` - Cập nhật user
- `DELETE /api/admin/users/:id` - Xóa user
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/reports/users` - Báo cáo users

## 🛠️ Installation

### 1. Clone project

```bash
cd be-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Tạo file .env

```bash
cp .env.example .env
```

Chỉnh sửa file `.env`:
```env
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=be_api_db
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Tạo database

```bash
# Tạo database trong MySQL
mysql -u root -p
CREATE DATABASE be_api_db;
exit;
```

### 5. Chạy migrations

```bash
npm run migrate
```

### 6. Chạy seeders (tạo data mẫu)

```bash
npm run seed
```

**Demo accounts sau khi seed:**
- Admin: `admin@example.com` / `123456`
- User: `user@example.com` / `123456`

### 7. Start server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

## 📝 Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
npm run migrate        # Run all migrations
npm run migrate:undo   # Rollback last migration
npm run seed           # Run all seeders
npm run seed:undo      # Rollback all seeders
```

## 📚 API Documentation

Sau khi start server, truy cập Swagger UI tại:
```
http://localhost:5000/api-docs
```

## 🔐 Authentication

### 1. Đăng ký/Đăng nhập

```bash
# Register
POST /api/web/auth/register
{
    "email": "user@example.com",
    "password": "123456",
    "name": "John Doe"
}

# Login
POST /api/web/auth/login
{
    "email": "user@example.com",
    "password": "123456"
}

# Response
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": { ... },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "..."
    }
}
```

### 2. Sử dụng Token

Thêm token vào header của mỗi request:
```
Authorization: Bearer <your_access_token>
```

## 🗄️ Database

### Users Table Schema

```sql
- id (PK, AUTO_INCREMENT)
- email (UNIQUE, NOT NULL)
- password (HASHED, NOT NULL)
- name (NOT NULL)
- role (ENUM: 'user', 'admin')
- status (ENUM: 'active', 'inactive')
- avatar (TEXT)
- phone (VARCHAR)
- dateOfBirth (DATE)
- gender (ENUM: 'male', 'female', 'other')
- address (TEXT)
- bio (TEXT)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

## 🧪 Testing API

### Sử dụng cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/web/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"123456"}'

# Get profile (cần token)
curl http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Sử dụng Postman/Insomnia

Import Swagger JSON từ: `http://localhost:5000/api-docs/swagger.json`

## 📦 Project Structure

Xem chi tiết trong file [STRUCTURE.md](./STRUCTURE.md)

## 🔧 Migrations

### Tạo migration mới

```bash
npm run migration:create -- --name create-posts-table
```

### Chạy migrations

```bash
npm run migrate
```

### Rollback migration

```bash
npm run migrate:undo
```

## 🌱 Seeders

### Tạo seeder mới

```bash
npm run seeder:create -- --name demo-posts
```

### Chạy seeders

```bash
npm run seed
```

## 🚨 Error Handling

API sử dụng format response thống nhất:

**Success:**
```json
{
    "success": true,
    "message": "Success message",
    "data": { ... }
}
```

**Error:**
```json
{
    "success": false,
    "message": "Error message",
    "errors": [
        {
            "field": "email",
            "message": "Email is required"
        }
    ]
}
```

## 📄 License

MIT

