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
import {
    Download,
    Loader2,
    User,
    Mail,
    Calendar,
    Shield,
    CheckCircle,
    XCircle,
    Users as UsersIcon,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface User {
    _id: string;
    name: string;
    email: string;
    role: "student" | "admin";
    isVerified: boolean;
    otpAttempts: number;
    createdAt: string;
    updatedAt: string;
}

export default function AdminUsersPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (user && user.role !== "admin") {
            router.push("/");
            return;
        }

        if (user) {
            fetchUsers();
        }
    }, [user, router]);

    useEffect(() => {
        // Filter users based on search term
        if (searchTerm.trim() === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(
                (u) =>
                    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u._id.includes(searchTerm)
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await fetch("/api/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setUsers(data.users || []);
                setFilteredUsers(data.users || []);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (filteredUsers.length === 0) return;

        // CSV Headers
        const headers = [
            "ID",
            "Name",
            "Email",
            "Role",
            "Verified",
            "OTP Attempts",
            "Created At",
            "Updated At",
        ];

        // CSV Rows
        const rows = filteredUsers.map((u) => [
            u._id,
            u.name,
            u.email,
            u.role,
            u.isVerified ? "Yes" : "No",
            u.otpAttempts.toString(),
            new Date(u.createdAt).toLocaleString(),
            new Date(u.updatedAt).toLocaleString(),
        ]);

        // Create CSV content
        const csvContent = [
            headers.join(","),
            ...rows.map((row) =>
                row
                    .map((cell) => `"${cell.toString().replace(/"/g, '""')}"`)
                    .join(",")
            ),
        ].join("\n");

        // Create blob and download
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
            "download",
            `users-${new Date().toISOString().split("T")[0]}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (user.role !== "admin") {
        return null;
    }

    // Statistics
    const totalUsers = filteredUsers.length;
    const admins = filteredUsers.filter((u) => u.role === "admin").length;
    const students = filteredUsers.filter((u) => u.role === "student").length;
    const verified = filteredUsers.filter((u) => u.isVerified).length;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">User Management</h1>
                <p className="text-muted-foreground">
                    View and manage all registered users
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-muted-foreground">
                            Total Users
                        </div>
                        <UsersIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                </div>
                <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-muted-foreground">
                            Admins
                        </div>
                        <Shield className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold">{admins}</div>
                </div>
                <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-muted-foreground">
                            Students
                        </div>
                        <User className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold">{students}</div>
                </div>
                <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-muted-foreground">
                            Verified
                        </div>
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="text-2xl font-bold">{verified}</div>
                </div>
            </div>

            {/* Search and Export Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                    placeholder="Search by name, email, role, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                />
                <Button
                    onClick={exportToCSV}
                    disabled={filteredUsers.length === 0}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Export to CSV ({filteredUsers.length})
                </Button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
                    <UsersIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">No users found</p>
                    <p className="text-sm text-muted-foreground">
                        {searchTerm
                            ? "Try adjusting your search criteria"
                            : "No users registered yet"}
                    </p>
                </div>
            ) : (
                <div className="bg-card rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[200px]">
                                        Name
                                    </TableHead>
                                    <TableHead className="min-w-[250px]">
                                        Email
                                    </TableHead>
                                    <TableHead className="min-w-[100px]">
                                        Role
                                    </TableHead>
                                    <TableHead className="min-w-[100px]">
                                        Status
                                    </TableHead>
                                    <TableHead className="min-w-[120px]">
                                        OTP Attempts
                                    </TableHead>
                                    <TableHead className="min-w-[180px]">
                                        Created At
                                    </TableHead>
                                    <TableHead className="min-w-[180px]">
                                        Last Updated
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((u) => (
                                    <TableRow key={u._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                                    {u.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <span className="font-medium">
                                                    {u.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={`mailto:${u.email}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {u.email}
                                                </a>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    u.role === "admin"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {u.role === "admin" && (
                                                    <Shield className="h-3 w-3 mr-1" />
                                                )}
                                                {u.role === "student" && (
                                                    <User className="h-3 w-3 mr-1" />
                                                )}
                                                {u.role.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {u.isVerified ? (
                                                <Badge
                                                    variant="outline"
                                                    className="border-green-500 text-green-600"
                                                >
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Verified
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="border-orange-500 text-orange-600"
                                                >
                                                    <XCircle className="h-3 w-3 mr-1" />
                                                    Unverified
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span
                                                className={
                                                    u.otpAttempts > 3
                                                        ? "text-red-600 font-semibold"
                                                        : ""
                                                }
                                            >
                                                {u.otpAttempts}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(
                                                    u.createdAt
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(
                                                u.updatedAt
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}
