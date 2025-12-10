"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function ToolsAndTechnologies() {
    const tools = [
        {
            name: "OpenROAD",
            icon: "https://img.icons8.com/color/96/road.png",
            category: "EDA Tools",
        },
        {
            name: "OpenLANE",
            icon: "https://img.icons8.com/color/96/workflow.png",
            category: "EDA Tools",
        },
        {
            name: "Magic",
            icon: "https://img.icons8.com/color/96/magic-hat.png",
            category: "EDA Tools",
        },
        {
            name: "KLayout",
            icon: "https://img.icons8.com/color/96/layers.png",
            category: "EDA Tools",
        },
        {
            name: "OpenSTA",
            icon: "https://img.icons8.com/color/96/clock.png",
            category: "Signoff Timing",
        },
        {
            name: "TCL",
            icon: "https://img.icons8.com/color/96/code.png",
            category: "Scripting",
        },
        {
            name: "Shell",
            icon: "https://img.icons8.com/color/96/console.png",
            category: "Scripting",
        },
        {
            name: "SkyWater130",
            icon: "https://img.icons8.com/color/96/semiconductor.png",
            category: "PDKs",
        },
        {
            name: "Nangate45",
            icon: "https://img.icons8.com/color/96/electronics.png",
            category: "PDKs",
        },
        {
            name: "IHP130",
            icon: "https://img.icons8.com/color/96/integrated-circuit.png",
            category: "PDKs",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Tools & Technologies You will Learn" />

            {/* Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {tools.map((tool, index) => (
                    <div
                        key={index}
                        className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
                    >
                        {/* Icon */}
                        <div className="w-16 h-16 mb-3 flex items-center justify-center">
                            <img
                                src={tool.icon}
                                alt={tool.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>

                        {/* Tool Name */}
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                            {tool.name}
                        </h3>

                        {/* Category Badge */}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                            {tool.category}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
