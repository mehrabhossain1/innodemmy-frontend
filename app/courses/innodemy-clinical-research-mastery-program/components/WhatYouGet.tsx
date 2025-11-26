"use client";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/calendar--v1.png",
            title: "3 Month Intensive Learning Journey",
            description:
                "Step-by-step structured curriculum designed for beginners but packed with advanced, real-world concepts.",
        },
        {
            image: "https://img.icons8.com/color/96/youtube-live.png",
            title: "24 Live Classes with Industry Experts",
            description:
                "Learn directly from professionals and get your questions answered in real-time.",
        },
        {
            image: "https://img.icons8.com/color/96/video-conference.png",
            title: "Support Sessions",
            description:
                "Stuck while practicing? Get instant help during live support sessions.",
        },
        {
            image: "https://img.icons8.com/color/96/user-group-man-man.png",
            title: "Exclusive Learner Community",
            description:
                "Network, collaborate, and get continuous guidance from a supportive community of learners and experts.",
        },
        {
            image: "https://img.icons8.com/color/96/business.png",
            title: "Career Guidance",
            description:
                "Personalized career guidance, including advice on career pathways in clinical research and strategies to advance in healthcare, pharmaceutical sectors.",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Shareable Certificate",
            description:
                "Receive an officially verified certificate upon completion that you can proudly display on LinkedIn or your CV.",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Title with underline */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    What You&apos;ll Get in This Course
                </h2>
                <div className="w-48 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 mx-auto rounded-full"></div>
            </div>

            {/* Grid Layout - More Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="flex justify-center mb-3">
                                <img
                                    src={benefit.image}
                                    alt={benefit.title}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight">
                                {benefit.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
