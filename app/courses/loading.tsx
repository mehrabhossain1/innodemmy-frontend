export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-white to-primary/5 border-b border-primary/20 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                            <div className="h-8 w-px bg-gray-300" />
                            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-8 w-40 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Search Bar Skeleton */}
            <div className="bg-white/95 backdrop-blur-sm border-b border-primary/20 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="relative max-w-xl mx-auto">
                        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Loading Spinner */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-6"></div>
                    <p className="text-gray-600 text-lg">Loading courses...</p>
                </div>
            </div>
        </div>
    );
}
