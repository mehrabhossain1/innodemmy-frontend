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
            title: "Demo Class 1 - Introduction to Research with Machine Learning ",
            driveId: "1ETr6NVVNPfHLv-NVbLVKhHjCWIpo5Q-g", // Replace with your actual video IDs later
        },
        {
            id: "demo-2",
            title: "Demo Class 2 - Introduction to Computer Vision and Convolutional Neural Network v2",
            driveId: "1ETr6NVVNPfHLv-NVbLVKhHjCWIpo5Q-g", // Replace with your actual video IDs later
        },
        {
            id: "demo-3",
            title: "Demo Class 3 - Fundamentals of Machine Learning",
            driveId: "1ETr6NVVNPfHLv-NVbLVKhHjCWIpo5Q-g", // Replace with your actual video IDs later
        },
    ];

    return (
        <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-background to-secondary/5">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <SectionTitle title="Demo Classes" />

                {/* Video Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {demoVideos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Video Container */}
                            <div className="relative w-full pt-[56.25%] bg-black">
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
                            <div className="p-6">
                                <h3 className="text-base font-semibold mb-2 line-clamp-2">
                                    {video.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Note for visitors */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        🎥 ডেমো ক্লাস দেখে কোর্স সম্পর্কে সম্পূর্ণ ধারণা নিয়ে
                        নিন
                    </p>
                </div>
            </div>
        </section>
    );
}
