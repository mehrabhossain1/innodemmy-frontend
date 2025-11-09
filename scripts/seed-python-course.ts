/**
 * Seed script to add the Python course
 * Run with: npx tsx scripts/seed-python-course.ts
 */

export const pythonCourse = {
    title: "Python",
    description: "This is the test course",
    category: "Programming",
    thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
    price: 1500,
    totalClasses: 20,
    totalWeeks: 12,
    totalModules: 8,
    totalProjects: 5,
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
