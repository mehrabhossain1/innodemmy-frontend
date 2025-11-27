"use client";
import { Rocket, Video, Users, Calendar, BookOpen, Clock } from "lucide-react";

export default function CourseHighlights() {
    return (
        <div className="space-y-6">
            {/* Top Row - Main Highlights */}
            <div className="grid grid-cols-2 gap-5">
                {/* Modules */}
                <div className="group relative bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800 dark:to-amber-900/20 rounded-2xl p-4 shadow-lg shadow-amber-100/50 dark:shadow-amber-900/20 border border-amber-100/50 dark:border-amber-800/30 hover:shadow-xl hover:shadow-amber-200/50 dark:hover:shadow-amber-800/30 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-amber-500/20 dark:bg-amber-400/20 blur-xl rounded-full group-hover:bg-amber-500/30 dark:group-hover:bg-amber-400/30 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30 dark:shadow-amber-600/30 group-hover:scale-110 transition-transform duration-300">
                                <Rocket className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent">
                                10
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
                                10
                            </div>
                            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Live Classes
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row - Course Details */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Batch Number */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/60 dark:border-gray-700 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 hover:border-amber-200 dark:hover:border-amber-700 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 dark:to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200/80 dark:from-amber-900/50 dark:to-amber-800/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
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
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/60 dark:border-gray-700 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 hover:border-amber-200 dark:hover:border-amber-700 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 dark:to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200/80 dark:from-amber-900/50 dark:to-amber-800/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                Start Date
                            </div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                20 Dec, 2025
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Days */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/60 dark:border-gray-700 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 hover:border-amber-200 dark:hover:border-amber-700 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 dark:to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200/80 dark:from-amber-900/50 dark:to-amber-800/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                Class Days
                            </div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                Sun, Wed
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Time */}
                <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700/50 rounded-2xl p-3 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/60 dark:border-gray-700 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 hover:border-amber-200 dark:hover:border-amber-700 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 dark:to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200/80 dark:from-amber-900/50 dark:to-amber-800/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                Class Time
                            </div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                9:30 - 11:00 PM
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
