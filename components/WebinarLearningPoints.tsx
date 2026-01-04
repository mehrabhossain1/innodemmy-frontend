interface WebinarLearningPointsProps {
    title: string;
    points: string[];
}

export default function WebinarLearningPoints({
    title,
    points,
}: WebinarLearningPointsProps) {
    return (
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
            <h3 className="font-bold text-xl mb-4">{title}</h3>

            <ul className="space-y-3">
                {points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span className="text-muted-foreground">{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
