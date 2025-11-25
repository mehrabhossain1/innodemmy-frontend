import { Course } from "../models";
import { COURSE_CATEGORIES } from "../constants/categories";

/**
 * Hardcoded course data for Innodemy LMS
 * This file contains all course information until database integration
 */

export const coursesData: Course[] = [
    // Python Programming for Machine Learning
    {
        _id: "1",
        title: "Python Programming for Machine Learning",
        slug: "python-programming-for-machine-learning",
        description: `এই কোর্সটি ডিজাইন করা হয়েছে মেশিন লার্নিং ও ডেটা সায়েন্সে দক্ষতা অর্জনের পূর্বশর্ত হিসেবে মজবুত পাইথন প্রোগ্রামিং দক্ষতা গড়ে তোলার জন্য। এখানে মেশিন লার্নিং অ্যালগরিদম বা থিওরি নয়, বরং প্রোগ্রামিংয়ের মূল ধারাগুলো দক্ষতার সাথে আয়ত্ত করার উপর জোর দেয়া হয়েছে।
কোর্সের মাধ্যমে আপনি পাইথনের মৌলিক থেকে উন্নত ধারণাসমূহ হাতে-কলমে শিখবেন, যার মাধ্যমে বিভিন্ন প্রোগ্রামিং কনসেপ্ট যেমন ডেটা স্ট্রাকচার, ফাংশনাল প্রোগ্রামিং, অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং, এক্সেপশন হ্যান্ডলিং এবং ফাইল হ্যান্ডলিংয়ে দক্ষতা অর্জন করবেন।
এছাড়াও, কোর্সে অন্তর্ভুক্ত ১০টি প্রকটিক্যাল প্রজেক্টের মাধ্যমে বাস্তব সমস্যা সমাধানের দক্ষতা বৃদ্ধি পাবে, যা আপনাকে প্রোগ্রামিং দক্ষতায় আত্মবিশ্বাসী করে তুলবে এবং মেশিন লার্নিং শেখার জন্য প্রয়োজনীয় ভিত্তি প্রস্তুত করবে।`,
        thumbnail: "https://abctrainings.in/media/thumbnails/Python-01_2_1.png",
        courseVideoUrl: "https://www.youtube.com/watch?v=example",
        courseStartDate: new Date("2025-02-01"),
        category: COURSE_CATEGORIES.PROGRAMMING,
        batchName: "Batch 1",
        price: 8000,
        totalLiveClasses: 12,
        totalWeeks: 4,
        totalModules: 10,
        totalProjects: 10,
        totalExercises: 15,

        //
        idealFor: [
            "Individuals interested in machine learning who want to build a strong foundation in programming",
            "Students and professionals aspiring to pursue a career in software development or data science",
            "Anyone looking to enhance their Python programming skills",
        ],

        //
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

        //
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
    },

    // Advanced Evidence Generation & AI-Enabled Research Practice
    {
        _id: "2",
        title: "Advanced Evidence Generation & AI-Enabled Research Practice",
        slug: "advanced-evidence-generation-&-ai-enabled-research-practice",
        description: `Deep-dive into meta-analysis, advanced biostatistics, medical writing, and grant proposal development with automation. Move Beyond Research – Automate and Innovate with cutting-edge AI tools and methodologies.`,
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        courseVideoUrl: "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr",
        courseStartDate: new Date("2025-02-15"),
        category: COURSE_CATEGORIES.CLINICAL_RESEARCH,
        batchName: "Batch 1",
        price: 8000,
        totalLiveClasses: 16,
        totalWeeks: 8,
        totalModules: 8,
        totalProjects: 5,
        totalExercises: 20,

        //
        idealFor: [
            "Clinical researchers looking to enhance their research methodology skills",
            "Medical professionals interested in evidence-based practice and research",
            "Graduate students in health sciences seeking advanced research capabilities",
            "Healthcare professionals aiming to publish in high-impact journals",
            "Anyone interested in leveraging AI for research automation and innovation",
        ],

        //
        faq: [
            {
                question: "Who should take this course?",
                answer: "This course is designed for clinical researchers, medical professionals, graduate students, and healthcare workers who want to advance their research skills with AI-enabled tools and methodologies.",
            },
            {
                question: "Do I need prior research experience?",
                answer: "Basic understanding of research methodology is recommended. However, the course starts with foundational concepts and progressively builds to advanced topics.",
            },
            {
                question: "What tools will I learn to use?",
                answer: "You'll learn to use cutting-edge AI tools for systematic reviews, meta-analysis software, statistical packages, and automation tools for medical writing and grant proposals.",
            },
            {
                question: "Will I learn to write research papers?",
                answer: "Yes! Medical writing is a key component of this course. You'll learn how to structure, write, and submit high-quality research papers to peer-reviewed journals.",
            },
            {
                question: "How is this course different from basic research courses?",
                answer: "This course goes beyond traditional research methods by incorporating AI-enabled automation, advanced biostatistics, meta-analysis techniques, and grant proposal development.",
            },
            {
                question: "Will I receive a certificate?",
                answer: "Yes, upon successful completion of the course and all assignments, you'll receive a certificate of completion.",
            },
            {
                question: "What is the course duration?",
                answer: "The course spans 8 weeks with 16 live classes, covering comprehensive topics from evidence generation to publication.",
            },
            {
                question: "Can I access recorded sessions?",
                answer: "Absolutely! All live sessions are recorded and made available for review at your convenience.",
            },
        ],

        //
        modules: [
            {
                classNumber: 1,
                moduleTitle: "Module 1: Introduction to Evidence-Based Research",
                topics: [
                    "Understanding evidence-based practice",
                    "Research question formulation (PICO framework)",
                    "Study design overview",
                    "Introduction to systematic reviews",
                ],
                exercises: [
                    "Formulate a research question using PICO",
                    "Identify appropriate study designs",
                ],
            },
            {
                classNumber: 2,
                moduleTitle: "Module 2: Systematic Reviews & Meta-Analysis Fundamentals",
                topics: [
                    "Systematic review methodology",
                    "PRISMA guidelines",
                    "Search strategies and databases",
                    "Study selection and quality assessment",
                ],
                exercises: [
                    "Develop a search strategy",
                    "Practice quality assessment using tools",
                ],
            },
            {
                classNumber: 3,
                moduleTitle: "Module 3: Advanced Meta-Analysis Techniques",
                topics: [
                    "Fixed vs random effects models",
                    "Heterogeneity assessment",
                    "Publication bias and funnel plots",
                    "Sensitivity analysis",
                ],
                exercises: [
                    "Conduct meta-analysis using software",
                    "Interpret forest plots",
                ],
            },
            {
                classNumber: 4,
                moduleTitle: "Module 4: Advanced Biostatistics",
                topics: [
                    "Regression analysis (linear, logistic)",
                    "Survival analysis",
                    "Multivariate analysis techniques",
                    "Sample size calculation",
                ],
                exercises: [
                    "Perform regression analysis",
                    "Calculate sample sizes for studies",
                ],
            },
            {
                classNumber: 5,
                moduleTitle: "Module 5: AI Tools for Research Automation",
                topics: [
                    "AI-powered literature search tools",
                    "Automated data extraction",
                    "Text mining and NLP for research",
                    "AI-assisted systematic reviews",
                ],
                exercises: [
                    "Use AI tools for literature screening",
                    "Automate data extraction processes",
                ],
            },
            {
                classNumber: 6,
                moduleTitle: "Module 6: Medical Writing Essentials",
                topics: [
                    "Structure of research papers (IMRaD)",
                    "Writing effective abstracts",
                    "Results presentation and visualization",
                    "Citation management",
                ],
                exercises: [
                    "Draft an abstract for your research",
                    "Create publication-quality figures",
                ],
            },
            {
                classNumber: 7,
                moduleTitle: "Module 7: Grant Proposal Development",
                topics: [
                    "Understanding funding mechanisms",
                    "Grant proposal structure",
                    "Budget preparation",
                    "Review criteria and success strategies",
                ],
                exercises: [
                    "Outline a grant proposal",
                    "Prepare a realistic budget",
                ],
            },
            {
                classNumber: 8,
                moduleTitle: "Module 8: Publication & Dissemination",
                topics: [
                    "Journal selection strategies",
                    "Submission process and peer review",
                    "Responding to reviewer comments",
                    "Research dissemination and impact",
                ],
                exercises: [
                    "Practice responding to mock reviews",
                    "Create a dissemination plan",
                ],
            },
        ],

        //
        projects: [
            "Complete systematic review with meta-analysis",
            "Advanced statistical analysis project",
            "AI-automated literature review",
            "Medical manuscript preparation",
            "Grant proposal development",
        ],
    },

    // Biostatistics, Data Analysis & Evidence Interpretation
    {
        _id: "3",
        title: "Biostatistics, Data Analysis & Evidence Interpretation",
        slug: "biostatistics-data-analysis-&-evidence-interpretation",
        description: `Master hands-on statistical analysis, interpretation, and visualization using SPSS, STATA, Excel, and AI assistance. Transform datasets into decision-ready insights with comprehensive training in descriptive and inferential statistics, regression modeling, and publication-quality visualizations.`,
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        courseVideoUrl: "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr",
        courseStartDate: new Date("2025-03-01"),
        category: COURSE_CATEGORIES.CLINICAL_RESEARCH,
        batchName: "Batch 1",
        price: 7000,
        totalLiveClasses: 14,
        totalWeeks: 7,
        totalModules: 7,
        totalProjects: 4,
        totalExercises: 15,

        //
        idealFor: [
            "Healthcare professionals seeking to interpret research data effectively",
            "Clinical researchers wanting to perform their own statistical analyses",
            "Graduate students in health sciences requiring biostatistics skills",
            "Medical professionals preparing manuscripts for publication",
            "Anyone looking to master statistical software (SPSS, STATA, Excel) for research",
        ],

        //
        faq: [
            {
                question: "Do I need prior statistics knowledge?",
                answer: "Basic understanding of mathematics is helpful, but the course starts from fundamentals and progressively builds to advanced topics. We cover everything from descriptive statistics to complex regression models.",
            },
            {
                question: "What software will I learn?",
                answer: "You'll gain hands-on experience with SPSS, STATA, and Excel for statistical analysis. We'll also introduce AI-assisted tools for data interpretation and visualization.",
            },
            {
                question: "Will I be able to analyze my own research data after this course?",
                answer: "Absolutely! The course is designed to make you independent in conducting statistical analyses, interpreting results, and creating publication-ready tables and figures.",
            },
            {
                question: "Is this course suitable for qualitative researchers?",
                answer: "This course focuses on quantitative data analysis. However, if you work with mixed-methods research or need to understand statistical sections in papers, this course will be valuable.",
            },
            {
                question: "How is this different from online statistics courses?",
                answer: "This course emphasizes practical, hands-on application with real healthcare datasets. You'll learn not just the theory, but how to actually perform analyses and interpret results in clinical context.",
            },
            {
                question: "Will I learn how to present data visually?",
                answer: "Yes! Data visualization is a key component. You'll learn to create professional graphs, charts, and tables suitable for research papers and presentations.",
            },
            {
                question: "Can I get help with my specific research project?",
                answer: "The course includes project support sessions where you can get guidance on applying the techniques to your own research data.",
            },
            {
                question: "What are the system requirements?",
                answer: "You'll need a Windows PC (SPSS and STATA work best on Windows). We'll provide guidance on software installation and setup during the course.",
            },
        ],

        //
        modules: [
            {
                classNumber: 1,
                moduleTitle: "Module 1: Introduction to Biostatistics & Data Types",
                topics: [
                    "Role of statistics in healthcare research",
                    "Types of data: categorical, continuous, ordinal",
                    "Understanding variables and scales of measurement",
                    "Introduction to statistical software (SPSS, STATA, Excel)",
                    "Data entry and data management basics",
                ],
                exercises: [
                    "Install and set up statistical software",
                    "Enter sample dataset and identify variable types",
                ],
            },
            {
                classNumber: 2,
                moduleTitle: "Module 2: Descriptive Statistics & Data Summarization",
                topics: [
                    "Measures of central tendency (mean, median, mode)",
                    "Measures of dispersion (SD, variance, range, IQR)",
                    "Data distribution and normality testing",
                    "Creating frequency tables and cross-tabulations",
                    "Basic data visualization (histograms, box plots, bar charts)",
                ],
                exercises: [
                    "Calculate descriptive statistics for a dataset",
                    "Create summary tables for publication",
                ],
            },
            {
                classNumber: 3,
                moduleTitle: "Module 3: Probability & Hypothesis Testing Fundamentals",
                topics: [
                    "Probability distributions (normal, binomial, Poisson)",
                    "Understanding p-values and confidence intervals",
                    "Type I and Type II errors",
                    "Null and alternative hypotheses",
                    "Statistical significance vs clinical significance",
                ],
                exercises: [
                    "Interpret p-values and confidence intervals",
                    "Formulate hypotheses for research questions",
                ],
            },
            {
                classNumber: 4,
                moduleTitle: "Module 4: Parametric Tests (t-tests & ANOVA)",
                topics: [
                    "Independent samples t-test",
                    "Paired samples t-test",
                    "One-way ANOVA",
                    "Post-hoc tests (Bonferroni, Tukey)",
                    "Assumptions and when to use each test",
                ],
                exercises: [
                    "Perform t-tests on clinical data",
                    "Conduct ANOVA with multiple comparisons",
                ],
            },
            {
                classNumber: 5,
                moduleTitle: "Module 5: Non-Parametric Tests & Categorical Data Analysis",
                topics: [
                    "Mann-Whitney U test",
                    "Wilcoxon signed-rank test",
                    "Kruskal-Wallis test",
                    "Chi-square test for independence",
                    "Fisher's exact test",
                ],
                exercises: [
                    "Choose appropriate tests for non-normal data",
                    "Analyze categorical associations",
                ],
            },
            {
                classNumber: 6,
                moduleTitle: "Module 6: Correlation & Regression Analysis",
                topics: [
                    "Pearson and Spearman correlation",
                    "Simple linear regression",
                    "Multiple linear regression",
                    "Logistic regression basics",
                    "Model interpretation and assumptions",
                ],
                exercises: [
                    "Perform correlation analyses",
                    "Build and interpret regression models",
                ],
            },
            {
                classNumber: 7,
                moduleTitle: "Module 7: Data Visualization & Reporting",
                topics: [
                    "Creating publication-quality tables",
                    "Professional graphs and charts",
                    "Reporting statistical results (APA format)",
                    "AI-assisted interpretation and visualization",
                    "Common mistakes and how to avoid them",
                ],
                exercises: [
                    "Create complete statistical report",
                    "Design publication-ready figures",
                ],
            },
        ],

        //
        projects: [
            "Complete descriptive analysis of clinical dataset",
            "Comparative analysis using parametric tests",
            "Categorical data analysis project",
            "Regression modeling and interpretation report",
        ],
    },

    // ML
    // {
    //     _id: "2",
    //     title: "ML",
    //     slug: "ml",
    //     description: ``,
    //     thumbnail:
    //         "https://cdn.shopaccino.com/igmguru/products/machine-learning-training-igmguru_1499895199_l.jpg?v=532",
    //     courseVideoUrl: "https://www.youtube.com/watch?v=example",
    //     courseStartDate: new Date("2025-02-01"),
    //     category: COURSE_CATEGORIES.DATA_SCIENCE_AI,
    //     batchName: "Batch 1",
    //     price: 10000,
    //     totalLiveClasses: 36,
    //     totalWeeks: 0,
    //     totalModules: 13,
    //     totalProjects: 5,
    //     totalExercises: 0,

    //     //
    //     idealFor: [
    //         "Individuals interested in machine learning who want to build a strong foundation in programming",
    //         "Students and professionals aspiring to pursue a career in software development or data science",
    //         "Anyone looking to enhance their Python programming skills",
    //     ],

    //     //
    //     faq: [
    //         {
    //             question: "Who is this course designed for?",
    //             answer: "This course is ideal for beginners with little to no prior Python experience who want to build a strong foundation in Python programming and apply it to machine learning projects.",
    //         },
    //         {
    //             question: "Do I need any prior programming knowledge to join?",
    //             answer: "No prior programming experience is required. The course starts from the basics of Python and gradually progresses to more advanced topics.",
    //         },
    //         {
    //             question: "How is the course structured?",
    //             answer: "The course consists of 9 live classes spread over 3 weeks covering core Python concepts and practical exercises. The final 3 classes are dedicated to project support and mentorship.",
    //         },
    //         {
    //             question: "What programming environment/tools will be used?",
    //             answer: "We will use popular tools like Anaconda, VS Code, and Jupyter notebooks to write and run Python code, ensuring an easy setup for beginners.",
    //         },
    //         {
    //             question: "Are there any assignments or projects?",
    //             answer: "Yes! There are 10 real-life projects including a password generator, recursive file search, bank account system, news scraper, and more to reinforce your learning.",
    //         },
    //         {
    //             question:
    //                 "Will I learn machine learning algorithms in this course?",
    //             answer: "This course focuses on Python programming fundamentals required for machine learning, such as data handling, functions, OOP, and file operations. Machine learning-specific algorithms will be covered in follow-up courses.",
    //         },
    //         {
    //             question: "What if I miss a live class?",
    //             answer: "Recordings of all live classes will be provided so you can watch and learn at your convenience.",
    //         },
    //         {
    //             question: "Will there be support outside of live classes?",
    //             answer: "Yes, students can get project support during the final three classes and may also reach out through our designated communication channels for doubts and guidance.",
    //         },
    //         {
    //             question:
    //                 "How will this course help me in a machine learning career?",
    //             answer: "A solid grasp of Python programming and data manipulation is crucial in machine learning. This course equips you with those skills, providing a strong foundation to build machine learning models confidently.",
    //         },
    //         {
    //             question: "What are the prerequisites for this course?",
    //             answer: "A computer with internet access and basic familiarity with installing software is sufficient. No advanced prerequisites.",
    //         },
    //     ],

    //     //
    //     modules: [
    //         {
    //             classNumber: 1,
    //             moduleTitle: "Mathmatics for ML & DS",
    //             topics: [
    //                 "What is Python and why use it?",
    //                 "Installing Python (Anaconda, VS Code, Jupyter)",
    //                 "Python syntax, indentation, comments",
    //                 "Variables and naming rules",
    //                 "Built-in data types: int, float, str, bool",
    //                 "Type casting and type()",
    //                 "Operators: arithmetic, comparison, logical",
    //             ],
    //             exercises: [
    //                 "Personal info script",
    //                 "Simple calculator",
    //                 "Even/Odd number checker",
    //             ],
    //         },
    //         {
    //             classNumber: 2,
    //             moduleTitle: "Module 2: Strings, Input/Output & Control Flow",
    //             topics: [
    //                 "String indexing, slicing, methods (split(), join(), replace(), strip())",
    //                 "f-strings and .format()",
    //                 "input() and console interactions",
    //                 "if, elif, else statements",
    //                 "for, while loops",
    //                 "break, continue, pass",
    //                 "Nested loops and logic patterns",
    //             ],
    //             exercises: ["Password generator", "Word/character counter"],
    //         },
    //         {
    //             classNumber: 3,
    //             moduleTitle: "Module 3: Data Structures & List Comprehensions",
    //             topics: [
    //                 "Lists, Tuples, Sets, Dictionaries",
    //                 "CRUD operations on collections",
    //                 "get(), .update(), .items()",
    //                 "Nested structures",
    //                 "zip(), enumerate(), sorted()",
    //                 "List comprehensions and dictionary/set comprehensions",
    //             ],
    //             exercises: ["Student record manager", "Word frequency counter"],
    //         },
    //         {
    //             classNumber: 4,
    //             moduleTitle: "Module 4: Functions, Recursion & Modules",
    //             topics: [
    //                 "Defining and calling functions",
    //                 "Parameters, return values, scope",
    //                 "Default, keyword, variable-length arguments",
    //                 "Recursion: factorial, Fibonacci, directory scan",
    //                 "Anonymous functions: lambda",
    //                 "map(), filter(), reduce()",
    //                 "Built-in functions: map(), filter(), reduce()",
    //                 "Writing your own modules and imports",
    //             ],
    //             exercises: [
    //                 "Recursive file search",
    //                 "Word filter with lambda and filter()",
    //             ],
    //         },
    //         {
    //             classNumber: 5,
    //             moduleTitle: "Module 5: File Handling, CSV & JSON",
    //             topics: [
    //                 "Working with text files",
    //                 "CSV files using csv module",
    //                 "JSON: parsing, serialization",
    //                 "with statement, open(), read(), write()",
    //                 "File loops and data cleaning",
    //                 "File system navigation: os, pathlib",
    //             ],
    //             exercises: [
    //                 "CSV data cleaner & summarizer",
    //                 "JSON user profile builder",
    //             ],
    //         },
    //         {
    //             classNumber: 6,
    //             moduleTitle: "Module 6: Error Handling & Debugging",
    //             topics: [
    //                 "Error types: syntax, runtime, logic",
    //                 "Try-Except blocks, else, finally",
    //                 "Custom exceptions with raise",
    //                 "Basic debugger: pdb",
    //                 "Logging intro (optional)",
    //             ],
    //             exercises: ["File reader with missing file handler"],
    //         },
    //         {
    //             classNumber: 7,
    //             moduleTitle: "Module 7: Object-Oriented Programming (OOP)",
    //             topics: [
    //                 "Classes, objects, __init__, attributes",
    //                 "Class methods and self",
    //                 "Inheritance and method overriding",
    //                 "Encapsulation and __str__",
    //                 "Composition (optional)",
    //             ],
    //             exercises: ["Bank account system", "Tic-Tac-Toe with OOP"],
    //         },
    //         {
    //             classNumber: 8,
    //             moduleTitle:
    //                 "Module 8: Advanced Python (Generators, Decorators, Virtualenv)",
    //             topics: [
    //                 "Generators: yield, lazy evaluation",
    //                 "Decorators: writing and applying",
    //                 "Closures and first-class functions",
    //                 "Introduction to virtualenv & pip",
    //                 "Installing external libraries",
    //             ],
    //             exercises: ["Generator for large file line processing"],
    //         },
    //         {
    //             classNumber: 9,
    //             moduleTitle: "Module 9: Web Scraping & APIs",
    //             topics: [
    //                 "Web scraping with requests, BeautifulSoup",
    //                 "Parsing HTML: tags, classes, attributes",
    //                 "Error handling for HTTP requests",
    //                 "Working with APIs (e.g., OpenWeatherMap)",
    //                 "Exporting data to CSV/JSON",
    //             ],
    //             exercises: [
    //                 "News headline scraper",
    //                 "Weather report fetcher",
    //                 "Job listings to CSV from web",
    //             ],
    //         },
    //         {
    //             classNumber: 10,
    //             moduleTitle: "Module 10: Project Support 1",
    //             topics: [],
    //             exercises: [],
    //         },
    //         {
    //             classNumber: 11,
    //             moduleTitle: "Module 11: Project Support 2",
    //             topics: [],
    //             exercises: [],
    //         },
    //         {
    //             classNumber: 12,
    //             moduleTitle: "Module 12: Project Support 3",
    //             topics: [],
    //             exercises: [],
    //         },
    //     ],

    //     //
    //     projects: [
    //         "Password generator",
    //         "Number guessing game",
    //         "Recursive file search",
    //         "CSV data cleaner & summarizer",
    //         "JSON user profile builder",
    //         "File reader with missing file handler",
    //         "Bank account system (OOP)",
    //         "Tic-Tac-Toe with OOP",
    //         "Generator for large file line processing",
    //         "News headline scraper",
    //     ],
    // },
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
