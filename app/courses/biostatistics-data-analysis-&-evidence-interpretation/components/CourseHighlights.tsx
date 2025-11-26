"use client";
import {
    Rocket,
    Video,
    Users,
    Calendar,
    BookOpen,
    Clock,
} from "lucide-react";

export default function CourseHighlights() {
    return (
        <div className="space-y-6">
            {/* Top Row - Main Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-5">
                {/* Modules */}
                <div className="group relative bg-gradient-to-br from-white to-green-50/30 rounded-3xl p-6 shadow-lg shadow-green-100/50 border border-green-100/50 hover:shadow-xl hover:shadow-green-200/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full group-hover:bg-green-500/30 transition-all duration-300"></div>
                            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Rocket className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-4xl font-bold bg-gradient-to-br from-green-600 to-green-800 bg-clip-text text-transparent">
                                7
                            </div>
                            <div className="text-sm font-semibold text-gray-600">
                                Modules
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Class */}
                <div className="group relative bg-gradient-to-br from-white to-purple-50/30 rounded-3xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/30 transition-all duration-300"></div>
                            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Video className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-purple-800 bg-clip-text text-transparent">
                                7
                            </div>
                            <div className="text-sm font-semibold text-gray-600">
                                Live Classes
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row - Course Details */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Batch Number */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl p-5 shadow-md shadow-slate-200/50 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-300/50 hover:border-green-200 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                                Batch Number
                            </div>
                            <div className="text-xl font-bold text-gray-900">
                                1
                            </div>
                        </div>
                    </div>
                </div>

                {/* Start Date */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl p-5 shadow-md shadow-slate-200/50 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-300/50 hover:border-green-200 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                                Start Date
                            </div>
                            <div className="text-xl font-bold text-gray-900">
                                15 Dec, 2025
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Days */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl p-5 shadow-md shadow-slate-200/50 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-300/50 hover:border-green-200 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                                Class Days
                            </div>
                            <div className="text-xl font-bold text-gray-900">
                                Wed, Sat
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Time */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl p-5 shadow-md shadow-slate-200/50 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-300/50 hover:border-green-200 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Clock className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                                Class Time
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                9:30 - 11:00 PM
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
