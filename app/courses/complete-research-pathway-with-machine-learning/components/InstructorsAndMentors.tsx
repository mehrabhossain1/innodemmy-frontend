import Image, { StaticImageData } from "next/image";
import Container from "@/components/Container";
import SectionTitle from "@/components/course/SectionTitle";
import ArifMahmudSisir from "@/assets/instructors/Arif Mahmud Sisir.jpg";
import MamunurRashidAlex from "@/assets/instructors/Mamunur Rashid Alex.jpg";
import FakirSharifHossain from "@/assets/instructors/FakirSir.jpeg";
import AlifArman from "@/assets/instructors/Alif.png";
import USProfessor from "@/assets/instructors/USProfessor.png";

interface Instructor {
    id: number;
    name: string;
    title: string;
    institution: string;
    image: StaticImageData | string;
}

const instructors: Instructor[] = [
    {
        id: 1,
        name: "Dr. Fakir Sharif Hossain",
        title: "Associate Professor & Additional Director (ETL), IQAC",
        institution:
            "Department of Electrical and Electronic Engineering, Ahsanullah University of Science and Technology",
        image: FakirSharifHossain,
    },
    {
        id: 2,
        name: "Alif Arman",
        title: "Artificial Intelligence Engineer & ML Model Architect",
        institution: "Sysnova Information Systems Limited",
        image: AlifArman,
    },
    {
        id: 3,
        name: "Arif Mahmud Sisir",
        title: "AI Developer",
        institution: "Sparktech Agency",
        image: ArifMahmudSisir,
    },
    {
        id: 4,
        name: "Mamunur Rashid Alex, MSc",
        title: "AI Researcher & Academic Mentor",
        institution: "Specializing in Research Paper Writing & Publication",
        image: MamunurRashidAlex,
    },
    {
        id: 5,
        name: "Guest Professor",
        title: "Department of Computer Science",
        institution: "From a University in USA",
        image: USProfessor,
    },
];

export default function InstructorsAndMentors() {
    return (
        <section className="py-12 bg-gradient-to-br from-gray-50 via-yellow-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
            <Container>
                <SectionTitle title="Instructors and Mentors" />

                <div className="flex flex-wrap justify-center gap-6">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor.id}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-500 hover:-translate-y-1 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="relative w-28 h-28 mb-4 overflow-hidden rounded-full ring-4 ring-yellow-400/30 group-hover:ring-yellow-500/60 transition-all duration-300 shadow-lg">
                                    <Image
                                        src={instructor.image}
                                        alt={instructor.name}
                                        fill
                                        sizes="112px"
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                    {instructor.name}
                                </h3>
                                <div className="w-10 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-2"></div>
                                <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 mb-1.5 leading-relaxed">
                                    {instructor.title}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                    {instructor.institution}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
