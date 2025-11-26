/**
 * Course database operations
 */
import { ObjectId } from "mongodb";
import { getDatabase } from "./connection";
import { Course } from "../models";

type CourseDocument = Omit<Course, "_id"> & { _id?: ObjectId };

/**
 * Get the courses collection
 */
async function getCoursesCollection() {
    const db = await getDatabase();
    return db.collection<CourseDocument>("courses");
}

/**
 * Find course by ID (supports both ObjectId and string slug)
 */
export async function findCourseById(id: string | ObjectId) {
    const collection = await getCoursesCollection();
    
    // Try to find by ObjectId if it's a valid ObjectId format
    if (typeof id === 'string' && ObjectId.isValid(id) && id.length === 24) {
        try {
            const course = await collection.findOne({ _id: new ObjectId(id) });
            if (course) return course;
        } catch (error) {
            // If ObjectId conversion fails, continue to slug search
            console.log("Failed to find course by ObjectId, trying slug");
        }
    }
    
    // If not found by ObjectId or not a valid ObjectId, return null
    // (For string slugs, we don't have courses in the database yet)
    return null;
}

/**
 * Get all courses
 */
export async function getAllCourses() {
    const collection = await getCoursesCollection();
    const courses = await collection.find({}).toArray();
    return courses;
}

/**
 * Create a new course
 */
export async function createCourse(courseData: Omit<Course, "_id">) {
    const collection = await getCoursesCollection();
    const result = await collection.insertOne({
        ...courseData,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const course = await collection.findOne({ _id: result.insertedId });
    return course;
}

/**
 * Update a course
 */
export async function updateCourse(
    id: string,
    courseData: Partial<Omit<Course, "_id">>
) {
    const collection = await getCoursesCollection();

    // Remove immutable fields if they exist
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, ...updateData } = courseData as Record<
        string,
        unknown
    >;

    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updateData, updatedAt: new Date() } }
    );

    const course = await collection.findOne({ _id: new ObjectId(id) });
    return course;
}

/**
 * Delete a course
 */
export async function deleteCourse(id: string) {
    const collection = await getCoursesCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}
