"use client";
import {
    Rocket,
    Video,
    Briefcase,
    Award,
    Users,
    Calendar,
    BookOpen,
    Clock,
} from "lucide-react";

export default function CourseHighlights() {
    return (
        <div className="space-y-6">
            {/* Top Row - Main Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Modules */}
                <div className="group relative bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-100/50 hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Rocket className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                6
                            </div>
                            <div className="text-sm font-semibold text-gray-600">
                                Modules
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Class */}
                <div className="group relative bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-4 shadow-lg shadow-purple-100/50 border border-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/30 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-purple-800 bg-clip-text text-transparent">
                                35
                            </div>
                            <div className="text-sm font-semibold text-gray-600">
                                Live Classes
                            </div>
                        </div>
                    </div>
                </div>

                {/* Real World Project */}
                <div className="group relative bg-gradient-to-br from-white to-teal-50/30 rounded-2xl p-4 shadow-lg shadow-teal-100/50 border border-teal-100/50 hover:shadow-xl hover:shadow-teal-200/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full group-hover:bg-teal-500/30 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold bg-gradient-to-br from-teal-600 to-teal-800 bg-clip-text text-transparent">
                                10
                            </div>
                            <div className="text-sm font-semibold text-gray-600">
                                Projects
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community */}
                {/* <div className="group relative bg-gradient-to-br from-white to-pink-50/30 rounded-3xl p-6 shadow-lg shadow-pink-100/50 border border-pink-100/50 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full group-hover:bg-pink-500/30 transition-all duration-300"></div>
                            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xl font-bold bg-gradient-to-br from-pink-600 to-pink-800 bg-clip-text text-transparent">Community</div>
                            <div className="text-xs font-semibold text-gray-500">Large DS-360 Community</div>
                        </div>
                    </div>
                </div> */}
            </div>

            {/* Bottom Row - Course Details */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Batch Number */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-300/50 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                Batch Number
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                                1
                            </div>
                        </div>
                    </div>
                </div>

                {/* Start Date */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-300/50 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                Start Date
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                                5 Dec, 2025
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Days */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-300/50 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                Class Days
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                                Mon, Fri
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Time */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-300/50 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                Class Time
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                                9:30 - 11:00 PM
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
