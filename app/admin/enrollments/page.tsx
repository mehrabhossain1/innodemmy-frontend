"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

interface Enrollment {
    _id: string;
    userId?: string;
    courseId?: string;
    name?: string;
    email?: string;
    phone?: string;
    courseTitle?: string;
    status: "pending" | "approved" | "rejected";
    paymentMethod: string;
    transactionId: string;
    paymentNumberLastDigits?: string;
    amount: number;
    createdAt: string;
    user?: {
        name: string;
        email: string;
    };
    course?: {
        title: string;
    };
}

export default function AdminEnrollmentsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        if (user && user.role !== "admin") {
            router.push("/");
        }
    }, [user, router]);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/admin/enrollments", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                setEnrollments(data.enrollments || []);
            } else {
                const errorText = await response.text();
                console.error("Failed to fetch enrollments. Status:", response.status, "Error:", errorText);
            }
        } catch (error) {
            console.error("Failed to fetch enrollments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (enrollmentId: string) => {
        setActionLoading(enrollmentId);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `/api/admin/enrollments/${enrollmentId}/approve`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // Refresh enrollments
                await fetchEnrollments();
            } else {
                const data = await response.json();
                alert(data.error || "Failed to approve enrollment");
            }
        } catch (error) {
            console.error("Failed to approve:", error);
            alert("Failed to approve enrollment");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (enrollmentId: string) => {
        setActionLoading(enrollmentId);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `/api/admin/enrollments/${enrollmentId}/reject`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // Refresh enrollments
                await fetchEnrollments();
            } else {
                const data = await response.json();
                alert(data.error || "Failed to reject enrollment");
            }
        } catch (error) {
            console.error("Failed to reject:", error);
            alert("Failed to reject enrollment");
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                );
            case "approved":
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                    </Badge>
                );
            default:
                return <Badge>{status}</Badge>;
        }
    };

    if (!user || user.role !== "admin") {
        return null;
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Enrollment Requests
                </h1>
                <p className="text-gray-600 mt-2">
                    Manage student enrollment requests
                </p>
            </div>

            <div className="bg-white rounded-lg shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Last 4 Digits</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {enrollments.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={10}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No enrollment requests found
                                </TableCell>
                            </TableRow>
                        ) : (
                            enrollments.map((enrollment) => (
                                <TableRow key={enrollment._id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">
                                                {enrollment.user?.name || enrollment.name || "N/A"}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {enrollment.user?.email || enrollment.email || "N/A"}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {enrollment.phone || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {enrollment.course?.title || enrollment.courseTitle || "N/A"}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {enrollment.paymentMethod}
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {enrollment.transactionId}
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {enrollment.paymentNumberLastDigits || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {enrollment.amount} BDT
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(enrollment.status)}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {new Date(
                                            enrollment.createdAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {enrollment.status === "pending" && (
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        handleApprove(
                                                            enrollment._id
                                                        )
                                                    }
                                                    disabled={
                                                        actionLoading ===
                                                        enrollment._id
                                                    }
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    {actionLoading ===
                                                    enrollment._id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <CheckCircle className="w-4 h-4 mr-1" />
                                                            Approve
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        handleReject(
                                                            enrollment._id
                                                        )
                                                    }
                                                    disabled={
                                                        actionLoading ===
                                                        enrollment._id
                                                    }
                                                >
                                                    {actionLoading ===
                                                    enrollment._id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <XCircle className="w-4 h-4 mr-1" />
                                                            Reject
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
