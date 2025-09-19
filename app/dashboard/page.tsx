"use client";

import { useAuth } from "@/lib/hooks/useAuth";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { BookOpen, Clock, CheckCircle, XCircle, Play } from "lucide-react";
// import Link from "next/link";

// interface Course {
//     _id: string;
//     title: string;
//     description: string;
//     price: number;
//     instructor: string;
//     duration: string;
//     level: string;
//     category: string;
// }

// interface Enrollment {
//     _id: string;
//     courseId: string;
//     status: "pending" | "approved" | "rejected";
//     paymentAmount: number;
//     course: Course;
//     createdAt: string;
// }

export default function DashboardPage() {
    // const { user } = useAuth();
    // console.log("user in dashboard page:", user);

    // const [courses, setCourses] = useState<Course[]>([]);
    // const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const token = localStorage.getItem("token");

    //         const [coursesRes, enrollmentsRes] = await Promise.all([
    //             fetch("/api/courses"),
    //             fetch("/api/enrollments", {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             }),
    //         ]);

    //         const [coursesData, enrollmentsData] = await Promise.all([
    //             coursesRes.json(),
    //             enrollmentsRes.json(),
    //         ]);

    //         setCourses(coursesData.courses || []);
    //         setEnrollments(enrollmentsData.enrollments || []);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleEnroll = async (courseId: string) => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const response = await fetch("/api/enrollments", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             body: JSON.stringify({
    //                 courseId,
    //                 paymentProof: "Payment proof uploaded", // In real app, this would be a file upload
    //                 paymentAmount:
    //                     courses.find((c) => c._id === courseId)?.price || 0,
    //                 paymentMethod: "Bank Transfer",
    //                 transactionId: `TXN-${Date.now()}`,
    //             }),
    //         });

    //         if (response.ok) {
    //             fetchData();
    //             alert("Enrollment request submitted successfully!");
    //         } else {
    //             alert("Failed to submit enrollment request");
    //         }
    //     } catch (error) {
    //         console.error("Error enrolling:", error);
    //         alert("Error submitting enrollment request");
    //     }
    // };

    // if (loading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             Loading...
    //         </div>
    //     );
    // }

    // const isEnrolled = (courseId: string) => {
    //     const enrollment = enrollments.find((e) => e.courseId === courseId);
    //     return enrollment && enrollment.status === "approved";
    // };

    // const hasPendingEnrollment = (courseId: string) => {
    //     const enrollment = enrollments.find((e) => e.courseId === courseId);
    //     return enrollment && enrollment.status === "pending";
    // };

    return (
        // <div className="space-y-8">
        //     <div>
        //         <h2 className="text-2xl font-bold mb-4">My Enrollments</h2>
        //         {enrollments.length === 0 ? (
        //             <p className="text-gray-600">
        //                 You haven't enrolled in any courses yet.
        //             </p>
        //         ) : (
        //             <div className="grid gap-4">
        //                 {enrollments.map((enrollment) => (
        //                     <Card key={enrollment._id}>
        //                         <CardContent className="p-6">
        //                             <div className="flex justify-between items-center">
        //                                 <div>
        //                                     <h3 className="font-semibold">
        //                                         {enrollment.course?.title ||
        //                                             "Course not found"}
        //                                     </h3>
        //                                     <p className="text-sm text-gray-600">
        //                                         {enrollment.course
        //                                             ?.description ||
        //                                             "No description available"}
        //                                     </p>
        //                                     <p className="text-sm text-gray-500">
        //                                         Amount: $
        //                                         {enrollment.paymentAmount}
        //                                     </p>
        //                                     <p className="text-xs text-gray-500">
        //                                         Requested:{" "}
        //                                         {new Date(
        //                                             enrollment.createdAt
        //                                         ).toLocaleDateString()}
        //                                     </p>
        //                                 </div>
        //                                 <div className="flex items-center space-x-2">
        //                                     {enrollment.status ===
        //                                         "approved" && (
        //                                         <CheckCircle className="h-5 w-5 text-green-500" />
        //                                     )}
        //                                     {enrollment.status ===
        //                                         "rejected" && (
        //                                         <XCircle className="h-5 w-5 text-red-500" />
        //                                     )}
        //                                     {enrollment.status ===
        //                                         "pending" && (
        //                                         <Clock className="h-5 w-5 text-yellow-500" />
        //                                     )}
        //                                     <Badge
        //                                         variant={
        //                                             enrollment.status ===
        //                                             "approved"
        //                                                 ? "default"
        //                                                 : enrollment.status ===
        //                                                   "rejected"
        //                                                 ? "destructive"
        //                                                 : "secondary"
        //                                         }
        //                                     >
        //                                         {enrollment.status}
        //                                     </Badge>
        //                                     {enrollment.status ===
        //                                         "approved" && (
        //                                         <Link
        //                                             href={`/dashboard/courses/${enrollment.courseId}/watch`}
        //                                         >
        //                                             <Button
        //                                                 size="sm"
        //                                                 className="ml-2"
        //                                             >
        //                                                 <Play className="w-4 h-4 mr-2" />
        //                                                 Watch Course
        //                                             </Button>
        //                                         </Link>
        //                                     )}
        //                                 </div>
        //                             </div>
        //                         </CardContent>
        //                     </Card>
        //                 ))}
        //             </div>
        //         )}
        //     </div>

        //     <div>
        //         <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
        //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        //             {courses.map((course) => {
        //                 const enrolled = isEnrolled(course._id);
        //                 const pending = hasPendingEnrollment(course._id);

        //                 return (
        //                     <Card key={course._id}>
        //                         <CardHeader>
        //                             <CardTitle className="flex items-center space-x-2">
        //                                 <BookOpen className="h-5 w-5" />
        //                                 <span>{course.title}</span>
        //                             </CardTitle>
        //                             <CardDescription>
        //                                 {course.description}
        //                             </CardDescription>
        //                         </CardHeader>
        //                         <CardContent>
        //                             <div className="space-y-2 mb-4">
        //                                 <p className="text-sm">
        //                                     <strong>Instructor:</strong>{" "}
        //                                     {course.instructor}
        //                                 </p>
        //                                 <p className="text-sm">
        //                                     <strong>Duration:</strong>{" "}
        //                                     {course.duration}
        //                                 </p>
        //                                 <p className="text-sm">
        //                                     <strong>Level:</strong>{" "}
        //                                     {course.level}
        //                                 </p>
        //                                 <p className="text-sm">
        //                                     <strong>Category:</strong>{" "}
        //                                     {course.category}
        //                                 </p>
        //                                 <p className="text-lg font-semibold text-green-600">
        //                                     ${course.price}
        //                                 </p>
        //                             </div>

        //                             <div className="flex justify-between items-center">
        //                                 {enrolled ? (
        //                                     <Badge variant="default">
        //                                         Enrolled
        //                                     </Badge>
        //                                 ) : pending ? (
        //                                     <Badge variant="secondary">
        //                                         Pending Approval
        //                                     </Badge>
        //                                 ) : (
        //                                     <Button
        //                                         onClick={() =>
        //                                             handleEnroll(course._id)
        //                                         }
        //                                         className="w-full"
        //                                     >
        //                                         Enroll Now
        //                                     </Button>
        //                                 )}
        //                             </div>
        //                         </CardContent>
        //                     </Card>
        //                 );
        //             })}
        //         </div>
        //     </div>
        // </div>
        <div>
            <h1>Dashboard Page</h1>
        </div>
    );
}
