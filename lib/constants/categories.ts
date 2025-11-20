/**
 * Course Categories Configuration
 * Centralized place to manage all course categories
 */

export const COURSE_CATEGORIES = {
  CLINICAL_RESEARCH: 'CLINICAL RESEARCH',
  PROGRAMMING: 'PROGRAMMING',
  DATA_SCIENCE_AI: 'DATA SCIENCE & AI',
  VLSI: 'VLSI',
} as const;

// Type for category values
export type CourseCategory = typeof COURSE_CATEGORIES[keyof typeof COURSE_CATEGORIES];

// Array of all categories for dropdowns/filters
export const CATEGORY_LIST: CourseCategory[] = [
  COURSE_CATEGORIES.CLINICAL_RESEARCH,
  COURSE_CATEGORIES.PROGRAMMING,
  COURSE_CATEGORIES.DATA_SCIENCE_AI,
  COURSE_CATEGORIES.VLSI,
];

// Helper function to get all categories
export function getAllCategories(): CourseCategory[] {
  return CATEGORY_LIST;
}

// Helper function to check if a category is valid
export function isValidCategory(category: string): category is CourseCategory {
  return CATEGORY_LIST.includes(category as CourseCategory);
}
