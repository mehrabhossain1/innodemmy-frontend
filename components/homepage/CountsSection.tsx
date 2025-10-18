import React from "react";

export default function CountsSection() {
    const stats = [
        {
            count: "50,000+",
            label: "Students Enrolled"
        },
        {
            count: "500+",
            label: "Expert Courses"
        },
        {
            count: "95%",
            label: "Success Rate"
        },
        {
            count: "24/7",
            label: "Support Available"
        }
    ];

    return (
        <section className="relative z-20 -mt-16 pb-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                                    {stat.count}
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
