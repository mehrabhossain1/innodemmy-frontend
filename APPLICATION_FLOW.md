# LMS Application Flow Documentation

## Overview

This Learning Management System (LMS) is built with **Next.js 15.4.4**, **TypeScript**, and **Tailwind CSS**. It provides a complete platform for course management, user authentication, and learning experiences for both students and administrators.

## Table of Contents

1. [Authentication System](#authentication-system)
2. [User Roles & Permissions](#user-roles--permissions)
3. [Navigation Structure](#navigation-structure)
4. [Student Dashboard](#student-dashboard)
5. [Admin Dashboard](#admin-dashboard)
6. [Course Management](#course-management)
7. [Video Learning System](#video-learning-system)
8. [API Endpoints](#api-endpoints)
9. [UI Components](#ui-components)
10. [Implementation Status](#implementation-status)

---

## Authentication System

### Login Flow

1. **Public Access**: Users start at the homepage (`/`)
2. **Login Page**: Navigate to `/login` for authentication
3. **Registration**: New users can register at `/register`
4. **JWT Authentication**: Uses JWT tokens stored in localStorage
5. **Role-based Routing**: Automatically redirects based on user role after login

### Authentication Hook

-   **Location**: `lib/hooks/useAuth.ts`
-   **Features**:
    -   Centralized authentication state management
    -   Automatic token validation
    -   Loading states for smooth UX
    -   Role-based access control

### Protected Routes

-   **Student Dashboard**: `/dashboard/*` (requires student role)
-   **Admin Dashboard**: `/admin/dashboard/*` (requires admin role)
-   **Auto-redirect**: Unauthenticated users redirected to `/login`

---

## User Roles & Permissions

### Student Role

-   Access to personal dashboard
-   View and enroll in courses
-   Watch course videos and track progress
-   Manage personal profile and settings
-   View enrollment status

### Admin Role

-   Complete administrative control
-   User management (create, view users)
-   Course management (create, edit, view courses)
-   Enrollment management (approve/reject enrollments)
-   Analytics and reporting dashboard
-   System settings management

---

## Navigation Structure

### Public Navigation (Navbar.tsx)

-   **Homepage**: Course listings, blog posts, hero section
-   **Courses**: Browse available courses (`/courses`)
-   **Blogs**: Read educational content (`/blogs`)
-   **Login/Register**: Authentication pages

### Student Navigation (Sidebar.tsx)

-   **Dashboard**: Overview of enrollments and progress
-   **My Courses**: Access enrolled courses and video content
-   **Profile**: Personal information management
-   **Settings**: Account preferences and password management
-   **Logout**: Secure session termination

### Admin Navigation (Sidebar.tsx)

-   **Dashboard**: System overview with statistics
-   **Users**: User management interface
-   **Courses**: Course creation and management
-   **Enrollments**: Enrollment approval system
-   **Analytics**: System performance metrics
-   **Reports**: Detailed reporting dashboard
-   **Settings**: System configuration
-   **Logout**: Secure admin session termination

---

## Student Dashboard

### Main Dashboard (`/dashboard`)

-   **Enrollment Overview**: Shows all course enrollments with status
-   **Course Cards**: Display enrolled courses with progress
-   **Quick Actions**: "Watch Course" buttons for approved enrollments
-   **Status Indicators**: Pending, Approved, Rejected enrollment states

### Course Access (`/dashboard/courses`)

-   **My Courses**: List of enrolled and accessible courses
-   **Course Details**: Title, instructor, description, progress
-   **Watch Integration**: Direct access to video learning interface

### Video Learning (`/dashboard/courses/[courseId]/watch`)

-   **YouTube Integration**: Embedded video player
-   **Course Modules**: Sidebar with lesson navigation
-   **Progress Tracking**: Track completion status
-   **Responsive Design**: Works on all device sizes

### Profile Management (`/dashboard/profile`) ⚠️ _[In Development]_

-   **Personal Information**: Name, email, phone, bio editing
-   **Profile Picture**: Avatar display with upload placeholder
-   **Account Details**: Role, membership date, account status
-   **Edit Mode**: Toggle between view and edit states

### Settings (`/dashboard/settings`) ⚠️ _[In Development]_

-   **Password Management**: Secure password change
-   **Notification Preferences**: Email, push, course updates
-   **Privacy Settings**: Profile visibility, message preferences
-   **Account Security**: Two-factor authentication options

---

## Admin Dashboard

### Overview Tab (`/admin/dashboard`)

-   **Statistics Cards**: Total users, courses, pending enrollments, revenue
-   **Real-time Data**: Dynamic updates from API
-   **Quick Metrics**: Key performance indicators

### User Management

-   **User List**: Complete user directory with roles
-   **Create Users**: Add new students or administrators
-   **User Details**: View creation dates and account status
-   **Role Management**: Student/Admin role assignments

### Course Management

-   **Course Library**: All courses with status indicators
-   **Create Courses**: Full course creation form
    -   Title, description, instructor
    -   Price, duration, difficulty level
    -   Category classification
-   **Course Status**: Active/Inactive toggles

### Enrollment Management

-   **Pending Requests**: Review student enrollment applications
-   **Approval System**: Approve or reject enrollments
-   **Payment Tracking**: Monitor payment amounts
-   **Status Updates**: Real-time enrollment status changes

---

## Course Management

### Course Structure

```
Course {
  _id: string
  title: string
  description: string
  price: number
  instructor: string
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  category: string
  isActive: boolean
}
```

### Enrollment Process

1. **Student Request**: Student clicks "Enroll" on course
2. **Payment Simulation**: Amount recorded in enrollment
3. **Admin Review**: Admin sees pending enrollment
4. **Approval/Rejection**: Admin decides on enrollment
5. **Course Access**: Approved students gain video access

---

## Video Learning System

### YouTube Integration

-   **Iframe Embedding**: Secure YouTube video embedding
-   **Sample Content**: Test videos for development
-   **Responsive Player**: Adapts to screen sizes
-   **Full Screen Support**: Native YouTube controls

### Course Module Structure

```
Sample Course Data:
- Module 1: Introduction (3 lessons)
- Module 2: Fundamentals (4 lessons)
- Module 3: Advanced Topics (3 lessons)
- Module 4: Project Work (2 lessons)
```

### Progress Tracking ⚠️ _[In Development]_

-   **Lesson Completion**: Track which videos are watched
-   **Progress Bars**: Visual progress indicators
-   **Resume Functionality**: Return to last watched position

---

## API Endpoints

### Authentication APIs

-   `POST /api/auth/signin` - User login
-   `POST /api/auth/signup` - User registration

### Course APIs

-   `GET /api/courses` - Fetch all courses
-   `POST /api/courses` - Create new course (admin)

### Enrollment APIs

-   `GET /api/enrollments` - User's enrollments
-   `POST /api/enrollments` - Create enrollment request

### Admin APIs

-   `GET /api/admin/users` - All users (admin only)
-   `POST /api/admin/users` - Create user (admin only)
-   `GET /api/admin/courses` - All courses (admin only)
-   `POST /api/admin/courses` - Create course (admin only)
-   `GET /api/admin/enrollments` - All enrollments (admin only)
-   `PUT /api/admin/enrollments/[id]` - Update enrollment status

### User Profile APIs ⚠️ _[In Development]_

-   `GET /api/user/profile` - Get user profile
-   `PUT /api/user/profile` - Update profile information
-   `PUT /api/user/settings` - Update user preferences
-   `PUT /api/user/settings/password` - Change password

---

## UI Components

### Core Components

-   **Navbar.tsx**: Public site navigation
-   **Sidebar.tsx**: Dashboard navigation with role-based menus
-   **DashboardHeader.tsx**: Page headers with breadcrumbs
-   **Footer.tsx**: Site footer

### Course Components

-   **CourseCard.tsx**: Course display cards
-   **CourseModules.tsx**: Video course module navigation
-   **CourseOverview.tsx**: Course detail displays

### Homepage Components

-   **HeroSection.tsx**: Landing page hero
-   **CoursesSection.tsx**: Featured courses
-   **BlogsSection.tsx**: Latest blog posts
-   **TechnologyStackSection.tsx**: Tech showcase
-   **WhyBestChoiceSection.tsx**: Value propositions

### UI Kit (shadcn/ui)

-   **Button**: Primary and secondary actions
-   **Card**: Content containers
-   **Input**: Form inputs with validation
-   **Badge**: Status indicators
-   **Select**: Dropdown selections
-   **Label**: Form labels

---

## Implementation Status

### ✅ Completed Features

#### Authentication & Authorization

-   [x] JWT-based authentication system
-   [x] Role-based access control (Student/Admin)
-   [x] Protected route middleware
-   [x] Automatic redirects based on authentication state
-   [x] useAuth hook for centralized auth management

#### Student Dashboard

-   [x] Main dashboard with enrollment overview
-   [x] Course listing with enrollment status
-   [x] Video watch interface with YouTube integration
-   [x] Responsive sidebar navigation
-   [x] Course module navigation
-   [x] "Watch Course" functionality

#### Admin Dashboard

-   [x] Statistics overview (users, courses, revenue)
-   [x] User management (view, create users)
-   [x] Course management (view, create courses)
-   [x] Enrollment management (approve/reject)
-   [x] Tab-based navigation interface
-   [x] Real-time data updates

#### UI/UX

-   [x] Responsive design for all screen sizes
-   [x] Dark sidebar with collapsible functionality
-   [x] Clean, modern interface with Tailwind CSS
-   [x] Loading states and error handling
-   [x] Consistent navigation patterns

#### API Integration

-   [x] Complete authentication API
-   [x] Course management API
-   [x] Enrollment system API
-   [x] Admin management APIs
-   [x] JWT token validation

### ⚠️ In Development

#### Profile & Settings

-   [ ] Student profile page (`/dashboard/profile`)
-   [ ] Settings page with preferences (`/dashboard/settings`)
-   [ ] Password change functionality
-   [ ] Profile picture upload
-   [ ] Notification settings

#### Enhanced Features

-   [ ] Progress tracking for video courses
-   [ ] Course completion certificates
-   [ ] Advanced search and filtering
-   [ ] Email notifications
-   [ ] Payment gateway integration

### 🔄 Future Enhancements

#### Content Management

-   [ ] Rich text editor for course descriptions
-   [ ] File upload for course materials
-   [ ] Quiz and assessment system
-   [ ] Discussion forums

#### Analytics & Reporting

-   [ ] Student progress analytics
-   [ ] Course performance metrics
-   [ ] Revenue reporting
-   [ ] User engagement statistics

#### Communication

-   [ ] In-app messaging system
-   [ ] Announcement system
-   [ ] Email integration
-   [ ] Push notifications

---

## Technical Architecture

### Frontend Stack

-   **Framework**: Next.js 15.4.4 with Turbopack
-   **Language**: TypeScript for type safety
-   **Styling**: Tailwind CSS for responsive design
-   **Components**: shadcn/ui component library
-   **Icons**: Lucide React icons
-   **State Management**: React hooks + localStorage

### Authentication Flow

```
User Login → JWT Token → localStorage → useAuth Hook → Route Protection
```

### Data Flow

```
API Request → JWT Validation → Database Query → JSON Response → UI Update
```

### File Structure

```
app/
├── admin/dashboard/          # Admin interface
├── dashboard/               # Student interface
├── api/                     # Backend API routes
├── courses/                 # Public course pages
├── blogs/                   # Blog system
components/
├── ui/                      # UI component library
├── homepage/                # Landing page components
├── courseoverviewsection/   # Course detail components
lib/
├── hooks/                   # Custom React hooks
├── models.ts               # TypeScript interfaces
├── auth.ts                 # Authentication utilities
```

---

## Getting Started for Developers

### Prerequisites

-   Node.js 18+
-   npm or yarn package manager
-   MongoDB database connection

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

## Support & Documentation

### For Users

-   **Student Guide**: Access courses, track progress, manage profile
-   **Admin Guide**: Manage users, courses, and enrollments
-   **FAQ**: Common questions and troubleshooting

### For Developers

-   **API Documentation**: Complete endpoint reference
-   **Component Library**: UI component usage guide
-   **Deployment Guide**: Production setup instructions

---

_Last Updated: September 14, 2025_  
_Version: 1.0.0_  
_Status: Active Development_
