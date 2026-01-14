"use client";
import { Button } from "@/components/ui/button";

interface FreeConsultationButtonProps {
    targetId?: string;
    className?: string;
}

export default function FreeConsultationButton({
    targetId = "book-call",
    className = "",
}: FreeConsultationButtonProps) {
    const handleClick = () => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    return (
        <Button
            onClick={handleClick}
            className={`text-xs lg:text-sm font-semibold text-secondary bg-secondary/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-secondary/20 hover:bg-secondary/20 hover:scale-105 transition-all duration-200 cursor-pointer ${className}`}
        >
            📞 Free Consultation
        </Button>
    );
}
