import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Main Heading */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Advance your skills to{" "}
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent relative">
                                    elevate
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200"
                                        viewBox="0 0 200 12"
                                        fill="currentColor"
                                    >
                                        <path d="M0,8 Q50,0 100,4 T200,6 L200,12 L0,12 Z" />
                                    </svg>
                                </span>{" "}
                                your career
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Join thousands of professionals who are
                                transforming their careers through our
                                expert-led courses and hands-on learning
                                experiences.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/courses">
                                <Button
                                    size="lg"
                                    className="text-base px-8 py-3 h-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 ease-out"
                                >
                                    Explore All Courses
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-base px-8 py-3 h-auto bg-transparent border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 ease-out"
                            >
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                            <div className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        50,000+
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Students
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        500+
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Courses
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        95%
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Success Rate
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company Logos */}
                        <div className="pt-8">
                            <p className="text-sm text-gray-500 mb-4">
                                Trusted by employees at
                            </p>
                            <div className="flex items-center space-x-8 opacity-60">
                                <Image
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdEEO-mCKk-1ZV-y9xarZawuakiH4VY381g&s"
                                    alt="Google"
                                    width={120}
                                    height={32}
                                    className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <Image
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdEEO-mCKk-1ZV-y9xarZawuakiH4VY381g&s"
                                    alt="Microsoft"
                                    width={120}
                                    height={32}
                                    className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <Image
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdEEO-mCKk-1ZV-y9xarZawuakiH4VY381g&s"
                                    alt="Amazon"
                                    width={120}
                                    height={32}
                                    className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <Image
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdEEO-mCKk-1ZV-y9xarZawuakiH4VY381g&s"
                                    alt="Netflix"
                                    width={120}
                                    height={32}
                                    className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Hero Image/Illustration */}
                    <div className="relative">
                        <div className="relative z-10">
                            <Image
                                src="https://img.freepik.com/free-vector/flat-university-concept_23-2148174524.jpg?t=st=1753631695~exp=1753635295~hmac=78d72ac25daa2325e9bf811a7a23cabf5d122c74e2306c9938ed0d93d618031b&w=1380"
                                alt="Professional learning illustration"
                                width={600}
                                height={600}
                                className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-out"
                            />
                        </div>

                        {/* Floating Cards */}
                        <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 z-20 hover:shadow-xl transition-all duration-200 ease-out">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        Course Completed
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        React Development
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 z-20 hover:shadow-xl transition-all duration-200 ease-out">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        Skill Progress
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        85% Complete
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-purple-50 rounded-2xl transform rotate-3 -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
