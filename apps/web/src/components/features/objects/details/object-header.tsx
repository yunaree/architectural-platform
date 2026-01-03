"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Share2, Calendar, Check } from "lucide-react";
import { ObjectEntity } from "@/features/objects/types";

export function ObjectHeader({ object }: { object: ObjectEntity }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: object.title,
                    text: `Check out this project: ${object.title}`,
                    url: url,
                });
            } catch (error) { console.log("Share skipped", error); }
        } else {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{object.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {object.country && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/40 border border-border/50">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            <span className="font-medium text-foreground">{object.country.name}</span>
                        </span>
                    )}
                    {object.year && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/40 border border-border/50">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{object.year}</span>
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 self-start">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 transition-all duration-300 hover:bg-secondary"
                    onClick={handleShare}
                >
                    {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                </Button>
                <div className="flex flex-col items-end px-2">
                    <div className="flex items-center gap-1.5">
                        <Eye className="w-5 h-5 text-muted-foreground" />
                        <span className="text-xl font-bold text-foreground">{object.views || 0}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">total views</span>
                </div>
            </div>
        </div>
    );
}