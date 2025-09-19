"use client";

// import { useAuth } from "@/lib/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    // const { user, isLoading } = useAuth();
    // const router = useRouter();

    // useEffect(() => {
    //     if (!isLoading && !user) {
    //         router.push("/login");
    //     }
    // }, [user, isLoading, router]);

    // if (isLoading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <div className="text-lg">Loading...</div>
    //         </div>
    //     );
    // }

    // if (!user) {
    //     return null;
    // }

    return (
        // <div className="flex min-h-screen bg-gray-50">
        //     {/* <Sidebar /> */}
        //     <main className="flex-1 overflow-auto">
        //         <div className="p-6">
        //             {/* <DashboardHeader /> */}
        //             {children}
        //         </div>
        //     </main>
        // </div>
        <div>{children}</div>
    );
};

export default DashboardLayout;
