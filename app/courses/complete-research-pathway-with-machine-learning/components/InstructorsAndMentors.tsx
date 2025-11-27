import Image, { StaticImageData } from "next/image";
import Container from "@/components/Container";
import SectionTitle from "@/components/course/SectionTitle";
import ArifMahmudSisir from "@/assets/instructors/Arif Mahmud Sisir.jpg";
import MAzizulHakimShuvo from "@/assets/instructors/M Azizul Hakim Shuvo.jpg";
import MamunurRashidAlex from "@/assets/instructors/Mamunur Rashid Alex.jpg";
import MdNafeeAlIslam from "@/assets/instructors/Md Nafee Al Islam.jpg";

interface Instructor {
    id: number;
    name: string;
    title: string;
    image: StaticImageData;
    expertise: string;
}

const instructors: Instructor[] = [
    {
        id: 1,
        name: "Arif Mahmud Sisir",
        title: "Machine Learning Researcher",
        image: ArifMahmudSisir,
        expertise: "Deep Learning & Computer Vision",
    },
    {
        id: 2,
        name: "M Azizul Hakim Shuvo",
        title: "Data Science Lead",
        image: MAzizulHakimShuvo,
        expertise: "NLP & Research Methodology",
    },
    {
        id: 3,
        name: "Mamunur Rashid Alex",
        title: "AI Research Scientist",
        image: MamunurRashidAlex,
        expertise: "Neural Networks & Model Optimization",
    },
    {
        id: 4,
        name: "Md Nafee Al Islam",
        title: "Senior ML Engineer",
        image: MdNafeeAlIslam,
        expertise: "Applied ML & Research Publication",
    },
];

export default function InstructorsAndMentors() {
    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <Container>
                <SectionTitle title="Instructors and Mentors" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor.id}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300">
                                    <Image
                                        src={instructor.image}
                                        alt={instructor.name}
                                        fill
                                        sizes="128px"
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                    {instructor.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
