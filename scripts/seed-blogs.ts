/**
 * Seed script to add sample blogs
 * Run with: npm run seed:blogs
 */

const sampleBlogs = [
    {
        title: "Getting Started with Web Development in 2025",
        content: `
            <h2>Introduction to Modern Web Development</h2>
            <p>Web development has evolved significantly over the years. In 2025, the landscape is more exciting than ever with new frameworks, tools, and best practices.</p>

            <h3>Key Technologies to Learn</h3>
            <ul>
                <li><strong>React & Next.js</strong> - For building modern web applications</li>
                <li><strong>TypeScript</strong> - For type-safe JavaScript development</li>
                <li><strong>Tailwind CSS</strong> - For rapid UI development</li>
                <li><strong>MongoDB</strong> - For flexible database solutions</li>
            </ul>

            <h3>Why Start Learning Now?</h3>
            <p>The demand for skilled web developers continues to grow. Companies are looking for developers who can build fast, responsive, and user-friendly applications.</p>

            <blockquote>
                "The best time to start learning web development was yesterday. The second best time is today."
            </blockquote>

            <h3>Your Learning Path</h3>
            <ol>
                <li>Master HTML, CSS, and JavaScript fundamentals</li>
                <li>Learn a modern framework like React or Next.js</li>
                <li>Understand backend development with Node.js</li>
                <li>Build real-world projects to showcase your skills</li>
            </ol>

            <p>Ready to start your journey? Enroll in our comprehensive web development course and transform your career!</p>
        `,
        date: new Date("2025-01-15"),
        minRead: 5,
        author: "Innodemy Team",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
        category: "Web Development",
        tags: ["Web Development", "Career", "Beginner"],
        published: true,
    },
    {
        title: "5 Essential Python Libraries Every Data Scientist Should Know",
        content: `
            <h2>Mastering Python for Data Science</h2>
            <p>Python has become the go-to language for data science, and for good reason. Its rich ecosystem of libraries makes complex data analysis tasks simple and intuitive.</p>

            <h3>1. NumPy - Numerical Computing</h3>
            <p>NumPy is the foundation of scientific computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with a collection of mathematical functions.</p>

            <h3>2. Pandas - Data Manipulation</h3>
            <p>Pandas offers data structures and operations for manipulating numerical tables and time series. It's perfect for data cleaning, transformation, and analysis.</p>

            <h3>3. Matplotlib - Data Visualization</h3>
            <p>Create publication-quality figures with Matplotlib. From simple plots to complex visualizations, this library has you covered.</p>

            <h3>4. Scikit-learn - Machine Learning</h3>
            <p>Scikit-learn provides simple and efficient tools for predictive data analysis. It's built on NumPy, SciPy, and matplotlib.</p>

            <h3>5. TensorFlow/PyTorch - Deep Learning</h3>
            <p>For advanced machine learning and neural networks, TensorFlow and PyTorch are industry standards.</p>

            <p><em>Want to dive deeper into data science? Check out our Python for Data Science course!</em></p>
        `,
        date: new Date("2025-01-10"),
        minRead: 7,
        author: "Innodemy Team",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
        category: "Python",
        tags: ["Python", "Data Science", "Machine Learning"],
        published: true,
    },
    {
        title: "Building Your First Mobile App: A Complete Guide",
        content: `
            <h2>Mobile App Development Made Easy</h2>
            <p>Creating mobile applications might seem daunting, but with the right approach and tools, anyone can build amazing apps.</p>

            <h3>Choose Your Technology</h3>
            <p>There are several approaches to mobile app development:</p>
            <ul>
                <li><strong>React Native</strong> - Build cross-platform apps with JavaScript</li>
                <li><strong>Flutter</strong> - Google's UI toolkit for beautiful apps</li>
                <li><strong>Native Development</strong> - Swift for iOS, Kotlin for Android</li>
            </ul>

            <h3>Planning Your App</h3>
            <p>Before writing code, you need a solid plan:</p>
            <ol>
                <li>Define your app's purpose and target audience</li>
                <li>Sketch out the user interface and user flow</li>
                <li>List all features and prioritize them</li>
                <li>Choose your tech stack</li>
            </ol>

            <h3>Development Process</h3>
            <p>Start with a minimum viable product (MVP). Focus on core features first, then iterate based on user feedback.</p>

            <blockquote>
                "The best mobile apps solve real problems in elegant ways."
            </blockquote>

            <p>Ready to build your first app? Join our mobile development course today!</p>
        `,
        date: new Date("2025-01-05"),
        minRead: 6,
        author: "Innodemy Team",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
        category: "Mobile Development",
        tags: ["Mobile Development", "React Native", "Flutter"],
        published: true,
    },
    {
        title: "Understanding MongoDB: A Beginner's Guide",
        content: `
            <h2>What is MongoDB?</h2>
            <p>MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. Unlike traditional relational databases, MongoDB doesn't require a predefined schema.</p>

            <h3>Why Choose MongoDB?</h3>
            <ul>
                <li><strong>Flexibility</strong> - Schema-less design allows for easy modifications</li>
                <li><strong>Scalability</strong> - Horizontal scaling with sharding</li>
                <li><strong>Performance</strong> - Fast read and write operations</li>
                <li><strong>Developer-Friendly</strong> - Works naturally with JSON</li>
            </ul>

            <h3>Basic Concepts</h3>
            <p>Understanding these core concepts is essential:</p>
            <ul>
                <li><strong>Documents</strong> - Individual records in JSON format</li>
                <li><strong>Collections</strong> - Groups of documents</li>
                <li><strong>Databases</strong> - Container for collections</li>
            </ul>

            <h3>Common Operations</h3>
            <p>Learn to perform CRUD operations (Create, Read, Update, Delete) efficiently. Master queries, aggregations, and indexing for optimal performance.</p>

            <p><em>Want to become a MongoDB expert? Explore our database courses!</em></p>
        `,
        date: new Date("2024-12-28"),
        minRead: 4,
        author: "Innodemy Team",
        thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop",
        category: "Database",
        tags: ["MongoDB", "Database", "Backend"],
        published: true,
    },
    {
        title: "The Future of AI and Machine Learning",
        content: `
            <h2>AI is Transforming Everything</h2>
            <p>Artificial Intelligence and Machine Learning are no longer just buzzwords. They're revolutionizing industries and creating new opportunities every day.</p>

            <h3>Current Trends in AI</h3>
            <ul>
                <li><strong>Large Language Models</strong> - Like GPT-4 and beyond</li>
                <li><strong>Computer Vision</strong> - Image and video analysis</li>
                <li><strong>Generative AI</strong> - Creating art, music, and code</li>
                <li><strong>AI Ethics</strong> - Responsible AI development</li>
            </ul>

            <h3>Career Opportunities</h3>
            <p>The AI field offers diverse career paths:</p>
            <ol>
                <li>Machine Learning Engineer</li>
                <li>Data Scientist</li>
                <li>AI Research Scientist</li>
                <li>MLOps Engineer</li>
            </ol>

            <h3>Getting Started</h3>
            <p>You don't need a PhD to work in AI. Start with:</p>
            <ul>
                <li>Strong Python programming skills</li>
                <li>Understanding of statistics and linear algebra</li>
                <li>Hands-on projects with real datasets</li>
                <li>Continuous learning and experimentation</li>
            </ul>

            <blockquote>
                "AI is not about replacing humans, it's about augmenting human capabilities."
            </blockquote>

            <p>Begin your AI journey with our comprehensive machine learning courses!</p>
        `,
        date: new Date("2024-12-20"),
        minRead: 8,
        author: "Innodemy Team",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        category: "Artificial Intelligence",
        tags: ["AI", "Machine Learning", "Future Tech"],
        published: true,
    },
];

// Function to seed blogs
async function seedBlogs() {
    try {
        console.log("🌱 Seeding blogs to database...");

        let successCount = 0;
        let failCount = 0;

        for (const blog of sampleBlogs) {
            try {
                const response = await fetch("http://localhost:3000/api/blogs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(blog),
                });

                if (response.ok) {
                    const data = await response.json();
                    successCount++;
                    console.log(`✅ Added: ${blog.title}`);
                } else {
                    const error = await response.json();
                    failCount++;
                    console.error(`❌ Failed to add "${blog.title}":`, error.error || error.message);
                }
            } catch (error) {
                failCount++;
                console.error(`❌ Error adding "${blog.title}":`, error);
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`   ✅ Successfully added: ${successCount} blogs`);
        console.log(`   ❌ Failed: ${failCount} blogs`);
        console.log(`\n🔗 View blogs at: http://localhost:3000/blogs`);

        process.exit(failCount > 0 ? 1 : 0);
    } catch (error) {
        console.error("❌ Error seeding blogs:", error);
        console.error(
            "💡 Make sure your development server is running (npm run dev)"
        );
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    seedBlogs();
}
