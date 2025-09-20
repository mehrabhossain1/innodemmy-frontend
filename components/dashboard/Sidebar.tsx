import { BookOpen, Star } from "lucide-react";
import React from "react";

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-100 rounded-lg border min-h-screen">
            <div className="p-4 space-y-2">
                {/* My Courses - Active */}
                <div className="flex items-center space-x-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">
                        My Courses
                    </span>
                </div>

                {/* Reviews */}
                <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Star className="w-5 h-5" />
                    <span>Reviews</span>
                </div>
            </div>
        </div>
    );
}
