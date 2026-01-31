"use client";
import BookTheCallModal from "@/components/BookTheCallModal";

interface FreeConsultationButtonProps {
    className?: string;
}

export default function FreeConsultationButton({
    className = "",
}: FreeConsultationButtonProps) {
    // Reuse modal which uses the same form as the on-page section
    return <BookTheCallModal />;
}
