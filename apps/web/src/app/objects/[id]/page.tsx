"use client";

import React, { use, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, MapPin, Share2, Calendar, ArrowLeft, Check, Box, ImageIcon } from "lucide-react";
import Link from "next/link";
import { ObjectCard } from "@/components/features/objects/object-card";
import {
    Comparison,
    ComparisonItem,
    ComparisonHandle
} from "@/components/ui/shadcn-io/comparison";
import { useGetObject } from "@/features/objects/api/use-get-object";
import { useUpdateViews } from "@/features/objects/api/use-object-interactions";

const SIMILAR_OBJECTS = [
    {
        documentId: "sim-1",
        title: "Kyiv River Station",
        slug: "kyiv-river-station",
        description: "Adaptive reuse of the modernist building.",
        tags: [{ documentId: "t1", name: "Modernism", slug: "modernism" }],
        views: 120,
        year: 1960
    },
    {
        documentId: "sim-2",
        title: "Potocki Palace",
        slug: "potocki-palace",
        description: "Landscape design restoration.",
        tags: [{ documentId: "t2", name: "Palace", slug: "palace" }],
        views: 850,
        year: 1880
    },
    {
        documentId: "sim-3",
        title: "Chernivtsi University",
        slug: "chernivtsi-university",
        description: "Restoration of authentic mosaic.",
        tags: [{ documentId: "t3", name: "UNESCO", slug: "unesco" }],
        views: 2300,
        year: 1875
    },
    {
        documentId: "sim-4",
        title: "Odesa Fine Arts",
        slug: "odesa-fine-arts",
        description: "Underground structural reinforcement.",
        tags: [{ documentId: "t4", name: "Museum", slug: "museum" }],
        views: 540,
        year: 1899
    },
] as const;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': any;
        }
    }
}

export default function ObjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const slug = id;
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

    const { data: object, isLoading } = useGetObject(slug);
    const { mutate: updateViews } = useUpdateViews();

    const [isCopied, setIsCopied] = useState(false);
    const [viewMode, setViewMode] = useState<"comparison" | "3d">("comparison");

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    useEffect(() => {
        if (!object?.documentId) return;

        const viewedKey = `viewed_${object.documentId}`;
        const hasViewed = sessionStorage.getItem(viewedKey);

        if (!hasViewed) {
            const newViews = (object.views || 0) + 1;

            updateViews({
                documentId: object.documentId,
                views: newViews
            });

            sessionStorage.setItem(viewedKey, "true");
        }
    }, [object?.documentId, object?.views, updateViews]);

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: object?.title || "Architectural Object",
                    text: `Check out this project: ${object?.title}`,
                    url: url,
                });
            } catch (error) {
                console.log("Share canceled or failed", error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (error) {
                console.error("Failed to copy", error);
            }
        }
    };

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

    const getAssetUrl = (url?: string) => {
        if (!url) return "";
        return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 pt-8 pb-24 min-h-screen">
                <div className="space-y-4 mb-8">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-12 w-3/4" />
                    <div className="flex gap-4">
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                </div>
                <Skeleton className="w-full aspect-[21/9] rounded-2xl mb-12" />
            </div>
        );
    }

    if (!object) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-muted-foreground mb-6">Object not found</p>
                <Link href="/objects">
                    <Button>Back to Catalogue</Button>
                </Link>
            </div>
        );
    }

    const description = getDescriptionText(object.description);
    const beforeImageUrl = getAssetUrl(object.beforeImage?.url) || "/placeholder.jpg";
    const afterImageUrl = getAssetUrl(object.afterImage?.url) || "/placeholder.jpg";
    const modelUrl = getAssetUrl(object.modelFile?.url);

    const coords = object.locationCoords as { lat?: number; lng?: number } | null;
    const mapEmbedUrl = coords?.lat && coords?.lng
        ? `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
        : "https://maps.google.com/maps?q=Kyiv,Ukraine&t=&z=5&ie=UTF8&iwloc=&output=embed";
    const locationString = coords?.lat ? `${coords.lat}, ${coords.lng}` : "Location not specified";

    return (
        <div className="min-h-screen bg-background pb-24">
            <div className="container mx-auto px-4 pt-8 pb-6">
                <Link
                    href="/objects"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to catalogue
                </Link>

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
                            className="rounded-full w-10 h-10 transition-all duration-300"
                            onClick={handleShare}
                        >
                            {isCopied ? (
                                <Check className="w-4 h-4 text-green-500" />
                            ) : (
                                <Share2 className="w-4 h-4" />
                            )}
                        </Button>

                        <div className="flex flex-col items-end px-2">
                            <div className="flex items-center gap-1.5">
                                <Eye className="w-5 h-5 text-muted-foreground" />
                                <span className="text-xl font-bold text-foreground">
                                    {object.views || 0}
                                </span>
                            </div>
                            <span className="text-xs text-muted-foreground">total views</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mb-12">
                {modelUrl && (
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center p-1 rounded-full bg-muted border">
                            <Button
                                variant={viewMode === "comparison" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("comparison")}
                                className="rounded-full gap-2 px-4"
                            >
                                <ImageIcon className="w-4 h-4" />
                                Comparison
                            </Button>
                            <Button
                                variant={viewMode === "3d" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("3d")}
                                className="rounded-full gap-2 px-4"
                            >
                                <Box className="w-4 h-4" />
                                3D Model
                            </Button>
                        </div>
                    </div>
                )}

                <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden border bg-muted/20 shadow-sm ring-1 ring-border/50">
                    {viewMode === "comparison" ? (
                        <>
                            <Comparison className="w-full h-full" mode="hover">
                                <ComparisonItem position="right">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={beforeImageUrl}
                                        alt="Before Restoration"
                                        className="w-full h-full object-cover object-center grayscale"
                                    />
                                </ComparisonItem>

                                <ComparisonItem position="left">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={afterImageUrl}
                                        alt="After Restoration"
                                        className="w-full h-full object-cover object-center"
                                    />
                                </ComparisonItem>

                                <ComparisonHandle />
                            </Comparison>

                            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                                <Badge variant="secondary" className="bg-black/60 text-white border-0 backdrop-blur-md">Before</Badge>
                            </div>
                            <div className="absolute top-4 right-4 z-20 pointer-events-none">
                                <Badge variant="secondary" className="bg-white/80 text-black border-0 backdrop-blur-md">After</Badge>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900">
                            <model-viewer
                                src={modelUrl}
                                poster={afterImageUrl}
                                shadow-intensity="1"
                                camera-controls
                                auto-rotate
                                touch-action="pan-y"
                                style={{ width: '100%', height: '100%' }}
                            >
                            </model-viewer>
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
                <div className="lg:col-span-2 space-y-8">
                    <div className="prose prose-zinc dark:prose-invert max-w-none whitespace-pre-line">
                        <h3 className="text-2xl font-semibold mb-4 text-foreground">About</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {object.tags?.map(tag => (
                                <Badge key={tag.name} variant="secondary" className="px-3 py-1.5 text-sm font-normal text-secondary-foreground">
                                    {tag.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-4">
                        <div className="rounded-xl overflow-hidden border bg-card shadow-sm h-[320px] relative group">
                            <iframe
                                src={mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.8)' }}
                                className="dark:invert dark:grayscale dark:contrast-125 transition-all duration-500 group-hover:filter-none"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                                <Button className="w-full shadow-lg pointer-events-auto cursor-pointer bg-background/90 text-foreground hover:bg-background backdrop-blur-sm border">
                                    <MapPin className="w-4 h-4 mr-2" /> Open in Google Maps
                                </Button>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border bg-muted/30 flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Location</span>
                            <span className="font-mono truncate max-w-[180px]" title={locationString}>{locationString}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="my-20 container mx-auto" />

            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">You may also like</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" disabled className="rounded-full">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {SIMILAR_OBJECTS.map((obj) => (
                        <ObjectCard
                            key={obj.documentId}
                            data={obj as any}
                            viewMode="grid"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}