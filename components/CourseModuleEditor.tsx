"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CourseModuleData {
    class: string;
    title: string;
    topics: string[];
    exercises: string[];
}

interface CourseModuleEditorProps {
    modules: CourseModuleData[];
    onSave: (modules: CourseModuleData[]) => void;
    onCancel: () => void;
    isOpen: boolean;
}

export function CourseModuleEditor({
    modules: initialModules,
    onSave,
    onCancel,
    isOpen,
}: CourseModuleEditorProps) {
    const [modules, setModules] = useState<CourseModuleData[]>(initialModules);
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);

    const updateModule = (
        index: number,
        field: keyof CourseModuleData,
        value: string | string[]
    ) => {
        const updated = [...modules];
        updated[index] = { ...updated[index], [field]: value };
        setModules(updated);
    };

    const addTopic = (moduleIndex: number) => {
        const updated = [...modules];
        updated[moduleIndex].topics.push("");
        setModules(updated);
    };

    const updateTopic = (
        moduleIndex: number,
        topicIndex: number,
        value: string
    ) => {
        const updated = [...modules];
        updated[moduleIndex].topics[topicIndex] = value;
        setModules(updated);
    };

    const removeTopic = (moduleIndex: number, topicIndex: number) => {
        const updated = [...modules];
        updated[moduleIndex].topics.splice(topicIndex, 1);
        setModules(updated);
    };

    const addExercise = (moduleIndex: number) => {
        const updated = [...modules];
        updated[moduleIndex].exercises.push("");
        setModules(updated);
    };

    const updateExercise = (
        moduleIndex: number,
        exerciseIndex: number,
        value: string
    ) => {
        const updated = [...modules];
        updated[moduleIndex].exercises[exerciseIndex] = value;
        setModules(updated);
    };

    const removeExercise = (moduleIndex: number, exerciseIndex: number) => {
        const updated = [...modules];
        updated[moduleIndex].exercises.splice(exerciseIndex, 1);
        setModules(updated);
    };

    const addModule = () => {
        const newModule: CourseModuleData = {
            class: `Class ${modules.length + 1}`,
            title: "",
            topics: [],
            exercises: [],
        };
        setModules([...modules, newModule]);
        setActiveModuleIndex(modules.length);
    };

    const removeModule = (index: number) => {
        if (modules.length <= 1) {
            alert("Cannot remove the last module");
            return;
        }
        const updated = modules.filter((_, i) => i !== index);
        setModules(updated);
        if (activeModuleIndex >= updated.length) {
            setActiveModuleIndex(updated.length - 1);
        }
    };

    const handleSave = () => {
        onSave(modules);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
            <DialogContent className="max-w-6xl max-h-[90vh] p-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle>Edit Course Modules</DialogTitle>
                    <DialogDescription>
                        Update course curriculum, topics, and exercises. Changes
                        will be saved locally until you implement database
                        integration.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col md:flex-row gap-4 px-6 flex-1 min-h-0">
                    {/* Left Sidebar - Module List */}
                    <div className="md:w-64 flex-shrink-0">
                        <div className="mb-3">
                            <Button
                                onClick={addModule}
                                className="w-full"
                                size="sm"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Module
                            </Button>
                        </div>
                        <ScrollArea className="h-[400px] border rounded-lg p-2">
                            <div className="space-y-2">
                                {modules.map((module, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                            activeModuleIndex === index
                                                ? "bg-[#226481] text-white"
                                                : "bg-muted hover:bg-muted/80"
                                        }`}
                                        onClick={() =>
                                            setActiveModuleIndex(index)
                                        }
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold mb-1">
                                                    {module.class}
                                                </p>
                                                <p className="text-xs truncate">
                                                    {module.title || "Untitled"}
                                                </p>
                                            </div>
                                            {modules.length > 1 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 w-6 p-0 hover:bg-red-500 hover:text-white"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeModule(index);
                                                    }}
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Right Content - Edit Form */}
                    <ScrollArea className="flex-1 pr-4">
                        {modules[activeModuleIndex] && (
                            <div className="space-y-6 pb-6">
                                {/* Class Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="class-number">
                                        Class Label
                                    </Label>
                                    <Input
                                        id="class-number"
                                        value={modules[activeModuleIndex].class}
                                        onChange={(e) =>
                                            updateModule(
                                                activeModuleIndex,
                                                "class",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g., Class 1"
                                    />
                                </div>

                                {/* Module Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="module-title">
                                        Module Title
                                    </Label>
                                    <Input
                                        id="module-title"
                                        value={modules[activeModuleIndex].title}
                                        onChange={(e) =>
                                            updateModule(
                                                activeModuleIndex,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g., Module 1: Getting Started with Python"
                                    />
                                </div>

                                {/* Topics */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Topics Covered</Label>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                addTopic(activeModuleIndex)
                                            }
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Topic
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {modules[activeModuleIndex].topics.map(
                                            (topic, topicIndex) => (
                                                <div
                                                    key={topicIndex}
                                                    className="flex gap-2"
                                                >
                                                    <Textarea
                                                        value={topic}
                                                        onChange={(e) =>
                                                            updateTopic(
                                                                activeModuleIndex,
                                                                topicIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Enter topic"
                                                        className="flex-1 min-h-[60px]"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            removeTopic(
                                                                activeModuleIndex,
                                                                topicIndex
                                                            )
                                                        }
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        {modules[activeModuleIndex].topics
                                            .length === 0 && (
                                            <p className="text-sm text-muted-foreground italic">
                                                No topics added yet. Click
                                                &quot;Add Topic&quot; to add one.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Exercises */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Exercises</Label>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                addExercise(activeModuleIndex)
                                            }
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Exercise
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {modules[
                                            activeModuleIndex
                                        ].exercises.map(
                                            (exercise, exerciseIndex) => (
                                                <div
                                                    key={exerciseIndex}
                                                    className="flex gap-2"
                                                >
                                                    <Input
                                                        value={exercise}
                                                        onChange={(e) =>
                                                            updateExercise(
                                                                activeModuleIndex,
                                                                exerciseIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Enter exercise"
                                                        className="flex-1"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            removeExercise(
                                                                activeModuleIndex,
                                                                exerciseIndex
                                                            )
                                                        }
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        {modules[activeModuleIndex].exercises
                                            .length === 0 && (
                                            <p className="text-sm text-muted-foreground italic">
                                                No exercises added yet. Click
                                                &quot;Add Exercise&quot; to add
                                                one.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </ScrollArea>
                </div>

                <DialogFooter className="p-6 pt-4 border-t">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-[#226481] hover:bg-[#1a4f63]"
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
