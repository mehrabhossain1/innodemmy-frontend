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
 * Find course by ID
 */
export async function findCourseById(id: string) {
    const collection = await getCoursesCollection();
    const course = await collection.findOne({ _id: new ObjectId(id) });
    return course;
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
    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...courseData, updatedAt: new Date() } }
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
