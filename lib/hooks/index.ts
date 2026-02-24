// ==================== Auth Hooks ====================
// Legacy hook (simple localStorage-based auth)
export { useAuth } from "./useAuth";

// React Query auth hooks (recommended for API interactions)
export {
    useLogin,
    useRegister,
    useLogout,
    useCurrentUser,
    useChangePassword,
    useForgotPassword,
    useResetPassword,
    authKeys,
} from "./useAuthQuery";

// ==================== Course Hooks ====================
export {
    useCourses,
    useCourse,
    useCourseBySlug,
    useFeaturedCourses,
    usePopularCourses,
    useSearchCourses,
    useCourseCategories,
    useCreateCourse,
    useUpdateCourse,
    useDeleteCourse,
    courseKeys,
} from "./useCoursesQuery";

// ==================== Enrollment Hooks ====================
export {
    useMyEnrollments,
    useAllEnrollments,
    useEnrollment,
    useCheckEnrollment,
    useEnrollmentStats,
    useCreateEnrollment,
    useUpdateProgress,
    useCompleteEnrollment,
    useCancelEnrollment,
    useDeleteEnrollment,
    enrollmentKeys,
} from "./useEnrollmentsQuery";

// ==================== Blog Hooks ====================
export {
    useBlogs,
    useBlog,
    useBlogBySlug,
    useFeaturedBlogs,
    usePopularBlogs,
    useSearchBlogs,
    useBlogCategories,
    useCreateBlog,
    useUpdateBlog,
    useDeleteBlog,
    useIncrementBlogViews,
    blogKeys,
} from "./useBlogsQuery";

// ==================== Webinar & Registration Hooks ====================
export {
    useWebinars,
    useWebinar,
    useWebinarBySlug,
    useUpcomingWebinars,
    useCreateWebinar,
    useUpdateWebinar,
    useDeleteWebinar,
    useAllRegistrations,
    useMyRegistrations,
    useRegistration,
    useCheckRegistration,
    useCreateRegistration,
    useCancelRegistration,
    useMarkAsAttended,
    useDeleteRegistration,
    webinarKeys,
    registrationKeys,
} from "./useWebinarQuery";
