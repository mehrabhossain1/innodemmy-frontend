import { Card, CardContent } from "@/components/ui/card";
import {
    DollarSign,
    FolderOpen,
    Users,
    HeadphonesIcon,
    Award,
    LifeBuoy,
} from "lucide-react";

const featureCards = [
    {
        id: "affordable",
        title: "Best learning at affordable prices",
        description:
            "Best quality education accessible to everyone with affordable pricing",
        icon: <DollarSign className="w-8 h-8 text-green-600" />,
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
    },
    {
        id: "project-based",
        title: "Project Based Learning",
        description: "",
        icon: <FolderOpen className="w-8 h-8 text-purple-600" />,
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
    },
    {
        id: "mentors",
        title: "Nation's leading industry mentors",
        description: "",
        icon: <Users className="w-8 h-8 text-blue-600" />,
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
    },
    {
        id: "support",
        title: "Dedicated support sessions",
        description: "",
        icon: <HeadphonesIcon className="w-8 h-8 text-orange-600" />,
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
    },
    {
        id: "certificate",
        title: "Certification",
        description: "",
        icon: <Award className="w-8 h-8 text-yellow-600" />,
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
    },
    {
        id: "continued-support",
        title: "Continued exclusive support",
        description: "",
        icon: <LifeBuoy className="w-8 h-8 text-red-600" />,
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
    },
];

export default function WhyBestChoiceSection() {
    return (
        <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                        Why Innodemy is Your Best Choice
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Innodemy stands out through its commitment to quality,
                        relevance, and learner success. Acquire in-demand skills
                        with expert instruction, real-world projects, and
                        collaborative learning
                    </p>
                </div>

                {/* Feature Cards - 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featureCards.map((card) => (
                        <Card
                            key={card.id}
                            className={`${card.bgColor} ${card.borderColor} border-2 hover:shadow-lg transition-all duration-300 group cursor-pointer rounded-2xl`}
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    {/* Icon */}
                                    <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        {card.icon}
                                    </div>

                                    {/* Title */}
                                    <h4 className="font-bold text-gray-900 text-sm leading-tight">
                                        {card.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
