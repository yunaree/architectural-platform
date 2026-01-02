"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ObjectEntity } from "@/features/objects/types";

interface ObjectCardProps {
    data: ObjectEntity;
    viewMode: "grid" | "list";
}

export function ObjectCard({ data, viewMode }: ObjectCardProps) {
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

    const getDescriptionText = (description: any) => {
        if (!description) return "";
        if (typeof description === "string") return description;
        if (Array.isArray(description)) {
            return description
                .map((block: any) => {
                    if (block.children && Array.isArray(block.children)) {
                        return block.children
                            .map((child: any) => child.text)
                            .join("");
                    }
                    return "";
                })
                .join(" ");
        }
        return "";
    };

    const descriptionText = getDescriptionText(data.description);

    const imageObj = data.afterImage || data.beforeImage;
    const rawUrl = imageObj?.url;

    const imageUrl = rawUrl
        ? rawUrl.startsWith("http")
            ? rawUrl
            : `${STRAPI_URL}${rawUrl}`
        : null;

    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border bg-card text-card-foreground",
                "transition-all duration-300 ease-in-out",
                "hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 dark:hover:shadow-primary/10",
                viewMode === "list"
                    ? "flex flex-col sm:flex-row gap-4 p-4"
                    : "flex flex-col"
            )}
        >
            <div
                className={cn(
                    "relative overflow-hidden bg-muted shrink-0",
                    viewMode === "list"
                        ? "w-full sm:w-64 h-48 sm:h-40 rounded-lg"
                        : "w-full aspect-[4/3]"
                )}
            >
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={data.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                    />
                ) : (
                    <>
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-4xl select-none bg-secondary/50 transition-transform duration-500 group-hover:scale-110">
                            IM
                        </div>
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                    </>
                )}

                {imageUrl && (
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                )}
            </div>

            <div className={cn("flex flex-col flex-1 gap-2", viewMode === "grid" && "p-4")}>
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg leading-tight transition-colors duration-300 group-hover:text-primary">
                        {data.title}
                    </h3>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                    {descriptionText}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {data.tags.map((tag) => (
                        <span key={tag.documentId} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md border border-transparent transition-colors group-hover:border-border">
                            #{tag.name}
                        </span>
                    ))}
                </div>

                {viewMode === "list" && (
                    <div className="mt-4 sm:mt-0 sm:ml-auto self-end sm:self-center">
                        <Button variant="ghost" size="sm" className="gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Details <ArrowRight className="w-4 h-4"/>
                        </Button>
                    </div>
                )}
            </div>

            <Link href={`/objects/${data.slug}`} className="absolute inset-0 z-20" />
        </div>
    );
}