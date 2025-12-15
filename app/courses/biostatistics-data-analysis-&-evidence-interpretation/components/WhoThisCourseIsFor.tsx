"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhoThisCourseIsFor() {
    const audiences = [
        {
            image: "https://img.icons8.com/color/96/student-center.png",
            title: "Students who want to learn biostatistics and data analysis",
        },
        {
            image: "https://img.icons8.com/color/96/biotech.png",
            title: "Early-career researchers, clinicians, public health students",
        },
        {
            image: "https://img.icons8.com/color/96/businessman.png",
            title: "Pharma, CRO, biotech, data management professionals",
        },
        {
            image: "/icons/image22.png",
            title: "Those who want to do thesis, dissertation, or publication-level data analysis",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Who This Course is For" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {audiences.map((audience, index) => {
                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 min-h-[200px] flex flex-col justify-center"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                {/* Image Icon */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={audience.image}
                                        alt={audience.title}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>

                                {/* Title */}
                                <div className="flex-1">
                                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed font-medium">
                                        {audience.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
