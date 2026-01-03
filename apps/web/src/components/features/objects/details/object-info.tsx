"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { ObjectEntity } from "@/features/objects/types";

export function ObjectInfo({ object }: { object: ObjectEntity }) {
    const getDescriptionText = (description: any) => {
        if (!description) return "No description available.";
        if (typeof description === "string") return description;
        if (Array.isArray(description)) {
            return description
                .map((block: any) => {
                    if (block.children && Array.isArray(block.children)) {
                        return block.children.map((child: any) => child.text).join("");
                    }
                    return "";
                })
                .join("\n\n");
        }
        return "";
    };

    const description = getDescriptionText(object.description);
    const coords = object.locationCoords as { lat?: number; lng?: number } | null;
    const mapEmbedUrl = coords?.lat
        ? `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
        : "";
    const locationString = coords?.lat ? `${coords.lat}, ${coords.lng}` : "Location not specified";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            <div className="lg:col-span-2 space-y-8">
                <div className="prose prose-zinc dark:prose-invert max-w-none whitespace-pre-line leading-relaxed text-lg text-muted-foreground">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">About the project</h3>
                    {description}
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {object.tags?.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm font-normal hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    {mapEmbedUrl && (
                        <div className="rounded-xl overflow-hidden border bg-card shadow-sm h-[320px] relative group">
                            <iframe
                                src={mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.8)' }}
                                className="dark:invert dark:grayscale dark:contrast-125 transition-all duration-500 group-hover:filter-none"
                                allowFullScreen
                                loading="lazy"
                            />
                            <div className="absolute bottom-4 left-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button className="w-full shadow-lg pointer-events-auto cursor-pointer bg-background/90 text-foreground hover:bg-background backdrop-blur-sm border">
                                    <MapPin className="w-4 h-4 mr-2" /> Open in Google Maps
                                </Button>
                            </div>
                        </div>
                    )}
                    <div className="p-4 rounded-xl border bg-muted/30 flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">Coordinates</span>
                        <span className="font-mono truncate max-w-[180px] bg-background px-2 py-1 rounded border" title={locationString}>{locationString}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}