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
    Calendar,
    Phone,
    Mail,
    GraduationCap,
    Building2,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface WebinarRegistration {
    _id: string;
    webinarId: string;
    fullName: string;
    email: string;
    phone: string;
    qualification: string;
    institution: string;
    createdAt: string;
}

export default function AdminWebinarRegistrationsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [registrations, setRegistrations] = useState<WebinarRegistration[]>(
        []
    );
    const [filteredRegistrations, setFilteredRegistrations] = useState<
        WebinarRegistration[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (user && user.role !== "admin") {
            router.push("/");
            return;
        }

        if (user) {
            fetchRegistrations();
        }
    }, [user, router]);

    useEffect(() => {
        // Filter registrations based on search term
        if (searchTerm.trim() === "") {
            setFilteredRegistrations(registrations);
        } else {
            const filtered = registrations.filter(
                (reg) =>
                    reg.fullName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    reg.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    reg.phone.includes(searchTerm) ||
                    reg.webinarId
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    reg.qualification
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    reg.institution
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
            setFilteredRegistrations(filtered);
        }
    }, [searchTerm, registrations]);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await fetch("/api/admin/webinar-registrations", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setRegistrations(data.registrations || []);
                setFilteredRegistrations(data.registrations || []);
            }
        } catch (error) {
            console.error("Error fetching registrations:", error);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (filteredRegistrations.length === 0) return;

        // CSV Headers
        const headers = [
            "Full Name",
            "Email",
            "Phone",
            "Qualification",
            "Institution",
            "Webinar ID",
            "Registration Date",
        ];

        // CSV Rows
        const rows = filteredRegistrations.map((reg) => [
            reg.fullName,
            reg.email,
            reg.phone,
            reg.qualification,
            reg.institution,
            reg.webinarId,
            new Date(reg.createdAt).toLocaleString(),
        ]);

        // Create CSV content
        const csvContent = [
            headers.join(","),
            ...rows.map((row) =>
                row
                    .map((cell) => `"${cell.toString().replace(/"/g, '""')}"`)
                    .join(",")
            ),
        ].join("\\n");

        // Create blob and download
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
            "download",
            `webinar-registrations-${
                new Date().toISOString().split("T")[0]
            }.csv`
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

    // Group registrations by webinar
    const registrationsByWebinar = filteredRegistrations.reduce((acc, reg) => {
        if (!acc[reg.webinarId]) {
            acc[reg.webinarId] = [];
        }
        acc[reg.webinarId].push(reg);
        return acc;
    }, {} as Record<string, WebinarRegistration[]>);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Webinar Registrations
                </h1>
                <p className="text-muted-foreground">
                    Manage and export webinar registration data
                </p>
            </div>

            {/* Search and Export Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                    placeholder="Search by name, email, phone, webinar, etc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                />
                <Button
                    onClick={exportToCSV}
                    disabled={filteredRegistrations.length === 0}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Export to CSV ({filteredRegistrations.length})
                </Button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : filteredRegistrations.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                        No registrations found
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {searchTerm
                            ? "Try adjusting your search criteria"
                            : "Registrations will appear here once users sign up"}
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(registrationsByWebinar).map(
                        ([webinarId, regs]) => (
                            <div
                                key={webinarId}
                                className="bg-card rounded-lg border"
                            >
                                <div className="p-4 border-b bg-muted/30">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                {webinarId}
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                {regs.length} registration
                                                {regs.length !== 1 ? "s" : ""}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="text-lg px-4 py-1"
                                        >
                                            {regs.length}
                                        </Badge>
                                    </div>
                                </div>

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
                                                    Qualification
                                                </TableHead>
                                                <TableHead className="min-w-[200px]">
                                                    Institution
                                                </TableHead>
                                                <TableHead className="min-w-[150px]">
                                                    Registered On
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {regs.map((reg) => (
                                                <TableRow key={reg._id}>
                                                    <TableCell className="font-medium">
                                                        {reg.fullName}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                                            <a
                                                                href={`mailto:${reg.email}`}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                {reg.email}
                                                            </a>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                                            <a
                                                                href={`tel:${reg.phone}`}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                {reg.phone}
                                                            </a>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                            <span>
                                                                {
                                                                    reg.qualification
                                                                }
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Building2 className="h-4 w-4 text-muted-foreground" />
                                                            <span>
                                                                {
                                                                    reg.institution
                                                                }
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-sm text-muted-foreground">
                                                        {new Date(
                                                            reg.createdAt
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            {/* Summary Stats */}
            {!loading && filteredRegistrations.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-card rounded-lg border p-4">
                        <div className="text-2xl font-bold text-primary">
                            {filteredRegistrations.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Total Registrations
                        </div>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <div className="text-2xl font-bold text-primary">
                            {Object.keys(registrationsByWebinar).length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Active Webinars
                        </div>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <div className="text-2xl font-bold text-primary">
                            {Math.max(
                                ...Object.values(registrationsByWebinar).map(
                                    (r) => r.length
                                )
                            )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Most Popular Webinar
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
