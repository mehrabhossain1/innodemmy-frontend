import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative py-16 lg:py-24 pb-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20"></div>
            <div className="absolute inset-0 opacity-60">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                    }}
                ></div>
            </div>
            {/* Additional Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-transparent to-indigo-100/30 dark:from-blue-900/20 dark:via-transparent dark:to-indigo-900/20"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Main Heading */}
                        <div className="space-y-6">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                                Advance your skills to{" "}
                                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent relative">
                                    elevate
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                                        viewBox="0 0 200 12"
                                        fill="currentColor"
                                    >
                                        <path d="M0,8 Q50,0 100,4 T200,6 L200,12 L0,12 Z" />
                                    </svg>
                                </span>{" "}
                                your career
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                Join thousands of professionals who are
                                transforming their careers through our
                                expert-led courses and hands-on learning
                                experiences.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/courses">
                                <Button
                                    size="lg"
                                    className="text-lg px-10 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1"
                                >
                                    Explore All Courses
                                    <ArrowRight className="ml-3 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-10 py-4 h-auto transition-all duration-300 ease-out transform hover:-translate-y-1"
                            >
                                Watch Demo
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Hero Image/Illustration */}
                    <div className="relative">
                        <div className="relative z-10">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                <Image
                                    src="https://www.kinderpedia.co/templates/yootheme/cache/47/invatarea_activa_online-47a6c606.jpeg"
                                    alt="Online learning academy illustration"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>

                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl transform rotate-2 -z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent rounded-3xl transform -rotate-1 -z-20"></div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
        </section>
    );
}
