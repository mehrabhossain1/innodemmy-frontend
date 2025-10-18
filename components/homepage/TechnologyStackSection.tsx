import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
    {
        name: "Sarah Johnson",
        username: "Software Engineer",
        body: "Innodemy's React course completely transformed my career. The hands-on projects and expert mentorship helped me land my dream job at a top tech company.",
        img: "https://avatar.vercel.sh/sarah",
    },
    {
        name: "Michael Chen",
        username: "Data Scientist",
        body: "The Python for Data Science course was exceptional. The instructors are industry experts who provide real-world insights you can't find anywhere else.",
        img: "https://avatar.vercel.sh/michael",
    },
    {
        name: "Emma Rodriguez",
        username: "UI/UX Designer",
        body: "I transitioned from marketing to design with Innodemy's UI/UX course. The portfolio projects and career guidance were invaluable for my career change.",
        img: "https://avatar.vercel.sh/emma",
    },
    {
        name: "David Kim",
        username: "Full Stack Developer",
        body: "The comprehensive curriculum and live coding sessions helped me master both frontend and backend development. Highly recommend to anyone serious about learning.",
        img: "https://avatar.vercel.sh/david",
    },
    {
        name: "Lisa Wang",
        username: "Product Manager",
        body: "Innodemy's courses taught me the technical skills I needed to communicate effectively with my development team. The practical approach is unmatched.",
        img: "https://avatar.vercel.sh/lisa",
    },
    {
        name: "Ahmed Hassan",
        username: "DevOps Engineer",
        body: "The cloud computing and DevOps courses gave me the exact skills needed for modern infrastructure. The instructors are current industry practitioners.",
        img: "https://avatar.vercel.sh/ahmed",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-80 cursor-pointer overflow-hidden rounded-2xl border p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-200 ease-out",
                "border-gray-100 hover:border-indigo-200"
            )}
        >
            <div className="flex flex-row items-center gap-3 mb-4">
                <Image
                    className="rounded-full"
                    width="48"
                    height="48"
                    alt=""
                    src={img}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    unoptimized
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-semibold text-gray-900">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-indigo-600">
                        {username}
                    </p>
                </div>
            </div>
            <blockquote className="text-sm text-gray-600 leading-relaxed">
                {body}
            </blockquote>
        </figure>
    );
};

export function TechnologyStackSection() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16 bg-white">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Technology Stack
                </h2>
            </div>

            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    );
}
