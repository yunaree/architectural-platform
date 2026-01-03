"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/shadcn-io/magnetic-button";
import { ObjectCard } from "@/components/features/objects/object-card";
import { useGetObjects } from "@/features/objects/api/use-get-objects";
import { Skeleton } from "@/components/ui/skeleton";

export function LatestObjectsSection() {
    const { data: objects, isLoading } = useGetObjects(1, 3, "", [], null, ["publishedAt:desc"]);

    return (
        <section className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Latest Restorations
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Discover the most recent architectural projects added to our archive.
                    </p>
                </div>
                <Link href="/objects">
                    <Button variant="ghost" className="group">
                        View all projects
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-[250px] w-full rounded-xl" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))
                ) : (
                    objects?.map((obj) => (
                        <ObjectCard key={obj.documentId} data={obj} viewMode="grid" />
                    ))
                )}
            </div>

            <div className="mt-16 flex justify-center">
                <Link href="/objects">
                    <MagneticButton>
                        <span className="flex items-center gap-2 px-6 py-2">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            Explore full catalogue
                        </span>
                    </MagneticButton>
                </Link>
            </div>
        </section>
    );
}