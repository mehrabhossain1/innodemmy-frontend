export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-white dark:from-background to-primary/5 dark:to-primary/10 border-b border-primary/20 dark:border-primary/30 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                            <div className="h-8 w-px bg-muted"></div>
                            <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
                        </div>
                        <div className="h-8 w-32 bg-muted rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Category Tabs Skeleton */}
                <div className="flex justify-center items-center overflow-x-auto pb-3 mb-8">
                    <div className="flex gap-2.5">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="h-16 w-32 bg-muted rounded-xl animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Course Cards Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-xl border border-border overflow-hidden shadow-sm animate-pulse"
                        >
                            <div className="relative h-48 bg-muted"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-muted rounded w-3/4"></div>
                                <div className="h-3 bg-muted rounded w-full"></div>
                                <div className="h-3 bg-muted rounded w-5/6"></div>
                                <div className="flex gap-2 pt-2">
                                    <div className="h-6 bg-muted rounded w-20"></div>
                                    <div className="h-6 bg-muted rounded w-20"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
