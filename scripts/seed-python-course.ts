/**
 * Seed script to add the Python course
 * Run with: npx tsx scripts/seed-python-course.ts
 */

export const pythonCourse = {
    title: "Python",
    description: "This is the test course",
    category: "Programming",
    batchName: "Batch 1",
    thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
    price: 1500,
    totalClasses: 20,
    totalWeeks: 12,
    totalModules: 8,
    totalProjects: 10,
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
    ],
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
    modules: [
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
    ],
}; // Function to seed the course
async function seedCourse() {
    try {
        console.log("🌱 Seeding Python course to database...");

        const response = await fetch("http://localhost:3000/api/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pythonCourse),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("✅ Python course seeded successfully!");
            console.log("📦 Full response:", JSON.stringify(data, null, 2));
            const courseId = data.course?._id || data.course?.id;
            console.log("📝 Course ID:", courseId);
            console.log(
                "🔗 View at: http://localhost:3000/courses/" + courseId
            );
            process.exit(0);
        } else {
            const error = await response.json();
            console.error("❌ Failed to seed course:", error);
            process.exit(1);
        }
    } catch (error) {
        console.error("❌ Error seeding course:", error);
        console.error(
            "💡 Make sure your development server is running (npm run dev)"
        );
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    seedCourse();
}
