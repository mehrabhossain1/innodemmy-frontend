/**
 * Course management service
 * Handles course CRUD operations
 */
import {
    getAllCourses,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../db/courses";
import { Course } from "../models";

/**
 * Get all courses
 */
export async function listAllCourses() {
    return getAllCourses();
}

/**
 * Get course by ID
 */
export async function getCourseById(id: string) {
    const course = await findCourseById(id);
    if (!course) {
        throw new Error("Course not found");
    }
    return course;
}

/**
 * Create a new course
 */
export async function createNewCourse(courseData: Omit<Course, "_id">) {
    // Validate required fields
    const requiredFields = ["title", "description"];

    for (const field of requiredFields) {
        if (!courseData[field as keyof typeof courseData]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    return createCourse(courseData);
}

/**
 * Update a course
 */
export async function updateCourseById(
    id: string,
    courseData: Partial<Omit<Course, "_id">>
) {
    const course = await updateCourse(id, courseData);
    if (!course) {
        throw new Error("Course not found");
    }
    return course;
}

/**
 * Delete a course
 */
export async function deleteCourseById(id: string) {
    const deleted = await deleteCourse(id);
    if (!deleted) {
        throw new Error("Course not found");
    }
    return deleted;
}
