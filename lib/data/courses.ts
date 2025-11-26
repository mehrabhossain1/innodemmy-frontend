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

    // Innodemy Clinical Research Mastery Program
    {
        _id: "4",
        title: "Innodemy Clinical Research Mastery Program",
        slug: "innodemy-clinical-research-mastery-program",
        description: `ক্লিনিক্যাল রিসার্চ ইন্ডাস্ট্রিতে আপনার ক্যারিয়ার গড়তে চান? এই কোর্সে শিখবেন ক্লিনিক্যাল ট্রায়াল ডিজাইন, রেগুলেটরি অ্যাফেয়ার্স, ডেটা ম্যানেজমেন্ট এবং আরও অনেক কিছু। এই সম্পূর্ণ প্রোগ্রামটি আপনাকে একজন দক্ষ ক্লিনিক্যাল রিসার্চ প্রফেশনাল হিসেবে গড়ে তুলবে।`,
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        courseVideoUrl: "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr",
        courseStartDate: new Date("2025-03-15"),
        category: COURSE_CATEGORIES.CLINICAL_RESEARCH,
        batchName: "Batch 1",
        price: 15000,
        totalLiveClasses: 20,
        totalWeeks: 10,
        totalModules: 10,
        totalProjects: 6,
        totalExercises: 25,

        //
        idealFor: [
            "Medical graduates aspiring to enter clinical research industry",
            "Healthcare professionals seeking career transition to clinical research",
            "Pharmacy and life sciences graduates interested in clinical trials",
            "Research coordinators wanting to advance their skills",
            "Anyone passionate about contributing to medical advancement through research",
        ],

        //
        faq: [
            {
                question: "এই কোর্স কাদের জন্য?",
                answer: "এই কোর্স মেডিকেল, ফার্মেসি, লাইফ সায়েন্স গ্র্যাজুয়েট এবং হেলথকেয়ার প্রফেশনালদের জন্য যারা ক্লিনিক্যাল রিসার্চে ক্যারিয়ার গড়তে চান।",
            },
            {
                question: "কোর্সটি কতদিনের?",
                answer: "এই সম্পূর্ণ প্রোগ্রামটি ১০ সপ্তাহের, যেখানে ২০টি লাইভ ক্লাস রয়েছে। প্রতিটি ক্লাস ইন্টারেক্টিভ এবং হ্যান্ডস-অন প্র্যাকটিসের সাথে।",
            },
            {
                question: "কোর্স শেষে আমি কী কী শিখতে পারব?",
                answer: "ক্লিনিক্যাল ট্রায়াল ডিজাইন, প্রোটোকল ডেভেলপমেন্ট, রেগুলেটরি অ্যাফেয়ার্স, ডেটা ম্যানেজমেন্ট, GCP কমপ্লায়েন্স এবং আরও অনেক কিছু শিখবেন যা আপনাকে ইন্ডাস্ট্রি-রেডি করবে।",
            },
            {
                question: "কি কোন পূর্ব অভিজ্ঞতা প্রয়োজন?",
                answer: "মেডিকেল বা লাইফ সায়েন্স ব্যাকগ্রাউন্ড থাকলেই যথেষ্ট। ক্লিনিক্যাল রিসার্চের পূর্ব অভিজ্ঞতার প্রয়োজন নেই।",
            },
            {
                question: "কোর্স শেষে চাকরির সুযোগ কেমন?",
                answer: "ক্লিনিক্যাল রিসার্চ ইন্ডাস্ট্রিতে বর্তমানে প্রচুর চাকরির সুযোগ রয়েছে। কোর্স শেষে আপনি CRC, CRA, Data Manager সহ বিভিন্ন পজিশনের জন্য যোগ্য হবেন।",
            },
            {
                question: "কোর্সে কি সার্টিফিকেট পাব?",
                answer: "হ্যাঁ, কোর্স সফলভাবে সম্পন্ন করলে আপনি Innodemy থেকে সার্টিফিকেট পাবেন।",
            },
            {
                question: "লাইভ ক্লাস মিস করলে কী হবে?",
                answer: "সব লাইভ ক্লাসের রেকর্ডিং পাবেন যা আপনি যেকোনো সময় দেখতে পারবেন।",
            },
            {
                question: "প্রজেক্ট সাপোর্ট পাব কি?",
                answer: "হ্যাঁ, কোর্সে প্র্যাকটিক্যাল প্রজেক্ট এবং কেস স্টাডি রয়েছে যেখানে আপনি সম্পূর্ণ মেন্টরশিপ পাবেন।",
            },
        ],

        //
        modules: [
            {
                classNumber: 1,
                moduleTitle: "Module 1: Introduction to Clinical Research",
                topics: [
                    "Overview of clinical research industry",
                    "Drug development process",
                    "Phases of clinical trials",
                    "Key stakeholders in clinical research",
                    "Career opportunities in clinical research",
                ],
                exercises: [
                    "Identify phases of given clinical trials",
                    "Map stakeholder roles in a trial",
                ],
            },
            {
                classNumber: 2,
                moduleTitle: "Module 2: Clinical Trial Design",
                topics: [
                    "Study design types (RCT, cohort, case-control)",
                    "Randomization and blinding",
                    "Inclusion and exclusion criteria",
                    "Primary and secondary endpoints",
                    "Sample size determination",
                ],
                exercises: [
                    "Design a basic clinical trial",
                    "Calculate sample size for a study",
                ],
            },
            {
                classNumber: 3,
                moduleTitle: "Module 3: Protocol Development",
                topics: [
                    "Elements of clinical trial protocol",
                    "Writing clear objectives and endpoints",
                    "Study procedures and assessments",
                    "Safety monitoring plans",
                    "Protocol amendments",
                ],
                exercises: [
                    "Draft protocol synopsis",
                    "Review and critique sample protocols",
                ],
            },
            {
                classNumber: 4,
                moduleTitle: "Module 4: Good Clinical Practice (GCP)",
                topics: [
                    "ICH-GCP guidelines",
                    "Ethical principles in research",
                    "Informed consent process",
                    "Subject rights and safety",
                    "Documentation requirements",
                ],
                exercises: [
                    "Practice informed consent process",
                    "Identify GCP violations in case studies",
                ],
            },
            {
                classNumber: 5,
                moduleTitle: "Module 5: Regulatory Affairs",
                topics: [
                    "Regulatory authorities (FDA, EMA, DGHS)",
                    "IND/NDA submission process",
                    "Ethics committee approval",
                    "Regulatory documentation",
                    "Inspection preparedness",
                ],
                exercises: [
                    "Prepare ethics committee submission",
                    "Review regulatory documents",
                ],
            },
            {
                classNumber: 6,
                moduleTitle: "Module 6: Clinical Data Management",
                topics: [
                    "CRF design and eCRF systems",
                    "Data collection and entry",
                    "Data validation and cleaning",
                    "Database lock procedures",
                    "CDISC standards",
                ],
                exercises: [
                    "Design a CRF for a study",
                    "Perform data validation checks",
                ],
            },
            {
                classNumber: 7,
                moduleTitle: "Module 7: Pharmacovigilance & Safety",
                topics: [
                    "Adverse event reporting",
                    "SAE vs SUSAR",
                    "Safety databases",
                    "Risk management plans",
                    "Signal detection",
                ],
                exercises: [
                    "Report adverse events correctly",
                    "Analyze safety data from trials",
                ],
            },
            {
                classNumber: 8,
                moduleTitle: "Module 8: Clinical Trial Monitoring",
                topics: [
                    "Role of Clinical Research Associate (CRA)",
                    "Site selection and initiation",
                    "Monitoring visits (IMV, SMV, COV)",
                    "Source data verification",
                    "Monitoring reports",
                ],
                exercises: [
                    "Conduct mock monitoring visit",
                    "Write monitoring visit report",
                ],
            },
            {
                classNumber: 9,
                moduleTitle: "Module 9: Quality Assurance & Auditing",
                topics: [
                    "Quality management systems",
                    "Standard Operating Procedures (SOPs)",
                    "Internal audits",
                    "Regulatory inspections",
                    "CAPA (Corrective and Preventive Actions)",
                ],
                exercises: [
                    "Develop SOP for a process",
                    "Conduct mock audit",
                ],
            },
            {
                classNumber: 10,
                moduleTitle: "Module 10: Career Development & Industry Insights",
                topics: [
                    "Resume building for clinical research",
                    "Interview preparation",
                    "Networking in the industry",
                    "Continuing education and certifications",
                    "Future trends in clinical research",
                ],
                exercises: [
                    "Create professional CV",
                    "Mock interviews",
                ],
            },
        ],

        //
        projects: [
            "Complete protocol development project",
            "Clinical trial design case study",
            "Data management system implementation",
            "Pharmacovigilance case analysis",
            "Monitoring visit simulation",
            "Quality audit project",
        ],
    },

    // Protocol Development, Study Design & Data Frameworking
    {
        _id: "5",
        title: "Protocol Development, Study Design & Data Frameworking",
        slug: "protocol-development-study-design-&-data-frameworking",
        description: `Transform your research ideas into structured, ethical, and statistically sound BMRC-compliant research protocols. Master study design selection, data management, and ethical frameworks essential for conducting high-quality research.`,
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        courseVideoUrl: "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr",
        courseStartDate: new Date("2025-04-01"),
        category: COURSE_CATEGORIES.CLINICAL_RESEARCH,
        batchName: "Batch 1",
        price: 7000,
        totalLiveClasses: 12,
        totalWeeks: 6,
        totalModules: 6,
        totalProjects: 3,
        totalExercises: 18,

        //
        idealFor: [
            "Medical and health sciences students planning thesis research",
            "Researchers preparing BMRC or ethics committee submissions",
            "Healthcare professionals conducting clinical studies",
            "Faculty members supervising research projects",
            "Anyone seeking to develop robust research protocols",
        ],

        //
        faq: [
            {
                question: "What is a research protocol?",
                answer: "A research protocol is a detailed plan that outlines the objectives, design, methodology, statistical considerations, and organization of a research project. It ensures the study is conducted ethically and produces reliable results.",
            },
            {
                question: "Do I need prior research experience?",
                answer: "Basic understanding of research concepts is helpful, but not required. The course starts with fundamentals and progressively builds to advanced protocol development.",
            },
            {
                question: "Will this help with BMRC submissions?",
                answer: "Absolutely! The course specifically covers BMRC-compliant protocol development, including all required sections and ethical considerations for Bangladesh Medical Research Council submissions.",
            },
            {
                question: "What study designs will be covered?",
                answer: "The course covers all major study designs including experimental, observational (cohort, case-control, cross-sectional), and mixed-methods designs with guidance on selecting the appropriate design for your research question.",
            },
            {
                question: "Will I learn about data management?",
                answer: "Yes! Data frameworking and management are core components. You'll learn to create data collection forms, design databases, and plan data analysis strategies.",
            },
            {
                question: "Is ethical approval covered?",
                answer: "Yes, the course includes comprehensive coverage of ethical principles, informed consent, and preparing ethics committee submissions.",
            },
            {
                question: "Can I develop my own protocol during the course?",
                answer: "Definitely! Practical exercises and project work allow you to develop your own research protocol with instructor guidance and feedback.",
            },
            {
                question: "What will I receive upon completion?",
                answer: "You'll receive a course completion certificate and a complete, submission-ready research protocol developed during the course.",
            },
        ],

        //
        modules: [
            {
                classNumber: 1,
                moduleTitle: "Module 1: Introduction to Research Protocol Development",
                topics: [
                    "Purpose and importance of research protocols",
                    "Components of a research protocol",
                    "BMRC protocol requirements and guidelines",
                    "Research question formulation (PICO/FINER framework)",
                    "Literature review strategies",
                ],
                exercises: [
                    "Formulate a research question using PICO",
                    "Identify protocol components in sample protocols",
                    "Conduct focused literature search",
                ],
            },
            {
                classNumber: 2,
                moduleTitle: "Module 2: Study Design Selection",
                topics: [
                    "Experimental vs observational designs",
                    "Randomized controlled trials (RCTs)",
                    "Cohort, case-control, and cross-sectional studies",
                    "Quasi-experimental designs",
                    "Selecting appropriate design for research questions",
                ],
                exercises: [
                    "Match research questions to study designs",
                    "Critique study designs in published papers",
                    "Design a study for a given research question",
                ],
            },
            {
                classNumber: 3,
                moduleTitle: "Module 3: Methodology Development",
                topics: [
                    "Study population and sampling strategies",
                    "Inclusion and exclusion criteria",
                    "Sample size calculation and power analysis",
                    "Recruitment and retention strategies",
                    "Study timeline and feasibility assessment",
                ],
                exercises: [
                    "Define inclusion/exclusion criteria",
                    "Calculate sample size for different designs",
                    "Develop recruitment strategy",
                ],
            },
            {
                classNumber: 4,
                moduleTitle: "Module 4: Data Collection Framework",
                topics: [
                    "Variable identification and operationalization",
                    "Data collection tools design (questionnaires, CRFs)",
                    "Data quality and validation strategies",
                    "Data management plan development",
                    "Electronic vs paper-based data collection",
                ],
                exercises: [
                    "Design a data collection form",
                    "Create data dictionary",
                    "Develop data quality control procedures",
                ],
            },
            {
                classNumber: 5,
                moduleTitle: "Module 5: Ethical Considerations & Regulatory Requirements",
                topics: [
                    "Ethical principles in research (Belmont Report)",
                    "Informed consent process and documentation",
                    "Risk-benefit assessment",
                    "Vulnerable populations protection",
                    "Ethics committee submission preparation",
                ],
                exercises: [
                    "Draft informed consent form",
                    "Conduct risk-benefit analysis",
                    "Prepare ethics submission checklist",
                ],
            },
            {
                classNumber: 6,
                moduleTitle: "Module 6: Statistical Planning & Protocol Finalization",
                topics: [
                    "Statistical analysis plan development",
                    "Outcome measures (primary and secondary)",
                    "Data analysis techniques selection",
                    "Protocol writing and formatting",
                    "Budget preparation and resource planning",
                ],
                exercises: [
                    "Develop statistical analysis plan",
                    "Write complete protocol sections",
                    "Finalize research protocol",
                ],
            },
        ],

        //
        projects: [
            "Complete research protocol development",
            "Study design selection and justification project",
            "Data collection framework design",
        ],
    },

    // Research Foundation & Scientific Literacy
    {
        _id: "6",
        title: "Research Foundation & Scientific Literacy",
        slug: "research-foundation-&-scientific-literacy",
        description: `Master the fundamentals of research thinking, scientific reading, and critical analysis. Learn to evaluate literature, identify gaps, and develop research questions using cutting-edge AI tools. Perfect for aspiring researchers and healthcare professionals.`,
        thumbnail: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        courseVideoUrl: "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr",
        courseStartDate: new Date("2025-02-20"),
        category: COURSE_CATEGORIES.CLINICAL_RESEARCH,
        batchName: "Batch 1",
        price: 5000,
        totalLiveClasses: 10,
        totalWeeks: 5,
        totalModules: 5,
        totalProjects: 2,
        totalExercises: 15,

        //
        idealFor: [
            "Medical and health sciences students beginning research journey",
            "Healthcare professionals wanting to understand research literature",
            "Early-career researchers building foundational skills",
            "Anyone interested in evidence-based practice",
            "Professionals preparing for advanced research courses",
        ],

        //
        faq: [
            {
                question: "Is this course for beginners?",
                answer: "Yes! This course is specifically designed for those new to research. No prior research experience is required. We start with fundamental concepts and build progressively.",
            },
            {
                question: "What will I learn about scientific reading?",
                answer: "You'll learn how to efficiently read research papers, understand study designs, critically evaluate methodology, interpret results, and assess the quality and reliability of published research.",
            },
            {
                question: "Will AI tools be covered?",
                answer: "Absolutely! We integrate modern AI tools throughout the course to help with literature searches, paper summarization, critical analysis, and research question development.",
            },
            {
                question: "How is this different from a methodology course?",
                answer: "This course focuses on developing research literacy and thinking skills rather than conducting research. It prepares you to understand and critically evaluate research before you design your own studies.",
            },
            {
                question: "Will I be able to read research papers after this course?",
                answer: "Yes! You'll gain the skills to confidently read, understand, and critically evaluate research papers across different study designs and methodologies.",
            },
            {
                question: "Is this a prerequisite for other courses?",
                answer: "While not mandatory, this course provides an excellent foundation for our advanced courses like Protocol Development, Biostatistics, and Evidence Generation.",
            },
            {
                question: "What materials do I need?",
                answer: "Just a computer with internet access. We'll provide access to databases, papers, and AI tools needed for the course.",
            },
            {
                question: "How practical is this course?",
                answer: "Very practical! Each session includes hands-on exercises with real research papers, literature searches, and critical analysis activities.",
            },
        ],

        //
        modules: [
            {
                classNumber: 1,
                moduleTitle: "Module 1: Introduction to Research & Scientific Thinking",
                topics: [
                    "What is research and why it matters",
                    "Types of research (basic, applied, clinical)",
                    "Scientific method and research process",
                    "Developing a research mindset",
                    "Understanding evidence hierarchy",
                ],
                exercises: [
                    "Identify research types in real studies",
                    "Map the scientific method in practice",
                    "Evaluate evidence levels",
                ],
            },
            {
                classNumber: 2,
                moduleTitle: "Module 2: Anatomy of a Research Paper",
                topics: [
                    "Structure of research papers (IMRaD format)",
                    "Reading strategies for efficiency",
                    "Understanding abstract, methods, results, discussion",
                    "Identifying key information quickly",
                    "Common pitfalls in reading research",
                ],
                exercises: [
                    "Dissect a research paper structure",
                    "Practice efficient reading techniques",
                    "Extract key findings from papers",
                ],
            },
            {
                classNumber: 3,
                moduleTitle: "Module 3: Literature Search & Management",
                topics: [
                    "Major research databases (PubMed, Google Scholar, etc.)",
                    "Effective search strategies and keywords",
                    "Boolean operators and filters",
                    "Reference management tools (Zotero, Mendeley)",
                    "AI-powered literature search tools",
                ],
                exercises: [
                    "Conduct systematic literature search",
                    "Practice advanced search techniques",
                    "Organize references using management tools",
                ],
            },
            {
                classNumber: 4,
                moduleTitle: "Module 4: Critical Appraisal Skills",
                topics: [
                    "Understanding study designs and their strengths",
                    "Evaluating methodology quality",
                    "Identifying bias and limitations",
                    "Assessing statistical significance vs clinical importance",
                    "Using critical appraisal checklists",
                ],
                exercises: [
                    "Critically appraise published papers",
                    "Identify strengths and weaknesses",
                    "Use standardized appraisal tools",
                ],
            },
            {
                classNumber: 5,
                moduleTitle: "Module 5: Research Question Development & Gap Identification",
                topics: [
                    "Identifying research gaps in literature",
                    "PICO/FINER frameworks for research questions",
                    "Feasibility assessment",
                    "From clinical problems to research questions",
                    "Using AI for gap analysis and question refinement",
                ],
                exercises: [
                    "Identify gaps in literature reviews",
                    "Formulate research questions using frameworks",
                    "Refine questions with AI assistance",
                ],
            },
        ],

        //
        projects: [
            "Complete literature review on chosen topic",
            "Critical appraisal portfolio of 5 research papers",
        ],
    },

    // Scientific Writing, Publication & Communication Mastery
    {
        _id: "7",
        title: "Scientific Writing, Publication & Communication Mastery",
        slug: "scientific-writing-publication-&-communication-mastery",
        description: `Master the art of scientific writing from abstract to publication. Learn to craft compelling research papers, manage references effectively, respond to peer reviewers, and present your findings at conferences. Complete training in every aspect of academic communication with AI-powered tools and hands-on practice.`,
        thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        courseVideoUrl: "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr",
        courseStartDate: new Date("2025-02-25"),
        category: COURSE_CATEGORIES.CLINICAL_RESEARCH,
        batchName: "Batch 1",
        price: 10000,
        totalLiveClasses: 10,
        totalWeeks: 5,
        totalModules: 10,
        totalProjects: 3,
        totalExercises: 15,

        //
        idealFor: [
            "Researchers preparing manuscripts for publication",
            "Graduate students writing thesis and research papers",
            "Healthcare professionals looking to publish their work",
            "Faculty members guiding student publications",
            "Anyone aspiring to excel in scientific communication",
        ],

        //
        faq: [
            {
                question: "Who should take this course?",
                answer: "This course is perfect for researchers, graduate students, healthcare professionals, and faculty members who want to master scientific writing and publication skills. No prior publication experience required.",
            },
            {
                question: "What makes this course different?",
                answer: "We integrate cutting-edge AI tools (ChatGPT, Grammarly, Scite, Zotero) throughout the course to enhance your writing efficiency and quality. You'll get hands-on practice with real paper writing, not just theory.",
            },
            {
                question: "Will I learn to write a complete research paper?",
                answer: "Absolutely! You'll learn to write every section of a research paper (Abstract, Introduction, Methods, Results, Discussion) with AI assistance and instructor guidance.",
            },
            {
                question: "What about reference management?",
                answer: "Yes! We cover citation styles (Vancouver, Harvard) and teach you to use Zotero with ChatGPT plugins for efficient reference management.",
            },
            {
                question: "Will I learn how to respond to reviewers?",
                answer: "Yes! Module 9 covers handling peer review feedback professionally, including simulations where you'll use ChatGPT to draft reviewer responses.",
            },
            {
                question: "Do you cover conference presentations?",
                answer: "Absolutely! Module 10 teaches poster design, oral presentations, and Q&A techniques. You'll design a poster in Canva and generate presentation scripts with AI.",
            },
            {
                question: "What deliverables will I have by the end?",
                answer: "You'll complete a full IMRaD manuscript, a conference poster, and reviewer reply pack - all publication-ready materials.",
            },
            {
                question: "How long is the course?",
                answer: "The course spans 5 weeks with 10 live classes covering all aspects of scientific writing and communication.",
            },
        ],

        //
        modules: [
            {
                classNumber: 1,
                moduleTitle: "Module 1: Structure of a Scientific Paper (IMRaD)",
                topics: [
                    "Understanding the IMRaD format (Introduction, Methods, Results, and Discussion)",
                    "Organization and flow of scientific papers",
                    "Common structural mistakes to avoid",
                    "Reading and analyzing well-structured papers",
                ],
                exercises: [
                    "Rearrange a disordered paper with ChatGPT guidance",
                    "Identify structural elements in published papers",
                ],
            },
            {
                classNumber: 2,
                moduleTitle: "Module 2: Abstract Writing",
                topics: [
                    "Structured vs unstructured abstract formats",
                    "Key components: Background, Methods, Results, Conclusion",
                    "Word count optimization",
                    "Common abstract writing pitfalls",
                ],
                exercises: [
                    "Generate abstracts with AI assistance",
                    "Refine language with Grammarly AI",
                ],
            },
            {
                classNumber: 3,
                moduleTitle: "Module 3: Introduction Writing",
                topics: [
                    "Building the Global → Local → Gap → Aim story",
                    "Literature contextualization",
                    "Identifying and articulating research gaps",
                    "Crafting clear research objectives",
                ],
                exercises: [
                    "Use Scite to fetch citations",
                    "Summarize context via ChatGPT",
                ],
            },
            {
                classNumber: 4,
                moduleTitle: "Module 4: Methods Writing",
                topics: [
                    "Translating protocol to publishable Methods section",
                    "Study design description",
                    "Participant selection and sampling",
                    "Data collection and analysis procedures",
                    "Ethical considerations statement",
                ],
                exercises: [
                    "Create Methods draft using ChatGPT templates",
                    "Adapt protocol to manuscript format",
                ],
            },
            {
                classNumber: 5,
                moduleTitle: "Module 5: Results Writing",
                topics: [
                    "Presenting quantitative findings logically",
                    "Table and figure design principles",
                    "Narrative presentation of statistical results",
                    "Avoiding interpretation in Results section",
                ],
                exercises: [
                    "Convert SPSS outputs into narrative sentences",
                    "Design publication-quality tables",
                ],
            },
            {
                classNumber: 6,
                moduleTitle: "Module 6: Discussion Writing",
                topics: [
                    "Interpretation of findings",
                    "Comparison with existing literature",
                    "Addressing study limitations",
                    "Clinical/practical implications",
                    "Future research directions",
                    "Strong conclusion writing",
                ],
                exercises: [
                    "Generate discussion drafts with AI",
                    "Validate interpretations with Scite citations",
                ],
            },
            {
                classNumber: 7,
                moduleTitle: "Module 7: References & Citation Management",
                topics: [
                    "Reference styles (Vancouver, Harvard, APA)",
                    "In-text citation best practices",
                    "Using Zotero for reference management",
                    "ChatGPT plugins for citations",
                    "Avoiding citation errors",
                ],
                exercises: [
                    "Manage citations with Zotero",
                    "Format references using ChatGPT plugins",
                ],
            },
            {
                classNumber: 8,
                moduleTitle: "Module 8: Journal Selection & Submission Strategy",
                topics: [
                    "Identifying appropriate journals",
                    "Impact factor and journal metrics",
                    "Predatory journals identification",
                    "Cover letter drafting",
                    "Manuscript submission process",
                ],
                exercises: [
                    "Use Journal Finder AI for 5 best fit journals",
                    "Draft cover letter with AI assistance",
                ],
            },
            {
                classNumber: 9,
                moduleTitle: "Module 9: Responding to Reviewers & Revision",
                topics: [
                    "Understanding peer review process",
                    "Categorizing reviewer comments",
                    "Professional response strategies",
                    "Revision letter writing",
                    "Tracking changes effectively",
                ],
                exercises: [
                    "Upload reviewer comments to ChatGPT",
                    "Draft point-by-point responses",
                ],
            },
            {
                classNumber: 10,
                moduleTitle: "Module 10: Conference Presentation Skills",
                topics: [
                    "Abstract submission for conferences",
                    "Poster design principles and layout",
                    "Oral presentation structure",
                    "Effective visual communication",
                    "Q&A handling techniques",
                ],
                exercises: [
                    "Design poster in Canva",
                    "Generate speech script via ChatGPT",
                ],
            },
        ],

        //
        projects: [
            "Complete IMRaD manuscript from abstract to references",
            "Conference poster design and presentation",
            "Reviewer response and revision package",
        ],
    },

    // VLSI Physical Design Training
    {
        _id: "8",
        title: "VLSI Physical Design Training",
        slug: "vlsi-physical-design-training",
        description: `Master the art of VLSI Physical Design with our comprehensive training program. Learn RTL fundamentals, synthesis, physical design flow, and industry-standard tools. This hands-on course covers Unix/Linux, scripting (Bash & TCL), Verilog, and takes you through the complete physical design journey from RTL to signoff. Perfect for aspiring physical design engineers looking to excel in the semiconductor industry.`,
        thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        courseVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=sT1A8q-UtEtGAlOr",
        courseStartDate: new Date("2025-03-10"),
        category: COURSE_CATEGORIES.VLSI,
        batchName: "Batch 1",
        price: 18000,
        totalLiveClasses: 30,
        totalWeeks: 15,
        totalModules: 12,
        totalProjects: 8,
        totalExercises: 30,

        //
        idealFor: [
            "Electronics and Electrical Engineering graduates seeking VLSI careers",
            "Fresh graduates looking to enter semiconductor industry",
            "Working professionals wanting to transition to physical design",
            "Engineers aiming for roles in chip design companies",
            "Anyone passionate about semiconductor technology and ASIC design",
        ],

        //
        faq: [
            {
                question: "Who should take this course?",
                answer: "This course is ideal for Electronics/Electrical Engineering graduates, fresh graduates, and working professionals who want to build a career in VLSI physical design and the semiconductor industry.",
            },
            {
                question: "Do I need prior VLSI experience?",
                answer: "Basic knowledge of digital electronics is required. We start with fundamentals including Unix/Linux, scripting, and Verilog before moving to advanced physical design concepts.",
            },
            {
                question: "What tools will I learn?",
                answer: "You'll gain hands-on experience with industry-standard EDA tools used for synthesis, place & route, timing analysis, and signoff. We focus on practical tool usage throughout the course.",
            },
            {
                question: "Will I work on real projects?",
                answer: "Absolutely! The course includes 8 practical projects covering the entire physical design flow from RTL to GDSII, giving you industry-relevant hands-on experience.",
            },
            {
                question: "What is the course duration?",
                answer: "This comprehensive program spans 15 weeks with 30 live classes, covering everything from basics to advanced physical design concepts.",
            },
            {
                question: "Will this help me get a job in semiconductor industry?",
                answer: "Yes! The course is designed to make you industry-ready with practical skills, real projects, and comprehensive coverage of physical design flow. Many of our graduates work in leading semiconductor companies.",
            },
            {
                question: "Is scripting knowledge required?",
                answer: "No prior scripting knowledge is needed. We teach Bash and TCL scripting from scratch, which are essential for VLSI automation and tool customization.",
            },
            {
                question: "What topics are covered?",
                answer: "The course covers Unix/Linux, Bash & TCL scripting, Verilog RTL, synthesis, floorplanning, placement, CTS, routing, timing analysis, physical verification, and signoff - the complete physical design flow.",
            },
        ],

        //
        modules: [
            {
                classNumber: 1,
                moduleTitle: "Module 1: Unix/Linux Fundamentals",
                topics: [
                    "Introduction to Unix/Linux operating system",
                    "File system navigation and commands",
                    "File permissions and management",
                    "Process management and system monitoring",
                    "Text editors (vi/vim)",
                ],
                exercises: [
                    "Basic Unix commands practice",
                    "File manipulation exercises",
                    "Shell navigation drills",
                ],
            },
            {
                classNumber: 2,
                moduleTitle: "Module 2: Bash Scripting",
                topics: [
                    "Shell scripting basics",
                    "Variables, arrays, and operators",
                    "Control structures (if, for, while)",
                    "Functions and script debugging",
                    "Practical automation scripts for VLSI",
                ],
                exercises: [
                    "Write automation scripts",
                    "File processing scripts",
                    "Log parsing utilities",
                ],
            },
            {
                classNumber: 3,
                moduleTitle: "Module 3: TCL Scripting",
                topics: [
                    "TCL language fundamentals",
                    "Variables, lists, and arrays",
                    "Control flow and procedures",
                    "File I/O operations",
                    "TCL for EDA tool automation",
                ],
                exercises: [
                    "TCL scripting exercises",
                    "Tool command automation",
                    "Report generation scripts",
                ],
            },
            {
                classNumber: 4,
                moduleTitle: "Module 4: Digital Design Fundamentals",
                topics: [
                    "Digital logic review",
                    "Combinational and sequential circuits",
                    "Finite State Machines (FSM)",
                    "Memory elements and timing",
                    "Clock concepts and clock domains",
                ],
                exercises: [
                    "Design combinational circuits",
                    "FSM design and optimization",
                    "Timing analysis exercises",
                ],
            },
            {
                classNumber: 5,
                moduleTitle: "Module 5: Verilog HDL",
                topics: [
                    "Verilog syntax and data types",
                    "Behavioral and structural modeling",
                    "Testbench development",
                    "Simulation and debugging",
                    "Synthesizable vs non-synthesizable code",
                ],
                exercises: [
                    "Write Verilog modules",
                    "Develop testbenches",
                    "Simulation exercises",
                ],
            },
            {
                classNumber: 6,
                moduleTitle: "Module 6: RTL Design & Synthesis",
                topics: [
                    "RTL coding guidelines",
                    "Synthesis fundamentals",
                    "Logic optimization",
                    "Technology libraries",
                    "Synthesis constraints and reports",
                ],
                exercises: [
                    "RTL design projects",
                    "Synthesis exercises",
                    "Optimization techniques",
                ],
            },
            {
                classNumber: 7,
                moduleTitle: "Module 7: Physical Design Introduction",
                topics: [
                    "ASIC design flow overview",
                    "Standard cells and technology nodes",
                    "Design rules and constraints",
                    "Power, Performance, Area (PPA) tradeoffs",
                    "Physical design stages",
                ],
                exercises: [
                    "Analyze design specifications",
                    "Study technology libraries",
                    "PPA analysis",
                ],
            },
            {
                classNumber: 8,
                moduleTitle: "Module 8: Floorplanning",
                topics: [
                    "Floorplanning objectives and strategies",
                    "Core and die size calculation",
                    "Macro placement and pin assignment",
                    "Power planning (rings, stripes, rails)",
                    "Blockages and keepout regions",
                ],
                exercises: [
                    "Floorplan creation",
                    "Power grid design",
                    "Macro placement optimization",
                ],
            },
            {
                classNumber: 9,
                moduleTitle: "Module 9: Placement & Optimization",
                topics: [
                    "Placement algorithms and objectives",
                    "Congestion analysis and optimization",
                    "Timing-driven placement",
                    "Density and legalization",
                    "Pre-CTS optimization",
                ],
                exercises: [
                    "Placement analysis",
                    "Congestion fixes",
                    "Optimization techniques",
                ],
            },
            {
                classNumber: 10,
                moduleTitle: "Module 10: Clock Tree Synthesis (CTS)",
                topics: [
                    "Clock tree concepts and requirements",
                    "Clock skew and latency",
                    "CTS algorithms and structures",
                    "Useful skew optimization",
                    "Post-CTS optimization",
                ],
                exercises: [
                    "CTS quality analysis",
                    "Clock tree debugging",
                    "Skew optimization",
                ],
            },
            {
                classNumber: 11,
                moduleTitle: "Module 11: Routing & Signoff",
                topics: [
                    "Global and detailed routing",
                    "Design Rule Checking (DRC)",
                    "Antenna effects and fixes",
                    "IR drop analysis",
                    "Signoff checks and GDSII generation",
                ],
                exercises: [
                    "Routing violation fixes",
                    "DRC clean-up",
                    "Final signoff checks",
                ],
            },
            {
                classNumber: 12,
                moduleTitle: "Module 12: Static Timing Analysis (STA)",
                topics: [
                    "Timing fundamentals and concepts",
                    "Setup and hold time analysis",
                    "Multi-corner multi-mode (MCMM) analysis",
                    "Timing constraints (SDC)",
                    "Timing closure techniques",
                ],
                exercises: [
                    "STA report analysis",
                    "Timing violations debug",
                    "ECO fixes implementation",
                ],
            },
        ],

        //
        projects: [
            "Complete Unix/Linux automation project",
            "Bash & TCL scripting portfolio",
            "Verilog RTL design and simulation",
            "Full synthesis project",
            "Floorplanning and power planning",
            "Complete placement and CTS project",
            "Routing and DRC clean-up project",
            "End-to-end physical design flow (RTL to GDSII)",
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
