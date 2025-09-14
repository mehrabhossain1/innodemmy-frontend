"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, DollarSign, CheckCircle } from "lucide-react";

interface UserData {
    _id: string;
    name: string;
    email: string;
    role: "student" | "admin";
    createdAt: string;
}

interface CourseData {
    _id: string;
    title: string;
    description: string;
    price: number;
    instructor: string;
    isActive: boolean;
}

interface EnrollmentData {
    _id: string;
    userId: string;
    courseId: string;
    status: "pending" | "approved" | "rejected";
    paymentAmount: number;
    user: { name: string; email: string };
    course: { title: string };
    createdAt: string;
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [courses, setCourses] = useState<CourseData[]>([]);
    const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [showCreateCourse, setShowCreateCourse] = useState(false);
    const router = useRouter();

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "student" as "student" | "admin",
    });

    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        price: 0,
        instructor: "",
        duration: "",
        level: "beginner" as "beginner" | "intermediate" | "advanced",
        category: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token || !user) {
            router.push("/login");
            return;
        }

        const userData = JSON.parse(user);
        if (userData.role !== "admin") {
            router.push("/dashboard");
            return;
        }

        fetchData();
    }, [router]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
                fetch("/api/admin/users", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch("/api/admin/courses", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch("/api/admin/enrollments", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            const [usersData, coursesData, enrollmentsData] = await Promise.all(
                [usersRes.json(), coursesRes.json(), enrollmentsRes.json()]
            );

            setUsers(usersData.users || []);
            setCourses(coursesData.courses || []);
            setEnrollments(enrollmentsData.enrollments || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/admin/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                setShowCreateUser(false);
                setNewUser({
                    name: "",
                    email: "",
                    password: "",
                    role: "student",
                });
                fetchData();
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleCreateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/admin/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newCourse),
            });

            if (response.ok) {
                setShowCreateCourse(false);
                setNewCourse({
                    title: "",
                    description: "",
                    price: 0,
                    instructor: "",
                    duration: "",
                    level: "beginner",
                    category: "",
                });
                fetchData();
            }
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    const handleEnrollmentStatus = async (
        enrollmentId: string,
        status: "approved" | "rejected"
    ) => {
        try {
            const token = localStorage.getItem("token");
            console.log(
                "Updating enrollment:",
                enrollmentId,
                "to status:",
                status
            );

            const response = await fetch(
                `/api/admin/enrollments/${enrollmentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            console.log("Response status:", response.status);

            if (response.ok) {
                const result = await response.json();
                console.log("Update successful:", result);
                fetchData();
                alert(`Enrollment ${status} successfully!`);
            } else {
                const error = await response.json();
                console.error("Update failed:", error);
                alert(
                    `Failed to ${status} enrollment: ${
                        error.error || "Unknown error"
                    }`
                );
            }
        } catch (error) {
            console.error("Error updating enrollment:", error);
            alert("Network error. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const stats = {
        totalUsers: users.length,
        totalCourses: courses.length,
        pendingEnrollments: enrollments.filter((e) => e.status === "pending")
            .length,
        totalRevenue: enrollments
            .filter((e) => e.status === "approved")
            .reduce((sum, e) => sum + e.paymentAmount, 0),
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="flex space-x-1 mb-8">
                    {[
                        { id: "overview", label: "Overview" },
                        { id: "users", label: "Users" },
                        { id: "courses", label: "Courses" },
                        { id: "enrollments", label: "Enrollments" },
                    ].map((tab) => (
                        <Button
                            key={tab.id}
                            variant={
                                activeTab === tab.id ? "default" : "outline"
                            }
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>

                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Users
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.totalUsers}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Courses
                                </CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.totalCourses}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Pending Enrollments
                                </CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.pendingEnrollments}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Revenue
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    ${stats.totalRevenue}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === "users" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Users</h2>
                            <Button onClick={() => setShowCreateUser(true)}>
                                Create User
                            </Button>
                        </div>

                        {showCreateUser && (
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Create New User</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleCreateUser}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name">
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={newUser.name}
                                                    onChange={(e) =>
                                                        setNewUser({
                                                            ...newUser,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={newUser.email}
                                                    onChange={(e) =>
                                                        setNewUser({
                                                            ...newUser,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="password">
                                                    Password
                                                </Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={newUser.password}
                                                    onChange={(e) =>
                                                        setNewUser({
                                                            ...newUser,
                                                            password:
                                                                e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="role">
                                                    Role
                                                </Label>
                                                <Select
                                                    value={newUser.role}
                                                    onValueChange={(
                                                        value:
                                                            | "student"
                                                            | "admin"
                                                    ) =>
                                                        setNewUser({
                                                            ...newUser,
                                                            role: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="student">
                                                            Student
                                                        </SelectItem>
                                                        <SelectItem value="admin">
                                                            Admin
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button type="submit">
                                                Create User
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setShowCreateUser(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid gap-4">
                            {users.map((user) => (
                                <Card key={user._id}>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {user.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {user.email}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Created:{" "}
                                                    {new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Badge
                                                variant={
                                                    user.role === "admin"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {user.role}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "courses" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Courses</h2>
                            <Button onClick={() => setShowCreateCourse(true)}>
                                Create Course
                            </Button>
                        </div>

                        {showCreateCourse && (
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Create New Course</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleCreateCourse}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="title">
                                                    Title
                                                </Label>
                                                <Input
                                                    id="title"
                                                    value={newCourse.title}
                                                    onChange={(e) =>
                                                        setNewCourse({
                                                            ...newCourse,
                                                            title: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="instructor">
                                                    Instructor
                                                </Label>
                                                <Input
                                                    id="instructor"
                                                    value={newCourse.instructor}
                                                    onChange={(e) =>
                                                        setNewCourse({
                                                            ...newCourse,
                                                            instructor:
                                                                e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="price">
                                                    Price
                                                </Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    value={newCourse.price}
                                                    onChange={(e) =>
                                                        setNewCourse({
                                                            ...newCourse,
                                                            price: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="duration">
                                                    Duration
                                                </Label>
                                                <Input
                                                    id="duration"
                                                    value={newCourse.duration}
                                                    onChange={(e) =>
                                                        setNewCourse({
                                                            ...newCourse,
                                                            duration:
                                                                e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="level">
                                                    Level
                                                </Label>
                                                <Select
                                                    value={newCourse.level}
                                                    onValueChange={(
                                                        value:
                                                            | "beginner"
                                                            | "intermediate"
                                                            | "advanced"
                                                    ) =>
                                                        setNewCourse({
                                                            ...newCourse,
                                                            level: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="beginner">
                                                            Beginner
                                                        </SelectItem>
                                                        <SelectItem value="intermediate">
                                                            Intermediate
                                                        </SelectItem>
                                                        <SelectItem value="advanced">
                                                            Advanced
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="category">
                                                    Category
                                                </Label>
                                                <Input
                                                    id="category"
                                                    value={newCourse.category}
                                                    onChange={(e) =>
                                                        setNewCourse({
                                                            ...newCourse,
                                                            category:
                                                                e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="description">
                                                Description
                                            </Label>
                                            <Input
                                                id="description"
                                                value={newCourse.description}
                                                onChange={(e) =>
                                                    setNewCourse({
                                                        ...newCourse,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button type="submit">
                                                Create Course
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setShowCreateCourse(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid gap-4">
                            {courses.map((course) => (
                                <Card key={course._id}>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {course.description}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Instructor:{" "}
                                                    {course.instructor}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Price: ${course.price}
                                                </p>
                                            </div>
                                            <Badge
                                                variant={
                                                    course.isActive
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {course.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "enrollments" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">
                            Enrollment Requests
                        </h2>
                        <div className="grid gap-4">
                            {enrollments.map((enrollment) => (
                                <Card key={enrollment._id}>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {enrollment.user.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {enrollment.user.email}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Course:{" "}
                                                    {enrollment.course.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Amount: $
                                                    {enrollment.paymentAmount}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Requested:{" "}
                                                    {new Date(
                                                        enrollment.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <Badge
                                                    variant={
                                                        enrollment.status ===
                                                        "approved"
                                                            ? "default"
                                                            : enrollment.status ===
                                                              "rejected"
                                                            ? "destructive"
                                                            : "secondary"
                                                    }
                                                >
                                                    {enrollment.status}
                                                </Badge>
                                                {enrollment.status ===
                                                    "pending" && (
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            size="sm"
                                                            onClick={() =>
                                                                handleEnrollmentStatus(
                                                                    enrollment._id,
                                                                    "approved"
                                                                )
                                                            }
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                handleEnrollmentStatus(
                                                                    enrollment._id,
                                                                    "rejected"
                                                                )
                                                            }
                                                        >
                                                            Reject
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
