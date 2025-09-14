const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/innodemmy';

async function seedData() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('innodemmy');
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const adminUser = {
      email: 'admin@innodemmy.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Check if admin already exists
    const existingAdmin = await db.collection('users').findOne({ email: 'admin@innodemmy.com' });
    if (!existingAdmin) {
      await db.collection('users').insertOne(adminUser);
      console.log('Admin user created: admin@innodemmy.com / admin123');
    } else {
      console.log('Admin user already exists');
    }
    
    // Create sample courses
    const sampleCourses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
        price: 299,
        instructor: 'John Doe',
        duration: '12 weeks',
        level: 'beginner',
        category: 'Web Development',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
        modules: [
          {
            title: 'HTML & CSS Fundamentals',
            description: 'Learn the basics of HTML and CSS',
            duration: '2 weeks',
            lessons: [
              { title: 'Introduction to HTML', description: 'Basic HTML structure', duration: '2 hours' },
              { title: 'CSS Styling', description: 'CSS basics and styling', duration: '3 hours' }
            ]
          },
          {
            title: 'JavaScript Basics',
            description: 'Learn JavaScript programming',
            duration: '3 weeks',
            lessons: [
              { title: 'Variables and Functions', description: 'JavaScript fundamentals', duration: '2 hours' },
              { title: 'DOM Manipulation', description: 'Working with the DOM', duration: '3 hours' }
            ]
          }
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Data Science with Python',
        description: 'Master data science with Python, pandas, numpy, matplotlib, and machine learning.',
        price: 399,
        instructor: 'Jane Smith',
        duration: '16 weeks',
        level: 'intermediate',
        category: 'Data Science',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
        modules: [
          {
            title: 'Python Fundamentals',
            description: 'Learn Python programming basics',
            duration: '3 weeks',
            lessons: [
              { title: 'Python Basics', description: 'Variables, loops, functions', duration: '4 hours' },
              { title: 'Data Structures', description: 'Lists, dictionaries, sets', duration: '3 hours' }
            ]
          },
          {
            title: 'Data Analysis with Pandas',
            description: 'Data manipulation and analysis',
            duration: '4 weeks',
            lessons: [
              { title: 'DataFrames', description: 'Working with DataFrames', duration: '3 hours' },
              { title: 'Data Cleaning', description: 'Cleaning and preprocessing data', duration: '4 hours' }
            ]
          }
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mobile App Development with React Native',
        description: 'Build cross-platform mobile apps with React Native and Expo.',
        price: 349,
        instructor: 'Mike Johnson',
        duration: '14 weeks',
        level: 'intermediate',
        category: 'Mobile Development',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
        modules: [
          {
            title: 'React Native Basics',
            description: 'Introduction to React Native',
            duration: '3 weeks',
            lessons: [
              { title: 'Setup and Components', description: 'Setting up React Native', duration: '2 hours' },
              { title: 'Navigation', description: 'App navigation patterns', duration: '3 hours' }
            ]
          },
          {
            title: 'State Management',
            description: 'Managing app state',
            duration: '2 weeks',
            lessons: [
              { title: 'Redux', description: 'State management with Redux', duration: '4 hours' },
              { title: 'Context API', description: 'React Context for state', duration: '3 hours' }
            ]
          }
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Insert sample courses
    for (const course of sampleCourses) {
      const existingCourse = await db.collection('courses').findOne({ title: course.title });
      if (!existingCourse) {
        await db.collection('courses').insertOne(course);
        console.log(`Course created: ${course.title}`);
      } else {
        console.log(`Course already exists: ${course.title}`);
      }
    }
    
    console.log('Data seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
  }
}

seedData();
