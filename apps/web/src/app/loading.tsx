"use client";

import { Box } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background/80 backdrop-blur-md z-50">
            <div className="relative flex flex-col items-center justify-center gap-4">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />

                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <Box className="h-16 w-16 text-primary animate-bounce duration-1000" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col items-center gap-1">
                    <h3 className="font-bold text-xl tracking-tight text-foreground">
                        Loading
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest animate-pulse">
                        Please wait...
                    </p>
                </div>
            </div>
        </div>
    );
}