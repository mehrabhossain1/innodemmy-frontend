"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const InnodemyClinicalResearchMasteryProgram = () => {
    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Back Button */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        href="/courses"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
        </div>
    );
};

export default InnodemyClinicalResearchMasteryProgram;
