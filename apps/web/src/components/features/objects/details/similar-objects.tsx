"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ObjectCard } from "@/components/features/objects/object-card";
import { useGetSimilarObjects } from "@/features/objects/api/use-get-similar-objects";
import { ObjectEntity } from "@/features/objects/types";

export function SimilarObjects({ currentObject }: { currentObject: ObjectEntity }) {
    const { data: similarObjects, isLoading } = useGetSimilarObjects(currentObject);

    if (!isLoading && (!similarObjects || similarObjects.length === 0)) return null;

    return (
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">You may also like</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <Skeleton className="rounded-xl h-[250px] w-full" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    ))
                    : similarObjects?.map((obj) => (
                        <ObjectCard key={obj.documentId} data={obj} viewMode="grid" />
                    ))
                }
            </div>
        </div>
    );
}