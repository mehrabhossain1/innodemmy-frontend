"use client";
import {
    Rocket,
    Video,
    Users,
    Calendar,
    BookOpen,
    Clock,
    FolderKanban,
} from "lucide-react";

export default function CourseHighlights() {
    return (
        <div className="space-y-6">
            {/* Top Row - Main Highlights */}
            <div className="grid grid-cols-3 gap-5">
                {/* Modules */}
                <div className="group relative bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-4 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20 border border-blue-100/50 dark:border-blue-800/30 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-800/30 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-xl rounded-full group-hover:bg-blue-500/30 dark:group-hover:bg-blue-400/30 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                                <Rocket className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                19
                            </div>
                            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Modules
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Class */}
                <div className="group relative bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl p-4 shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20 border border-purple-100/50 dark:border-purple-800/30 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-800/30 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-purple-500/20 dark:bg-purple-400/20 blur-xl rounded-full group-hover:bg-purple-500/30 dark:group-hover:bg-purple-400/30 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30 dark:shadow-purple-600/30 group-hover:scale-110 transition-transform duration-300">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-purple-800 bg-clip-text text-transparent">
                                36
                            </div>
                            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Live Classes
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects */}
                <div className="group relative bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-800 dark:to-orange-900/20 rounded-2xl p-4 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/20 border border-orange-100/50 dark:border-orange-800/30 hover:shadow-xl hover:shadow-orange-200/50 dark:hover:shadow-orange-800/30 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-orange-500/20 dark:bg-orange-400/20 blur-xl rounded-full group-hover:bg-orange-500/30 dark:group-hover:bg-orange-400/30 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30 dark:shadow-orange-600/30 group-hover:scale-110 transition-transform duration-300">
                                <FolderKanban className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold bg-gradient-to-br from-orange-600 to-orange-800 bg-clip-text text-transparent">
                                5
                            </div>
                            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Projects
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row - Course Details */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Batch Number */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/60 dark:border-gray-700 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/80 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                Batch Number
                            </div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                1
                            </div>
                        </div>
                    </div>
                </div>

                {/* Start Date */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/60 dark:border-gray-700 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/80 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                Start Date
                            </div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                January 15
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Days */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/60 dark:border-gray-700 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/80 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                Class Days
                            </div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                TBA
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Time */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/60 dark:border-gray-700 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/80 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                Class Time
                            </div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                TBA
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
