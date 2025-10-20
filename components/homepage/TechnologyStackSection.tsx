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
        <div
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-2xl border p-6",
                "bg-card hover:shadow-xl transition-all duration-300 ease-out",
                "border-border hover:border-primary/50",
                "group"
            )}
        >
            <div className="flex flex-col items-center gap-4 text-center">
                <div
                    className={cn(
                        "flex items-center justify-center w-16 h-16 rounded-xl",
                        "bg-gradient-to-br shadow-lg transition-transform duration-300",
                        "group-hover:scale-110 group-hover:shadow-xl",
                        color,
                        "text-white"
                    )}
                >
                    {icon}
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-foreground">
                        {name}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {category}
                    </p>
                </div>
            </div>
        </div>
    );
};

export function TechnologyStackSection() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16 bg-background">
            <div className="text-center mb-12 px-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-[#226481] to-[#e9ae30] bg-clip-text text-transparent">
                        Technology Stack
                    </span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Master the most in-demand technologies used by top companies worldwide
                </p>
            </div>

            <Marquee pauseOnHover className="[--duration:30s] mb-4">
                {firstRow.map((tech, index) => (
                    <TechnologyCard key={`${tech.name}-${index}`} {...tech} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:30s]">
                {secondRow.map((tech, index) => (
                    <TechnologyCard key={`${tech.name}-${index}`} {...tech} />
                ))}
            </Marquee>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    );
}
