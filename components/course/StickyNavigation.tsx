"use client";
import { useState, useEffect } from "react";

interface NavigationItem {
    id: string;
    label: string;
}

interface StickyNavigationProps {
    items: NavigationItem[];
}

export default function StickyNavigation({ items }: StickyNavigationProps) {
    const [activeSection, setActiveSection] = useState<string>(
        items[0]?.id || ""
    );
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if should be sticky
            const scrollPosition = window.scrollY;
            setIsSticky(scrollPosition > 100);

            // Find active section
            const sections = items
                .map((item) => {
                    const element = document.getElementById(item.id);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        return {
                            id: item.id,
                            offsetTop: rect.top + window.scrollY,
                            offsetBottom: rect.bottom + window.scrollY,
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            const current = sections.find((section) => {
                if (!section) return false;
                const scrollPos = window.scrollY + 150;
                return (
                    scrollPos >= section.offsetTop &&
                    scrollPos < section.offsetBottom
                );
            });

            if (current) {
                setActiveSection(current.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [items]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Offset for sticky header
            const y =
                element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div className="sticky top-16 z-40 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700 transition-all duration-300">
            <div className="container mx-auto px-4 max-w-7xl">
                <nav className="flex justify-center overflow-x-auto scrollbar-hide">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`relative flex-shrink-0 px-6 py-3 text-base font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                                activeSection === item.id
                                    ? "text-white bg-primary"
                                    : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
                            }`}
                        >
                            {item.label}
                            {activeSection === item.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-1 bg-secondary"></span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
