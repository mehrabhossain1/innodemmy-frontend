# 🚀 Quick Start Guide

## ✅ Setup Complete!

The API integration structure has been successfully created. Here's what's ready:

### **📦 Installed Packages**

- ✅ `@tanstack/react-query` - React Query for data fetching
- ✅ `@tanstack/react-query-devtools` - DevTools for debugging
- ✅ `axios` - HTTP client
- ✅ `sonner` - Toast notifications

### **🏗️ Created Structure**

```
lib/
├── api/
│   ├── client.ts                          ✅ Axios client with interceptors
│   ├── index.ts                           ✅ Barrel exports
│   └── services/
│       ├── auth.service.ts                ✅ Auth endpoints
│       ├── courses.service.ts             ✅ Course endpoints
│       ├── enrollments.service.ts         ✅ Enrollment endpoints
│       ├── blogs.service.ts               ✅ Blog endpoints
│       └── webinar-registrations.service.ts ✅ Webinar endpoints
├── hooks/
│   ├── index.ts                           ✅ Barrel exports
│   ├── useAuthQuery.ts                    ✅ Auth hooks
│   ├── useCoursesQuery.ts                 ✅ Course hooks
│   ├── useEnrollmentsQuery.ts             ✅ Enrollment hooks
│   ├── useBlogsQuery.ts                   ✅ Blog hooks
│   └── useWebinarQuery.ts                 ✅ Webinar hooks
app/
├── providers.tsx                          ✅ React Query Provider
└── layout.tsx                             ✅ Updated with Providers

.env.local                                 ✅ API URL configured
.env.example                               ✅ Environment template
API_INTEGRATION.md                         ✅ Complete documentation
```

---

## 🎯 Next Steps - Connect Components

### **1️⃣ Update AuthSidebar Component**

Replace the authentication logic in [components/AuthSidebar.tsx](components/AuthSidebar.tsx):

```tsx
"use client";

import { useLogin, useRegister } from "@/lib/hooks";
import { useState } from "react";

export default function AuthSidebar() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const loginMutation = useLogin();
    const registerMutation = useRegister();

    const handleLogin = async (data: {
        identifier: string;
        password: string;
    }) => {
        await loginMutation.mutateAsync(data);
        // Success/error handled automatically with toasts
    };

    const handleRegister = async (data: {
        name: string;
        email?: string;
        phone?: string;
        password: string;
    }) => {
        await registerMutation.mutateAsync(data);
    };

    // ... rest of your component
}
```

### **2️⃣ Update useAuth Hook** (OPTIONAL)

Your existing `lib/hooks/useAuth.ts` can be replaced with the new React Query version:

```tsx
// Instead of:
import { useAuth } from "@/lib/hooks/useAuth";

// Use:
import { useCurrentUser } from "@/lib/hooks";

export function ProtectedPage() {
    const { data, isLoading } = useCurrentUser();

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>Please login</div>;

    const user = data.data; // User object

    return <div>Welcome {user.name}</div>;
}
```

### **3️⃣ Update Courses Page**

Replace course fetching in [app/courses/page.tsx](app/courses/page.tsx):

```tsx
"use client";

import { useCourses } from "@/lib/hooks";
import CourseCard from "@/components/CourseCard";

export default function CoursesPage() {
    const { data, isLoading, error } = useCourses({
        page: 1,
        limit: 12,
        published: true,
    });

    if (isLoading) return <div>Loading courses...</div>;
    if (error) return <div>Error loading courses</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.data.courses.map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>
    );
}
```

### **4️⃣ Update Course Detail Pages**

For dynamic course pages [app/courses/[id]/page.tsx](app/courses/[id]/page.tsx):

```tsx
"use client";

import { useCourseBySlug, useCheckEnrollment } from "@/lib/hooks";

export default function CourseDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { data: courseData, isLoading } = useCourseBySlug(params.id);
    const { data: enrollmentData } = useCheckEnrollment(
        courseData?.data._id || "",
    );

    if (isLoading) return <div>Loading...</div>;

    const course = courseData?.data;
    const isEnrolled = enrollmentData?.data.enrolled;

    return (
        <div>
            <h1>{course?.title}</h1>
            <p>{course?.description}</p>
            {isEnrolled ? (
                <button>Continue Learning</button>
            ) : (
                <button>Enroll Now</button>
            )}
        </div>
    );
}
```

### **5️⃣ Update Dashboard**

Update [app/dashboard/page.tsx](app/dashboard/page.tsx):

```tsx
"use client";

import { useMyEnrollments, useCurrentUser } from "@/lib/hooks";

export default function DashboardPage() {
    const { data: userData } = useCurrentUser();
    const { data: enrollmentsData, isLoading } = useMyEnrollments({
        status: "active",
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {userData?.data.name}</h1>
            <div>
                <h2>My Courses ({enrollmentsData?.data.total})</h2>
                {enrollmentsData?.data.enrollments.map((enrollment) => (
                    <div key={enrollment._id}>
                        <p>Progress: {enrollment.progress}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

### **6️⃣ Update Blogs Page**

Update [app/blogs/page.tsx](app/blogs/page.tsx):

```tsx
"use client";

import { useBlogs } from "@/lib/hooks";
import BlogCard from "@/components/BlogCard";

export default function BlogsPage() {
    const { data, isLoading } = useBlogs({
        published: true,
        page: 1,
        limit: 10,
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {data?.data.blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    );
}
```

### **7️⃣ Update Navbar**

Update [components/Navbar.tsx](components/Navbar.tsx) to use new auth:

```tsx
"use client";

import { useCurrentUser, useLogout } from "@/lib/hooks";

export default function Navbar() {
    const { data, isLoading } = useCurrentUser();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    if (isLoading) return <div>Loading...</div>;

    if (data?.data) {
        return (
            <nav>
                <span>Welcome, {data.data.name}</span>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        );
    }

    return (
        <nav>
            <button>Login</button>
        </nav>
    );
}
```

---

## 🔄 Remove Old API Routes (Optional)

Since the backend handles everything now, you can remove local API routes:

```bash
rm -rf app/api/auth
rm -rf app/api/courses
rm -rf app/api/enrollments
rm -rf app/api/blogs
rm -rf app/api/webinar-registrations
```

**Note**: Only remove if backend has all these endpoints implemented.

---

## 🧪 Testing

### **1. Start Development Server**

```bash
npm run dev
```

### **2. Open React Query DevTools**

- Look for the React Query icon in the bottom-right corner
- Click to see all queries and their states

### **3. Test Authentication**

1. Try logging in with existing credentials
2. Check localStorage for token
3. Verify redirect works
4. Check toast notifications

### **4. Test Course Listing**

1. Visit `/courses`
2. Check if courses load from backend
3. Verify loading states work

---

## 📚 Resources

- **Full API Documentation**: [API_INTEGRATION.md](API_INTEGRATION.md)
- **Backend API**: https://innodemmy-backend-app.onrender.com/api/v1
- **React Query Docs**: https://tanstack.com/query/latest

---

## 🆘 Common Issues

### **Issue**: "Request failed with status code 401"

**Solution**: Token expired or invalid. Clear localStorage and login again.

### **Issue**: Courses not loading

**Solution**:

1. Check if `NEXT_PUBLIC_API_URL` is set correctly
2. Verify backend is running
3. Check React Query DevTools for error details

### **Issue**: Build fails

**Solution**:

1. Run `npm run build` to see specific errors
2. Make sure all hooks are used in client components (`'use client'`)
3. Check TypeScript errors with `npm run lint`

---

## ✅ Checklist

- [ ] Test login/register flow
- [ ] Update AuthSidebar component
- [ ] Update Navbar with new auth hooks
- [ ] Update courses page
- [ ] Update course detail pages
- [ ] Update dashboard page
- [ ] Update blogs page
- [ ] Test enrollment flow
- [ ] Test webinar registration
- [ ] Remove old API routes (optional)
- [ ] Test build: `npm run build`

---

**Need Help?** Check [API_INTEGRATION.md](API_INTEGRATION.md) for detailed examples and usage patterns.

**Ready to Deploy?** Make sure to:

1. Update `NEXT_PUBLIC_API_URL` in production environment
2. Test all features in production mode
3. Monitor React Query cache behavior
