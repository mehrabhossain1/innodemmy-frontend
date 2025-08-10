"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    BookOpen,
    Code,
    Terminal,
    FileText,
    Bug,
    Package,
    Globe,
} from "lucide-react";

const modules = [
    {
        id: "module-1",
        title: "Module 1: Getting Started with Python",
        objective:
            "Intro to Python syntax, environment, and basic data operations.",
        topics: [
            "What is Python and why use it?",
            "Installing Python (Anaconda, VS Code, Jupyter)",
            "Writing and running Python scripts",
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
        icon: BookOpen,
    },
    {
        id: "module-2",
        title: "Module 2: Strings, Input/Output & Control Flow",
        objective: "Master control logic and string manipulations.",
        topics: [
            "String indexing, slicing, methods (split(), join(), replace(), strip())",
            "f-strings and .format()",
            "input() and console interactions",
            "if, elif, else statements",
            "for, while loops",
            "break, continue, pass",
            "Nested loops and logic patterns",
        ],
        exercises: [
            "Password generator",
            "Number guessing game",
            "Word/character counter",
            "Pyramid/triangle patterns",
        ],
        icon: Code,
    },
    {
        id: "module-3",
        title: "Module 3: Data Structures & List Comprehensions",
        objective: "Work with core Python collections and efficient looping.",
        topics: [
            "Lists, Tuples, Sets, Dictionaries",
            "CRUD operations on collections",
            ".get(), .update(), .items()",
            "Nested structures",
            "zip(), enumerate(), sorted()",
            "List comprehensions and dictionary/set comprehensions",
        ],
        exercises: [
            "Student record manager",
            "Word frequency counter",
            "CSV-like tabular data as list of dicts",
        ],
        icon: Terminal,
    },
    {
        id: "module-4",
        title: "Module 4: Functions, Recursion & Modules",
        objective: "Build modular and reusable Python code.",
        topics: [
            "Defining and calling functions",
            "Parameters, return values, scope",
            "Default, keyword, variable-length arguments",
            "Recursion: factorial, Fibonacci, directory scan",
            "Anonymous functions: lambda, map(), filter(), reduce()",
            "Writing your own modules and imports",
        ],
        exercises: [
            "Recursive file search",
            "Calculator with functions",
            "Word filter with lambda and filter()",
        ],
        icon: FileText,
    },
    {
        id: "module-5",
        title: "Module 5: File Handling, CSV & JSON",
        objective: "Read, write, and manipulate structured file data.",
        topics: [
            "Working with text files",
            "CSV files using csv module",
            "JSON: parsing, serialization",
            "with statement, open(), read(), write()",
            "File loops and data cleaning",
            "File system navigation: os, pathlib",
        ],
        exercises: [
            "Combine multiple files",
            "CSV data cleaner & summarizer",
            "JSON user profile builder",
        ],
        icon: Bug,
    },
    {
        id: "module-6",
        title: "Module 6: Error Handling & Debugging",
        objective: "Make code reliable and easy to maintain.",
        topics: [
            "Error types: syntax, runtime, logic",
            "Try-Except blocks, else, finally",
            "Custom exceptions with raise",
            "Basic debugger: pdb",
            "Logging intro (optional)",
        ],
        exercises: [
            "Safe divider (with input validation)",
            "File reader with missing file handler",
        ],
        icon: Package,
    },
    {
        id: "module-7",
        title: "Module 7: Object-Oriented Programming (OOP)",
        objective: "Organize code using objects and classes.",
        topics: [
            "Classes, objects, __init__, attributes",
            "Class methods and self",
            "Inheritance and method overriding",
            "Encapsulation and __str__",
            "Composition (optional)",
        ],
        exercises: [
            "Student grade calculator class",
            "Bank account system",
            "Tic-Tac-Toe with OOP",
        ],
        icon: Globe,
    },
    {
        id: "module-8",
        title: "Module 8: Advanced Python (Generators, Decorators, Virtualenv)",
        objective: "Learn Python internals and functional features.",
        topics: [
            "Generators: yield, lazy evaluation",
            "Decorators: writing and applying",
            "Closures and first-class functions",
            "Introduction to virtualenv & pip",
            "Installing external libraries",
        ],
        exercises: [
            "Custom decorator (e.g., logger, timer)",
            "Generator for large file line processing",
            "Package installer + environment setup",
        ],
        icon: Code,
    },
    {
        id: "module-9",
        title: "Module 9: Web Scraping & APIs",
        objective: "Collect and automate data retrieval from the web.",
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
        icon: Globe,
    },
];

export default function CourseModules() {
    const bgColors = [
        "bg-blue-50",
        "bg-green-50",
        "bg-purple-50",
        "bg-yellow-50",
        "bg-red-50",
        "bg-indigo-50",
        "bg-pink-50",
        "bg-teal-50",
        "bg-gray-50",
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Course Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module, index) => (
                    <Accordion
                        key={module.id}
                        type="single"
                        collapsible
                        className="w-full rounded-lg shadow-md overflow-hidden"
                    >
                        <AccordionItem
                            value={module.id}
                            className={bgColors[index % bgColors.length]}
                        >
                            <AccordionTrigger className="hover:no-underline p-4 text-gray-800">
                                <div className="flex items-center space-x-4">
                                    <module.icon className="h-6 w-6 text-gray-700" />
                                    <div>
                                        <span className="font-semibold text-lg">
                                            {module.title}
                                        </span>
                                        <div className="text-sm text-gray-600 flex space-x-4 mt-1">
                                            <span>
                                                Topics: {module.topics.length}
                                            </span>
                                            <span>
                                                Projects:{" "}
                                                {module.exercises.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-white">
                                <p className="text-gray-700 mb-4">
                                    <strong>Objective:</strong>{" "}
                                    {module.objective}
                                </p>
                                <div className="mb-4">
                                    <strong className="text-gray-900">
                                        Topics:
                                    </strong>
                                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                        {module.topics.map((topic, i) => (
                                            <li key={i}>{topic}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <strong className="text-gray-900">
                                        Exercises:
                                    </strong>
                                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                        {module.exercises.map((exercise, i) => (
                                            <li key={i}>{exercise}</li>
                                        ))}
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    );
}
