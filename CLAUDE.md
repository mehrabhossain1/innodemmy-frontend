# CLAUDE.md - Innodemy Frontend Project Guide

## 📋 Project Overview

**Project**: Innodemy - Learning Management System (LMS)
**Framework**: Next.js 15.4.4 (App Router)
**Language**: TypeScript
**Architecture**: Simple 3-Layer Structure (lib/ organization)
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
├── lib/                         # Backend logic and utilities
│   ├── models.ts                # TypeScript interfaces (User, Course, Enrollment)
│   ├── db/                      # Database operations
│   │   ├── connection.ts        # MongoDB connection with pooling
│   │   ├── users.ts             # User database operations
│   │   ├── courses.ts           # Course database operations
│   │   └── enrollments.ts       # Enrollment database operations
│   ├── services/                # Business logic
│   │   ├── auth.ts              # Authentication (login, register, JWT)
│   │   ├── users.ts             # User management
│   │   ├── courses.ts           # Course management
│   │   └── enrollments.ts       # Enrollment management
│   ├── utils/                   # Shared utilities
│   │   ├── password.ts          # Password hashing with bcrypt
│   │   └── auth-middleware.ts   # withAuth, withAdminAuth middleware
│   └── hooks/
│       └── useAuth.ts           # Client-side auth hook
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

## 🔄 Data Flow

```
API Route → Service → Database Function → MongoDB
```

### **Example: User Registration**

1. **API Route** (`app/api/auth/signup/route.ts`)
   ```typescript
   import { register } from '@/lib/services/auth';
   const result = await register({ email, phone, password, name, role });
   ```

2. **Service** (`lib/services/auth.ts`)
   - Validates input (email OR phone required)
   - Checks if user already exists (calls `lib/db/users.ts`)
   - Hashes password (calls `lib/utils/password.ts`)
   - Creates user in database
   - Generates JWT token

3. **Database Function** (`lib/db/users.ts`)
   - Connects to MongoDB via connection pool
   - Creates user document
   - Returns user without password

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

1. **Add Types** (if needed)
   - Update `lib/models.ts` with TypeScript interfaces

2. **Create Database Functions**
   - Add to existing file or create new: `lib/db/your-feature.ts`
   - Functions like: `create`, `findById`, `update`, `delete`

3. **Create Service**
   - Add to existing or create new: `lib/services/your-feature.ts`
   - Contains business logic, validation, error handling

4. **Create API Route**
   - `app/api/your-feature/route.ts`
   - Import service functions and call them

5. **Create UI Component** (if needed)
   - `components/YourComponent.tsx`

6. **Add to Page**
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
Use middleware from `lib/utils/auth-middleware.ts`:

```typescript
import { withAuth, withAdminAuth } from '@/lib/utils/auth-middleware';

// For any authenticated user
export const GET = withAuth(async (request: AuthenticatedRequest) => {
  const user = request.user!; // User is guaranteed to exist
  // ... your logic
});

// For admin-only routes
export const POST = withAdminAuth(async (request: AuthenticatedRequest) => {
  const admin = request.user!; // Admin user is guaranteed
  // ... your logic
});
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

### **1. Separation of Concerns**
- Business logic goes in `lib/services/`
- Database operations go in `lib/db/`
- API routes should be thin - just call services
- Keep utilities in `lib/utils/`

### **2. Type Safety**
- Use TypeScript interfaces from `lib/models.ts`
- Type all function parameters and returns
- Use strict TypeScript settings

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
import { register } from '@/lib/services/auth';

await register({
  name: "User Name",
  email: "user@example.com",  // or null
  phone: "+1234567890",        // or null
  password: "password123",
  role: "student"              // or "admin"
});
```

### **Finding User by Email or Phone**
```typescript
import { findUserByIdentifier } from '@/lib/db/users';
const user = await findUserByIdentifier(identifier);
```

### **Generating JWT Token**
```typescript
import { generateToken } from '@/lib/services/auth';
const token = generateToken(user);
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
