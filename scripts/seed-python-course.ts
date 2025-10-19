/**
 * Seed script to add the Python Programming Fundamentals course
 * Run with: npx ts-node scripts/seed-python-course.ts
 */
import { Course } from '../lib/models';

export const pythonCourse = {
  title: "Python Programming Fundamentals for Machine Learning",
  shortDescription: "এই কোর্সটি তৈরি করা হয়েছে মেশিন লার্নিং ও ডেটা সায়েন্স শেখার পূর্বশর্ত হিসেবে একটি মজবুত পাইথন প্রোগ্রামিং ভিত্তি গড়ে তোলার জন্য। এখানে মূল লক্ষ্য হলো মেশিন লার্নিং অ্যালগরিদম বা থিওরি নয়, বরং প্রোগ্রামিংয়ের মূল ধারণাগুলো দক্ষতার সাথে আয়ত্ত করা।",
  description: `কোর্সের মাধ্যমে আপনি পাইথনের বেসিক থেকে অ্যাডভান্সড টপিক ধাপে ধাপে হাতে-কলমে শিখবেন। এর মধ্যে থাকছে— ডেটা স্ট্রাকচার, ফাংশনাল প্রোগ্রামিং, অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং, এক্সেপশন হ্যান্ডলিং, ফাইল হ্যান্ডলিং । এছাড়াও, কোর্সে অন্তর্ভুক্ত থাকবে ১০টি বাস্তবমুখী প্রজেক্ট, যেখানে শেখা কনসেপ্টগুলো ব্যবহার করে আপনি বাস্তব সমস্যার সমাধান করবেন। এর ফলে আপনার প্রোগ্রামিং দক্ষতা শুধু শক্তিশালী হবে না, বরং আত্মবিশ্বাসের সাথে মেশিন লার্নিং শেখার জন্য প্রস্তুতি নিতে পারবেন।`,
  price: 2999,
  instructor: "Mehrab Hossain",
  duration: "1 Month",
  level: 'beginner' as const,
  category: "Development",
  thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  batchName: "Batch 1",
  rating: 4.9,
  totalReviews: 0,
  isLive: true,
  totalJoined: 0,
  totalProjects: 10,
  totalAssignments: 0,
  isActive: true,

  modules: [
    {
      title: "Module 1: Python Basics",
      description: "Introduction to Python programming fundamentals",
      duration: "1 week",
      lessons: [
        {
          title: "Introduction to Python",
          description: "What is Python and why use it?",
          duration: "45 mins",
        },
        {
          title: "Variables and Data Types",
          description: "Understanding variables, strings, numbers, and booleans",
          duration: "60 mins",
        },
        {
          title: "Operators and Expressions",
          description: "Arithmetic, comparison, and logical operators",
          duration: "50 mins",
        },
      ],
    },
    {
      title: "Module 2: Control Flow",
      description: "Conditional statements and loops",
      duration: "1 week",
      lessons: [
        {
          title: "If-Else Statements",
          description: "Decision making in Python",
          duration: "55 mins",
        },
        {
          title: "For and While Loops",
          description: "Iteration and repetition",
          duration: "65 mins",
        },
        {
          title: "Break, Continue, and Pass",
          description: "Loop control statements",
          duration: "40 mins",
        },
      ],
    },
    {
      title: "Module 3: Data Structures",
      description: "Lists, tuples, sets, and dictionaries",
      duration: "1 week",
      lessons: [
        {
          title: "Lists and List Methods",
          description: "Working with ordered collections",
          duration: "70 mins",
        },
        {
          title: "Tuples and Sets",
          description: "Immutable sequences and unique collections",
          duration: "55 mins",
        },
        {
          title: "Dictionaries",
          description: "Key-value pair data structures",
          duration: "60 mins",
        },
      ],
    },
  ],

  benefits: [
    "1 Month Intensive Learning Journey - Step-by-step structured curriculum designed for beginners but packed with advanced, real-world concepts.",
    "12 Live Classes with Industry Experts - Learn directly from professionals and get your questions answered in real-time.",
    "10 Hands-on Projects - Apply what you learn on practical problems, strengthen your programming skills, and build confidence.",
    "Progress Tracking & Leaderboard - Keep track of your learning journey and see where you stand compared to peers.",
    "Unlimited Support Sessions - Stuck while practicing? Get instant help during live support sessions.",
    "Exclusive Learner Community - Network, collaborate, and get continuous guidance from a supportive community of learners and experts.",
    "Lifetime Access - Revisit pre-recorded videos, resources, and class recordings anytime—forever.",
    "Mock Interview & Career Guidance - Prepare for interviews with real-world tips, resume & LinkedIn optimization, and guidance for internships/jobs.",
    "Shareable Certificate - Receive an officially verified certificate upon completion that you can proudly display on LinkedIn or your CV.",
  ],

  tools: [
    {
      name: "Advanced Python",
      description: "Core programming language for data science, machine learning, and real-world projects.",
    },
    {
      name: "Object-Oriented Programming (OOP)",
      description: "Master OOP concepts to write modular and maintainable code.",
    },
    {
      name: "GitHub",
      description: "Version control and collaborative coding platform to manage your projects.",
    },
    {
      name: "Jupyter Notebook",
      description: "Interactive environment for coding, visualization, and experimentation.",
    },
    {
      name: "VS Code",
      description: "Powerful code editor for efficient development and debugging.",
    },
    {
      name: "APIs",
      description: "Learn to work with external services and integrate data programmatically.",
    },
  ],

  projects: [
    { title: "Password generator", description: "Build a secure password generator using Python" },
    { title: "Number guessing game", description: "Create an interactive number guessing game" },
    { title: "Recursive file search", description: "Implement file search using recursion" },
    { title: "CSV data cleaner & summarizer", description: "Process and analyze CSV data" },
    { title: "JSON user profile builder", description: "Work with JSON data structures" },
    { title: "File reader with missing file handler", description: "Handle file exceptions gracefully" },
    { title: "Bank account system (OOP)", description: "Apply OOP concepts to build a banking system" },
    { title: "Tic-Tac-Toe with OOP", description: "Create a game using object-oriented programming" },
    { title: "Generator for large file line processing", description: "Use generators for memory-efficient file processing" },
    { title: "News headline scraper", description: "Build a web scraper to fetch news headlines" },
  ],

  targetAudience: [
    "Absolute Beginners – Students or professionals from a non-technical background with no prior coding experience.",
    "Career-Oriented Learners – Those aiming for a career in freelancing, data science, or web development.",
    "Python Newbies – Anyone who feels intimidated or hesitant to start programming.",
    "Hands-on Learners – People who prefer learning by doing through practical exercises and real-world examples.",
    "Skill Builders – Learners who want to strengthen problem-solving, programming, and analytical skills.",
    "Self-Motivated Individuals – Those ready to commit, practice consistently, and grow their coding confidence.",
  ],

  requirements: [
    "Laptop or Desktop – At least 8GB RAM to code smoothly and run projects.",
    "Stable Internet Connection – For live classes, accessing resources, and online practice.",
    "Curiosity & Commitment – A growth mindset, consistent practice, and the determination to solve challenges.",
  ],

  instructors: [
    {
      name: "Mehrab Hossain",
      title: "Senior Machine Learning Engineer",
      bio: "Expert in Python, Machine Learning, and Data Science with 5+ years of industry experience.",
      image: "/instructors/mehrab.jpg",
    },
    {
      name: "Support Team",
      title: "Teaching Assistants",
      bio: "Dedicated team of experienced developers ready to help you throughout your learning journey.",
    },
  ],

  faqs: [
    {
      question: "Can I download the videos?",
      answer: "No, the videos are available for online streaming only, but you can access them anytime through lifetime access.",
    },
    {
      question: "Can I join the course via mobile?",
      answer: "Yes! You can join the course from any device—mobile, laptop, or desktop.",
    },
    {
      question: "Will I have lifetime access to the videos?",
      answer: "Yes, all pre-recorded videos, resources, and class recordings are available with lifetime access.",
    },
    {
      question: "Where will the live classes take place?",
      answer: "Live classes will be conducted online, accessible from anywhere with a stable internet connection.",
    },
    {
      question: "How will assessments be conducted?",
      answer: "Assessments will include quizzes, practice projects, and practical exercises to evaluate your learning.",
    },
    {
      question: "Will live classes be recorded?",
      answer: "Yes, all live classes will be recorded and made available for later viewing.",
    },
    {
      question: "Where can I get support if I face issues while practicing?",
      answer: "You can get help through live support sessions and our exclusive learner community.",
    },
  ],

  createdAt: new Date(),
  updatedAt: new Date(),
};

// Function to seed the course
async function seedCourse() {
  try {
    console.log('🌱 Seeding Python course to database...');

    const response = await fetch('http://localhost:3000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pythonCourse),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Python course seeded successfully!');
      console.log('📝 Course ID:', data.course.id);
      console.log('🔗 View at: http://localhost:3000/courses/' + data.course.id);
      process.exit(0);
    } else {
      const error = await response.json();
      console.error('❌ Failed to seed course:', error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error seeding course:', error);
    console.error('💡 Make sure your development server is running (npm run dev)');
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  seedCourse();
}
