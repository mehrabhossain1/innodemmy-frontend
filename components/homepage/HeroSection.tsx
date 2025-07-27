import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, TrendingUp } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Trusted by 50,000+ professionals
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Advance your skills to{" "}
                                <span className="text-blue-600 relative">
                                    elevate
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
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
                            <Button
                                size="lg"
                                className="text-base px-8 py-3 h-auto"
                            >
                                Explore All Courses
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-base px-8 py-3 h-auto bg-transparent"
                            >
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-8 pt-4">
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    50,000+ Students
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    500+ Courses
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Award className="h-5 w-5 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    95% Success Rate
                                </span>
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
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                        </div>

                        {/* Floating Cards */}
                        <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100 z-20">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Award className="w-5 h-5 text-green-600" />
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

                        <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100 z-20">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-blue-600" />
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
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-purple-50 rounded-2xl transform rotate-3 -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
