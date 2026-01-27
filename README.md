# Innodemy - Learning Management System

> A full-stack Learning Management System (LMS) built with Next.js 15, enabling students to discover courses, enroll via mobile payment systems, and access learning content through a personalized dashboard.

---

## Problem Statement

Educational institutions and independent course creators in regions like Bangladesh face significant challenges in delivering online education:

1. **Payment Integration Barriers**: Traditional payment gateways (Stripe, PayPal) have limited reach in South Asian markets. Local mobile payment systems (bKash, Nagad) are dominant but lack seamless integration with modern LMS platforms.

2. **Manual Enrollment Verification**: Without proper infrastructure, course enrollments require manual verification of mobile payment transactions, leading to delays and administrative overhead.

3. **Lack of Affordable LMS Solutions**: Most LMS platforms are either expensive SaaS products or complex self-hosted solutions requiring significant backend expertise.

4. **No Unified Platform**: Educators often juggle multiple tools for course content, webinar registrations, blog publishing, and student management—creating fragmented user experiences.

This project addresses these gaps by providing a unified, self-hosted LMS with built-in support for mobile payment verification workflows, multi-role access control, and content management.

---

## Solution Overview

Innodemy is a monolithic Next.js application that combines frontend and backend into a single deployable unit, leveraging:

- **Next.js App Router** for server-side rendering and API routes
- **MongoDB Atlas** for flexible document storage
- **JWT-based authentication** with role-based access control (Student/Admin)
- **Mobile payment enrollment flow** with manual admin approval
- **Email verification system** using Resend API with OTP codes

### High-Level Flow

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────────┐
│   Student   │────▶│   Next.js App   │────▶│   MongoDB Atlas  │
│   Browser   │◀────│  (App Router)   │◀────│    Database      │
└─────────────┘     └─────────────────┘     └──────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Resend API   │
                    │ (Email OTPs)  │
                    └───────────────┘
```

1. **Discovery**: Users browse courses, blogs, and upcoming webinars on the public site
2. **Registration**: Email-based signup with optional OTP verification
3. **Enrollment**: Students select a course, make payment via bKash/Nagad, and submit transaction details
4. **Approval**: Admins review pending enrollments, verify transactions, and approve/reject
5. **Learning**: Approved students access course content through their personalized dashboard

---

## Key Features

### Authentication & Authorization

- JWT-based stateless authentication with 7-day token expiration
- Role-based access control: `student` and `admin` roles
- Secure password hashing using bcrypt (12 salt rounds)
- Rate limiting on authentication endpoints (5 login attempts/minute, 3 signup attempts/minute)
- Email OTP verification flow with configurable expiry and attempt limits

### Course Management

- Course catalog with category-based filtering (Clinical Research, Programming, Data Science & AI, VLSI)
- Dynamic course detail pages with modules, FAQs, and project information
- Hardcoded course data with extensible structure for database-backed courses
- SEO-optimized metadata for course pages

### Enrollment System

- Mobile payment integration supporting bKash and Nagad
- Transaction ID verification workflow
- Enrollment status tracking: `pending`, `approved`, `rejected`
- Admin dashboard for enrollment management with approve/reject actions
- Duplicate enrollment prevention per user per course

### Student Dashboard

- Personalized view of enrolled courses
- Enrollment status visibility (pending/approved/rejected)
- Course access for approved enrollments

### Admin Dashboard

- Overview statistics: total users, courses, enrollments
- User management with role assignments
- Enrollment approval queue with payment verification
- Course and blog management interfaces
- Webinar registration monitoring

### Content Management

- Blog publishing system with rich text editor (TipTap)
- Category and tag support for blog organization
- Webinar registration with validation

### Email System

- Resend API integration for transactional emails
- Verification OTP emails with branded HTML templates
- Password reset functionality
- Development mode with console-logged OTPs for testing

### UI/UX

- Dark/Light theme support via `next-themes`
- Responsive design with Tailwind CSS
- Shadcn UI component library integration
- Animated hero carousel with auto-play
- Loading states and skeleton screens

---

## Tech Stack

| Layer                | Technology                                    |
| -------------------- | --------------------------------------------- |
| **Framework**        | Next.js 15.5.7 (App Router, Turbopack)        |
| **Language**         | TypeScript 5                                  |
| **Runtime**          | React 19.1.0                                  |
| **Styling**          | Tailwind CSS 4, tw-animate-css                |
| **UI Components**    | Shadcn UI (Radix primitives)                  |
| **Database**         | MongoDB 6.x (MongoDB Atlas)                   |
| **Authentication**   | JWT (jsonwebtoken), bcryptjs                  |
| **Email**            | Resend API                                    |
| **Rich Text Editor** | TipTap                                        |
| **Animations**       | Framer Motion                                 |
| **Carousel**         | Embla Carousel                                |
| **Icons**            | Lucide React                                  |
| **Build Tool**       | Turbopack (Next.js dev), Webpack (production) |

---

## System Architecture

### Directory Structure

```
innodemmy-frontend/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes (Backend)
│   │   ├── auth/             # Authentication endpoints
│   │   ├── admin/            # Admin-only endpoints
│   │   ├── courses/          # Course CRUD
│   │   ├── enrollments/      # Enrollment management
│   │   ├── blogs/            # Blog CRUD
│   │   └── webinar-registrations/
│   ├── admin/                # Admin dashboard pages
│   ├── dashboard/            # Student dashboard pages
│   └── (public pages)/       # Homepage, courses, blogs
│
├── components/               # React components
│   ├── ui/                   # Shadcn UI primitives
│   ├── homepage/             # Landing page sections
│   ├── dashboard/            # Dashboard components
│   └── admin/                # Admin-specific components
│
├── lib/                      # Backend logic
│   ├── db/                   # Database operations
│   ├── services/             # Business logic layer
│   ├── utils/                # Shared utilities
│   ├── hooks/                # React hooks
│   ├── constants/            # Configuration constants
│   └── data/                 # Static course data
│
└── public/                   # Static assets
```

### Request Flow

```
Client Request
      │
      ▼
┌─────────────────────┐
│   API Route         │  ← app/api/[endpoint]/route.ts
│   (Thin Controller) │
└─────────────────────┘
      │
      ▼
┌─────────────────────┐
│   Auth Middleware   │  ← lib/utils/auth-middleware.ts
│   (withAuth/Admin)  │     - Token extraction & verification
└─────────────────────┘     - Role-based access control
      │
      ▼
┌─────────────────────┐
│   Service Layer     │  ← lib/services/*.ts
│   (Business Logic)  │     - Input validation
└─────────────────────┘     - Business rules
      │                      - Error handling
      ▼
┌─────────────────────┐
│   Database Layer    │  ← lib/db/*.ts
│   (Data Access)     │     - MongoDB operations
└─────────────────────┘     - Document mapping
      │
      ▼
┌─────────────────────┐
│   MongoDB Atlas     │
│   (Document Store)  │
└─────────────────────┘
```

### Database Schema

**Users Collection**

```typescript
{
  _id: ObjectId,
  email: string,           // Unique, required
  password: string,        // bcrypt hashed
  name: string,
  role: "student" | "admin",
  isVerified: boolean,
  verificationCode?: string,
  verificationCodeExpiry?: Date,
  otpAttempts: number,
  createdAt: Date,
  updatedAt: Date
}
```

**Enrollments Collection**

```typescript
{
  _id: ObjectId,
  userId: string,          // Reference to User
  courseId: string,        // Reference to Course
  status: "pending" | "approved" | "rejected",
  paymentMethod: "bkash" | "nagad",
  transactionId: string,
  amount: number,
  adminNotes?: string,
  approvedBy?: string,     // Admin user ID
  approvedAt?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Authentication

| Method | Endpoint                    | Description              | Auth |
| ------ | --------------------------- | ------------------------ | ---- |
| `POST` | `/api/auth/signup`          | Register new user        | -    |
| `POST` | `/api/auth/signin`          | Login user               | -    |
| `POST` | `/api/auth/verify-email`    | Verify email with OTP    | -    |
| `POST` | `/api/auth/resend-otp`      | Resend verification OTP  | -    |
| `POST` | `/api/auth/forgot-password` | Request password reset   | -    |
| `POST` | `/api/auth/reset-password`  | Reset password with code | -    |

### Courses

| Method | Endpoint            | Description        | Auth |
| ------ | ------------------- | ------------------ | ---- |
| `GET`  | `/api/courses`      | List all courses   | -    |
| `GET`  | `/api/courses/[id]` | Get course details | -    |

### Enrollments

| Method | Endpoint           | Description               | Auth |
| ------ | ------------------ | ------------------------- | ---- |
| `GET`  | `/api/enrollments` | Get user's enrollments    | User |
| `POST` | `/api/enrollments` | Create enrollment request | User |

### Admin

| Method | Endpoint                              | Description          | Auth  |
| ------ | ------------------------------------- | -------------------- | ----- |
| `GET`  | `/api/admin/users`                    | List all users       | Admin |
| `GET`  | `/api/admin/courses`                  | List all courses     | Admin |
| `GET`  | `/api/admin/enrollments`              | List all enrollments | Admin |
| `POST` | `/api/admin/enrollments/[id]/approve` | Approve enrollment   | Admin |
| `POST` | `/api/admin/enrollments/[id]/reject`  | Reject enrollment    | Admin |

### Blogs & Webinars

| Method | Endpoint                     | Description          | Auth |
| ------ | ---------------------------- | -------------------- | ---- |
| `GET`  | `/api/blogs`                 | List published blogs | -    |
| `GET`  | `/api/blogs/[id]`            | Get blog details     | -    |
| `POST` | `/api/webinar-registrations` | Register for webinar | -    |

---

## Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Resend account for email functionality (optional)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/innodemy-frontend.git
   cd innodemy-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Run database seeds (optional)**

   ```bash
   npm run seed:blogs
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
npm run build
npm run start
```

---

## Environment Variables

| Variable              | Description                               | Required |
| --------------------- | ----------------------------------------- | -------- |
| `MONGODB_URI`         | MongoDB connection string                 | Yes      |
| `JWT_SECRET`          | Secret key for JWT signing (min 32 chars) | Yes      |
| `RESEND_API_KEY`      | Resend API key for emails                 | No       |
| `FROM_EMAIL`          | Sender email address                      | No       |
| `FROM_NAME`           | Sender display name                       | No       |
| `EMAIL_DEV_MODE`      | Set to `true` to log OTPs to console      | No       |
| `NEXT_PUBLIC_APP_URL` | Public URL of the application             | No       |

### Example `.env`

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/innodemy
JWT_SECRET=your-super-secret-key-min-32-characters-long
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@innodemy.com
FROM_NAME=Innodemy
EMAIL_DEV_MODE=false
```

---

## Engineering Decisions & Challenges

### 1. Monolithic Architecture Choice

**Decision**: Combine frontend and backend in a single Next.js application.

**Reasoning**:

- Simplified deployment (single Vercel/Node.js instance)
- Shared TypeScript types between client and server
- Reduced operational complexity for a small team
- Next.js API routes provide sufficient abstraction for backend logic

**Trade-off**: Harder to scale backend independently; acceptable for expected user load.

### 2. JWT over Session-based Auth

**Decision**: Use stateless JWT tokens stored in localStorage.

**Reasoning**:

- Simpler server implementation (no session store)
- Horizontal scaling without sticky sessions
- Works well with the single-page application pattern

**Trade-off**: Cannot invalidate tokens server-side; mitigated by 7-day expiry.

### 3. Manual Payment Verification

**Decision**: Admin manually approves enrollments after verifying transaction IDs.

**Reasoning**:

- bKash/Nagad don't provide webhook integrations for small merchants
- Reduces integration complexity and costs
- Matches existing business workflow

**Challenge Solved**: Built a clear pending/approved/rejected workflow with admin notes.

### 4. Hardcoded Course Data

**Decision**: Store course details in `lib/data/courses.ts` rather than database.

**Reasoning**:

- Courses change infrequently
- Simplifies initial deployment
- Version-controlled content

**Trade-off**: Requires code deployment to update courses; acceptable for current scale.

### 5. Rate Limiting Implementation

**Decision**: In-memory rate limiting using a simple object store.

**Reasoning**:

- Sufficient for single-instance deployments
- Zero additional infrastructure (no Redis needed)
- Configurable per-endpoint limits

**Limitation**: Resets on server restart; does not work across multiple instances.

### 6. OTP Email Flow

**Challenge**: Resend free tier only sends to verified emails.

**Solution**: Implemented `EMAIL_DEV_MODE` flag that logs OTPs to console during development. Clear documentation provided in `EMAIL_SETUP.md` for production domain verification.

### 7. Connection Pooling

**Decision**: Use global MongoDB client promise pattern.

**Implementation**: Store client promise on global object in development to survive HMR reloads; create fresh client in production.

---

## Future Improvements

1. **Payment Gateway Integration**: Direct bKash/Nagad API integration for automated verification
2. **Video Hosting**: Integration with Vimeo/YouTube for protected course videos
3. **Progress Tracking**: Track video completion and course progress per student
4. **Certificate Generation**: Auto-generate PDF certificates upon course completion
5. **Discussion Forums**: Per-course discussion boards for student interaction
6. **Quiz System**: Built-in assessments with automated grading
7. **Notification System**: In-app and push notifications for enrollment updates
8. **Redis Rate Limiting**: Distributed rate limiting for multi-instance deployments
9. **Instructor Role**: Allow course creators to manage their own courses
10. **Analytics Dashboard**: Course engagement metrics and revenue reports
11. **Mobile App**: React Native companion app for on-the-go learning
12. **Multi-language Support**: Localization for Bangla and other languages

---

## Demo / Screenshots

> Add screenshots of key pages here:
>
> - [ ] Homepage with hero carousel
> - [ ] Course catalog with filters
> - [ ] Course detail page
> - [ ] Enrollment dialog with payment instructions
> - [ ] Student dashboard with enrolled courses
> - [ ] Admin dashboard overview
> - [ ] Admin enrollment approval interface

---

## Author

**[Your Name]**

- GitHub: [github.com/your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

## License

This project is private and proprietary. All rights reserved.

---

## Support

For questions or issues:

- **Email**: Contact@innodemy.com
- **Phone**: +880 1704 258972
