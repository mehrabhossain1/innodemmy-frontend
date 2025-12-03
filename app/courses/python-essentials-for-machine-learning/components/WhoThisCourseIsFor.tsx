"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhoThisCourseIsFor() {
    const audiences = [
        {
            image: "https://img.icons8.com/color/96/student-center.png",
            title: "Absolute Beginners – Students or professionals from a non-technical background with no prior coding experience.",
        },
        {
            image: "https://img.icons8.com/color/96/businessman.png",
            title: "Career-Oriented Learners – Those aiming for a career in freelancing, data science, or web development.",
        },
        {
            image: "https://img.icons8.com/color/96/python.png",
            title: "Python Newbies – Anyone who feels intimidated or hesitant to start programming.",
        },
        {
            image: "https://img.icons8.com/color/96/code.png",
            title: "Hands-on Learners – People who prefer learning by doing through practical exercises and real-world examples.",
        },
        {
            image: "https://img.icons8.com/color/96/brain.png",
            title: "Skill Builders – Learners who want to strengthen problem-solving, programming, and analytical skills.",
        },
        {
            image: "https://img.icons8.com/color/96/goal.png",
            title: "Self-Motivated Individuals – Those ready to commit, practice consistently, and grow their coding confidence.",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Who This Course is For" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
