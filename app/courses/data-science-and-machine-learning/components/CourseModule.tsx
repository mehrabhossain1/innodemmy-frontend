"use client";
import { useState } from "react";
import { ChevronDown, BookOpen, Code } from "lucide-react";
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
        title: "Mathematics for ML & DS",
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        lightBgColor: "bg-blue-100",
        topics: [
            {
                id: 1,
                session: 1,
                title: "Linear Algebra",
                keyConcepts: [
                    "Vectors and matrices: operations, dot product, matrix multiplication",
                    "Eigenvalues and eigenvectors: critical for dimensionality reduction (PCA, SVD)",
                    "Matrix decomposition: SVD, QR, LU",
                    "Norms and distances: Euclidean, L1, cosine similarity",
                    "Projections and orthogonality: important for optimization and understanding subspaces",
                ],
            },
            {
                id: 2,
                session: 2,
                title: "Probability & Distributions",
                keyConcepts: [
                    "Basics of probability and conditional probability",
                    "Bayes' theorem and its applications",
                    "Common probability distributions and their characteristics",
                    "Working with statistical distributions using Python's SciPy library",
                ],
            },
        ],
    },
    {
        id: 2,
        number: 2,
        title: "Data Exploration and Visualization",
        color: "bg-green-500",
        bgColor: "bg-green-50",
        lightBgColor: "bg-green-100",
        topics: [
            {
                id: 1,
                session: 3,
                title: "Data Science Workflow and Fundamentals",
                keyConcepts: [
                    "Data Science lifecycle: from collection to interpretation",
                    "Descriptive vs. Inferential statistics",
                    "Understanding data ethics, bias, and responsible AI practices",
                    "Measures of central tendency and dispersion",
                    "Setting up the data science environment",
                ],
            },
            {
                id: 2,
                session: 4,
                title: "Data Manipulation & Visualization for EDA",
                keyConcepts: [
                    "Data wrangling and cleaning with Pandas",
                    "Handling missing data and transforming columns",
                    "Visualizing data using Matplotlib and Seaborn",
                    "Correlation analysis and hypothesis testing for data insights",
                    "Conducting Exploratory Data Analysis (EDA) to uncover patterns and trends",
                ],
            },
        ],
    },
    {
        id: 3,
        number: 3,
        title: "Foundation of Machine Learning",
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        lightBgColor: "bg-purple-100",
        topics: [
            {
                id: 1,
                session: 5,
                title: "Supervised Learning: Regression",
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
                session: 6,
                title: "Supervised Learning: Classification I",
                keyConcepts: [
                    "Logistic Regression fundamentals",
                    "K-Nearest Neighbors (KNN)",
                    "Decision boundaries",
                    "Building and visualizing classification models",
                ],
                projectMilestones: [
                    "Projects 2: Handwritten Digits Classification using KNN",
                ],
            },
            {
                id: 3,
                session: 7,
                title: "Supervised Learning: Classification II",
                keyConcepts: [
                    "Support Vector Machines (SVMs) and kernel methods",
                    "Naive Bayes classification and probability-based predictions",
                    "Comparing classifier performance across datasets",
                ],
            },
            {
                id: 4,
                session: 8,
                title: "Data Preprocessing & Feature Engineering",
                keyConcepts: [
                    "Handling missing and inconsistent data",
                    "Scaling and normalizing numerical features",
                    "Encoding categorical variables",
                    "Building preprocessing pipelines with scikit-learn",
                    "Feature selection and dimensionality reduction techniques",
                ],
            },
            {
                id: 5,
                session: 9,
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
        id: 4,
        number: 4,
        title: "Model Optimization & Applied Project",
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        lightBgColor: "bg-amber-100",
        topics: [
            {
                id: 1,
                session: 10,
                title: "Ensemble Methods",
                keyConcepts: [
                    "Bagging and Random Forest algorithms",
                    "Boosting techniques: AdaBoost, Gradient Boosting, XGBoost",
                    "Evaluating and comparing ensemble performance",
                ],
            },
            {
                id: 2,
                session: 11,
                title: "Model Evaluation & Validation",
                keyConcepts: [
                    "Key evaluation metrics: Accuracy, Precision, Recall, F1, ROC/AUC",
                    "Train/Validation/Test splits and Cross-Validation",
                    "Avoiding overfitting and ensuring generalization",
                ],
            },
            {
                id: 3,
                session: 12,
                title: "Project Workshop on 1 & 2",
                keyConcepts: [
                    "Applying regression and classification models to real datasets",
                    "Comparing model performance and tuning hyperparameters",
                    "Presenting results and insights through a final project report",
                ],
            },
        ],
    },
    {
        id: 5,
        number: 5,
        title: "Neural Network Foundations",
        color: "bg-red-500",
        bgColor: "bg-red-50",
        lightBgColor: "bg-red-100",
        topics: [
            {
                id: 1,
                session: 13,
                title: "Introduction to Neural Networks (NNs)",
                keyConcepts: [
                    "Understanding the Perceptron and Multi-Layer Perceptrons (MLPs)",
                    "Activation functions and their roles in learning",
                    "Implementing a simple Perceptron from scratch",
                ],
            },
            {
                id: 2,
                session: 14,
                title: "Deep Learning Fundamentals",
                keyConcepts: [
                    "Forward and backward propagation",
                    "Introduction to TensorFlow and Keras",
                    "Building and training a basic neural network for classification",
                ],
            },
            {
                id: 3,
                session: 15,
                title: "Training Deep Neural Networks",
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
        id: 6,
        number: 6,
        title: "Computer Vision with CNNs",
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
        lightBgColor: "bg-teal-100",
        topics: [
            {
                id: 1,
                session: 16,
                title: "Introduction to Computer Vision & CNNs",
                keyConcepts: [
                    "How computers interpret and process images",
                    "Fundamentals of convolutional layers, filters, and pooling operations",
                    "Visualizing how convolutions extract and detect image features",
                ],
            },
            {
                id: 2,
                session: 17,
                title: "Building a Convolutional Neural Network (CNN)",
                keyConcepts: [
                    "Designing and stacking layers to create CNN architectures",
                    "Implementing a LeNet-style CNN using Keras",
                    "Training and testing on simple datasets (e.g., MNIST)",
                ],
                projectMilestones: [
                    "Project 3: Image Classification on MNIST using CNN",
                ],
            },
            {
                id: 3,
                session: 18,
                title: "Data Augmentation for Images",
                keyConcepts: [
                    "Expanding datasets using augmentation techniques",
                    "Implementing real-time augmentation with Keras's ImageDataGenerator",
                    "Improving model generalization and reducing overfitting",
                ],
            },
        ],
    },
    {
        id: 7,
        number: 7,
        title: "Advanced CNN Techniques",
        color: "bg-indigo-500",
        bgColor: "bg-indigo-50",
        lightBgColor: "bg-indigo-100",
        topics: [
            {
                id: 1,
                session: 19,
                title: "Advanced CNN Architectures",
                keyConcepts: [
                    "Exploring influential architectures: LeNet-5, AlexNet, VGGNet, ResNet",
                    "Understanding layer design, depth, and performance trade-offs",
                    "Analyzing architecture diagrams and reviewing code implementations",
                ],
            },
            {
                id: 2,
                session: 20,
                title: "Transfer Learning",
                keyConcepts: [
                    "Leveraging pre-trained CNNs for feature extraction and fine-tuning",
                    "Applying transfer learning for efficient model training on small datasets",
                    "Implementing transfer learning using popular architectures in Keras",
                ],
            },
            {
                id: 3,
                session: 21,
                title: "Visualizing CNNs",
                keyConcepts: [
                    "Interpreting CNN feature learning and activation maps",
                    "Visualizing filters, feature maps, and learned patterns",
                    "Using Grad-CAM to highlight regions influencing predictions",
                ],
            },
        ],
    },
    {
        id: 8,
        number: 8,
        title: "Applied Computer Vision & Project Development",
        color: "bg-pink-500",
        bgColor: "bg-pink-50",
        lightBgColor: "bg-pink-100",
        topics: [
            {
                id: 1,
                session: 22,
                title: "Model Deployment & Monitoring",
                keyConcepts: [
                    "Implementing CI/CD pipelines for machine learning projects",
                    "Versioning datasets and models for reproducibility",
                    "Automating training pipelines for efficiency and scalability",
                    "Monitoring models in production, including drift detection and retraining triggers",
                    "Building an end-to-end pipeline using GitHub Actions and MLflow for experiment tracking",
                ],
            },
            {
                id: 2,
                session: 23,
                title: "Project 3 Workshop: Image Classification",
                keyConcepts: [
                    "Guided session on model building, training, and debugging",
                    "Applying hyperparameter tuning and optimization strategies",
                    "Interpreting results and comparing architectures",
                ],
            },
            {
                id: 3,
                session: 24,
                title: "Project 3: Image Classification Submission",
                keyConcepts: [
                    "Finalizing and submitting the image classification project",
                    "Preparing a detailed report comparing CNN architectures and training approaches",
                    "Reflecting on experimental results and lessons learned",
                ],
            },
        ],
    },
    {
        id: 9,
        number: 9,
        title: "Time Series Analysis & Forecasting",
        color: "bg-cyan-500",
        bgColor: "bg-cyan-50",
        lightBgColor: "bg-cyan-100",
        topics: [
            {
                id: 1,
                session: 25,
                title: "Introduction to Time Series Analysis",
                keyConcepts: [
                    "Components of time series: trend, seasonality, and noise",
                    "Understanding stationarity, autocorrelation (ACF), and partial autocorrelation (PACF)",
                    "Decomposing and analyzing temporal patterns in datasets",
                ],
                projectMilestones: [
                    "Project 4: Activity Recognition from Sensor Data",
                ],
            },
            {
                id: 2,
                session: 26,
                title: "Time Series Forecasting Models",
                keyConcepts: [
                    "Classical forecasting approaches: AR, MA, ARIMA models",
                    "Building and evaluating ARIMA-based forecasts",
                    "Assessing residuals and improving forecast accuracy",
                ],
            },
            {
                id: 3,
                session: 27,
                title: "Deep Learning for Time Series",
                keyConcepts: [
                    "Using Recurrent Neural Networks (RNNs) for sequential data",
                    "Long Short-Term Memory (LSTM) architectures for sequence prediction",
                    "Implementing and training LSTMs for time series classification",
                ],
            },
            {
                id: 4,
                session: 28,
                title: "Project 4: Time Series Classification",
                keyConcepts: [
                    "Developing a project focused on classifying time series data",
                    "Combining classical and deep learning models for comparison",
                    "Evaluating performance on datasets such as activity recognition or sensor data",
                ],
            },
        ],
    },
    {
        id: 10,
        number: 10,
        title: "Natural Language Processing Fundamentals",
        color: "bg-orange-500",
        bgColor: "bg-orange-50",
        lightBgColor: "bg-orange-100",
        topics: [
            {
                id: 1,
                session: 29,
                title: "Introduction to NLP & Text Preprocessing",
                keyConcepts: [
                    "The NLP pipeline: from raw text to structured data",
                    "Tokenization, stemming, and lemmatization techniques",
                    "Text representation methods: Bag-of-Words (BoW) and TF-IDF",
                    "Text preprocessing using NLTK and spaCy",
                ],
                projectMilestones: [
                    "Project 5: Question Answering with Small Language Model",
                ],
            },
            {
                id: 2,
                session: 30,
                title: "Word Embeddings & RNNs for Text",
                keyConcepts: [
                    "Introduction to distributed word representations: Word2Vec and GloVe",
                    "Sequential modeling using LSTMs and GRUs",
                    "Building an LSTM-based sentiment analysis model",
                ],
            },
        ],
    },
    {
        id: 11,
        number: 11,
        title: "Advanced NLP & Transformer Architectures",
        color: "bg-lime-500",
        bgColor: "bg-lime-50",
        lightBgColor: "bg-lime-100",
        topics: [
            {
                id: 1,
                session: 31,
                title: "The Attention Mechanism & Transformers",
                keyConcepts: [
                    "The intuition behind attention in neural networks",
                    "Core components of the Transformer architecture: Encoder-Decoder, Self-Attention",
                    'Step-by-step exploration of the "Attention Is All You Need" paper',
                ],
            },
            {
                id: 2,
                session: 32,
                title: "Advanced NLP: BERT and GPT models",
                keyConcepts: [
                    "Understanding Bidirectional Encoder Representations from Transformers (BERT)",
                    "Overview of large language models (LLMs) and their evolution",
                    "Fine-tuning pre-trained models using the Hugging Face library",
                ],
            },
            {
                id: 3,
                session: 33,
                title: "NLP Model Training Workshop",
                keyConcepts: [
                    "Hands-on session for building advanced NLP models",
                    "Training and evaluating small-scale transformer models",
                    "Applying reasoning and text understanding tasks using fine-tuned models",
                ],
            },
        ],
    },
    {
        id: 12,
        number: 12,
        title: "Generative AI & LLM Applications",
        color: "bg-emerald-500",
        bgColor: "bg-emerald-50",
        lightBgColor: "bg-emerald-100",
        topics: [
            {
                id: 1,
                session: 34,
                title: "Generative AI Foundations",
                keyConcepts: [
                    "Understanding Autoencoders and Variational Autoencoders (VAEs)",
                    "Learning Generative Adversarial Networks (GANs) concepts and applications",
                    "Implementing a basic GAN to generate synthetic images",
                    "Exploring practical use cases of generative AI in research and industry",
                ],
            },
            {
                id: 2,
                session: 35,
                title: "Project 5: Small LM for Reasoning",
                keyConcepts: [
                    "Training and evaluating a small-scale language model",
                    "Applying reasoning-focused tasks such as question answering and natural language inference",
                    "Experimenting with fine-tuning and evaluation metrics",
                    "Interpreting model performance, limitations, and improvement strategies",
                ],
            },
        ],
    },
    {
        id: 13,
        number: 13,
        title: "MLOps & Lifecycle Management",
        color: "bg-violet-500",
        bgColor: "bg-violet-50",
        lightBgColor: "bg-violet-100",
        topics: [
            {
                id: 1,
                session: 36,
                title: "MLOps & Model Lifecycle Management",
                keyConcepts: [
                    "Implementing CI/CD pipelines for machine learning projects",
                    "Versioning datasets and models for reproducibility",
                    "Automating training pipelines for efficiency and scalability",
                    "Monitoring models in production, including drift detection and retraining triggers",
                    "Building an end-to-end pipeline using GitHub Actions and MLflow for experiment tracking",
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
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg leading-tight">
                                        {module.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <BookOpen className="w-3.5 h-3.5" />
                                        <span className="font-medium">
                                            {module.topics.length}{" "}
                                            {module.topics.length === 1
                                                ? "Session"
                                                : "Sessions"}
                                        </span>
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

                                            return (
                                                <div
                                                    key={topic.id}
                                                    className={`${module.lightBgColor} dark:bg-gray-700/50 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden transition-all`}
                                                >
                                                    {/* Topic Header */}
                                                    <div
                                                        className={`p-3 ${
                                                            hasDetails
                                                                ? "cursor-pointer hover:bg-white/50 dark:hover:bg-gray-600/50"
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
                                                        <div className="flex items-start gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                        Session{" "}
                                                                        {
                                                                            topic.session
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <h4 className="font-semibold text-base text-gray-900 dark:text-white leading-snug">
                                                                    {
                                                                        topic.title
                                                                    }
                                                                </h4>
                                                            </div>
                                                            {hasDetails && (
                                                                <ChevronDown
                                                                    className={`w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                                                                        isTopicExpanded
                                                                            ? "rotate-180"
                                                                            : ""
                                                                    }`}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Topic Details */}
                                                    {isTopicExpanded &&
                                                        hasDetails && (
                                                            <div className="px-3 pb-3 space-y-3">
                                                                {/* Key Concepts */}
                                                                {topic.keyConcepts &&
                                                                    topic
                                                                        .keyConcepts
                                                                        .length >
                                                                        0 && (
                                                                        <div>
                                                                            <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                                                                                <BookOpen className="w-3 h-3" />
                                                                                Key
                                                                                Concepts
                                                                                &
                                                                                Activities
                                                                            </h5>
                                                                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                                                {topic.keyConcepts.map(
                                                                                    (
                                                                                        concept,
                                                                                        idx
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                idx
                                                                                            }
                                                                                            className="flex items-start gap-1.5"
                                                                                        >
                                                                                            <span className="text-gray-400 dark:text-gray-500 mt-0.5">
                                                                                                •
                                                                                            </span>
                                                                                            <span className="flex-1">
                                                                                                {renderTextWithBold(
                                                                                                    concept
                                                                                                )}
                                                                                            </span>
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )}

                                                                {/* Project Milestones */}
                                                                {topic.projectMilestones &&
                                                                    topic
                                                                        .projectMilestones
                                                                        .length >
                                                                        0 && (
                                                                        <div>
                                                                            <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                                                                                <Code className="w-3 h-3" />
                                                                                Project
                                                                                Milestones
                                                                            </h5>
                                                                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                                                {topic.projectMilestones.map(
                                                                                    (
                                                                                        milestone,
                                                                                        idx
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                idx
                                                                                            }
                                                                                            className="flex items-start gap-1.5"
                                                                                        >
                                                                                            <span className="text-gray-400 dark:text-gray-500 mt-0.5">
                                                                                                •
                                                                                            </span>
                                                                                            <span className="flex-1">
                                                                                                {renderTextWithBold(
                                                                                                    milestone
                                                                                                )}
                                                                                            </span>
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        )}
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
