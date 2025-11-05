export default function AboutusSection() {
    const stats = [
        {
            count: "50,000+",
            label: "Students Enrolled",
        },
        {
            count: "500+",
            label: "Expert Courses",
        },
        {
            count: "95%",
            label: "Success Rate",
        },
        {
            count: "24/7",
            label: "Support Available",
        },
    ];

    return (
        <section className="relative pt-0 pb-16 md:pb-24 bg-gradient-to-br from-[#0a3d3d] via-[#0d4d4d] to-[#0a3d3d] dark:from-[#051f1f] dark:via-[#082828] dark:to-[#051f1f]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Statistics Card - 50% overlapping Hero, 50% in About Section */}
                <div className="relative z-20 -translate-y-1/2 mb-8">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                        {stat.count}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* About Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {/* Left Side - Text Content */}
                    <div className="flex flex-col justify-center text-white space-y-6 w-full">
                        {/* Section Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                            About InnoDemy
                        </h2>

                        {/* First Paragraph */}
                        <p className="text-base sm:text-lg leading-relaxed text-gray-100/90">
                            InnoDemy is a future-focused learning platform that
                            connects ambitious learners with the skills they
                            need to stay ahead in a digital world. We offer
                            programs in{" "}
                            <span className="font-semibold text-[#4dd4d4]">
                                Clinical Research
                            </span>
                            ,{" "}
                            <span className="font-semibold text-[#4dd4d4]">
                                Programming
                            </span>
                            ,{" "}
                            <span className="font-semibold text-[#4dd4d4]">
                                Data Science & Machine Learning
                            </span>
                            ,{" "}
                            <span className="font-semibold text-[#4dd4d4]">
                                VLSI
                            </span>
                            , and{" "}
                            <span className="font-semibold text-[#4dd4d4]">
                                Core Engineering
                            </span>{" "}
                            shaping the next wave of technology and discovery.
                        </p>

                        {/* Second Paragraph */}
                        <p className="text-base sm:text-lg leading-relaxed text-gray-100/90">
                            At InnoDemy, learning goes beyond theory. Each
                            course combines hands-on projects, industry case
                            studies, and research-backed insights to help
                            learners think critically, experiment boldly, and
                            apply knowledge with confidence. We turn curiosity
                            into capability empowering professionals who don't
                            just follow trends, but create them.
                        </p>
                    </div>

                    {/* Right Side - Image/Graphic */}
                    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5858] to-[#0a3d3d] flex items-center justify-center">
                            {/* Circuit Board Pattern Background */}
                            <div className="absolute inset-0 opacity-20">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 400 400"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Vertical lines */}
                                    <line
                                        x1="100"
                                        y1="0"
                                        x2="100"
                                        y2="400"
                                        stroke="#4dd4d4"
                                        strokeWidth="2"
                                    />
                                    <line
                                        x1="200"
                                        y1="0"
                                        x2="200"
                                        y2="400"
                                        stroke="#4dd4d4"
                                        strokeWidth="2"
                                    />
                                    <line
                                        x1="300"
                                        y1="0"
                                        x2="300"
                                        y2="400"
                                        stroke="#4dd4d4"
                                        strokeWidth="2"
                                    />
                                    {/* Horizontal lines */}
                                    <line
                                        x1="0"
                                        y1="100"
                                        x2="400"
                                        y2="100"
                                        stroke="#4dd4d4"
                                        strokeWidth="2"
                                    />
                                    <line
                                        x1="0"
                                        y1="200"
                                        x2="400"
                                        y2="200"
                                        stroke="#4dd4d4"
                                        strokeWidth="2"
                                    />
                                    <line
                                        x1="0"
                                        y1="300"
                                        x2="400"
                                        y2="300"
                                        stroke="#4dd4d4"
                                        strokeWidth="2"
                                    />
                                    {/* Connection points */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="5"
                                        fill="#4dd4d4"
                                    />
                                    <circle
                                        cx="200"
                                        cy="100"
                                        r="5"
                                        fill="#4dd4d4"
                                    />
                                    <circle
                                        cx="300"
                                        cy="100"
                                        r="5"
                                        fill="#4dd4d4"
                                    />
                                    <circle
                                        cx="100"
                                        cy="200"
                                        r="5"
                                        fill="#4dd4d4"
                                    />
                                    <circle
                                        cx="200"
                                        cy="200"
                                        r="8"
                                        fill="#4dd4d4"
                                    />
                                    <circle
                                        cx="300"
                                        cy="200"
                                        r="5"
                                        fill="#4dd4d4"
                                    />
                                    <circle
                                        cx="100"
                                        cy="300"
                                        r="5"
                                        fill="#4dd4d4"
                                    />
                                    <circle
                                        cx="200"
                                        cy="300"
                                        r="5"
                                        fill="#4dd4d4"
                                    />
                                    <circle
                                        cx="300"
                                        cy="300"
                                        r="5"
                                        fill="#4dd4d4"
                                    />
                                </svg>
                            </div>

                            {/* Glowing effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4dd4d4]/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
