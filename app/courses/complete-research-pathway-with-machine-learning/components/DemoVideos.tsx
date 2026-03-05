"use client";

import SectionTitle from "@/components/course/SectionTitle";

interface DemoVideo {
    id: string;
    title: string;
    driveId: string;
}

export default function DemoVideos() {
    // To get individual video IDs from Google Drive:
    // 1. Open the folder: https://drive.google.com/drive/folders/1ALebxT4sQIcLXt5Jbn3gulegyBqtZiFH
    // 2. Open each video individually
    // 3. Copy the video link (e.g., https://drive.google.com/file/d/VIDEO_ID/view)
    // 4. Extract the VIDEO_ID and replace below

    const demoVideos: DemoVideo[] = [
        {
            id: "demo-1",
            title: "1 - Introduction to Research with Machine Learning ",
            driveId: "1ETr6NVVNPfHLv-NVbLVKhHjCWIpo5Q-g", // Replace with your actual video IDs later
        },
        {
            id: "demo-2",
            title: "2 - Introduction to Computer Vision and Convolutional Neural Network v2",
            driveId: "1V1PYpjdTD8nxuFyiqfWQefT6WuzJMHMW", // Replace with your actual video IDs later
        },
        {
            id: "demo-3",
            title: "3 - Fundamentals of Machine Learning",
            driveId: "1IAkij53O8VwXtkmnGmCfIxIuHk8q1l2e", // Replace with your actual video IDs later
        },
    ];

    return (
        <section
            className="bg-gray-50 dark:bg-gray-900 py-12 md:py-20"
            id="demo-videos"
        >
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Header */}
                <SectionTitle title="Demo Classes" />
                <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto -mt-6">
                    কোর্সের ডেমো ক্লাস দেখে নিন এবং জেনে নিন কোর্সে কী কী শেখানো
                    হবে
                </p>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {demoVideos.map((video) => (
                        <div
                            key={video.id}
                            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            {/* Video Container */}
                            <div className="relative w-full pt-[56.25%] bg-black group-hover:scale-[1.02] transition-transform duration-500">
                                <iframe
                                    src={`https://drive.google.com/file/d/${video.driveId}/preview`}
                                    className="absolute top-0 left-0 w-full h-full"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    loading="lazy"
                                    title={video.title}
                                />
                            </div>

                            {/* Video Info */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {video.title}
                                </h3>

                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 group-hover:text-primary transition-colors">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Watch Demo Class
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
