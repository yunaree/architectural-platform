"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ObjectCard } from "@/components/features/objects/object-card";
import { ObjectEntity } from "@/features/objects/types";

interface ObjectsGridProps {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    isFetching: boolean;
    objects: ObjectEntity[] | undefined;
    viewMode: "grid" | "list";
}

export function ObjectsGrid({
                                isLoading,
                                isError,
                                error,
                                isFetching,
                                objects,
                                viewMode
                            }: ObjectsGridProps) {

    if (isLoading) {
        return <ObjectsSkeleton viewMode={viewMode} />;
    }

    if (isError) {
        return (
            <div className="text-center py-10 text-red-500">
                Error loading objects: {(error as Error).message}
            </div>
        );
    }

    if (!objects || objects.length === 0) {
        return (
            <div className="col-span-full text-center py-10 text-muted-foreground">
                No objects found.
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
                viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1",
                isFetching ? "opacity-50 transition-opacity" : "opacity-100"
            )}
        >
            {objects.map((obj) => (
                <ObjectCard
                    key={obj.documentId}
                    data={obj}
                    viewMode={viewMode}
                />
            ))}
        </div>
    );
}

function ObjectsSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
    return (
        <div className={cn(
            "grid gap-6",
            viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
        )}>
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={cn("flex flex-col gap-3", viewMode === "list" && "flex-row h-40")}>
                    <Skeleton className={cn("rounded-xl", viewMode === "grid" ? "h-[250px] w-full" : "h-full w-[200px]")} />
                    <div className="space-y-2 flex-1 py-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}