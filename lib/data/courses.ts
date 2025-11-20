import { Course } from "../models";
import { COURSE_CATEGORIES } from "../constants/categories";

/**
 * Hardcoded course data for Innodemy LMS
 * This file contains all course information until database integration
 */

export const coursesData: Course[] = [
    {
        _id: "1",
        title: "Python Programming for Machine Learning",
        slug: "python-programming-for-machine-learning",
        description: `এই কোর্সটি ডিজাইন করা হয়েছে মেশিন লার্নিং ও ডেটা সায়েন্সে দক্ষতা অর্জনের পূর্বশর্ত হিসেবে মজবুত পাইথন প্রোগ্রামিং দক্ষতা গড়ে তোলার জন্য। এখানে মেশিন লার্নিং অ্যালগরিদম বা থিওরি নয়, বরং প্রোগ্রামিংয়ের মূল ধারাগুলো দক্ষতার সাথে আয়ত্ত করার উপর জোর দেয়া হয়েছে।
কোর্সের মাধ্যমে আপনি পাইথনের মৌলিক থেকে উন্নত ধারণাসমূহ হাতে-কলমে শিখবেন, যার মাধ্যমে বিভিন্ন প্রোগ্রামিং কনসেপ্ট যেমন ডেটা স্ট্রাকচার, ফাংশনাল প্রোগ্রামিং, অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং, এক্সেপশন হ্যান্ডলিং এবং ফাইল হ্যান্ডলিংয়ে দক্ষতা অর্জন করবেন।
এছাড়াও, কোর্সে অন্তর্ভুক্ত ১০টি প্রকটিক্যাল প্রজেক্টের মাধ্যমে বাস্তব সমস্যা সমাধানের দক্ষতা বৃদ্ধি পাবে, যা আপনাকে প্রোগ্রামিং দক্ষতায় আত্মবিশ্বাসী করে তুলবে এবং মেশিন লার্নিং শেখার জন্য প্রয়োজনীয় ভিত্তি প্রস্তুত করবে।`,
        courseStartDate: new Date("2025-02-01"),
        category: COURSE_CATEGORIES.DATA_SCIENCE_AI,
        batchName: "Batch 1",
        thumbnail: "https://abctrainings.in/media/thumbnails/Python-01_2_1.png",
        price: 8000,
        totalLiveClasses: 12,
        totalWeeks: 4,
        totalModules: 10,
        totalProjects: 10,
        totalExercises: 15,
        enrolledCount: 156,
        idealFor: [
            "Individuals interested in machine learning who want to build a strong foundation in programming",
            "Students and professionals aspiring to pursue a career in software development or data science",
            "Anyone looking to enhance their Python programming skills",
        ],
        faq: [
            {
                question: "Who is this course designed for?",
                answer: "This course is ideal for beginners with little to no prior Python experience who want to build a strong foundation in Python programming and apply it to machine learning projects.",
            },
            {
                question: "Do I need any prior programming knowledge to join?",
                answer: "No prior programming experience is required. The course starts from the basics of Python and gradually progresses to more advanced topics.",
            },
            {
                question: "How is the course structured?",
                answer: "The course consists of 9 live classes spread over 3 weeks covering core Python concepts and practical exercises. The final 3 classes are dedicated to project support and mentorship.",
            },
            {
                question: "What programming environment/tools will be used?",
                answer: "We will use popular tools like Anaconda, VS Code, and Jupyter notebooks to write and run Python code, ensuring an easy setup for beginners.",
            },
            {
                question: "Are there any assignments or projects?",
                answer: "Yes! There are 10 real-life projects including a password generator, recursive file search, bank account system, news scraper, and more to reinforce your learning.",
            },
            {
                question:
                    "Will I learn machine learning algorithms in this course?",
                answer: "This course focuses on Python programming fundamentals required for machine learning, such as data handling, functions, OOP, and file operations. Machine learning-specific algorithms will be covered in follow-up courses.",
            },
            {
                question: "What if I miss a live class?",
                answer: "Recordings of all live classes will be provided so you can watch and learn at your convenience.",
            },
            {
                question: "Will there be support outside of live classes?",
                answer: "Yes, students can get project support during the final three classes and may also reach out through our designated communication channels for doubts and guidance.",
            },
            {
                question:
                    "How will this course help me in a machine learning career?",
                answer: "A solid grasp of Python programming and data manipulation is crucial in machine learning. This course equips you with those skills, providing a strong foundation to build machine learning models confidently.",
            },
            {
                question: "What are the prerequisites for this course?",
                answer: "A computer with internet access and basic familiarity with installing software is sufficient. No advanced prerequisites.",
            },
        ],
        modules: [
            {
                classNumber: 1,
                moduleTitle: "Module 1: Getting Started with Python",
                topics: [
                    "What is Python and why use it?",
                    "Installing Python (Anaconda, VS Code, Jupyter)",
                    "Python syntax, indentation, comments",
                    "Variables and naming rules",
                    "Built-in data types: int, float, str, bool",
                    "Type casting and type()",
                    "Operators: arithmetic, comparison, logical",
                ],
                exercises: [
                    "Personal info script",
                    "Simple calculator",
                    "Even/Odd number checker",
                ],
            },
            {
                classNumber: 2,
                moduleTitle: "Module 2: Strings, Input/Output & Control Flow",
                topics: [
                    "String indexing, slicing, methods (split(), join(), replace(), strip())",
                    "f-strings and .format()",
                    "input() and console interactions",
                    "if, elif, else statements",
                    "for, while loops",
                    "break, continue, pass",
                    "Nested loops and logic patterns",
                ],
                exercises: ["Password generator", "Word/character counter"],
            },
            {
                classNumber: 3,
                moduleTitle: "Module 3: Data Structures & List Comprehensions",
                topics: [
                    "Lists, Tuples, Sets, Dictionaries",
                    "CRUD operations on collections",
                    "get(), .update(), .items()",
                    "Nested structures",
                    "zip(), enumerate(), sorted()",
                    "List comprehensions and dictionary/set comprehensions",
                ],
                exercises: ["Student record manager", "Word frequency counter"],
            },
            {
                classNumber: 4,
                moduleTitle: "Module 4: Functions, Recursion & Modules",
                topics: [
                    "Defining and calling functions",
                    "Parameters, return values, scope",
                    "Default, keyword, variable-length arguments",
                    "Recursion: factorial, Fibonacci, directory scan",
                    "Anonymous functions: lambda",
                    "map(), filter(), reduce()",
                    "Built-in functions: map(), filter(), reduce()",
                    "Writing your own modules and imports",
                ],
                exercises: [
                    "Recursive file search",
                    "Word filter with lambda and filter()",
                ],
            },
            {
                classNumber: 5,
                moduleTitle: "Module 5: File Handling, CSV & JSON",
                topics: [
                    "Working with text files",
                    "CSV files using csv module",
                    "JSON: parsing, serialization",
                    "with statement, open(), read(), write()",
                    "File loops and data cleaning",
                    "File system navigation: os, pathlib",
                ],
                exercises: [
                    "CSV data cleaner & summarizer",
                    "JSON user profile builder",
                ],
            },
            {
                classNumber: 6,
                moduleTitle: "Module 6: Error Handling & Debugging",
                topics: [
                    "Error types: syntax, runtime, logic",
                    "Try-Except blocks, else, finally",
                    "Custom exceptions with raise",
                    "Basic debugger: pdb",
                    "Logging intro (optional)",
                ],
                exercises: ["File reader with missing file handler"],
            },
            {
                classNumber: 7,
                moduleTitle: "Module 7: Object-Oriented Programming (OOP)",
                topics: [
                    "Classes, objects, __init__, attributes",
                    "Class methods and self",
                    "Inheritance and method overriding",
                    "Encapsulation and __str__",
                    "Composition (optional)",
                ],
                exercises: ["Bank account system", "Tic-Tac-Toe with OOP"],
            },
            {
                classNumber: 8,
                moduleTitle:
                    "Module 8: Advanced Python (Generators, Decorators, Virtualenv)",
                topics: [
                    "Generators: yield, lazy evaluation",
                    "Decorators: writing and applying",
                    "Closures and first-class functions",
                    "Introduction to virtualenv & pip",
                    "Installing external libraries",
                ],
                exercises: ["Generator for large file line processing"],
            },
            {
                classNumber: 9,
                moduleTitle: "Module 9: Web Scraping & APIs",
                topics: [
                    "Web scraping with requests, BeautifulSoup",
                    "Parsing HTML: tags, classes, attributes",
                    "Error handling for HTTP requests",
                    "Working with APIs (e.g., OpenWeatherMap)",
                    "Exporting data to CSV/JSON",
                ],
                exercises: [
                    "News headline scraper",
                    "Weather report fetcher",
                    "Job listings to CSV from web",
                ],
            },
            {
                classNumber: 10,
                moduleTitle: "Module 10: Project Support 1",
                topics: [],
                exercises: [],
            },
            {
                classNumber: 11,
                moduleTitle: "Module 11: Project Support 2",
                topics: [],
                exercises: [],
            },
            {
                classNumber: 12,
                moduleTitle: "Module 12: Project Support 3",
                topics: [],
                exercises: [],
            },
        ],

        //
        projects: [
            "Password generator",
            "Number guessing game",
            "Recursive file search",
            "CSV data cleaner & summarizer",
            "JSON user profile builder",
            "File reader with missing file handler",
            "Bank account system (OOP)",
            "Tic-Tac-Toe with OOP",
            "Generator for large file line processing",
            "News headline scraper",
        ],
        createdAt: new Date("2025-01-15"),
        updatedAt: new Date("2025-01-15"),
    },

    //     {
    //         _id: "2",
    //         title: "Clinical Research Training Program",
    //         slug: "clinical-research-training-program", // Slug for the course
    //         description: `This comprehensive training program is designed to equip aspiring researchers, medical professionals, and public health practitioners with the essential skills to design, conduct, and publish high-quality clinical and epidemiological research.

    // The course adopts a tiered learning approach, progressing from foundational research literacy to advanced protocol development and data management. Integrated AI-powered tools (ChatGPT, Elicit, Scite, Litmaps, etc.) enhance learning efficiency and provide practical support throughout the research journey.

    // Participants will master critical appraisal, gap analysis, study design selection, ethical compliance with BMRC guidelines, and complete protocol writing. By the end of this program, learners will be capable of developing BMRC-compliant research proposals ready for ethical review and implementation.`,
    //         category: COURSE_CATEGORIES.CLINICAL_RESEARCH,
    //         batchName: "Cohort 2025",
    //         thumbnail:
    //             "https://cf-images.us-east-1.prod.boltdns.net/v1/static/4174796152001/597bcf60-cb2e-47fe-bb7f-68547a597989/d327b79b-d3ac-4e37-9e4b-6891c236b25e/1280x720/match/image.jpg",
    //         price: 3500,
    //         totalLiveClasses: 20, // Total number of live classes in the course
    //         totalWeeks: 10, // Total number of weeks in the course
    //         totalModules: 2, // Total number of modules in the course
    //         totalProjects: 5, // Total number of projects in the course
    //         enrolledCount: 89, // Total number of enrolled students in the course
    //         idealFor: [
    //             "Medical students and young doctors interested in clinical research",
    //             "Public health professionals seeking research methodology training",
    //             "Researchers preparing BMRC or similar grant applications",
    //             "Academic professionals transitioning into evidence-based research roles",
    //         ],
    //         faq: [
    //             {
    //                 question:
    //                     "Do I need prior research experience to join this course?",
    //                 answer: "No prior research experience is required. The course starts with foundational concepts and gradually builds to advanced protocol development. Basic understanding of healthcare or public health is helpful but not mandatory.",
    //             },
    //             {
    //                 question: "What AI tools will I learn to use?",
    //                 answer: "You will learn to use ChatGPT for research writing, Elicit and ResearchRabbit for literature discovery, Scite for citation analysis, Litmaps and Connected Papers for gap analysis, and various AI tools for data management and statistical planning.",
    //             },
    //             {
    //                 question:
    //                     "Will I be able to submit a BMRC proposal after this course?",
    //                 answer: "Yes! The course is specifically designed to help you develop a complete, BMRC-compliant research protocol. By the end of Tier 2, you will have a submission-ready protocol with all required components including ethical considerations, conceptual framework, and data management plans.",
    //             },
    //             {
    //                 question:
    //                     "Is this course recognized by BMRC or any medical institutions?",
    //                 answer: "This is a professional training program focused on skill development. While not officially accredited by BMRC, the curriculum is aligned with BMRC guidelines and requirements for research proposal submission.",
    //             },
    //         ],
    //         modules: [
    //             {
    //                 classNumber: 1,
    //                 moduleTitle:
    //                     "Tier 1 – Research Foundation & Scientific Literacy",
    //                 topics: [
    //                     "Submodule 1: Understanding Clinical & Epidemiological Research - Overview of biomedical, clinical, and public-health research paradigms",
    //                     "Translational research: from bench → bedside → community",
    //                     "Evidence hierarchies and levels of evidence",
    //                     "AI Practice: Use ChatGPT to generate definitions and examples of research types",
    //                     "Submodule 2: Choosing a Researchable Topic - Criteria for novelty, feasibility, ethical and societal relevance",
    //                     "Aligning topics with BMRC priority areas and SDG health goals",
    //                     "AI Practice: Use Elicit or ResearchRabbit to discover current research trends",
    //                     "Submodule 3: Reading & Deconstructing Scientific Articles (IMRaD Framework)",
    //                     "Understanding article components and logic flow",
    //                     "Extracting key methodology and results",
    //                     "AI Practice: Use Scite to analyze citation strength and study impact",
    //                     "Submodule 4: Critical Appraisal & Bias Detection - Appraisal checklists (CASP, STROBE, CONSORT)",
    //                     "Bias types and confounder identification",
    //                     "AI Support: Ask ChatGPT to generate bias summaries and checklist feedback",
    //                     "Submodule 5: Identifying Research Gaps Using AI Tools",
    //                     "Differentiating knowledge voids from replication needs",
    //                     "Mapping literature clusters with Litmaps and Connected Papers",
    //                     "Submodule 6: Developing Research Questions, Objectives & Hypotheses",
    //                     "PICO/PECO/PICOT frameworks and SMART objectives",
    //                     "Null vs alternative hypotheses and testing logic",
    //                     "AI Practice: Use ChatGPT to refine research objectives and draft hypotheses",
    //                 ],
    //                 exercises: [
    //                     "Categorize 10 sample studies into correct design types",
    //                     "Topic shortlist with rationale and feasibility matrix",
    //                     "Write a summary of an assigned paper in ≤ 200 words",
    //                     "Apply STROBE checklist to a published observational study",
    //                     "Produce a visual gap map and brief gap statement",
    //                     "Gap analysis document + finalized research question sheet",
    //                 ],
    //             },
    //             {
    //                 classNumber: 2,
    //                 moduleTitle:
    //                     "Tier 2 – Protocol Development, Study Design & Data Frameworking",
    //                 topics: [
    //                     "Submodule 1: Study Design Selection - Overview of observational and experimental designs",
    //                     "Strengths and limitations of each approach",
    //                     "AI Support: Ask ChatGPT to simulate design selection scenarios",
    //                     "Submodule 2: Variable Identification & Conceptual Framework",
    //                     "Defining independent, dependent, and confounding variables",
    //                     "Constructing conceptual and analytical models",
    //                     "Hands-On: Use Canva AI or Lucidchart AI to draw framework diagrams",
    //                     "Submodule 3: Sampling Strategy & Sample Size Determination",
    //                     "Probability vs non-probability sampling",
    //                     "Formulas for proportion, mean difference, correlation",
    //                     "AI Integration: Compute sample size in Excel or ChatGPT math mode",
    //                     "Submodule 4: CRF / Questionnaire Development & Validation",
    //                     "CRF structure, question types, and scoring",
    //                     "Pilot testing and reliability testing (Cronbach's alpha)",
    //                     "Hands-On: Design Google Form and run mini pilot with peer feedback",
    //                     "Submodule 5: Data Management Planning - Codebooks, data security, and back-up plans",
    //                     "Data entry and quality-control workflow",
    //                     "AI Practice: Use ChatGPT to auto-generate variable codes and validation rules",
    //                     "Submodule 6: Ethical Considerations & Informed Consent",
    //                     "BMRC guidelines, confidentiality, and local ethics context",
    //                     "Practice: Write a participant information sheet and consent form with AI editing for readability",
    //                     "Submodule 7: Writing a BMRC-Compliant Protocol",
    //                     "Section-wise writing (Background, Objectives, Methods, Timeline, Budget)",
    //                     "Referencing and final review for submission",
    //                     "AI Support: Use structured ChatGPT prompts for each protocol section",
    //                 ],
    //                 exercises: [
    //                     "Analyze five abstracts to select correct design type",
    //                     "Create conceptual framework diagram using AI tools",
    //                     "Sample-size calculation sheet with literature references",
    //                     "Design and validate Google Form questionnaire with pilot testing",
    //                     "Data management plan with codebook and security protocols",
    //                     "Participant information sheet and informed consent form",
    //                     "Full BMRC-ready protocol + conceptual diagram + CRF toolset",
    //                 ],
    //             },
    //             // Tier 3 will be added when provided
    //         ],
    //         projects: [
    //             "Complete literature gap analysis with visual mapping",
    //             "BMRC-compliant research protocol development",
    //             "Validated questionnaire/CRF with pilot results",
    //             "Conceptual framework and analytical model design",
    //             "Sample size calculation and data management plan",
    //         ],
    //         createdAt: new Date("2025-01-16"),
    //         updatedAt: new Date("2025-01-16"),
    //     },
];

/**
 * Get all courses
 */
export function getAllCourses(): Course[] {
    return coursesData;
}

/**
 * Get a course by ID
 */
export function getCourseById(id: string): Course | undefined {
    return coursesData.find((course) => course._id === id);
}

/**
 * Get courses by category
 */
export function getCoursesByCategory(category: string): Course[] {
    return coursesData.filter(
        (course) => course.category?.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Get total number of courses
 */
export function getTotalCourses(): number {
    return coursesData.length;
}
