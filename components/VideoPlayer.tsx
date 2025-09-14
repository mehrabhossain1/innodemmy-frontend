"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Volume2, VolumeX, CheckCircle, BookOpen } from "lucide-react";

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
    description: string;
    duration: string;
    onComplete?: () => void;
    isCompleted?: boolean;
}

export default function VideoPlayer({
    videoUrl,
    title,
    description,
    duration,
    onComplete,
    isCompleted = false,
}: VideoPlayerProps) {
    const [isWatched, setIsWatched] = useState(isCompleted);
    const [watchTime, setWatchTime] = useState(0);

    // Simulate marking video as watched after 30 seconds
    useEffect(() => {
        if (!isWatched && watchTime > 30) {
            setIsWatched(true);
            onComplete?.();
        }
    }, [watchTime, isWatched, onComplete]);

    // Simulate watch time tracking
    useEffect(() => {
        const interval = setInterval(() => {
            setWatchTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <Card>
            <CardContent className="p-0">
                {/* Video iframe */}
                <div className="relative aspect-video bg-gray-900">
                    <iframe
                        src={videoUrl}
                        title={title}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />

                    {/* Completion overlay */}
                    {isWatched && (
                        <div className="absolute top-4 right-4">
                            <Badge className="bg-green-500 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completed
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Video info */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h2 className="text-xl font-bold mb-2">{title}</h2>
                            <p className="text-gray-600 mb-3">{description}</p>
                        </div>
                    </div>

                    {/* Video stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                <span>Duration: {duration}</span>
                            </div>
                            <div className="flex items-center">
                                <Play className="w-4 h-4 mr-1" />
                                <span>Watched: {formatTime(watchTime)}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {isWatched ? (
                                <Badge
                                    variant="default"
                                    className="bg-green-500"
                                >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Completed
                                </Badge>
                            ) : (
                                <Badge variant="secondary">In Progress</Badge>
                            )}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex justify-between mt-4 pt-4 border-t">
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                                <Volume2 className="w-4 h-4 mr-2" />
                                Notes
                            </Button>
                            <Button variant="outline" size="sm">
                                <VolumeX className="w-4 h-4 mr-2" />
                                Resources
                            </Button>
                        </div>
                        {!isWatched && (
                            <Button
                                size="sm"
                                onClick={() => {
                                    setIsWatched(true);
                                    onComplete?.();
                                }}
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark Complete
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
