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
import { Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectsEditorProps {
    projects: string[];
    onSave: (projects: string[]) => void;
    onCancel: () => void;
    isOpen: boolean;
}

export function ProjectsEditor({
    projects: initialProjects,
    onSave,
    onCancel,
    isOpen,
}: ProjectsEditorProps) {
    const [projects, setProjects] = useState<string[]>(initialProjects);

    const addProject = () => {
        setProjects([...projects, ""]);
    };

    const updateProject = (index: number, value: string) => {
        const updated = [...projects];
        updated[index] = value;
        setProjects(updated);
    };

    const removeProject = (index: number) => {
        if (projects.length <= 1) {
            alert("Cannot remove the last project");
            return;
        }
        const updated = projects.filter((_, i) => i !== index);
        setProjects(updated);
    };

    const handleSave = () => {
        // Filter out empty projects
        const filteredProjects = projects.filter((p) => p.trim() !== "");
        if (filteredProjects.length === 0) {
            alert("Please add at least one project");
            return;
        }
        onSave(filteredProjects);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
            <DialogContent className="max-w-3xl max-h-[90vh] p-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle>Edit Projects</DialogTitle>
                    <DialogDescription>
                        Add, edit, or remove projects from the course. Changes
                        will be saved locally until you implement database
                        integration.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="px-6 flex-1 min-h-0 max-h-[60vh]">
                    <div className="space-y-4 pb-6">
                        <div className="flex items-center justify-between mb-4">
                            <Label className="text-base font-semibold">
                                Projects List ({projects.length})
                            </Label>
                            <Button
                                size="sm"
                                onClick={addProject}
                                className="bg-[#226481] hover:bg-[#1a4f63]"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50"
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#226481] text-white text-sm font-bold shrink-0">
                                        {index + 1}
                                    </div>
                                    <Input
                                        value={project}
                                        onChange={(e) =>
                                            updateProject(index, e.target.value)
                                        }
                                        placeholder={`Enter project ${index + 1} name`}
                                        className="flex-1"
                                    />
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => removeProject(index)}
                                        disabled={projects.length <= 1}
                                        className="shrink-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}

                            {projects.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>No projects added yet.</p>
                                    <p className="text-sm mt-2">
                                        Click &quot;Add Project&quot; to add
                                        one.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollArea>

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
