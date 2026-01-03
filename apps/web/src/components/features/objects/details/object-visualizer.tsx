"use client";

import React, { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Box, ImageIcon, Loader2 } from "lucide-react";
import { Comparison, ComparisonItem, ComparisonHandle } from "@/components/ui/shadcn-io/comparison";
import { cn } from "@/lib/utils";

interface ObjectVisualizerProps {
    beforeImage: string;
    afterImage: string;
    modelUrl?: string;
}

export function ObjectVisualizer({ beforeImage, afterImage, modelUrl }: ObjectVisualizerProps) {
    const [viewMode, setViewMode] = useState<"comparison" | "3d">("comparison");
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const modelViewerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (modelUrl) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
            document.body.appendChild(script);

            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        }
    }, [modelUrl]);

    // Слухаємо подію завантаження моделі
    useEffect(() => {
        const viewer = modelViewerRef.current;
        if (viewer) {
            const handleLoad = () => setIsModelLoaded(true);
            viewer.addEventListener('load', handleLoad);
            return () => viewer.removeEventListener('load', handleLoad);
        }
    }, [viewMode]); // Перепідключаємось при зміні режиму

    return (
        <div className="mb-12">
            {modelUrl && (
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center p-1 rounded-full bg-muted border">
                        <Button
                            variant={viewMode === "comparison" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("comparison")}
                            className="rounded-full gap-2 px-4 transition-all"
                        >
                            <ImageIcon className="w-4 h-4" /> Comparison
                        </Button>
                        <Button
                            variant={viewMode === "3d" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("3d")}
                            className="rounded-full gap-2 px-4 transition-all"
                        >
                            <Box className="w-4 h-4" /> 3D Model
                        </Button>
                    </div>
                </div>
            )}

            <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden border bg-muted/20 shadow-sm ring-1 ring-border/50">
                {viewMode === "comparison" ? (
                    <>
                        <Comparison className="w-full h-full" mode="hover">
                            <ComparisonItem position="right">
                                <img src={beforeImage} alt="Before" className="w-full h-full object-cover object-center grayscale" />
                            </ComparisonItem>
                            <ComparisonItem position="left">
                                <img src={afterImage} alt="After" className="w-full h-full object-cover object-center" />
                            </ComparisonItem>
                            <ComparisonHandle />
                        </Comparison>
                        <div className="absolute top-4 left-4 z-20 pointer-events-none animate-in fade-in zoom-in duration-500">
                            <Badge variant="secondary" className="bg-black/60 text-white border-0 backdrop-blur-md px-3 py-1">Before</Badge>
                        </div>
                        <div className="absolute top-4 right-4 z-20 pointer-events-none animate-in fade-in zoom-in duration-500">
                            <Badge variant="secondary" className="bg-white/80 text-black border-0 backdrop-blur-md px-3 py-1">After</Badge>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900 relative">
                        {/* ЛОАДЕР */}
                        {!isModelLoaded && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm transition-all duration-500">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                                    <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
                                </div>
                                <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
                                    Loading 3D Experience...
                                </p>
                            </div>
                        )}

                        {/* @ts-ignore */}
                        <model-viewer
                            ref={modelViewerRef}
                            src={modelUrl}
                            poster={afterImage} // Поки вантажиться, показуємо картинку
                            shadow-intensity="1"
                            camera-controls
                            auto-rotate
                            touch-action="pan-y"
                            style={{ width: '100%', height: '100%', opacity: isModelLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}