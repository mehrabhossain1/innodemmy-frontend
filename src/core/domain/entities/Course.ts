/**
 * Course Entity - Domain Layer
 * Represents the core business model for a course
 */
export class Course {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly price: number,
    public readonly instructor: string,
    public readonly duration: string,
    public readonly level: CourseLevel,
    public readonly category: string,
    public readonly modules: CourseModule[],
    public readonly isActive: boolean,
    public readonly thumbnail?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isAccessibleBy(): boolean {
    return this.isActive;
  }

  getTotalLessons(): number {
    return this.modules.reduce((total, module) => total + module.lessons.length, 0);
  }

  getTotalDuration(): number {
    // Calculate total duration in minutes
    return this.modules.reduce(
      (total, module) => total + module.lessons.reduce(
        (lessonTotal, lesson) => lessonTotal + this.parseDuration(lesson.duration), 
        0
      ), 
      0
    );
  }

  private parseDuration(duration: string): number {
    // Simple parser for duration strings like "10 mins", "1 hour"
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
}

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export interface CourseModule {
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
}

export interface Lesson {
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  content?: string;
}

