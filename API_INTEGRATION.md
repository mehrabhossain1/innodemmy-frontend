# 🚀 API Integration Guide

## 📋 Overview

This project uses **TanStack Query (React Query)** with **Axios** for efficient API communication with the backend at `https://innodemmy-backend-app.onrender.com/api/v1`.

## 🏗️ Architecture

```
Frontend Layer Structure:
┌─────────────────────────────────────────┐
│         Components / Pages              │
│    (Use React Query hooks)              │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      React Query Hooks                  │
│   lib/hooks/useXXXQuery.ts              │
│   - useLogin, useCourses, etc.          │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      Service Layer                      │
│   lib/api/services/*.service.ts         │
│   - authService, coursesService, etc.   │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      API Client (Axios)                 │
│   lib/api/client.ts                     │
│   - Interceptors, Error handling        │
└────────────┬────────────────────────────┘
             │
             ▼
    Backend API (Render)
```

---

## 📁 Project Structure

```
lib/
├── api/
│   ├── client.ts                          # Axios instance with interceptors
│   ├── index.ts                           # Barrel export
│   └── services/
│       ├── auth.service.ts                # Authentication APIs
│       ├── courses.service.ts             # Course management APIs
│       ├── enrollments.service.ts         # Enrollment APIs
│       ├── blogs.service.ts               # Blog APIs
│       └── webinar-registrations.service.ts # Webinar APIs
│
├── hooks/
│   ├── index.ts                           # Barrel export
│   ├── useAuth.ts                         # Legacy auth hook (localStorage)
│   ├── useAuthQuery.ts                    # Auth hooks with React Query
│   ├── useCoursesQuery.ts                 # Course hooks
│   ├── useEnrollmentsQuery.ts             # Enrollment hooks
│   ├── useBlogsQuery.ts                   # Blog hooks
│   └── useWebinarQuery.ts                 # Webinar hooks
│
app/
└── providers.tsx                          # QueryClientProvider + ThemeProvider
```

---

## 🔧 Setup

### 1. **Environment Variables**

Add to `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://innodemmy-backend-app.onrender.com/api/v1
```

### 2. **Root Layout** (Already configured)

The `app/layout.tsx` wraps everything with `Providers` component which includes:

- QueryClientProvider (React Query)
- ThemeProvider (Dark/Light mode)
- Toaster (Toast notifications)
- React Query DevTools (Development only)

---

## 📚 Usage Examples

### **Authentication**

#### Login Example

```tsx
"use client";

import { useLogin } from "@/lib/hooks";
import { useState } from "react";

export default function LoginForm() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await loginMutation.mutateAsync({
            identifier, // email or phone
            password,
        });
        // Success: redirects automatically + shows toast
        // Error: shows error toast
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email or Phone"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
```

#### Get Current User

```tsx
"use client";

import { useCurrentUser } from "@/lib/hooks";

export default function UserProfile() {
    const { data, isLoading, error } = useCurrentUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Not authenticated</div>;

    return (
        <div>
            <h1>Welcome, {data?.data.name}</h1>
            <p>Role: {data?.data.role}</p>
        </div>
    );
}
```

---

### **Courses**

#### Fetch All Courses

```tsx
"use client";

import { useCourses } from "@/lib/hooks";

export default function CoursesPage() {
    const { data, isLoading, error } = useCourses({
        page: 1,
        limit: 10,
        category: "Machine Learning",
        sort: "newest",
    });

    if (isLoading) return <div>Loading courses...</div>;
    if (error) return <div>Error loading courses</div>;

    return (
        <div>
            {data?.data.courses.map((course) => (
                <div key={course._id}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <p>Price: ${course.price}</p>
                </div>
            ))}
        </div>
    );
}
```

#### Get Single Course by Slug

```tsx
"use client";

import { useCourseBySlug } from "@/lib/hooks";

export default function CourseDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const { data, isLoading } = useCourseBySlug(params.slug);

    if (isLoading) return <div>Loading...</div>;

    const course = data?.data;

    return (
        <div>
            <h1>{course?.title}</h1>
            <p>{course?.description}</p>
            <p>Duration: {course?.duration}</p>
            <p>Level: {course?.level}</p>
        </div>
    );
}
```

#### Create Course (Admin)

```tsx
"use client";

import { useCreateCourse } from "@/lib/hooks";

export default function CreateCourseForm() {
    const createCourseMutation = useCreateCourse();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createCourseMutation.mutateAsync({
            title: "New Course",
            slug: "new-course",
            description: "Course description",
            price: 99,
            level: "Beginner",
            published: true,
        });
        // Success: shows toast + invalidates course list
    };

    return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

---

### **Enrollments**

#### Get User's Enrollments

```tsx
"use client";

import { useMyEnrollments } from "@/lib/hooks";

export default function MyCoursesPage() {
    const { data, isLoading } = useMyEnrollments({
        status: "active",
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2>My Enrolled Courses</h2>
            {data?.data.enrollments.map((enrollment) => (
                <div key={enrollment._id}>
                    <p>Progress: {enrollment.progress}%</p>
                    <p>Status: {enrollment.status}</p>
                </div>
            ))}
        </div>
    );
}
```

#### Check Enrollment Status

```tsx
"use client";

import { useCheckEnrollment } from "@/lib/hooks";

export default function EnrollButton({ courseId }: { courseId: string }) {
    const { data, isLoading } = useCheckEnrollment(courseId);

    if (isLoading) return <div>Checking...</div>;

    if (data?.data.enrolled) {
        return <button disabled>Already Enrolled</button>;
    }

    return <button>Enroll Now</button>;
}
```

#### Create Enrollment

```tsx
"use client";

import { useCreateEnrollment } from "@/lib/hooks";

export default function EnrollButton({ courseId }: { courseId: string }) {
    const enrollMutation = useCreateEnrollment();

    const handleEnroll = async () => {
        await enrollMutation.mutateAsync({
            courseId,
            paymentId: "payment_123",
            paymentMethod: "stripe",
            amount: 99,
        });
        // Success: shows toast, invalidates enrollment queries
    };

    return (
        <button onClick={handleEnroll} disabled={enrollMutation.isPending}>
            {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
        </button>
    );
}
```

---

### **Blogs**

#### Fetch All Blogs

```tsx
"use client";

import { useBlogs } from "@/lib/hooks";

export default function BlogsPage() {
    const { data, isLoading } = useBlogs({
        page: 1,
        limit: 10,
        published: true,
    });

    if (isLoading) return <div>Loading blogs...</div>;

    return (
        <div>
            {data?.data.blogs.map((blog) => (
                <article key={blog._id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.excerpt}</p>
                    <span>{blog.readTime}</span>
                </article>
            ))}
        </div>
    );
}
```

---

### **Webinars**

#### Get Upcoming Webinars

```tsx
"use client";

import { useUpcomingWebinars } from "@/lib/hooks";

export default function UpcomingWebinarsSection() {
    const { data, isLoading } = useUpcomingWebinars(5);

    if (isLoading) return <div>Loading webinars...</div>;

    return (
        <div>
            <h2>Upcoming Webinars</h2>
            {data?.data.webinars.map((webinar) => (
                <div key={webinar._id}>
                    <h3>{webinar.title}</h3>
                    <p>Date: {webinar.date}</p>
                    <p>Time: {webinar.time}</p>
                </div>
            ))}
        </div>
    );
}
```

#### Register for Webinar

```tsx
"use client";

import { useCreateRegistration } from "@/lib/hooks";

export default function WebinarRegistrationForm({
    webinarId,
}: {
    webinarId: string;
}) {
    const registerMutation = useCreateRegistration();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await registerMutation.mutateAsync({
            name: "John Doe",
            email: "john@example.com",
            phone: "+1234567890",
            webinarId,
        });
        // Success: shows toast
    };

    return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

---

## 🎯 Best Practices

### **1. Query Keys**

Use exported query keys for cache invalidation:

```tsx
import { courseKeys } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

// Invalidate all course queries
queryClient.invalidateQueries({ queryKey: courseKeys.all });

// Invalidate specific course
queryClient.invalidateQueries({ queryKey: courseKeys.detail("course-id") });
```

### **2. Error Handling**

Errors are automatically handled with toast notifications. For custom handling:

```tsx
const mutation = useCreateCourse();

mutation.mutate(data, {
    onError: (error) => {
        console.error("Custom error handling:", error);
    },
    onSuccess: (data) => {
        console.log("Custom success handling:", data);
    },
});
```

### **3. Loading States**

```tsx
const { data, isLoading, isFetching, error } = useCourses();

// isLoading: true on first load
// isFetching: true during background refetch
// error: contains error object if request failed
```

### **4. Optimistic Updates**

For instant UI updates before API response:

```tsx
const mutation = useUpdateCourse();

mutation.mutate(
    { id, data },
    {
        onMutate: async (variables) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({
                queryKey: courseKeys.detail(id),
            });

            // Snapshot previous value
            const previousCourse = queryClient.getQueryData(
                courseKeys.detail(id),
            );

            // Optimistically update
            queryClient.setQueryData(courseKeys.detail(id), {
                ...previousCourse,
                ...variables.data,
            });

            return { previousCourse };
        },
        onError: (err, variables, context) => {
            // Rollback on error
            queryClient.setQueryData(
                courseKeys.detail(id),
                context?.previousCourse,
            );
        },
    },
);
```

---

## 🔍 React Query DevTools

In development mode, React Query DevTools is available at the bottom-right corner. It shows:

- All active queries
- Query states (loading, success, error)
- Cache data
- Refetch controls

---

## 🚨 Common Issues

### **1. "401 Unauthorized"**

- Check if token is in localStorage
- Token might be expired
- Use `useCurrentUser` to verify auth state

### **2. CORS Errors**

- Ensure backend allows frontend origin
- Check `NEXT_PUBLIC_API_URL` is correct

### **3. Stale Data**

- Adjust `staleTime` in query options
- Use `refetch()` to force refresh
- Invalidate queries after mutations

---

## 📖 Additional Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [Backend API Documentation](https://innodemmy-backend-app.onrender.com/api-docs)

---

**Last Updated**: February 24, 2026  
**Maintained By**: Innodemy Development Team
