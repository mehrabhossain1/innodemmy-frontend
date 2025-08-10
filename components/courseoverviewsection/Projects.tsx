"use client";

import Image from "next/image";

export default function Projects() {
    const projects = [
        "Data Analysis Using Pandas",
        "Exploratory Data Analysis (EDA)",
        "Handwritten digits classification using KNN",
        "Customer Segmentation Using RFM & KMeans",
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg"
                    >
                        <div className="flex items-center p-6">
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold">
                                    {project}
                                </h3>
                            </div>
                            <div className="w-1/2">
                                <Image
                                    src={`https://cdn.ostad.app/public/upload/2024-09-19T09-56-16.382Z-original-61caa058c1b24b670c0c6f00b9be1528.png`}
                                    alt={project}
                                    width={300}
                                    height={200}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
