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
    Mail,
    Phone,
    Calendar,
    MessageSquare,
    CheckCircle,
    Clock,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface ConsultationRequest {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    message?: string;
    status: "pending" | "contacted" | "completed";
    createdAt: string;
}

export default function AdminConsultationRequestsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [requests, setRequests] = useState<ConsultationRequest[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<
        ConsultationRequest[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (user && user.role !== "admin") {
            router.push("/");
            return;
        }

        if (user) {
            fetchRequests();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, router]);

    useEffect(() => {
        // Filter requests based on search term
        if (searchTerm.trim() === "") {
            setFilteredRequests(requests);
        } else {
            const filtered = requests.filter(
                (req) =>
                    req.fullName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    req.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    req.phoneNumber.includes(searchTerm) ||
                    (req.message &&
                        req.message
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())),
            );
            setFilteredRequests(filtered);
        }
    }, [searchTerm, requests]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await fetch("/api/admin/consultation-requests", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setRequests(data.requests || []);
                setFilteredRequests(data.requests || []);
            } else if (response.status === 403 || response.status === 401) {
                console.error("Authentication failed - redirecting to login");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                router.push("/");
            } else {
                console.error("Failed to fetch consultation requests:", data);
            }
        } catch (error) {
            console.error("Error fetching consultation requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (filteredRequests.length === 0) return;

        // CSV Headers
        const headers = [
            "Full Name",
            "Email",
            "Phone Number",
            "Message",
            "Status",
            "Requested On",
        ];

        // CSV Rows
        const rows = filteredRequests.map((req) => [
            req.fullName,
            req.email,
            req.phoneNumber,
            req.message || "",
            req.status,
            new Date(req.createdAt).toLocaleString(),
        ]);

        // Create CSV content
        const csvContent = [
            headers.join(","),
            ...rows.map((row) =>
                row
                    .map((cell) => `"${cell.toString().replace(/"/g, '""')}"`)
                    .join(","),
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
            `consultation-requests-${new Date().toISOString().split("T")[0]}.csv`,
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            case "contacted":
                return (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                        <Phone className="w-3 h-3 mr-1" />
                        Contacted
                    </Badge>
                );
            case "completed":
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                    </Badge>
                );
            default:
                return <Badge>{status}</Badge>;
        }
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

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Consultation Requests
                </h1>
                <p className="text-muted-foreground">
                    Manage and export consultation request data
                </p>
            </div>

            {/* Search and Export Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                    placeholder="Search by name, email, phone, or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                />
                <Button
                    onClick={exportToCSV}
                    disabled={filteredRequests.length === 0}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Export to CSV ({filteredRequests.length})
                </Button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : filteredRequests.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                        No consultation requests found
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {searchTerm
                            ? "Try adjusting your search criteria"
                            : "Consultation requests will appear here once users submit the form"}
                    </p>
                </div>
            ) : (
                <div className="bg-card rounded-lg border">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[150px]">
                                        Name
                                    </TableHead>
                                    <TableHead className="min-w-[200px]">
                                        Email
                                    </TableHead>
                                    <TableHead className="min-w-[120px]">
                                        Phone
                                    </TableHead>
                                    <TableHead className="min-w-[200px]">
                                        Message
                                    </TableHead>
                                    <TableHead className="min-w-[100px]">
                                        Status
                                    </TableHead>
                                    <TableHead className="min-w-[180px]">
                                        Requested On
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRequests.map((req) => (
                                    <TableRow key={req._id}>
                                        <TableCell className="font-medium">
                                            {req.fullName}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={`mailto:${req.email}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {req.email}
                                                </a>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={`tel:${req.phoneNumber}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {req.phoneNumber}
                                                </a>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {req.message ? (
                                                <div className="flex items-start gap-2">
                                                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm line-clamp-2">
                                                        {req.message}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-muted-foreground italic">
                                                    No message
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(req.status)}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(
                                                req.createdAt,
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

            {/* Summary Stats */}
            {!loading && filteredRequests.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-card rounded-lg border p-4">
                        <div className="text-2xl font-bold text-primary">
                            {filteredRequests.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Total Requests
                        </div>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <div className="text-2xl font-bold text-yellow-600">
                            {
                                filteredRequests.filter(
                                    (r) => r.status === "pending",
                                ).length
                            }
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Pending
                        </div>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <div className="text-2xl font-bold text-green-600">
                            {
                                filteredRequests.filter(
                                    (r) => r.status === "completed",
                                ).length
                            }
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Completed
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
