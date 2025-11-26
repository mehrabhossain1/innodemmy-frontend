interface SectionTitleProps {
    title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
    return (
        <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {title}
            </h2>
            <div className="w-48 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 mx-auto rounded-full"></div>
        </div>
    );
}
