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
    const [activeSection, setActiveSection] = useState<string>(items[0]?.id || "");
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if should be sticky
            const scrollPosition = window.scrollY;
            setIsSticky(scrollPosition > 100);

            // Find active section
            const sections = items.map((item) => {
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
            }).filter(Boolean);

            const current = sections.find((section) => {
                if (!section) return false;
                const scrollPos = window.scrollY + 150;
                return scrollPos >= section.offsetTop && scrollPos < section.offsetBottom;
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
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div className="sticky top-16 z-40 bg-white dark:bg-gray-900 transition-all duration-300 mt-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <nav className="flex justify-center overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-700">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`flex-shrink-0 px-4 py-2 text-base font-bold transition-colors duration-200 border-b-2 whitespace-nowrap -mb-[1px] cursor-pointer ${
                                activeSection === item.id
                                    ? "text-primary dark:text-primary border-primary dark:border-primary"
                                    : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
