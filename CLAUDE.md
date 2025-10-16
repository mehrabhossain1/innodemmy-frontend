# CLAUDE.md - Innodemy Frontend Project Guide

## 📋 Project Overview

**Project**: Innodemy - Learning Management System (LMS)
**Framework**: Next.js 15.4.4 (App Router)
**Language**: TypeScript
**Architecture**: Clean Architecture (Domain-Driven Design)
**Database**: MongoDB Atlas
**Styling**: Tailwind CSS

---

## 🏗️ Project Structure

```
innodemmy-frontend/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── signin/           # POST: Login (identifier + password)
│   │   │   └── signup/           # POST: Register (name + email/phone + password)
│   │   ├── admin/                # Admin-only endpoints
│   │   ├── courses/              # Course management
│   │   └── enrollments/          # Enrollment management
│   ├── admin/                    # Admin dashboard pages
│   │   ├── layout.tsx            # Admin layout with auth check
│   │   └── dashboard/page.tsx   # Admin dashboard page
│   ├── dashboard/                # Student dashboard pages
│   ├── (public pages)/           # Homepage, courses, blogs, etc.
│   └── layout.tsx                # Root layout with ThemeProvider
│
├── components/                   # Reusable React components
│   ├── AuthSidebar.tsx          # Login/Register sidebar (email OR phone)
│   ├── Navbar.tsx               # Main navigation with auth state
│   ├── Footer.tsx               # Site footer
│   ├── CourseCard.tsx           # Course display card
│   └── ui/                      # Shadcn UI components
│
├── lib/                         # Utilities and hooks
│   └── hooks/
│       └── useAuth.ts           # Authentication hook (login, logout, user state)
│
├── src/core/                    # Clean Architecture layers
│   ├── domain/                  # Business entities and logic
│   │   ├── entities/
│   │   │   └── User.ts          # User entity (email OR phone)
│   │   └── repositories/        # Repository interfaces
│   ├── application/             # Use cases and DTOs
│   │   ├── use-cases/
│   │   │   ├── auth/            # Login, Register use cases
│   │   │   ├── user/            # User CRUD use cases
│   │   │   ├── course/          # Course management
│   │   │   └── enrollment/      # Enrollment logic
│   │   ├── dtos/                # Data Transfer Objects
│   │   └── factories/
│   │       └── UseCaseFactory.ts # Dependency injection
│   └── infrastructure/          # External implementations
│       ├── database/
│       │   └── MongoDBConnection.ts
│       ├── repositories/        # MongoDB implementations
│       │   └── MongoUserRepository.ts
│       ├── security/            # Hashing, JWT
│       └── adapters/            # Data adapters
│
└── public/                      # Static assets
```

---

## 🔐 Authentication System

### **User Model**
```typescript
{
  _id: ObjectId,
  email: string | null,        // Optional, but unique (sparse index)
  phone: string | null,        // Optional, but unique (sparse index)
  name: string,                // Required
  password: string,            // Hashed with bcrypt
  role: "student" | "admin",   // User role
  createdAt: Date,
  updatedAt: Date
}
```

**Key Rule**: User MUST have either `email` OR `phone` (at least one is required)

### **MongoDB Indexes**
```javascript
// Sparse indexes allow null values but enforce uniqueness when present
db.users.createIndex({ email: 1 }, { unique: true, sparse: true })
db.users.createIndex({ phone: 1 }, { unique: true, sparse: true })
```

### **Login Flow**
1. User enters email OR phone + password in `AuthSidebar`
2. Frontend sends `{ identifier, password }` to `/api/auth/signin`
3. Backend searches user by email OR phone
4. Password verified with bcrypt
5. JWT token generated and returned
6. Token stored in localStorage
7. User redirected based on role:
   - `admin` → `/admin/dashboard`
   - `student` → `/dashboard`

### **Registration Flow**
1. User fills form: name + (email OR phone) + password
2. Frontend validates: at least one of email/phone provided
3. Request sent to `/api/auth/signup`
4. Backend checks if email/phone already exists
5. Password hashed with bcrypt
6. User created with role `student`
7. JWT token generated
8. Auto-login and redirect to `/dashboard`

### **Admin Credentials**
```
Email: admin@innodemy.com
Password: admin123
Role: admin
```

---

## 🎨 UI/UX Guidelines

### **AuthSidebar Component**
- ✅ Single sidebar for both login and register
- ✅ Tabs to switch between login/register
- ✅ Icons for all input fields (Mail, Phone, Lock, User)
- ✅ Clear helper text and validation messages
- ✅ Loading spinners during API calls
- ✅ Success messages with auto-redirect (1 second delay)
- ✅ Error messages styled with red background
- ✅ Responsive: full-width on mobile, 480px sidebar on desktop

### **Theme System**
- Uses `next-themes` for dark/light mode
- Default: System preference
- Toggle in navbar with Sun/Moon/Computer icons
- CSS variables in `app/globals.css`:
  - Light: Primary `#226481` (teal), Secondary `#e9ae30` (gold)
  - Dark: Inverted with adjusted opacity

### **Navigation Flow**
- Unauthenticated users → Show "Login" button in navbar
- Authenticated students → Show user dropdown with "Dashboard" link
- Authenticated admins → Show user dropdown with "Dashboard" link (redirects to admin dashboard)

---

## 🔄 Data Flow (Clean Architecture)

```
API Route → Use Case Factory → Use Case → Repository → Database
                    ↓
                 Domain Entity
```

### **Example: User Registration**

1. **API Route** (`app/api/auth/signup/route.ts`)
   ```typescript
   const registerUseCase = UseCaseFactory.createRegisterUseCase();
   const result = await registerUseCase.execute({ email, phone, password, name, role });
   ```

2. **Use Case** (`src/core/application/use-cases/auth/RegisterUseCase.ts`)
   - Validates input (email OR phone required)
   - Checks if user already exists
   - Hashes password
   - Calls repository to create user
   - Generates JWT token

3. **Repository** (`src/core/infrastructure/repositories/MongoUserRepository.ts`)
   - Connects to MongoDB
   - Creates user document
   - Returns domain entity

4. **Response** → Returns user + token to frontend

---

## 🛠️ Development Workflow

### **Commands**
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run lint         # Run ESLint
```

### **Environment Variables** (`.env`)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
PORT=5000
```

### **Adding New Features**

1. **Create Domain Entity** (if needed)
   - `src/core/domain/entities/YourEntity.ts`

2. **Create Repository Interface**
   - `src/core/domain/repositories/IYourRepository.ts`

3. **Implement Repository**
   - `src/core/infrastructure/repositories/MongoYourRepository.ts`

4. **Create Use Case**
   - `src/core/application/use-cases/your-feature/YourUseCase.ts`

5. **Add to Factory**
   - `src/core/application/factories/UseCaseFactory.ts`

6. **Create API Route**
   - `app/api/your-feature/route.ts`

7. **Create UI Component**
   - `components/YourComponent.tsx`

8. **Add to Page**
   - `app/your-page/page.tsx`

---

## 🔒 Protected Routes

### **Client-Side Protection**
All dashboard pages use `useAuth` hook:

```typescript
const { user, isLoading } = useAuth();

useEffect(() => {
  if (!isLoading && !user) {
    router.push("/");  // Redirect to homepage
  }
}, [user, isLoading]);
```

### **Admin-Only Pages**
Admin layout checks for admin role:

```typescript
if (!isLoading && user && user.role !== "admin") {
  router.push("/dashboard");  // Redirect to student dashboard
}
```

### **API Protection**
Use middleware or manual checks in API routes:

```typescript
const token = request.headers.get('Authorization')?.replace('Bearer ', '');
// Verify token and extract user info
```

---

## 📦 Key Dependencies

```json
{
  "next": "15.4.4",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^3",
  "mongodb": "^6",
  "bcryptjs": "^2",
  "jsonwebtoken": "^9",
  "next-themes": "^0.4",
  "lucide-react": "^0.index" // Icons
}
```

---

## 🚀 Deployment Checklist

- [ ] Update `.env` with production MongoDB URI
- [ ] Change `JWT_SECRET` to strong random string
- [ ] Update admin password from default
- [ ] Set `NODE_ENV=production`
- [ ] Run `npm run build` and test
- [ ] Configure CORS if needed
- [ ] Set up proper error monitoring
- [ ] Enable rate limiting on auth endpoints
- [ ] Configure CDN for static assets

---

## 🐛 Common Issues & Solutions

### **1. "Duplicate key error: phone_1"**
**Cause**: MongoDB has old non-sparse phone index
**Solution**: Drop and recreate indexes as sparse:
```typescript
await collection.dropIndexes();
await collection.createIndex({ email: 1 }, { unique: true, sparse: true });
await collection.createIndex({ phone: 1 }, { unique: true, sparse: true });
```

### **2. User redirected to homepage after login**
**Cause**: Token not saved properly or useAuth not detecting it
**Solution**: Check localStorage in browser DevTools, verify token format

### **3. Admin can't access /admin/dashboard**
**Cause**: User role is not "admin"
**Solution**: Check user document in MongoDB, ensure `role: "admin"`

### **4. Build errors with TypeScript**
**Cause**: Type mismatches, especially with User entity changes
**Solution**: Run `npm run build` to see all type errors, fix systematically

---

## 💡 Best Practices

### **1. Always Use Clean Architecture**
- Keep business logic in use cases
- Keep infrastructure (DB, APIs) in infrastructure layer
- Never access MongoDB directly from API routes

### **2. Type Safety**
- Use TypeScript interfaces for all data
- Create DTOs for API requests/responses
- Use domain entities for business logic

### **3. Error Handling**
- Always wrap async code in try-catch
- Return meaningful error messages
- Log errors with context (use console.error)

### **4. Security**
- Never log passwords (even hashed)
- Always hash passwords with bcrypt
- Validate input on both client and server
- Use JWT with expiration
- Implement rate limiting on auth routes

### **5. Code Organization**
- One component per file
- Group related files in folders
- Use index.ts for clean imports
- Keep components small and focused

### **6. Performance**
- Use React.memo for expensive components
- Implement proper loading states
- Lazy load images and heavy components
- Use Next.js Image component

---

## 📝 Quick Reference

### **Creating a New User Programmatically**
```typescript
const registerUseCase = UseCaseFactory.createRegisterUseCase();
await registerUseCase.execute({
  name: "User Name",
  email: "user@example.com",  // or null
  phone: "+1234567890",        // or null
  password: "password123",
  role: UserRole.STUDENT       // or UserRole.ADMIN
});
```

### **Finding User by Email or Phone**
```typescript
const user = await userRepository.findByEmailOrPhone(identifier);
```

### **Generating JWT Token**
```typescript
const token = tokenService.generateToken(user);
```

### **Checking Auth in Components**
```typescript
const { user, isLoading, login, logout } = useAuth();

if (isLoading) return <LoadingSpinner />;
if (!user) return <LoginPrompt />;
```

---

## 🎯 Future Improvements

- [ ] Add forgot password functionality
- [ ] Implement email verification
- [ ] Add phone OTP verification
- [ ] Implement refresh tokens
- [ ] Add social auth (Google, Facebook)
- [ ] Add two-factor authentication
- [ ] Implement user profile editing
- [ ] Add password strength indicator
- [ ] Create admin user management UI
- [ ] Add API rate limiting
- [ ] Implement proper logging system
- [ ] Add unit and integration tests

---

## 📞 Support

For questions or issues:
- **Email**: Contact@innodemy.com
- **Phone**: +880 1704 258972

---

**Last Updated**: October 16, 2025
**Version**: 1.0.0
**Maintained By**: Development Team
