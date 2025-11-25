export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
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
