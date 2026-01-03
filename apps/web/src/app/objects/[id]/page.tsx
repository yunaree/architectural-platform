"use client";

import React, { use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { useGetObject } from "@/features/objects/api/use-get-object";
import { useUpdateViews } from "@/features/objects/api/use-object-interactions";

import { ObjectHeader } from "@/components/features/objects/details/object-header";
import { ObjectVisualizer } from "@/components/features/objects/details/object-visualizer";
import { ObjectInfo } from "@/components/features/objects/details/object-info";
import { SimilarObjects } from "@/components/features/objects/details/similar-objects";

export default function ObjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const slug = id;
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

    const { data: object, isLoading } = useGetObject(slug);
    const { mutate: updateViews } = useUpdateViews();

    useEffect(() => {
        if (!object?.documentId) return;
        const viewedKey = `viewed_${object.documentId}`;
        if (!sessionStorage.getItem(viewedKey)) {
            updateViews({ documentId: object.documentId, views: (object.views || 0) + 1 });
            sessionStorage.setItem(viewedKey, "true");
        }
    }, [object?.documentId, object?.views, updateViews]);

    const getAssetUrl = (url?: string) =>
        url ? (url.startsWith("http") ? url : `${STRAPI_URL}${url}`) : "";

    if (isLoading) return <DetailsSkeleton />;
    if (!object) return <NotFoundState />;

    const beforeImage = getAssetUrl(object.beforeImage?.url) || "/placeholder.jpg";
    const afterImage = getAssetUrl(object.afterImage?.url) || "/placeholder.jpg";
    const modelUrl = getAssetUrl(object.modelFile?.url);

    return (
        <div className="min-h-screen bg-background pb-24 animate-in fade-in duration-500">
            <div className="container mx-auto px-4 pt-8 pb-6">
                <Link
                    href="/objects"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to catalogue
                </Link>

                <ObjectHeader object={object} />
            </div>

            <div className="container mx-auto px-4">
                <ObjectVisualizer
                    beforeImage={beforeImage}
                    afterImage={afterImage}
                    modelUrl={modelUrl || undefined}
                />
            </div>

            <div className="container mx-auto px-4">
                <ObjectInfo object={object} />
            </div>

            <Separator className="my-20 container mx-auto opacity-50" />

            <SimilarObjects currentObject={object} />
        </div>
    );
}

function DetailsSkeleton() {
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
            <div className="grid grid-cols-3 gap-12">
                <div className="col-span-2 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
        </div>
    );
}

function NotFoundState() {
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