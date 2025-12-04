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
        image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
        color: "from-emerald-500 to-teal-600",
    },
    {
        name: "Power BI",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
        color: "from-yellow-500 to-orange-500",
    },
    {
        name: "Python",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
        color: "from-blue-500 to-yellow-400",
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
                        {/* Icon Glow */}
                        <div
                            className={cn(
                                "absolute inset-0 bg-gradient-to-br rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300",
                                color
                            )}
                        ></div>
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
                <Marquee pauseOnHover className="[--duration:30s] mb-4">
                    {technologies.map((tech, index) => (
                        <TechnologyCard
                            key={`${tech.name}-${index}`}
                            {...tech}
                        />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:30s]">
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
