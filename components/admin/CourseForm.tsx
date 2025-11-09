"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface FAQ {
    question: string;
    answer: string;
}

interface ClassModule {
    classNumber: number;
    moduleTitle: string;
    topics: string[];
    exercises: string[];
}

interface CourseData {
    title: string;
    description: string;
    category?: string;
    batchName?: string;
    thumbnail?: string;
    price?: number;
    totalClasses?: number;
    totalWeeks?: number;
    totalModules?: number;
    totalProjects?: number;
    idealFor?: string[];
    faq?: FAQ[];
    modules?: ClassModule[];
    projects?: string[];
}

interface CourseFormProps {
    initialData?: CourseData;
    onSubmit: (data: CourseData) => Promise<void>;
}

export default function CourseForm({ initialData, onSubmit }: CourseFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<CourseData>(
        initialData || {
            title: "",
            description: "",
            category: "",
            batchName: "",
            thumbnail: "",
            price: 0,
            totalClasses: 0,
            totalWeeks: 0,
            totalModules: 0,
            totalProjects: 0,
            idealFor: [],
            faq: [],
            modules: [],
            projects: [],
        }
    );

    const [idealForInput, setIdealForInput] = useState("");
    const [projectInput, setProjectInput] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name.includes("total") || name === "price"
                    ? Number(value)
                    : value,
        }));
    };

    // Ideal For handlers
    const addIdealFor = () => {
        if (idealForInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                idealFor: [...(prev.idealFor || []), idealForInput.trim()],
            }));
            setIdealForInput("");
        }
    };

    const removeIdealFor = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            idealFor: prev.idealFor?.filter((_, i) => i !== index),
        }));
    };

    // FAQ handlers
    const addFAQ = () => {
        setFormData((prev) => ({
            ...prev,
            faq: [...(prev.faq || []), { question: "", answer: "" }],
        }));
    };

    const updateFAQ = (
        index: number,
        field: "question" | "answer",
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            faq: prev.faq?.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const removeFAQ = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            faq: prev.faq?.filter((_, i) => i !== index),
        }));
    };

    // Module handlers
    const addModule = () => {
        setFormData((prev) => ({
            ...prev,
            modules: [
                ...(prev.modules || []),
                {
                    classNumber: (prev.modules?.length || 0) + 1,
                    moduleTitle: "",
                    topics: [],
                    exercises: [],
                },
            ],
        }));
    };

    const updateModule = (
        index: number,
        field: keyof ClassModule,
        value: number | string | string[]
    ) => {
        setFormData((prev) => ({
            ...prev,
            modules: prev.modules?.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const removeModule = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            modules: prev.modules?.filter((_, i) => i !== index),
        }));
    };

    const addTopicToModule = (moduleIndex: number, topic: string) => {
        if (topic.trim()) {
            setFormData((prev) => ({
                ...prev,
                modules: prev.modules?.map((module, i) =>
                    i === moduleIndex
                        ? {
                              ...module,
                              topics: [...module.topics, topic.trim()],
                          }
                        : module
                ),
            }));
        }
    };

    const removeTopicFromModule = (moduleIndex: number, topicIndex: number) => {
        setFormData((prev) => ({
            ...prev,
            modules: prev.modules?.map((module, i) =>
                i === moduleIndex
                    ? {
                          ...module,
                          topics: module.topics.filter(
                              (_, ti) => ti !== topicIndex
                          ),
                      }
                    : module
            ),
        }));
    };

    const addExerciseToModule = (moduleIndex: number, exercise: string) => {
        if (exercise.trim()) {
            setFormData((prev) => ({
                ...prev,
                modules: prev.modules?.map((module, i) =>
                    i === moduleIndex
                        ? {
                              ...module,
                              exercises: [...module.exercises, exercise.trim()],
                          }
                        : module
                ),
            }));
        }
    };

    const removeExerciseFromModule = (
        moduleIndex: number,
        exerciseIndex: number
    ) => {
        setFormData((prev) => ({
            ...prev,
            modules: prev.modules?.map((module, i) =>
                i === moduleIndex
                    ? {
                          ...module,
                          exercises: module.exercises.filter(
                              (_, ei) => ei !== exerciseIndex
                          ),
                      }
                    : module
            ),
        }));
    };

    // Project handlers
    const addProject = () => {
        if (projectInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                projects: [...(prev.projects || []), projectInput.trim()],
            }));
            setProjectInput("");
        }
    };

    const removeProject = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            projects: prev.projects?.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await onSubmit(formData);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Basic Information
                </h2>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title">Course Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., Python Programming Fundamentals"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            placeholder="Brief description of the course"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="e.g., Programming"
                            />
                        </div>

                        <div>
                            <Label htmlFor="batchName">Batch Name</Label>
                            <Input
                                id="batchName"
                                name="batchName"
                                value={formData.batchName}
                                onChange={handleInputChange}
                                placeholder="e.g., Batch 1"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="price">Price (BDT)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="1500"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="thumbnail">Thumbnail URL</Label>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="totalClasses">Total Classes</Label>
                            <Input
                                id="totalClasses"
                                name="totalClasses"
                                type="number"
                                value={formData.totalClasses}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="totalWeeks">Total Weeks</Label>
                            <Input
                                id="totalWeeks"
                                name="totalWeeks"
                                type="number"
                                value={formData.totalWeeks}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="totalModules">Total Modules</Label>
                            <Input
                                id="totalModules"
                                name="totalModules"
                                type="number"
                                value={formData.totalModules}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="totalProjects">
                                Total Projects
                            </Label>
                            <Input
                                id="totalProjects"
                                name="totalProjects"
                                type="number"
                                value={formData.totalProjects}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Ideal For Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    This Course is Ideal For
                </h2>

                <div className="space-y-3">
                    {formData.idealFor?.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-2 p-3 bg-gray-50 rounded"
                        >
                            <span className="text-indigo-600 font-bold">
                                {index + 1}.
                            </span>
                            <span className="flex-1">{item}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeIdealFor(index)}
                            >
                                <X className="w-4 h-4 text-red-600" />
                            </Button>
                        </div>
                    ))}

                    <div className="flex gap-2">
                        <Input
                            value={idealForInput}
                            onChange={(e) => setIdealForInput(e.target.value)}
                            placeholder="e.g., Beginners with no prior programming experience"
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addIdealFor();
                                }
                            }}
                        />
                        <Button type="button" onClick={addIdealFor}>
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <Button type="button" onClick={addFAQ} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add FAQ
                    </Button>
                </div>

                <div className="space-y-4">
                    {formData.faq?.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-700">
                                    Q{index + 1}
                                </h3>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFAQ(index)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <Label>Question</Label>
                                    <Input
                                        value={item.question}
                                        onChange={(e) =>
                                            updateFAQ(
                                                index,
                                                "question",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter question"
                                    />
                                </div>

                                <div>
                                    <Label>Answer</Label>
                                    <Textarea
                                        value={item.answer}
                                        onChange={(e) =>
                                            updateFAQ(
                                                index,
                                                "answer",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter answer"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modules Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Course Modules
                    </h2>
                    <Button type="button" onClick={addModule} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Module
                    </Button>
                </div>

                <div className="space-y-6">
                    {formData.modules?.map((module, moduleIndex) => (
                        <ModuleEditor
                            key={moduleIndex}
                            module={module}
                            moduleIndex={moduleIndex}
                            onUpdate={updateModule}
                            onRemove={removeModule}
                            onAddTopic={addTopicToModule}
                            onRemoveTopic={removeTopicFromModule}
                            onAddExercise={addExerciseToModule}
                            onRemoveExercise={removeExerciseFromModule}
                        />
                    ))}
                </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Course Projects
                </h2>

                <div className="space-y-3">
                    {formData.projects?.map((project, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-2 p-3 bg-gray-50 rounded"
                        >
                            <span className="text-indigo-600 font-bold">
                                {index + 1}.
                            </span>
                            <span className="flex-1">{project}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeProject(index)}
                            >
                                <X className="w-4 h-4 text-red-600" />
                            </Button>
                        </div>
                    ))}

                    <div className="flex gap-2">
                        <Input
                            value={projectInput}
                            onChange={(e) => setProjectInput(e.target.value)}
                            placeholder="e.g., Build a Calculator Application"
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addProject();
                                }
                            }}
                        />
                        <Button type="button" onClick={addProject}>
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 bg-white rounded-lg shadow-md p-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={submitting}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                    {submitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Saving...
                        </>
                    ) : (
                        "Save Course"
                    )}
                </Button>
            </div>
        </form>
    );
}

// Module Editor Component
interface ModuleEditorProps {
    module: ClassModule;
    moduleIndex: number;
    onUpdate: (
        index: number,
        field: keyof ClassModule,
        value: number | string | string[]
    ) => void;
    onRemove: (index: number) => void;
    onAddTopic: (moduleIndex: number, topic: string) => void;
    onRemoveTopic: (moduleIndex: number, topicIndex: number) => void;
    onAddExercise: (moduleIndex: number, exercise: string) => void;
    onRemoveExercise: (moduleIndex: number, exerciseIndex: number) => void;
}

function ModuleEditor({
    module,
    moduleIndex,
    onUpdate,
    onRemove,
    onAddTopic,
    onRemoveTopic,
    onAddExercise,
    onRemoveExercise,
}: ModuleEditorProps) {
    const [topicInput, setTopicInput] = useState("");
    const [exerciseInput, setExerciseInput] = useState("");

    return (
        <div className="p-4 border-2 border-indigo-200 rounded-lg bg-indigo-50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Class {module.classNumber}
                    </span>
                    <Input
                        type="number"
                        value={module.classNumber}
                        onChange={(e) =>
                            onUpdate(
                                moduleIndex,
                                "classNumber",
                                Number(e.target.value)
                            )
                        }
                        className="w-20"
                        min="1"
                    />
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(moduleIndex)}
                >
                    <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
            </div>

            <div className="space-y-4">
                <div>
                    <Label>Module Title</Label>
                    <Input
                        value={module.moduleTitle}
                        onChange={(e) =>
                            onUpdate(moduleIndex, "moduleTitle", e.target.value)
                        }
                        placeholder="e.g., Module 1: Introduction to Python"
                    />
                </div>

                {/* Topics */}
                <div>
                    <Label className="mb-2 block">Topics</Label>
                    <div className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                            <div
                                key={topicIndex}
                                className="flex items-center gap-2 p-2 bg-white rounded"
                            >
                                <span className="text-indigo-500">•</span>
                                <span className="flex-1">{topic}</span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        onRemoveTopic(moduleIndex, topicIndex)
                                    }
                                >
                                    <X className="w-3 h-3 text-red-600" />
                                </Button>
                            </div>
                        ))}

                        <div className="flex gap-2">
                            <Input
                                value={topicInput}
                                onChange={(e) => setTopicInput(e.target.value)}
                                placeholder="Add a topic"
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        onAddTopic(moduleIndex, topicInput);
                                        setTopicInput("");
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => {
                                    onAddTopic(moduleIndex, topicInput);
                                    setTopicInput("");
                                }}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Exercises */}
                <div>
                    <Label className="mb-2 block">Exercises</Label>
                    <div className="space-y-2">
                        {module.exercises.map((exercise, exerciseIndex) => (
                            <div
                                key={exerciseIndex}
                                className="flex items-center gap-2 p-2 bg-white rounded"
                            >
                                <span className="text-green-500">✓</span>
                                <span className="flex-1 font-medium">
                                    {exercise}
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        onRemoveExercise(
                                            moduleIndex,
                                            exerciseIndex
                                        )
                                    }
                                >
                                    <X className="w-3 h-3 text-red-600" />
                                </Button>
                            </div>
                        ))}

                        <div className="flex gap-2">
                            <Input
                                value={exerciseInput}
                                onChange={(e) =>
                                    setExerciseInput(e.target.value)
                                }
                                placeholder="Add an exercise"
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        onAddExercise(
                                            moduleIndex,
                                            exerciseInput
                                        );
                                        setExerciseInput("");
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => {
                                    onAddExercise(moduleIndex, exerciseInput);
                                    setExerciseInput("");
                                }}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
