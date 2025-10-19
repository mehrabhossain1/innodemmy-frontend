/**
 * Course management service
 * Handles course CRUD operations
 */
import {
  getAllCourses,
  getCoursesByCategory,
  findCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  activateCourse,
  deactivateCourse,
} from '../db/courses';
import { Course } from '../models';

/**
 * Get all courses (optionally filter by active status)
 */
export async function listAllCourses(activeOnly = false) {
  return getAllCourses(activeOnly);
}

/**
 * Get course by ID
 */
export async function getCourseById(id: string) {
  const course = await findCourseById(id);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
}

/**
 * Get courses by category
 */
export async function listCoursesByCategory(category: string) {
  return getCoursesByCategory(category);
}

/**
 * Create a new course
 */
export async function createNewCourse(courseData: Omit<Course, '_id'>) {
  // Validate required fields
  const requiredFields = [
    'title',
    'description',
    'shortDescription',
    'price',
    'instructor',
    'duration',
    'level',
    'category',
  ];

  for (const field of requiredFields) {
    if (!courseData[field as keyof typeof courseData]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate level
  const validLevels = ['beginner', 'intermediate', 'advanced'];
  if (!validLevels.includes(courseData.level)) {
    throw new Error('Invalid course level. Must be beginner, intermediate, or advanced');
  }

  return createCourse(courseData);
}

/**
 * Update a course
 */
export async function updateCourseById(
  id: string,
  courseData: Partial<Omit<Course, '_id'>>
) {
  // Validate level if provided
  if (courseData.level) {
    const validLevels = ['beginner', 'intermediate', 'advanced'];
    if (!validLevels.includes(courseData.level)) {
      throw new Error('Invalid course level. Must be beginner, intermediate, or advanced');
    }
  }

  const course = await updateCourse(id, courseData);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
}

/**
 * Delete a course
 */
export async function deleteCourseById(id: string) {
  const deleted = await deleteCourse(id);
  if (!deleted) {
    throw new Error('Course not found');
  }
  return deleted;
}

/**
 * Activate a course
 */
export async function activateCourseById(id: string) {
  const course = await activateCourse(id);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
}

/**
 * Deactivate a course
 */
export async function deactivateCourseById(id: string) {
  const course = await deactivateCourse(id);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
}
