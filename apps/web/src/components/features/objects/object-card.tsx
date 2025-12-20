"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {ObjectEntity} from "@/types/objects";

interface ObjectCardProps {
    data: ObjectEntity;
    viewMode: "grid" | "list";
}

export function ObjectCard({ data, viewMode }: ObjectCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
                // Стилі для Grid vs List
                viewMode === "list"
                    ? "flex flex-col sm:flex-row gap-4 p-4"
                    : "flex flex-col"
            )}
        >
            {/* 1. БЛОК ЗОБРАЖЕННЯ */}
            <div
                className={cn(
                    "relative overflow-hidden bg-muted shrink-0",
                    viewMode === "list"
                        ? "w-full sm:w-64 h-48 sm:h-40 rounded-lg" // Фіксований розмір у списку
                        : "w-full aspect-[4/3]" // Пропорція 4:3 у сітці
                )}
            >
                {/* Заглушка для картинки (заміни на <Image src={data.imageUrl} ... />) */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-4xl select-none bg-secondary/50">
                    IM
                </div>

                {/*/!* Бейдж статусу поверх картинки *!/*/}
                {/*<div className="absolute top-2 right-2">*/}
                {/*    <Badge variant="secondary" className="backdrop-blur-md bg-background/80">*/}
                {/*        {data.status}*/}
                {/*    </Badge>*/}
                {/*</div>*/}
            </div>

            {/* 2. БЛОК КОНТЕНТУ */}
            <div className={cn("flex flex-col flex-1 gap-2", viewMode === "grid" && "p-4")}>
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        {data.title}
                    </h3>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                    {data.description}
                </p>

                {/* Теги */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {data.tags.map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                #{tag}
            </span>
                    ))}
                </div>

                {/* Кнопка (тільки для ліст-в'ю на десктопі або в гріді внизу) */}
                {viewMode === "list" && (
                    <div className="mt-4 sm:mt-0 sm:ml-auto self-end sm:self-center">
                        <Button variant="ghost" size="sm" className="gap-1">
                            Details <ArrowRight className="w-4 h-4"/>
                        </Button>
                    </div>
                )}
            </div>

            {/* Клікабельне посилання на всю картку */}
            <Link href={`/objects/${data.id}`} className="absolute inset-0 z-10" />
        </div>
    );
}