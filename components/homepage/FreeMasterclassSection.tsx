import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const masterclasses = [
    {
        id: "web-development-fundamentals",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Web Development Fundamentals: From Zero to Hero",
        duration: "2h 30m",
        instructor: "Sarah Johnson",
        views: 15420,
        topics: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    },
    {
        id: "python-data-analysis",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Python for Data Analysis: Getting Started with Pandas",
        duration: "1h 45m",
        instructor: "Dr. Michael Chen",
        views: 12350,
        topics: ["Python", "Pandas", "Data Analysis", "NumPy"],
    },
    {
        id: "ui-ux-principles",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "UI/UX Design Principles: Creating User-Centric Interfaces",
        duration: "2h 15m",
        instructor: "Emma Rodriguez",
        views: 18920,
        topics: ["Design Thinking", "Figma", "User Research", "Prototyping"],
    },
];

export default function FreeMasterclassSection() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent mb-4">
                        Free Masterclass Sessions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our collection of free masterclass sessions and
                        get a taste of our teaching methodology. Learn from
                        industry experts at no cost.
                    </p>
                </div>

                {/* Masterclass Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {masterclasses.map((masterclass, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-lg overflow-hidden group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl shadow-md border border-border"
                        >
                            {/* Thumbnail with Play Button Overlay */}
                            <div className="relative overflow-hidden h-48">
                                <Image
                                    src={masterclass.image}
                                    alt={masterclass.title}
                                    width={400}
                                    height={192}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                                    </div>
                                </div>
                                {/* Duration Badge */}
                                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                    {masterclass.duration}
                                </div>
                                {/* Free Badge */}
                                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-xs font-bold">
                                    FREE
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-3">
                                {/* Title */}
                                <Link href={`/masterclass/${masterclass.id}`}>
                                    <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                                        {masterclass.title}
                                    </h3>
                                </Link>

                                {/* Instructor */}
                                <p className="text-sm text-muted-foreground">
                                    by {masterclass.instructor}
                                </p>

                                {/* Topics */}
                                <div className="flex flex-wrap gap-2">
                                    {masterclass.topics.slice(0, 3).map((topic, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                    {masterclass.topics.length > 3 && (
                                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md font-medium">
                                            +{masterclass.topics.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Views */}
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm text-muted-foreground">
                                        {masterclass.views.toLocaleString()} views
                                    </span>
                                </div>

                                {/* Watch Now Button */}
                                <Link href={`/masterclass/${masterclass.id}`}>
                                    <Button className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white font-semibold text-sm h-10 rounded-md transition-all duration-200 ease-out mt-3">
                                        <Play className="mr-2 h-4 w-4" fill="currentColor" />
                                        Watch Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Masterclasses Button */}
                <div className="text-center">
                    <Link href="/masterclass">
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8 py-3 h-auto text-base shadow-lg hover:shadow-xl transition-all duration-200 ease-out border-2 hover:bg-secondary hover:text-white hover:border-secondary"
                        >
                            Explore All Masterclasses
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
