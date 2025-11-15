import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import {
    Code2,
    Database,
    Cloud,
    Cpu,
    Globe,
    Smartphone,
    GitBranch,
    Shield,
    Zap,
    Box,
    Server,
    Layers,
} from "lucide-react";

interface Technology {
    name: string;
    icon: React.ReactNode;
    category: string;
    color: string;
}

const technologies: Technology[] = [
    {
        name: "React",
        icon: <Code2 className="w-8 h-8" />,
        category: "Frontend",
        color: "from-cyan-500 to-blue-500",
    },
    {
        name: "Next.js",
        icon: <Layers className="w-8 h-8" />,
        category: "Framework",
        color: "from-gray-800 to-gray-600",
    },
    {
        name: "TypeScript",
        icon: <Code2 className="w-8 h-8" />,
        category: "Language",
        color: "from-blue-600 to-blue-400",
    },
    {
        name: "Node.js",
        icon: <Server className="w-8 h-8" />,
        category: "Backend",
        color: "from-green-600 to-green-400",
    },
    {
        name: "Python",
        icon: <Code2 className="w-8 h-8" />,
        category: "Language",
        color: "from-yellow-500 to-blue-500",
    },
    {
        name: "MongoDB",
        icon: <Database className="w-8 h-8" />,
        category: "Database",
        color: "from-green-500 to-green-700",
    },
    {
        name: "AWS",
        icon: <Cloud className="w-8 h-8" />,
        category: "Cloud",
        color: "from-orange-500 to-orange-600",
    },
    {
        name: "Docker",
        icon: <Box className="w-8 h-8" />,
        category: "DevOps",
        color: "from-blue-500 to-blue-600",
    },
    {
        name: "Git",
        icon: <GitBranch className="w-8 h-8" />,
        category: "Version Control",
        color: "from-red-500 to-orange-500",
    },
    {
        name: "GraphQL",
        icon: <Globe className="w-8 h-8" />,
        category: "API",
        color: "from-pink-500 to-purple-500",
    },
    {
        name: "TensorFlow",
        icon: <Cpu className="w-8 h-8" />,
        category: "AI/ML",
        color: "from-orange-600 to-yellow-500",
    },
    {
        name: "React Native",
        icon: <Smartphone className="w-8 h-8" />,
        category: "Mobile",
        color: "from-cyan-400 to-blue-500",
    },
    {
        name: "Kubernetes",
        icon: <Box className="w-8 h-8" />,
        category: "DevOps",
        color: "from-blue-600 to-indigo-600",
    },
    {
        name: "Firebase",
        icon: <Zap className="w-8 h-8" />,
        category: "Backend",
        color: "from-yellow-500 to-orange-500",
    },
    {
        name: "PostgreSQL",
        icon: <Database className="w-8 h-8" />,
        category: "Database",
        color: "from-blue-700 to-blue-500",
    },
    {
        name: "JWT",
        icon: <Shield className="w-8 h-8" />,
        category: "Security",
        color: "from-purple-600 to-pink-600",
    },
];

const firstRow = technologies.slice(0, technologies.length / 2);
const secondRow = technologies.slice(technologies.length / 2);

const TechnologyCard = ({
    name,
    icon,
    category,
    color,
}: Technology) => {
    return (
        <div className="relative w-72 group">
            {/* Glow Effect */}
            <div className={cn(
                "absolute -inset-0.5 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500",
                color
            )}></div>

            <div
                className={cn(
                    "relative cursor-pointer overflow-hidden rounded-2xl border p-6",
                    "bg-white/5 backdrop-blur-sm hover:bg-white/10",
                    "border-white/10 hover:border-white/20",
                    "transition-all duration-300 ease-out",
                    "hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
                )}
            >
                <div className="flex items-center gap-5">
                    {/* Icon Container */}
                    <div className="relative">
                        <div
                            className={cn(
                                "flex items-center justify-center w-14 h-14 rounded-xl",
                                "bg-gradient-to-br shadow-lg transition-all duration-300",
                                "group-hover:scale-110 group-hover:rotate-6",
                                color,
                                "text-white"
                            )}
                        >
                            {icon}
                        </div>
                        {/* Icon Glow */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300",
                            color
                        )}></div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors duration-300">
                            {name}
                        </h3>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {category}
                        </p>
                    </div>

                    {/* Arrow Indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function TechnologyStackSection() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 w-full">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16 px-4">
                    <div className="inline-block mb-4">
                        <span className="text-sm font-semibold text-secondary bg-secondary/10 px-4 py-1.5 rounded-full border border-secondary/20">
                            🚀 Tech We Teach
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Master Modern
                        </span>{" "}
                        <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                            Tech Stack
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Learn the most in-demand technologies used by industry leaders.
                        Build real-world expertise that employers value.
                    </p>
                </div>

                {/* Marquee Rows */}
                <Marquee pauseOnHover className="[--duration:40s] mb-6">
                    {firstRow.map((tech, index) => (
                        <TechnologyCard key={`${tech.name}-${index}`} {...tech} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:40s]">
                    {secondRow.map((tech, index) => (
                        <TechnologyCard key={`${tech.name}-${index}`} {...tech} />
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
