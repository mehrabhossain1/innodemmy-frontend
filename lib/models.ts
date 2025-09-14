export interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: 'student' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  _id?: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail?: string;
  modules: CourseModule[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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

export interface Enrollment {
  _id?: string;
  userId: string;
  courseId: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentProof?: string;
  paymentAmount: number;
  paymentMethod: string;
  transactionId?: string;
  adminNotes?: string;
  enrolledAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnrollmentRequest {
  _id?: string;
  userId: string;
  courseId: string;
  paymentProof: string;
  paymentAmount: number;
  paymentMethod: string;
  transactionId?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
