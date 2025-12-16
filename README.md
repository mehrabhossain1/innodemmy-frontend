# 🚀 Innodemy LMS - Empowering Learning Through Innovation

> **A modern, full-stack Learning Management System built with cutting-edge technologies to deliver exceptional educational experiences.**

Welcome to **Innodemy LMS** - a comprehensive platform that bridges the gap between ambitious learners and world-class education. This isn't just another LMS; it's a meticulously crafted ecosystem designed to transform how students learn, instructors teach, and administrators manage educational content.

---

## ✨ What Makes This Project Special?

### 🎯 **Built for Real-World Impact**
This platform powers a thriving educational ecosystem with **10+ specialized courses** spanning:
- **Clinical Research & Healthcare**: From foundational research literacy to advanced evidence generation
- **Data Science & Machine Learning**: Complete pathways from Python essentials to advanced ML
- **Scientific Writing & Publication**: Master the art of research communication
- **VLSI & Hardware Design**: Industry-grade physical design training
- **And much more...**

### 🏗️ **Modern Architecture, Scalable Design**
Built on **Next.js 15** with the App Router, leveraging React 19 and TypeScript for type-safe, maintainable code. The architecture is designed to scale seamlessly from prototype to production.

### 🎨 **Exceptional User Experience**
Every interaction is thoughtfully designed:
- **Dark mode support** for comfortable learning at any time
- **Responsive design** that works beautifully on all devices
- **Smooth animations** powered by Framer Motion
- **Intuitive navigation** with clear information architecture

---

## 🛠️ Technology Stack

### **Frontend Excellence**
- **Next.js 15.5.7** - Latest App Router with server components
- **React 19.1.0** - Cutting-edge React features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern utility-first styling
- **Radix UI** - Accessible, unstyled component primitives
- **Framer Motion** - Smooth, performant animations
- **TipTap** - Rich text editing capabilities

### **Backend & Infrastructure**
- **Next.js API Routes** - Full-stack capabilities in one framework
- **MongoDB** - Flexible, scalable database
- **JWT Authentication** - Secure token-based auth
- **bcryptjs** - Password hashing for security
- **Resend** - Email delivery service

### **Developer Experience**
- **Turbopack** - Lightning-fast development builds
- **ESLint** - Code quality assurance
- **TypeScript** - Compile-time error catching

---

## 🎓 Key Features

### **For Students**
- 🔐 **Secure Authentication** - Email verification with OTP support
- 📚 **Course Discovery** - Browse courses with rich filtering and search
- 💳 **Enrollment System** - Seamless enrollment with payment verification (bKash/Nagad)
- 📖 **Course Content** - Structured modules, videos, and resources
- 📊 **Progress Tracking** - Monitor your learning journey
- 👤 **Profile Management** - Complete control over your account
- 📱 **Responsive Dashboard** - Access your courses anywhere, anytime

### **For Administrators**
- 🎛️ **Comprehensive Dashboard** - Full control at your fingertips
- 👥 **User Management** - Create, update, and manage users
- 📝 **Course Management** - Rich course editor with module organization
- ✅ **Enrollment Approval** - Review and approve student enrollments
- 📰 **Blog Management** - Publish and manage educational content
- 📈 **Analytics & Insights** - Track platform performance

### **Platform Features**
- 🌐 **Multi-page Website** - Homepage, About, Courses, Blogs, Career pages
- 🎥 **Video Integration** - Seamless video playback for course content
- 📧 **Email System** - Automated emails for verification and notifications
- 🔒 **Role-Based Access** - Secure admin and student separation
- 🎨 **Theme Support** - Light/dark mode with system preference detection
- 📱 **Mobile-First** - Optimized for all screen sizes

---

## 📁 Project Structure

```
innodemmy-frontend/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (RESTful endpoints)
│   │   ├── auth/                 # Authentication (signup, signin, password reset)
│   │   ├── admin/                # Admin-only endpoints
│   │   ├── courses/              # Course management APIs
│   │   ├── enrollments/          # Enrollment APIs
│   │   └── blogs/                # Blog management APIs
│   ├── admin/                    # Admin dashboard pages
│   ├── dashboard/                # Student dashboard pages
│   ├── courses/                  # Course pages (10+ specialized courses)
│   ├── blogs/                    # Blog listing and detail pages
│   └── [public pages]/           # Homepage, About, Career, etc.
│
├── components/                   # Reusable React components
│   ├── homepage/                 # Homepage sections
│   ├── course/                   # Course-related components
│   ├── admin/                    # Admin-specific components
│   ├── dashboard/                # Dashboard components
│   └── ui/                       # Shadcn UI components
│
├── lib/                          # Core business logic
│   ├── db/                       # Database operations
│   ├── services/                 # Business logic services
│   ├── utils/                    # Utility functions
│   └── models.ts                 # TypeScript interfaces
│
└── public/                       # Static assets
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### **Quick Start**

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
   Create a `.env.local` file:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   RESEND_API_KEY=your-resend-api-key  # For email functionality
   ```

4. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data
- `npm run seed:blogs` - Seed blog posts
- `npm run migrate:users` - Run user migrations

---

## 🔐 Authentication & Security

- **JWT-based authentication** with secure token storage
- **Password hashing** using bcryptjs
- **Email verification** with OTP codes
- **Password reset** functionality
- **Rate limiting** on sensitive endpoints
- **Role-based access control** (Student/Admin)

---

## 📊 Database Schema

The platform uses MongoDB with well-defined schemas for:
- **Users** - Authentication, roles, verification status
- **Courses** - Rich course data with modules, projects, FAQs
- **Enrollments** - Payment tracking and approval workflow
- **Blogs** - Content management with rich text support

---

## 🎨 Design Philosophy

This project follows modern web development best practices:
- **Component-driven development** - Reusable, composable components
- **Type safety** - TypeScript throughout for reliability
- **Performance first** - Optimized images, code splitting, server components
- **Accessibility** - Radix UI components ensure WCAG compliance
- **Developer experience** - Clear structure, consistent patterns

---

## 🌟 What I'm Proud Of

- **Scalable Architecture**: Clean separation of concerns, easy to extend
- **Type Safety**: Comprehensive TypeScript coverage
- **User Experience**: Thoughtful UI/UX decisions throughout
- **Code Quality**: Consistent patterns, readable code, proper error handling
- **Performance**: Optimized for speed and efficiency
- **Security**: Proper authentication, authorization, and data protection

---

## 📝 License

This project is licensed under the MIT License.

---

## 💼 For Recruiters

This codebase demonstrates:
- ✅ **Full-stack development** capabilities
- ✅ **Modern React/Next.js** expertise
- ✅ **Database design** and MongoDB proficiency
- ✅ **API design** and RESTful principles
- ✅ **Authentication & security** implementation
- ✅ **UI/UX design** sensibilities
- ✅ **TypeScript** mastery
- ✅ **Code organization** and maintainability
- ✅ **Problem-solving** skills
- ✅ **Production-ready** code quality

**Ready to discuss how I can bring this level of expertise to your team!** 🚀
