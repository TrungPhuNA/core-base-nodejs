# Backend API Structure - Node.js + Express + MySQL

## 📋 Tech Stack

- **Node.js** v18+ - Runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Sequelize** - ORM (Object-Relational Mapping)
- **JWT** - Authentication
- **Joi** - Validation
- **Swagger** - API Documentation
- **bcrypt** - Password hashing
- **dotenv** - Environment variables
- **morgan** - HTTP request logger

## 📁 Cấu trúc Project

```
be-api/
├── src/
│   ├── config/
│   │   ├── database.js          # Sequelize config
│   │   ├── swagger.js           # Swagger config
│   │   └── constants.js         # App constants
│   │
│   ├── database/
│   │   ├── migrations/          # Database migrations
│   │   ├── seeders/             # Database seeders
│   │   └── models/              # Sequelize models
│   │       ├── index.js         # Models index
│   │       ├── User.js          # User model
│   │       └── ...
│   │
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   ├── validate.js          # Request validation
│   │   ├── errorHandler.js     # Error handling
│   │   ├── roleCheck.js         # Role-based access
│   │   └── logger.js            # Request logger
│   │
│   ├── routes/
│   │   ├── index.js             # Main router
│   │   ├── web/                 # Web API routes
│   │   │   ├── index.js
│   │   │   ├── auth.js
│   │   │   └── public.js
│   │   ├── user/                # User API routes
│   │   │   ├── index.js
│   │   │   ├── profile.js
│   │   │   └── dashboard.js
│   │   └── admin/               # Admin API routes
│   │       ├── index.js
│   │       ├── users.js
│   │       ├── dashboard.js
│   │       └── reports.js
│   │
│   ├── controllers/
│   │   ├── web/                 # Web controllers
│   │   │   ├── authController.js
│   │   │   └── publicController.js
│   │   ├── user/                # User controllers
│   │   │   ├── profileController.js
│   │   │   └── dashboardController.js
│   │   └── admin/               # Admin controllers
│   │       ├── userController.js
│   │       ├── dashboardController.js
│   │       └── reportController.js
│   │
│   ├── services/
│   │   ├── authService.js       # Authentication logic
│   │   ├── userService.js       # User business logic
│   │   ├── emailService.js      # Email sending
│   │   └── tokenService.js      # JWT token handling
│   │
│   ├── validators/
│   │   ├── authValidator.js     # Auth validation schemas
│   │   ├── userValidator.js     # User validation schemas
│   │   └── commonValidator.js   # Common validation rules
│   │
│   ├── utils/
│   │   ├── response.js          # Response formatter
│   │   ├── errors.js            # Custom error classes
│   │   └── helpers.js           # Helper functions
│   │
│   ├── app.js                   # Express app setup
│   └── server.js                # Server entry point
│
├── .env.example                 # Environment variables template
├── .gitignore
├── .sequelizerc                 # Sequelize CLI config
├── package.json
└── README.md
```

## 🔌 API Structure

### 1. Web API (`/api/web`)
**Public routes - không cần authentication**
- `POST /api/web/auth/register` - Đăng ký
- `POST /api/web/auth/login` - Đăng nhập
- `GET /api/web/public/info` - Thông tin công khai
- `GET /api/web/public/contact` - Liên hệ

### 2. User API (`/api/user`)
**Protected routes - cần JWT token với role USER**
- `GET /api/user/profile` - Xem profile
- `PUT /api/user/profile` - Cập nhật profile
- `PUT /api/user/profile/password` - Đổi mật khẩu
- `GET /api/user/dashboard` - Dashboard data
- `GET /api/user/dashboard/stats` - Thống kê

### 3. Admin API (`/api/admin`)
**Protected routes - cần JWT token với role ADMIN**
- `GET /api/admin/users` - Danh sách users
- `POST /api/admin/users` - Tạo user
- `PUT /api/admin/users/:id` - Cập nhật user
- `DELETE /api/admin/users/:id` - Xóa user
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/reports` - Báo cáo

## 🗄️ Database Schema

### Users Table
```sql
- id (PK, AUTO_INCREMENT)
- email (UNIQUE, NOT NULL)
- password (HASHED, NOT NULL)
- name (NOT NULL)
- role (ENUM: 'user', 'admin', DEFAULT: 'user')
- status (ENUM: 'active', 'inactive', DEFAULT: 'active')
- avatar (TEXT, NULLABLE)
- phone (VARCHAR, NULLABLE)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

## 🔐 Authentication Flow

1. User đăng ký/đăng nhập → Nhận JWT token
2. Client lưu token vào localStorage/cookie
3. Mỗi request gửi token trong header: `Authorization: Bearer <token>`
4. Server verify token → Cho phép/từ chối request

## 📝 Response Format

### Success Response
```json
{
    "success": true,
    "message": "Success message",
    "data": { ... }
}
```

### Error Response
```json
{
    "success": false,
    "message": "Error message",
    "errors": [ ... ]
}
```

## 🚀 Commands

```bash
# Install dependencies
npm install

# Run migrations
npm run migrate

# Run seeders
npm run seed

# Development mode
npm run dev

# Production mode
npm start

# Create migration
npm run migration:create -- --name create-users-table

# Rollback migration
npm run migrate:undo
```

