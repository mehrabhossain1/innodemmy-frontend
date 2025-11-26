"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Plus,
    Edit,
    Trash2,
    Search,
    Eye,
    CheckCircle,
    XCircle
} from "lucide-react";
import Link from "next/link";

interface Course {
    _id: string;
    title: string;
    category: string;
    price: number;
    level: string;
    totalJoined?: number;
    isActive: boolean;
    createdAt: string;
}

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        const filtered = courses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(filtered);
    }, [searchTerm, courses]);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses');
            if (response.ok) {
                const data = await response.json();
                setCourses(data.courses || []);
                setFilteredCourses(data.courses || []);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (courseId: string) => {
        if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            return;
        }

        setDeleting(courseId);
        try {
            const response = await fetch(`/api/courses/${courseId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setCourses(courses.filter(c => c._id !== courseId));
                alert('Course deleted successfully!');
            } else {
                alert('Failed to delete course');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Error deleting course');
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-700">Loading courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
                            <p className="text-gray-600 mt-1">Manage all courses, modules, and content</p>
                        </div>
                        <Link href="/admin/courses/new">
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Course
                            </Button>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Search courses by title or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-gray-600 text-sm font-medium">Total Courses</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{courses.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-gray-600 text-sm font-medium">Active Courses</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {courses.filter(c => c.isActive).length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-gray-600 text-sm font-medium">Inactive Courses</h3>
                        <p className="text-3xl font-bold text-gray-400 mt-2">
                            {courses.filter(c => !c.isActive).length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-gray-600 text-sm font-medium">Total Students</h3>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">
                            {courses.reduce((sum, c) => sum + (c.totalJoined || 0), 0)}
                        </p>
                    </div>
                </div>

                {/* Courses Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                        {searchTerm ? 'No courses found matching your search.' : 'No courses available. Click "Add New Course" to create one.'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCourses.map((course) => (
                                    <TableRow key={course._id}>
                                        <TableCell className="font-medium">{course.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{course.category}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{course.level}</Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold">৳{course.price}</TableCell>
                                        <TableCell>{course.totalJoined || 0}</TableCell>
                                        <TableCell>
                                            {course.isActive ? (
                                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                                                    <XCircle className="w-3 h-3 mr-1" />
                                                    Inactive
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link href={`/courses/${course._id}`} target="_blank">
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/courses/${course._id}/edit`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="w-4 h-4 text-blue-600" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(course._id)}
                                                    disabled={deleting === course._id}
                                                >
                                                    {deleting === course._id ? (
                                                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                    )}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Info Message */}
                {courses.length === 0 && !loading && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                        <h3 className="text-blue-900 font-semibold mb-2">Get Started</h3>
                        <p className="text-blue-700 mb-4">
                            You haven't created any courses yet. Click the "Add New Course" button above to create your first course.
                        </p>
                        <p className="text-blue-600 text-sm">
                            You can also seed the Python Programming Fundamentals course by running: <code className="bg-blue-100 px-2 py-1 rounded">npx ts-node scripts/seed-python-course.ts</code>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
