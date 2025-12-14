import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

interface Technology {
    name: string;
    image: string;
    color: string;
}

const technologies: Technology[] = [
    {
        name: "ChatGPT",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252Fchatgpt-icon.png%3Falt%3Dmedia%26token%3D36e1940c-e136-48a4-86ae-1aa0e1746f83&w=640&q=75",
        color: "from-emerald-500 to-teal-600",
    },
    {
        name: "Power BI",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252Fpower-bi-icon.png%3Falt%3Dmedia%26token%3Dc9edb838-f9bc-46b8-b32b-e46f80a1097c&w=640&q=75",
        color: "from-yellow-500 to-orange-500",
    },
    {
        name: "Python",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252Fpython.png%3Falt%3Dmedia%26token%3Db0418f38-b528-4f80-9543-934beee7ffe3&w=640&q=75",
        color: "from-blue-500 to-yellow-400",
    },
    {
        name: "R",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252Fr.png%3Falt%3Dmedia%26token%3Da13f9c4d-05b3-4ffc-9f54-12e66523394e&w=640&q=75",
        color: "from-blue-600 to-blue-400",
    },
    {
        name: "Excel",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252Fmicrosoft-excel-icon.png%3Falt%3Dmedia%26token%3Dc0ca4fd3-fc85-46c0-9915-c326fec3fea4&w=640&q=75",
        color: "from-green-600 to-green-400",
    },
    {
        name: "Data Science",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252Fdata-science.png%3Falt%3Dmedia%26token%3D37035ed1-ca70-45ff-a858-98f458e2aaa6&w=640&q=75",
        color: "from-orange-500 to-orange-600",
    },
    {
        name: "SQL",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252Fsql-database-generic.png%3Falt%3Dmedia%26token%3D01e07414-b2f8-4709-b46c-3dcbd6204941&w=640&q=75",
        color: "from-cyan-500 to-blue-500",
    },
    {
        name: "Stata",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252FStata.png%3Falt%3Dmedia%26token%3D128ab042-a4ec-4611-9962-f0c7a5340ceb&w=640&q=75",
        color: "from-blue-700 to-indigo-600",
    },
    {
        name: "Statistics",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252Fstatistics.png%3Falt%3Dmedia%26token%3D879e59e3-ab63-4299-8e0c-2ca9475b2120&w=640&q=75",
        color: "from-purple-500 to-pink-500",
    },
    {
        name: "Tableau",
        image: "https://www.datasolution360.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fdata-solution-360.appspot.com%2Fo%2FtechnologyIcon%252Fsocialmedia46308%2540gmail.com%252Ftableau-software.jpg%3Falt%3Dmedia%26token%3D6f8d67fe-c3f2-4444-8069-be4f85175a14&w=640&q=75",
        color: "from-blue-500 to-cyan-400",
    },
    {
        name: "LaTeX",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/1200px-LaTeX_logo.svg.png",
        color: "from-teal-500 to-cyan-500",
    },
    {
        name: "SPSS",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/SPSS_logo.svg/1200px-SPSS_logo.svg.png",
        color: "from-red-500 to-pink-500",
    },
    {
        name: "MATLAB",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/667px-Matlab_Logo.png",
        color: "from-orange-600 to-red-500",
    },
    {
        name: "Machine Learning",
        image: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png",
        color: "from-indigo-500 to-purple-600",
    },
    {
        name: "VLSI",
        image: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
        color: "from-slate-500 to-gray-600",
    },
    {
        name: "GitHub",
        image: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        color: "from-gray-700 to-slate-800",
    },
];

const TechnologyCard = ({ name, image, color }: Technology) => {
    return (
        <div className="relative w-64 group">
            {/* Glow Effect */}
            <div
                className={cn(
                    "absolute -inset-0.5 bg-gradient-to-r rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500",
                    color
                )}
            ></div>

            <div
                className={cn(
                    "relative cursor-pointer overflow-hidden rounded-xl border p-4",
                    "bg-white/5 backdrop-blur-sm hover:bg-white/10",
                    "border-white/10 hover:border-white/20",
                    "transition-all duration-300 ease-out",
                    "hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5"
                )}
            >
                <div className="flex items-center gap-4">
                    {/* Image Container */}
                    <div className="relative">
                        <div
                            className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-lg",
                                "bg-white p-2 shadow-lg transition-all duration-300",
                                "group-hover:scale-110 group-hover:rotate-3"
                            )}
                        >
                            <Image
                                src={image}
                                alt={name}
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors duration-300">
                            {name}
                        </h3>
                    </div>

                    {/* Arrow Indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        <svg
                            className="w-4 h-4 text-secondary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function TechnologyStackSection() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12 md:py-16 lg:py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 w-full">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10 lg:mb-8 px-4">
                    <div className="inline-block mb-3 lg:mb-3">
                        <span className="text-xs lg:text-sm font-semibold text-secondary bg-secondary/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-secondary/20">
                            🚀 Tech We Teach
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 lg:mb-3">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Master Modern
                        </span>{" "}
                        <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                            Tech Stack
                        </span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-base text-gray-400 max-w-4xl mx-auto leading-relaxed">
                        Learn the most in-demand technologies used by industry
                        leaders. Build real-world expertise that employers
                        value.
                    </p>
                </div>

                {/* Marquee Rows */}
                <Marquee pauseOnHover className="[--duration:50s] mb-4">
                    {technologies.map((tech, index) => (
                        <TechnologyCard
                            key={`${tech.name}-${index}`}
                            {...tech}
                        />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:50s]">
                    {technologies.map((tech, index) => (
                        <TechnologyCard
                            key={`${tech.name}-${index}-reverse`}
                            {...tech}
                        />
                    ))}
                </Marquee>
            </div>

            {/* Gradient Fade Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent"></div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
        </div>
    );
}
