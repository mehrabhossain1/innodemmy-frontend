# Innodemmy LMS - Learning Management System

A comprehensive Learning Management System built with Next.js, TypeScript, and MongoDB. This system supports user authentication, course management, and enrollment workflows with admin approval.

## Features

- **User Authentication**: Sign up and sign in with role-based access (Student/Admin)
- **Admin Dashboard**: Complete user and course management
- **Course Management**: Create, view, and manage courses
- **Enrollment System**: Students can request course enrollment with payment verification
- **Admin Approval**: Admins can approve/reject enrollment requests
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Authentication**: JWT tokens with bcrypt password hashing

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd innodemmy-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/innodemmy
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Seed the database with sample data**
   ```bash
   npm run seed
   ```
   
   This will create:
   - Admin user: `admin@innodemmy.com` / `admin123`
   - Sample courses
   - Database collections

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Admin Login
- Email: `admin@innodemmy.com`
- Password: `admin123`
- Access: Admin dashboard at `/admin/dashboard`

### Student Registration
- Visit `/register` to create a new student account
- Students can browse courses and request enrollment
- Enrollment requests require admin approval

### Admin Features
- **User Management**: Create, view, and manage users
- **Course Management**: Create and manage courses
- **Enrollment Approval**: Review and approve/reject enrollment requests
- **Dashboard Analytics**: View statistics and overview

### Student Features
- **Course Browsing**: View available courses
- **Enrollment Requests**: Submit enrollment requests with payment details
- **Enrollment Status**: Track enrollment request status
- **Course Access**: Access approved courses

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Admin APIs
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Delete user
- `GET /api/admin/courses` - Get all courses
- `POST /api/admin/courses` - Create new course
- `GET /api/admin/enrollments` - Get all enrollments
- `PUT /api/admin/enrollments/[id]` - Update enrollment status

### Public APIs
- `GET /api/courses` - Get active courses
- `GET /api/enrollments` - Get user enrollments (authenticated)
- `POST /api/enrollments` - Create enrollment request (authenticated)

## Database Schema

### Users Collection
```typescript
{
  _id: string;
  email: string;
  password: string; // hashed
  name: string;
  role: 'student' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
```

### Courses Collection
```typescript
{
  _id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail?: string;
  modules: CourseModule[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Enrollments Collection
```typescript
{
  _id: string;
  userId: string;
  courseId: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentProof: string;
  paymentAmount: number;
  paymentMethod: string;
  transactionId?: string;
  adminNotes?: string;
  enrolledAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── login/             # Authentication pages
│   └── dashboard/         # Student dashboard
├── components/            # Reusable components
├── lib/                   # Utility functions
├── scripts/               # Database seeding scripts
└── public/                # Static assets
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set up production environment variables**
   - Update `MONGODB_URI` with your production MongoDB connection
   - Set a secure `JWT_SECRET`
   - Set `NODE_ENV=production`

3. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS
   - DigitalOcean

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
