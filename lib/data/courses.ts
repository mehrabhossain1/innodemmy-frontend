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
        description: `এই কোর্সটি ডিজাইন করা হয়েছে মেশিন লার্নিং ও ডেটা সায়েন্সে দক্ষতা অর্জনের পূর্বশর্ত হিসেবে মজবুত পাইথন প্রোগ্রামিং দক্ষতা গড়ে তোলার জন্য। এখানে মেশিন লার্নিং অ্যালগরিদম বা থিওরি নয়, বরং প্রোগ্রামিংয়ের মূল ধারাগুলো দক্ষতার সাথে আয়ত্ত করার উপর জোর দেয়া হয়েছে।

কোর্সের মাধ্যমে আপনি পাইথনের মৌলিক থেকে উন্নত ধারণাসমূহ হাতে-কলমে শিখবেন, যার মাধ্যমে বিভিন্ন প্রোগ্রামিং কনসেপ্ট যেমন ডেটা স্ট্রাকচার, ফাংশনাল প্রোগ্রামিং, অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং, এক্সেপশন হ্যান্ডলিং এবং ফাইল হ্যান্ডলিংয়ে দক্ষতা অর্জন করবেন।

এছাড়াও, কোর্সে অন্তর্ভুক্ত ১০টি প্রকটিক্যাল প্রজেক্টের মাধ্যমে বাস্তব সমস্যা সমাধানের দক্ষতা বৃদ্ধি পাবে, যা আপনাকে প্রোগ্রামিং দক্ষতায় আত্মবিশ্বাসী করে তুলবে এবং মেশিন লার্নিং শেখার জন্য প্রয়োজনীয় ভিত্তি প্রস্তুত করবে।`,
        category: COURSE_CATEGORIES.DATA_SCIENCE_AI,
        batchName: "Batch 1",
        thumbnail: "https://abctrainings.in/media/thumbnails/Python-01_2_1.png",
        price: 2500,
        totalClasses: 12,
        totalWeeks: 4,
        totalModules: 10,
        totalProjects: 10,
        enrolledCount: 156,
        idealFor: [
            "Individuals interested in machine learning who want to build a strong foundation in programming",
            "Beginners with little to no prior Python experience",
            "Students and professionals looking to transition into data science and AI fields",
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
            // Additional modules will be added here
        ],
        projects: [
            "Password generator",
            "Number guessing game",
            // Additional projects will be added here
        ],
        createdAt: new Date("2025-01-15"),
        updatedAt: new Date("2025-01-15"),
    },
    {
        _id: "2",
        title: "Clinical Research Training Program",
        description: `This comprehensive training program is designed to equip aspiring researchers, medical professionals, and public health practitioners with the essential skills to design, conduct, and publish high-quality clinical and epidemiological research.

The course adopts a tiered learning approach, progressing from foundational research literacy to advanced protocol development and data management. Integrated AI-powered tools (ChatGPT, Elicit, Scite, Litmaps, etc.) enhance learning efficiency and provide practical support throughout the research journey.

Participants will master critical appraisal, gap analysis, study design selection, ethical compliance with BMRC guidelines, and complete protocol writing. By the end of this program, learners will be capable of developing BMRC-compliant research proposals ready for ethical review and implementation.`,
        category: COURSE_CATEGORIES.CLINICAL_RESEARCH,
        batchName: "Cohort 2025",
        thumbnail:
            "https://cf-images.us-east-1.prod.boltdns.net/v1/static/4174796152001/597bcf60-cb2e-47fe-bb7f-68547a597989/d327b79b-d3ac-4e37-9e4b-6891c236b25e/1280x720/match/image.jpg",
        price: 3500,
        totalClasses: 20,
        totalWeeks: 10,
        totalModules: 2,
        totalProjects: 5,
        enrolledCount: 89,
        idealFor: [
            "Medical students and young doctors interested in clinical research",
            "Public health professionals seeking research methodology training",
            "Researchers preparing BMRC or similar grant applications",
            "Academic professionals transitioning into evidence-based research roles",
        ],
        faq: [
            {
                question:
                    "Do I need prior research experience to join this course?",
                answer: "No prior research experience is required. The course starts with foundational concepts and gradually builds to advanced protocol development. Basic understanding of healthcare or public health is helpful but not mandatory.",
            },
            {
                question: "What AI tools will I learn to use?",
                answer: "You will learn to use ChatGPT for research writing, Elicit and ResearchRabbit for literature discovery, Scite for citation analysis, Litmaps and Connected Papers for gap analysis, and various AI tools for data management and statistical planning.",
            },
            {
                question:
                    "Will I be able to submit a BMRC proposal after this course?",
                answer: "Yes! The course is specifically designed to help you develop a complete, BMRC-compliant research protocol. By the end of Tier 2, you will have a submission-ready protocol with all required components including ethical considerations, conceptual framework, and data management plans.",
            },
            {
                question:
                    "Is this course recognized by BMRC or any medical institutions?",
                answer: "This is a professional training program focused on skill development. While not officially accredited by BMRC, the curriculum is aligned with BMRC guidelines and requirements for research proposal submission.",
            },
        ],
        modules: [
            {
                classNumber: 1,
                moduleTitle:
                    "Tier 1 – Research Foundation & Scientific Literacy",
                topics: [
                    "Submodule 1: Understanding Clinical & Epidemiological Research - Overview of biomedical, clinical, and public-health research paradigms",
                    "Translational research: from bench → bedside → community",
                    "Evidence hierarchies and levels of evidence",
                    "AI Practice: Use ChatGPT to generate definitions and examples of research types",
                    "Submodule 2: Choosing a Researchable Topic - Criteria for novelty, feasibility, ethical and societal relevance",
                    "Aligning topics with BMRC priority areas and SDG health goals",
                    "AI Practice: Use Elicit or ResearchRabbit to discover current research trends",
                    "Submodule 3: Reading & Deconstructing Scientific Articles (IMRaD Framework)",
                    "Understanding article components and logic flow",
                    "Extracting key methodology and results",
                    "AI Practice: Use Scite to analyze citation strength and study impact",
                    "Submodule 4: Critical Appraisal & Bias Detection - Appraisal checklists (CASP, STROBE, CONSORT)",
                    "Bias types and confounder identification",
                    "AI Support: Ask ChatGPT to generate bias summaries and checklist feedback",
                    "Submodule 5: Identifying Research Gaps Using AI Tools",
                    "Differentiating knowledge voids from replication needs",
                    "Mapping literature clusters with Litmaps and Connected Papers",
                    "Submodule 6: Developing Research Questions, Objectives & Hypotheses",
                    "PICO/PECO/PICOT frameworks and SMART objectives",
                    "Null vs alternative hypotheses and testing logic",
                    "AI Practice: Use ChatGPT to refine research objectives and draft hypotheses",
                ],
                exercises: [
                    "Categorize 10 sample studies into correct design types",
                    "Topic shortlist with rationale and feasibility matrix",
                    "Write a summary of an assigned paper in ≤ 200 words",
                    "Apply STROBE checklist to a published observational study",
                    "Produce a visual gap map and brief gap statement",
                    "Gap analysis document + finalized research question sheet",
                ],
            },
            {
                classNumber: 2,
                moduleTitle:
                    "Tier 2 – Protocol Development, Study Design & Data Frameworking",
                topics: [
                    "Submodule 1: Study Design Selection - Overview of observational and experimental designs",
                    "Strengths and limitations of each approach",
                    "AI Support: Ask ChatGPT to simulate design selection scenarios",
                    "Submodule 2: Variable Identification & Conceptual Framework",
                    "Defining independent, dependent, and confounding variables",
                    "Constructing conceptual and analytical models",
                    "Hands-On: Use Canva AI or Lucidchart AI to draw framework diagrams",
                    "Submodule 3: Sampling Strategy & Sample Size Determination",
                    "Probability vs non-probability sampling",
                    "Formulas for proportion, mean difference, correlation",
                    "AI Integration: Compute sample size in Excel or ChatGPT math mode",
                    "Submodule 4: CRF / Questionnaire Development & Validation",
                    "CRF structure, question types, and scoring",
                    "Pilot testing and reliability testing (Cronbach's alpha)",
                    "Hands-On: Design Google Form and run mini pilot with peer feedback",
                    "Submodule 5: Data Management Planning - Codebooks, data security, and back-up plans",
                    "Data entry and quality-control workflow",
                    "AI Practice: Use ChatGPT to auto-generate variable codes and validation rules",
                    "Submodule 6: Ethical Considerations & Informed Consent",
                    "BMRC guidelines, confidentiality, and local ethics context",
                    "Practice: Write a participant information sheet and consent form with AI editing for readability",
                    "Submodule 7: Writing a BMRC-Compliant Protocol",
                    "Section-wise writing (Background, Objectives, Methods, Timeline, Budget)",
                    "Referencing and final review for submission",
                    "AI Support: Use structured ChatGPT prompts for each protocol section",
                ],
                exercises: [
                    "Analyze five abstracts to select correct design type",
                    "Create conceptual framework diagram using AI tools",
                    "Sample-size calculation sheet with literature references",
                    "Design and validate Google Form questionnaire with pilot testing",
                    "Data management plan with codebook and security protocols",
                    "Participant information sheet and informed consent form",
                    "Full BMRC-ready protocol + conceptual diagram + CRF toolset",
                ],
            },
            // Tier 3 will be added when provided
        ],
        projects: [
            "Complete literature gap analysis with visual mapping",
            "BMRC-compliant research protocol development",
            "Validated questionnaire/CRF with pilot results",
            "Conceptual framework and analytical model design",
            "Sample size calculation and data management plan",
        ],
        createdAt: new Date("2025-01-16"),
        updatedAt: new Date("2025-01-16"),
    },
    // Additional courses will be added here
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
