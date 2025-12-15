"use client";
import { ChevronDown, Video, FileText } from "lucide-react";
import { useState } from "react";
import SectionTitle from "@/components/course/SectionTitle";

// Helper function to render text with bold markdown
const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={index} className="font-bold">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
};

interface Topic {
    id: number;
    session: number;
    instructor: string;
    title: string;
    keyConcepts: string[];
    projectMilestones?: string[];
}

interface Module {
    id: number;
    number: number;
    title: string;
    color: string;
    bgColor: string;
    lightBgColor: string;
    topics: Topic[];
}

const modules: Module[] = [
    {
        id: 1,
        number: 1,
        title: "Python Programming Fundamentals",
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        lightBgColor: "bg-blue-100",
        topics: [
            {
                id: 1,
                session: 1,
                instructor: "A",
                title: "Getting Started with Python",
                keyConcepts: [
                    "Python Fundamentals Test",
                    "Introduction to Python Assessment",
                    "Python Basics Quiz",
                    "Core Python Knowledge Test",
                    "Python Programming Essentials Evaluation",
                ],
                projectMilestones: ["Student record manager"],
            },
            {
                id: 2,
                session: 2,
                instructor: "A",
                title: "Strings, Input/Output & Control Flow",
                keyConcepts: [
                    "Python Control Flow and String Operations Test",
                    "Python Logic and String Handling Assessment",
                    "Flow Control and String Manipulation Quiz",
                    "Python Intermediate Concepts Test",
                    "String Methods and Loop Structures Evaluation",
                ],
                projectMilestones: ["Password generator"],
            },
        ],
    },
    {
        id: 2,
        number: 2,
        title: "Data Structures and Functional Programming",
        color: "bg-green-500",
        bgColor: "bg-green-50",
        lightBgColor: "bg-green-100",
        topics: [
            {
                id: 1,
                session: 3,
                instructor: "M",
                title: "Data Structures & List Comprehensions",
                keyConcepts: [
                    "Python Data Structures Test",
                    "Collections and Comprehensions Assessment",
                    "Python Lists, Tuples, Sets, and Dictionaries Quiz",
                    "Advanced Data Handling in Python Test",
                    "Python Data Collection Operations Evaluation",
                ],
                projectMilestones: [
                    "CSV data cleaner & summarizer",
                    "JSON user profile builder",
                ],
            },
            {
                id: 2,
                session: 4,
                instructor: "M",
                title: "Functions, Recursion & Modules",
                keyConcepts: [
                    "Python Functions and Modules Test",
                    "Functional Programming in Python Assessment",
                    "Functions, Recursion, and Modules Quiz",
                    "Python Functionality and Code Reusability Test",
                    "Advanced Python Functions and Imports Evaluation",
                ],
                projectMilestones: [
                    "Recursive file search",
                    "Word filter with lambda and filter()",
                ],
            },
        ],
    },
    {
        id: 3,
        number: 3,
        title: "File Handling, Error Management, and Object-Oriented Programming",
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        lightBgColor: "bg-purple-100",
        topics: [
            {
                id: 1,
                session: 5,
                instructor: "A",
                title: "File Handling, CSV & JSON",
                keyConcepts: [
                    "Working with text files",
                    "CSV files using csv module",
                    "JSON: parsing, serialization",
                    "With statement, open(), read(), write()",
                    "File loops and data cleaning",
                    "File system navigation: os, pathlib",
                ],
                projectMilestones: [
                    "CSV data cleaner & summarizer",
                    "JSON user profile builder",
                ],
            },
            {
                id: 2,
                session: 6,
                instructor: "A",
                title: "Error Handling & Debugging",
                keyConcepts: [
                    "Error types: syntax, runtime, logic",
                    "Try-Except blocks, else, finally",
                    "Custom exceptions with raise",
                    "Basic debugger: pdb",
                    "Logging intro",
                ],
                projectMilestones: ["File reader with missing file handler"],
            },
            {
                id: 3,
                session: 7,
                instructor: "A",
                title: "Object-Oriented Programming (OOP)",
                keyConcepts: [
                    "Classes, objects, __init__, attributes",
                    "Class methods and self",
                    "Inheritance and method overriding",
                    "Encapsulation and __str__",
                    "Composition",
                ],
                projectMilestones: [
                    "Bank account system",
                    "Tic-Tac-Toe with OOP",
                ],
            },
        ],
    },
    {
        id: 4,
        number: 4,
        title: "Advanced Python Applications & Projects",
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        lightBgColor: "bg-amber-100",
        topics: [
            {
                id: 1,
                session: 8,
                instructor: "A",
                title: "Advanced Python (Generators, Decorators, Virtualenv)",
                keyConcepts: [
                    "Generators: yield, lazy evaluation",
                    "Decorators: writing and applying",
                    "Closures and first-class functions",
                    "Introduction to virtualenv & pip",
                    "Installing external libraries",
                ],
                projectMilestones: ["Generator for large file line processing"],
            },
            {
                id: 2,
                session: 9,
                instructor: "A/M",
                title: "Python Project Support",
                keyConcepts: [
                    "Guidance on structuring Python projects and organizing code modules",
                    "Assistance with debugging, optimization, and improving code quality",
                    "Review of project workflows, and best practices for reproducible experiments",
                ],
            },
        ],
    },
    {
        id: 5,
        number: 5,
        title: "Mathematics for Machine Learning",
        color: "bg-red-500",
        bgColor: "bg-red-50",
        lightBgColor: "bg-red-100",
        topics: [
            {
                id: 1,
                session: 10,
                instructor: "M",
                title: "Linear Algebra",
                keyConcepts: [
                    "Vectors and matrices: operations, dot product, matrix multiplication",
                    "Eigenvalues and eigenvectors: critical for dimensionality reduction (PCA, SVD)",
                    "Matrix decomposition: SVD, QR, LU",
                    "Norms and distances: Euclidean, L1, cosine similarity",
                    "Projections and orthogonality: important for optimization and understanding subspaces",
                ],
            },
        ],
    },
    {
        id: 6,
        number: 6,
        title: "Intro to Research with Machine Learning",
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
        lightBgColor: "bg-teal-100",
        topics: [
            {
                id: 1,
                session: 11,
                instructor: "N",
                title: "ML principles behind modern research",
                keyConcepts: [
                    "Understand how core ML concepts form the foundation of modern research",
                    "Learn the structure of ML research papers and how to read them critically",
                    "Explore the role of evaluation metrics, experimentation, and reproducibility in ML research",
                    "Use platforms like Google Scholar and arXiv to find and analyze ML research papers",
                ],
            },
        ],
    },
    {
        id: 7,
        number: 7,
        title: "Foundation of Machine Learning",
        color: "bg-indigo-500",
        bgColor: "bg-indigo-50",
        lightBgColor: "bg-indigo-100",
        topics: [
            {
                id: 1,
                session: 12,
                instructor: "M",
                title: "Supervised Learning: Regression Analysis",
                keyConcepts: [
                    "Linear Regression and cost functions",
                    "Gradient Descent and optimization principles",
                    "Model training, testing, and evaluation on real-world datasets",
                ],
                projectMilestones: [
                    "Projects 1: Predicting Housing Prices using Regression Model",
                ],
            },
            {
                id: 2,
                session: 13,
                instructor: "N",
                title: "Supervised Learning: Classification",
                keyConcepts: [
                    "Learn key classification algorithms: Logistic Regression, KNN, SVMs, and Naive Bayes",
                    "Understand decision boundaries and how different classifiers separate data",
                    "Build and visualize classification models to compare behaviors",
                    "Apply multiple classifiers to diverse datasets for practical understanding",
                ],
                projectMilestones: [
                    "Projects 2: Handwritten Digits Classification using KNN",
                ],
            },
            {
                id: 3,
                session: 14,
                instructor: "A",
                title: "Data Manipulation & Visualization for EDA",
                keyConcepts: [
                    "Use Pandas for data cleaning, wrangling, and transformation",
                    "Visualize data with Matplotlib and Seaborn to uncover insights through EDA",
                    "Handle missing values, scale numerical features, and encode categorical variables",
                    "Build a complete preprocessing pipeline using scikit-learn for model-ready data",
                ],
            },
            {
                id: 4,
                session: 15,
                instructor: "A",
                title: "Unsupervised Learning: Clustering & PCA",
                keyConcepts: [
                    "K-Means clustering for pattern discovery",
                    "Principal Component Analysis (PCA) for dimensionality reduction",
                    "Customer segmentation and visualization of cluster results",
                ],
            },
        ],
    },
    {
        id: 8,
        number: 8,
        title: "Model Optimization & Applied Project",
        color: "bg-pink-500",
        bgColor: "bg-pink-50",
        lightBgColor: "bg-pink-100",
        topics: [
            {
                id: 1,
                session: 16,
                instructor: "A",
                title: "Ensemble Methods",
                keyConcepts: [
                    "Bagging and Random Forest algorithms",
                    "Boosting techniques: AdaBoost, Gradient Boosting, XGBoost",
                    "Evaluating and comparing ensemble performance",
                ],
            },
            {
                id: 2,
                session: 17,
                instructor: "A",
                title: "Model Evaluation & Validation",
                keyConcepts: [
                    "Key evaluation metrics: Accuracy, Precision, Recall, F1, ROC/AUC",
                    "Train/Validation/Test splits and Cross-Validation",
                    "Avoiding overfitting and ensuring generalization",
                ],
            },
        ],
    },
    {
        id: 9,
        number: 9,
        title: "Neural Network Foundations",
        color: "bg-cyan-500",
        bgColor: "bg-cyan-50",
        lightBgColor: "bg-cyan-100",
        topics: [
            {
                id: 1,
                session: 18,
                instructor: "A",
                title: "Introduction to Neural Networks (NNs)",
                keyConcepts: [
                    "Understanding the Perceptron and Multi-Layer Perceptrons (MLPs)",
                    "Activation functions and their roles in learning",
                    "Implementing a simple Perceptron from scratch",
                ],
            },
            {
                id: 2,
                session: 19,
                instructor: "A",
                title: "Deep Learning Fundamentals with TensorFlow",
                keyConcepts: [
                    "Forward and backward propagation",
                    "Introduction to TensorFlow and Keras",
                    "Building and training a basic neural network for classification",
                ],
            },
            {
                id: 3,
                session: 20,
                instructor: "M",
                title: "Training Deep Neural Networks with Pytorch",
                keyConcepts: [
                    "Optimization algorithms: SGD, Adam, RMSprop",
                    "Hyperparameters: learning rate, batch size, epochs",
                    "Overfitting and regularization techniques: Dropout, L1/L2",
                    "Improving model performance through tuning and experimentation",
                ],
            },
        ],
    },
    {
        id: 10,
        number: 10,
        title: "Computer Vision with CNNs",
        color: "bg-orange-500",
        bgColor: "bg-orange-50",
        lightBgColor: "bg-orange-100",
        topics: [
            {
                id: 1,
                session: 21,
                instructor: "M",
                title: "Introduction to Computer Vision & CNNs",
                keyConcepts: [
                    "Learn how computers interpret images using convolutions, filters, and pooling layers",
                    "Visualize how CNNs extract and detect meaningful features from images",
                    "Understand data augmentation techniques to expand and diversify image datasets",
                    "Use Keras's ImageDataGenerator for real-time augmentation to improve model generalization",
                ],
                projectMilestones: [
                    "Project 3: Image Classification on MNIST using CNN",
                ],
            },
            {
                id: 2,
                session: 22,
                instructor: "M",
                title: "Building a Convolutional Neural Network (CNN)",
                keyConcepts: [
                    "Designing and stacking layers to create CNN architectures",
                    "Implementing a LeNet-style CNN using Keras",
                    "Training and testing on simple datasets (e.g., MNIST)",
                ],
            },
        ],
    },
    {
        id: 11,
        number: 11,
        title: "Advanced CNN Techniques",
        color: "bg-lime-500",
        bgColor: "bg-lime-50",
        lightBgColor: "bg-lime-100",
        topics: [
            {
                id: 1,
                session: 23,
                instructor: "M",
                title: "Advanced CNN Architectures",
                keyConcepts: [
                    "Exploring influential architectures: LeNet-5, AlexNet, VGGNet, ResNet",
                    "Understanding layer design, depth, and performance trade-offs",
                    "Analyzing architecture diagrams and reviewing code implementations",
                ],
            },
            {
                id: 2,
                session: 24,
                instructor: "A",
                title: "Transfer Learning",
                keyConcepts: [
                    "Leveraging pre-trained CNNs for feature extraction and fine-tuning",
                    "Applying transfer learning for efficient model training on small datasets",
                    "Implementing transfer learning using popular architectures in Keras",
                ],
            },
        ],
    },
    {
        id: 12,
        number: 12,
        title: "Time Series Forecasting Models",
        color: "bg-emerald-500",
        bgColor: "bg-emerald-50",
        lightBgColor: "bg-emerald-100",
        topics: [
            {
                id: 1,
                session: 25,
                instructor: "A",
                title: "Time Series Analysis & Forecasting",
                keyConcepts: [
                    "Understand key time series components such as trend, seasonality, noise, and stationarity",
                    "Analyze temporal patterns using ACF, PACF, and decomposition techniques",
                    "Learn classical forecasting models like ARIMA and build/evaluate ARIMA predictions",
                    "Explore RNNs and LSTMs for sequence modeling and time series prediction",
                    "Build an LSTM model for a time series classification or forecasting task",
                ],
                projectMilestones: ["Project 4: Time Series Classification"],
            },
        ],
    },
    {
        id: 13,
        number: 13,
        title: "Natural Language Processing",
        color: "bg-violet-500",
        bgColor: "bg-violet-50",
        lightBgColor: "bg-violet-100",
        topics: [
            {
                id: 1,
                session: 26,
                instructor: "A",
                title: "Introduction to NLP & Text Preprocessing",
                keyConcepts: [
                    "Learn the NLP pipeline and apply text preprocessing techniques like tokenization, stemming, and lemmatization",
                    "Represent text using Bag-of-Words (BoW) and TF-IDF methods",
                    "Use NLTK or spaCy to clean and structure raw text data",
                    "Understand distributed word embeddings such as Word2Vec and GloVe",
                    "Build text classification models using LSTMs/GRUs, including an LSTM-based sentiment analysis model",
                ],
                projectMilestones: [
                    "Project 5: Question Answering with Small Language Model",
                ],
            },
            {
                id: 2,
                session: 27,
                instructor: "A",
                title: "The Attention Mechanism & Transformers",
                keyConcepts: [
                    "The intuition behind attention in neural networks",
                    "Core components of the Transformer architecture: Encoder-Decoder, Self-Attention",
                    'Step-by-step exploration of the "Attention Is All You Need" paper',
                ],
            },
            {
                id: 3,
                session: 28,
                instructor: "A",
                title: "Advanced NLP: BERT and GPT models",
                keyConcepts: [
                    "Understand BERT and its role in modern NLP",
                    "Learn the basics of Large Language Models (LLMs) and their capabilities",
                    "Explore transformer-based text understanding and contextual embeddings",
                    "Use the Hugging Face ecosystem to load, modify, and fine-tune pretrained models",
                ],
            },
        ],
    },
    {
        id: 14,
        number: 14,
        title: "End-to-End Recap Sessions",
        color: "bg-rose-500",
        bgColor: "bg-rose-50",
        lightBgColor: "bg-rose-100",
        topics: [
            {
                id: 1,
                session: 29,
                instructor: "M",
                title: "Computer Vision: Masterclass",
                keyConcepts: [
                    "Integrate concepts from basic convolutions to advanced CNN architectures",
                    "Compare major CV models (LeNet, VGG, ResNet) and understand their strengths",
                    "Review essential techniques: augmentation, feature extraction, transfer learning",
                    "Explore real-world CV applications across industries",
                    "Discuss best practices for training, tuning, and deploying vision models",
                ],
            },
            {
                id: 2,
                session: 30,
                instructor: "A",
                title: "NLP: Consolidation & Mastery",
                keyConcepts: [
                    "Connect foundational NLP methods with modern Transformer-based approaches",
                    "Compare RNNs, LSTMs, Attention, BERT, and GPT models",
                    "Understand challenges in NLP: ambiguity, bias, contextual reasoning, hallucinations",
                    "Review real-world NLP applications: QA, chatbots, summarization, sentiment analysis",
                    "Highlight essential tools: NLTK, spaCy, HuggingFace, and Transformer pipelines",
                ],
            },
        ],
    },
    {
        id: 15,
        number: 15,
        title: "Research Formulation",
        color: "bg-sky-500",
        bgColor: "bg-sky-50",
        lightBgColor: "bg-sky-100",
        topics: [
            {
                id: 1,
                session: 31,
                instructor: "N",
                title: "Formulating a Research Question",
                keyConcepts: [
                    "Learn how to identify research gaps from existing literature",
                    "Analyze prior work to spot limitations and unexplored areas",
                    "Brainstorm potential research directions based on course projects",
                    "Refine and articulate a clear, novel research question for the final paper",
                ],
            },
            {
                id: 2,
                session: 32,
                instructor: "A",
                title: "Literature Review, Introduction & Abstract",
                keyConcepts: [
                    "Formalize a clear research question for the capstone project",
                    "Write a proposal covering motivation, dataset, methodology, and expected outcomes",
                    "Learn how to find, read, and synthesize academic papers to support your research",
                    "Draft the literature review section based on insights gathered from scholarly sources",
                    "Crafting an engaging and informative introduction",
                    "Writing a concise and informative abstract ensuring the paper's narrative is logical and compelling",
                ],
            },
        ],
    },
    {
        id: 16,
        number: 16,
        title: "Experimental Design for Research",
        color: "bg-fuchsia-500",
        bgColor: "bg-fuchsia-50",
        lightBgColor: "bg-fuchsia-100",
        topics: [
            {
                id: 1,
                session: 33,
                instructor: "N",
                title: "Methodology & Experiments",
                keyConcepts: [
                    "Design fair, controlled, and reproducible experimental setups",
                    "Implement final experiments with proper baselines, comparisons, and evaluation metrics",
                    "Write a clear and structured methodology section for the research paper",
                    "Refine experimental choices (datasets, models, metrics) and justify them with evidence",
                    "Ensure reproducibility through proper documentation and code organization",
                ],
            },
        ],
    },
    {
        id: 17,
        number: 17,
        title: "Research Writing & Refining",
        color: "bg-slate-500",
        bgColor: "bg-slate-50",
        lightBgColor: "bg-slate-100",
        topics: [
            {
                id: 1,
                session: 34,
                instructor: "A",
                title: "Writing Results, Discussion & Conclusion",
                keyConcepts: [
                    "Presenting results clearly through tables, figures, and metrics",
                    "Interpreting outcomes and linking them to the research question",
                    "Writing the results and discussion sections with clarity and critical insight",
                    "Summarizing the key contributions of the research",
                    "Acknowledging study limitations and identifying future research directions",
                    "Writing the concluding section to highlight impact and relevance",
                ],
            },
        ],
    },
    {
        id: 18,
        number: 18,
        title: "Paper Formatting",
        color: "bg-stone-500",
        bgColor: "bg-stone-50",
        lightBgColor: "bg-stone-100",
        topics: [
            {
                id: 1,
                session: 35,
                instructor: "M",
                title: "Latex for writing",
                keyConcepts: [
                    "Understand basic LaTeX syntax and document structure",
                    "Write equations, tables, figures, and citations",
                    "Use BibTeX for managing references",
                    "Format research sections cleanly with LaTeX environments",
                    "Compile and edit documents using Overleaf or a local editor",
                ],
            },
        ],
    },
    {
        id: 19,
        number: 19,
        title: "Career Development",
        color: "bg-yellow-500",
        bgColor: "bg-yellow-50",
        lightBgColor: "bg-yellow-100",
        topics: [
            {
                id: 1,
                session: 36,
                instructor: "All",
                title: "Course Wrap-up & Next Steps",
                keyConcepts: [
                    "Reviewing key concepts and takeaways from the course",
                    "Guidance on submitting work to conferences or journals",
                    "Career advice on networking, academic publishing, and research pathways",
                    "Final reflections and Q&A session",
                ],
            },
        ],
    },
];

export default function CourseModule() {
    const [expandedModules, setExpandedModules] = useState<number[]>([]);
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

    const toggleModule = (moduleId: number) => {
        setExpandedModules((prev) => {
            if (prev.includes(moduleId)) {
                return prev.filter((id) => id !== moduleId);
            } else {
                return [...prev, moduleId];
            }
        });
    };

    const toggleTopic = (moduleId: number, topicId: number) => {
        const topicKey = `${moduleId}-${topicId}`;
        setExpandedTopic(expandedTopic === topicKey ? null : topicKey);
    };

    // Get instructor full name
    const getInstructorName = (code: string) => {
        const instructors: { [key: string]: string } = {
            A: "Arif Mahmud Sisir",
            M: "M Azizul Hakim Shuvo",
            R: "Mamunur Rashid Alex",
            N: "Md Nafee Al Islam",
        };
        return instructors[code] || code;
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Course Module" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((module) => (
                    <div
                        key={module.id}
                        className={`${
                            module.bgColor
                        } dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
                            expandedModules.includes(module.id)
                                ? "shadow-lg h-auto"
                                : "shadow-md hover:shadow-lg h-[110px]"
                        }`}
                    >
                        {/* Module Header */}
                        <div
                            className="p-4 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleModule(module.id);
                            }}
                        >
                            <div className="flex items-start gap-3">
                                {/* Module Number Badge */}
                                <div
                                    className={`${module.color} text-white rounded-lg px-3 py-2 flex-shrink-0 shadow-md`}
                                >
                                    <div className="text-xs font-semibold">
                                        Module
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {module.number}
                                    </div>
                                </div>

                                {/* Module Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base leading-tight">
                                        {module.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                                        <div className="flex items-center gap-1">
                                            <Video className="w-3.5 h-3.5" />
                                            <span className="font-medium">
                                                {module.topics.length} Session
                                                {module.topics.length > 1
                                                    ? "s"
                                                    : ""}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FileText className="w-3.5 h-3.5" />
                                            <span className="font-medium">
                                                {module.topics.reduce(
                                                    (acc, topic) =>
                                                        acc +
                                                        (topic.projectMilestones
                                                            ?.length || 0),
                                                    0
                                                )}{" "}
                                                Project
                                                {module.topics.reduce(
                                                    (acc, topic) =>
                                                        acc +
                                                        (topic.projectMilestones
                                                            ?.length || 0),
                                                    0
                                                ) > 1
                                                    ? "s"
                                                    : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chevron Icon */}
                                <div className="flex-shrink-0">
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                                            expandedModules.includes(module.id)
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Module Content - Topics */}
                        {expandedModules.includes(module.id) &&
                            module.topics.length > 0 && (
                                <div className="px-4 pb-4">
                                    <div className="space-y-2">
                                        {module.topics.map((topic) => {
                                            const topicKey = `${module.id}-${topic.id}`;
                                            const isTopicExpanded =
                                                expandedTopic === topicKey;
                                            const hasDetails =
                                                topic.keyConcepts ||
                                                topic.projectMilestones;

                                            const borderColor =
                                                module.id === 1
                                                    ? "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20"
                                                    : module.id === 2
                                                    ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20"
                                                    : "border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20";

                                            return (
                                                <div
                                                    key={topic.id}
                                                    className={`border rounded-md p-2 transition-all duration-300 ${
                                                        isTopicExpanded
                                                            ? `${borderColor} shadow-sm`
                                                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
                                                    }`}
                                                >
                                                    <div
                                                        className={`flex items-start gap-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${
                                                            hasDetails
                                                                ? "cursor-pointer"
                                                                : ""
                                                        }`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (hasDetails) {
                                                                toggleTopic(
                                                                    module.id,
                                                                    topic.id
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <span className="font-bold text-gray-900 dark:text-white min-w-[18px] text-sm">
                                                            {topic.session}.
                                                        </span>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <span className="leading-tight font-semibold text-sm block">
                                                                        {
                                                                            topic.title
                                                                        }
                                                                    </span>
                                                                </div>
                                                                {hasDetails && (
                                                                    <ChevronDown
                                                                        className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                                                                            isTopicExpanded
                                                                                ? "rotate-180"
                                                                                : ""
                                                                        }`}
                                                                    />
                                                                )}
                                                            </div>

                                                            {/* Expanded Topic Details */}
                                                            {isTopicExpanded &&
                                                                hasDetails && (
                                                                    <div className="mt-2 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                                                                        {topic.keyConcepts &&
                                                                            topic
                                                                                .keyConcepts
                                                                                .length >
                                                                                0 && (
                                                                                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-md border border-indigo-100 dark:border-indigo-800">
                                                                                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1 text-xs">
                                                                                        <span className="text-indigo-600 dark:text-indigo-400">
                                                                                            📚
                                                                                        </span>
                                                                                        Key
                                                                                        Concepts
                                                                                        &
                                                                                        Activities:
                                                                                    </h4>
                                                                                    <ul className="space-y-1 list-disc list-inside">
                                                                                        {topic.keyConcepts.map(
                                                                                            (
                                                                                                concept,
                                                                                                idx
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        idx
                                                                                                    }
                                                                                                    className="leading-relaxed text-indigo-800 dark:text-indigo-200"
                                                                                                >
                                                                                                    {renderTextWithBold(
                                                                                                        concept
                                                                                                    )}
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            )}

                                                                        {topic.projectMilestones &&
                                                                            topic
                                                                                .projectMilestones
                                                                                .length >
                                                                                0 && (
                                                                                <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-md border border-purple-100 dark:border-purple-800">
                                                                                    <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-1 flex items-center gap-1 text-xs">
                                                                                        <span className="text-purple-600 dark:text-purple-400">
                                                                                            🎯
                                                                                        </span>
                                                                                        Project
                                                                                        Milestones:
                                                                                    </h4>
                                                                                    <ul className="space-y-1 list-disc list-inside">
                                                                                        {topic.projectMilestones.map(
                                                                                            (
                                                                                                milestone,
                                                                                                idx
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        idx
                                                                                                    }
                                                                                                    className="leading-relaxed text-purple-800 dark:text-purple-200"
                                                                                                >
                                                                                                    {renderTextWithBold(
                                                                                                        milestone
                                                                                                    )}
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
}
