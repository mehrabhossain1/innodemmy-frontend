"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhoThisCourseIsFor() {
    const audiences = [
        {
            image: "https://img.icons8.com/color/96/student-center.png",
            title: "Professionals in the medical and healthcare sectors who plan to pursue higher studies abroad, including PhD opportunities.",
        },
        {
            image: "https://img.icons8.com/color/96/biotech.png",
            title: "Researchers working in pharmaceutical, biotechnology, or life science fields seeking to strengthen their research foundation.",
        },
        {
            image: "https://img.icons8.com/color/96/stethoscope.png",
            title: "MBBS/BDS students or graduates interested in developing strong research skills for academic or clinical careers.",
        },
        {
            image: "/icons/image29.png",
            title: "Anyone who wants to build solid expertise in research methodology, scientific literacy, and academic writing.",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Who This Course is For" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {audiences.map((audience, index) => {
                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-start gap-4">
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
