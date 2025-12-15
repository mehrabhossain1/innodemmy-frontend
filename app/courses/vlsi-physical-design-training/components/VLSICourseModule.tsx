"use client";
import SectionTitle from "@/components/course/SectionTitle";
import { ChevronDown, Video, FileText } from "lucide-react";
import { useState } from "react";

interface Session {
    id: number;
    week: string;
    topic: string;
    keyConcepts: string;
    projects?: string;
}

interface Module {
    id: number;
    number: number;
    title: string;
    essence: string;
    liveClasses: number;
    color: string;
    bgColor: string;
    sessions: Session[];
}

const modules: Module[] = [
    {
        id: 1,
        number: 1,
        title: "PD Prerequisites",
        essence: "",
        liveClasses: 6,
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        sessions: [
            {
                id: 1,
                week: "1",
                topic: "Unix/Linux Basics",
                keyConcepts:
                    "File system navigation, commands, permissions; hands-on: explore directories and files",
            },
            {
                id: 2,
                week: "1",
                topic: "Vim Editor",
                keyConcepts:
                    "Editing files, search/replace, macros; hands-on: practice editing RTL and log files",
            },
            {
                id: 3,
                week: "2",
                topic: "Bash Scripting",
                keyConcepts:
                    "Loops, conditionals, automation; hands-on: automate file operations",
            },
            {
                id: 4,
                week: "3, 4",
                topic: "TCL Scripting",
                keyConcepts:
                    "Variables, loops, conditionals; hands-on: simple scripts for synthesis/netlist extraction",
            },
            {
                id: 5,
                week: "5",
                topic: "RTL Design Fundamental",
                keyConcepts:
                    "• Digital design refresher: combinational vs sequential circuits\n• RTL concepts: registers, FSMs, datapaths, control logic\n• Verilog basics: modules, syntax, testbenches\n• Simulation and functional verification\n• Clocking, reset, and timing concepts\n• Writing synthesizable RTL",
            },
            {
                id: 6,
                week: "6",
                topic: "RTL Analysis & Synthesis",
                keyConcepts:
                    "• RTL to gate-level concepts\n• Technology libraries and mapping\n• Timing, area, and power trade-offs\n• Constraints: SDC (Synopsys Design Constraints)\n• Understanding and analyzing synthesis reports",
            },
        ],
    },
    {
        id: 2,
        number: 2,
        title: "Introduction to Physical Design",
        essence: "",
        liveClasses: 1,
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        sessions: [
            {
                id: 7,
                week: "7",
                topic: "Understanding of the PD flow",
                keyConcepts:
                    "• Overview of VLSI design flow: RTL → Synthesis → Physical Design → Signoff\n• Roles of a Physical Design Engineer\n• Design hierarchy: SoC, Block, Standard Cell\n• Key challenges in Physical Design: Timing, Power, Area, Congestion\n• Introduction to PDKs (Process Design Kits) and libraries",
            },
        ],
    },
    {
        id: 3,
        number: 3,
        title: "Floorplanning",
        essence: "",
        liveClasses: 1,
        color: "bg-green-500",
        bgColor: "bg-green-50",
        sessions: [
            {
                id: 8,
                week: "8",
                topic: "Chip layout boundaries and macro placement",
                keyConcepts:
                    "• Floorplanning basics\n• Die size, aspect ratio, and utilization\n• Block placement: macros, standard cells, I/O\n• Keepout and obstruction areas",
            },
        ],
    },
    {
        id: 4,
        number: 4,
        title: "PowerPlanning",
        essence: "",
        liveClasses: 1,
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        sessions: [
            {
                id: 9,
                week: "8",
                topic: "PG Creation for the design",
                keyConcepts:
                    "• PowerPlanning basics\n• Add rings, Stripes, Via insertion\n• Sroute\n• Check PG connectivity",
            },
        ],
    },
    {
        id: 5,
        number: 5,
        title: "Placement",
        essence: "",
        liveClasses: 2,
        color: "bg-red-500",
        bgColor: "bg-red-50",
        sessions: [
            {
                id: 10,
                week: "9",
                topic: "Placement of standard cells",
                keyConcepts:
                    "• Standard cell placement: global vs detailed placement\n• Placement algorithms\n• Legalization and density checks\n• Congestion analysis and optimization\n• Pin assignment strategies",
            },
        ],
    },
    {
        id: 6,
        number: 6,
        title: "Clock Tree Synthesis (CTS)",
        essence: "",
        liveClasses: 2,
        color: "bg-indigo-500",
        bgColor: "bg-indigo-50",
        sessions: [
            {
                id: 11,
                week: "10",
                topic: "Understand the CTS & Build and optimize the clock network",
                keyConcepts:
                    "• Clock tree basics and skew\n• Clock buffers and sinks\n• CTS algorithms\n• Clock uncertainty and latency\n• NDR & CTS exceptions",
            },
        ],
    },
    {
        id: 7,
        number: 7,
        title: "Routing",
        essence: "",
        liveClasses: 2,
        color: "bg-pink-500",
        bgColor: "bg-pink-50",
        sessions: [
            {
                id: 12,
                week: "11",
                topic: "Connect all cells and macros",
                keyConcepts:
                    "• Routing concepts: global vs detailed\n• Metal layers and preferred directions\n• Design rules (DRC) and layer usage\n• Crosstalk, capacitance, and resistance considerations\n• Signal integrity basics",
            },
        ],
    },
    {
        id: 8,
        number: 8,
        title: "Timing Analysis & Optimization",
        essence: "",
        liveClasses: 2,
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
        sessions: [
            {
                id: 13,
                week: "12",
                topic: "Ensure design meets timing constraints",
                keyConcepts:
                    "• Static Timing Analysis (STA)\n• Setup, hold, and timing violations\n• Timing exceptions (false paths, multi-cycle paths)\n• Optimization techniques (buffer insertion, gate resizing, path fixing)\n• Power vs performance trade-offs",
            },
        ],
    },
    {
        id: 9,
        number: 9,
        title: "Signoff & Verification",
        essence: "",
        liveClasses: 2,
        color: "bg-cyan-500",
        bgColor: "bg-cyan-50",
        sessions: [
            {
                id: 14,
                week: "13",
                topic: "Verify the design is ready for tapeout",
                keyConcepts:
                    "• Design Rule Check (DRC) and Layout vs Schematic (LVS)\n• Antenna checks, Electrical Rule Checks (ERC)\n• Crosstalk and IR drop analysis\n• Final signoff checklist",
            },
        ],
    },
    {
        id: 10,
        number: 10,
        title: "Capstone Project",
        essence: "",
        liveClasses: 3,
        color: "bg-violet-500",
        bgColor: "bg-violet-50",
        sessions: [
            {
                id: 15,
                week: "14",
                topic: "Apply all concepts to real scenarios",
                keyConcepts:
                    "Full block design: RTL → GDSII for a simple processor core\nMacro placement and routing optimization project",
                projects:
                    "Capstone Project: ASIC Physical Implementation Using OpenROAD",
            },
        ],
    },
    {
        id: 11,
        number: 11,
        title: "Job Exam & Interview Preparation",
        essence: "",
        liveClasses: 2,
        color: "bg-orange-500",
        bgColor: "bg-orange-50",
        sessions: [
            {
                id: 16,
                week: "15",
                topic: "Resume & Career Prep, Interview Preparation, Mock Interviews",
                keyConcepts:
                    "• Resume building for PD roles\n• Common interview topics:\n  • Timing, placement, routing concepts\n  • Scripting questions (TCL, Bash, Python)\n  • RTL to GDSII flow understanding\n• Aptitude & logical reasoning questions for PD companies\n• Mock interviews and discussion of previous company questions\n• Soft skills and behavioral interview preparation",
            },
        ],
    },
];

export default function VLSICourseModule() {
    const [expandedModules, setExpandedModules] = useState<number[]>([]);
    const [expandedSession, setExpandedSession] = useState<string | null>(null);

    const toggleModule = (moduleId: number) => {
        setExpandedModules((prev) => {
            if (prev.includes(moduleId)) {
                return prev.filter((id) => id !== moduleId);
            } else {
                return [...prev, moduleId];
            }
        });
    };

    const toggleSession = (moduleId: number, sessionId: number) => {
        const sessionKey = `${moduleId}-${sessionId}`;
        setExpandedSession(expandedSession === sessionKey ? null : sessionKey);
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <SectionTitle title="Course Module" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {modules.map((module) => (
                    <div
                        key={module.id}
                        className={`${
                            module.bgColor
                        } dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
                            expandedModules.includes(module.id)
                                ? "shadow-lg"
                                : "shadow-md hover:shadow-lg"
                        }`}
                    >
                        {/* Module Header */}
                        <div
                            className={`p-5 cursor-pointer`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleModule(module.id);
                            }}
                        >
                            <div className="flex items-start gap-4">
                                {/* Module Number Badge */}
                                <div
                                    className={`${module.color} text-white rounded-xl px-4 py-3 flex-shrink-0 shadow-md`}
                                >
                                    <div className="text-sm font-semibold">
                                        Module
                                    </div>
                                    <div className="text-3xl font-bold">
                                        {module.number}
                                    </div>
                                </div>

                                {/* Module Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg leading-tight">
                                        {module.title}
                                    </h3>
                                    {module.essence && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                                            {module.essence}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                                        {module.liveClasses > 0 && (
                                            <div className="flex items-center gap-1.5">
                                                <Video className="w-4 h-4" />
                                                <span className="font-medium">
                                                    {module.liveClasses} Live
                                                    Class
                                                    {module.liveClasses > 1
                                                        ? "es"
                                                        : ""}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Chevron Icon */}
                                <div className="flex-shrink-0">
                                    <ChevronDown
                                        className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                                            expandedModules.includes(module.id)
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Module Content */}
                        {expandedModules.includes(module.id) && (
                            <div className="px-5 pb-5">
                                <div className="space-y-2">
                                    {module.sessions.map((session) => {
                                        const sessionKey = `${module.id}-${session.id}`;
                                        const isSessionExpanded =
                                            expandedSession === sessionKey;

                                        const borderColor =
                                            module.id === 1
                                                ? "border-blue-300 bg-blue-50/50"
                                                : module.id === 2
                                                ? "border-purple-300 bg-purple-50/50"
                                                : module.id === 3
                                                ? "border-green-300 bg-green-50/50"
                                                : module.id === 4
                                                ? "border-amber-300 bg-amber-50/50"
                                                : module.id === 5
                                                ? "border-red-300 bg-red-50/50"
                                                : module.id === 6
                                                ? "border-indigo-300 bg-indigo-50/50"
                                                : module.id === 7
                                                ? "border-pink-300 bg-pink-50/50"
                                                : module.id === 8
                                                ? "border-teal-300 bg-teal-50/50"
                                                : module.id === 9
                                                ? "border-cyan-300 bg-cyan-50/50"
                                                : module.id === 10
                                                ? "border-violet-300 bg-violet-50/50"
                                                : "border-orange-300 bg-orange-50/50";

                                        return (
                                            <div
                                                key={session.id}
                                                className={`border rounded-lg p-2.5 transition-all duration-300 ${
                                                    isSessionExpanded
                                                        ? `${borderColor} shadow-sm`
                                                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
                                                }`}
                                            >
                                                <div
                                                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleSession(
                                                            module.id,
                                                            session.id
                                                        );
                                                    }}
                                                >
                                                    <span className="font-bold text-gray-900 dark:text-white min-w-[20px] text-base">
                                                        {session.id}.
                                                    </span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1">
                                                                <span className="leading-tight font-semibold text-base">
                                                                    {
                                                                        session.topic
                                                                    }
                                                                </span>
                                                            </div>
                                                            <ChevronDown
                                                                className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ml-2 flex-shrink-0 ${
                                                                    isSessionExpanded
                                                                        ? "rotate-180"
                                                                        : ""
                                                                }`}
                                                            />
                                                        </div>

                                                        {/* Expanded Session Details */}
                                                        {isSessionExpanded && (
                                                            <div className="mt-3 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                                                                <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                                                    <div className="leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                                                        {
                                                                            session.keyConcepts
                                                                        }
                                                                    </div>
                                                                </div>

                                                                {session.projects && (
                                                                    <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-100 dark:border-green-800">
                                                                        <h4 className="font-semibold text-green-900 dark:text-green-300 mb-1.5 flex items-center gap-1.5 text-base">
                                                                            <span className="text-green-600 dark:text-green-400">
                                                                                🎯
                                                                            </span>
                                                                            Projects:
                                                                        </h4>
                                                                        <p className="leading-relaxed text-green-800 dark:text-green-200">
                                                                            {
                                                                                session.projects
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
