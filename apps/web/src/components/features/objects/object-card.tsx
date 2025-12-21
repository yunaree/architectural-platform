"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import type { ObjectEntity } from "@/types/objects";

interface ObjectCardProps {
    data: ObjectEntity;
    viewMode: "grid" | "list";
}

export function ObjectCard({ data, viewMode }: ObjectCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border bg-card text-card-foreground",
                // 1. БАЗОВА АНІМАЦІЯ КАРТКИ (підняття + тінь + колір рамки)
                "transition-all duration-300 ease-in-out",
                "hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 dark:hover:shadow-primary/10",

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
                        ? "w-full sm:w-64 h-48 sm:h-40 rounded-lg"
                        : "w-full aspect-[4/3]"
                )}
            >
                {/* АНІМАЦІЯ КАРТИНКИ: scale-110 при ховері */}
                {/* Тут ми емулюємо картинку через div, але якщо буде <Image>, дай йому цей клас */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-4xl select-none bg-secondary/50 transition-transform duration-500 group-hover:scale-110">
                    IM
                </div>

                {/* Оверлей при ховері (затемнення) */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                {/*<div className="absolute top-2 right-2 z-10">*/}
                {/*    <Badge variant="secondary" className="backdrop-blur-md bg-background/80 shadow-sm">*/}
                {/*        {data.status}*/}
                {/*    </Badge>*/}
                {/*</div>*/}

                {/* Іконка "ока", яка з'являється тільки в Grid при ховері (опціонально) */}
                {/*{viewMode === "grid" && (*/}
                {/*    <Eye className="absolute top-2 right-2 z-10 w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />*/}
                {/*)}*/}
            </div>

            {/* 2. БЛОК КОНТЕНТУ */}
            <div className={cn("flex flex-col flex-1 gap-2", viewMode === "grid" && "p-4")}>
                <div className="flex items-start justify-between gap-2">
                    {/* Заголовок стає кольоровим при ховері */}
                    <h3 className="font-bold text-lg leading-tight transition-colors duration-300 group-hover:text-primary">
                        {data.title}
                    </h3>


                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                    {data.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {data.tags.map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md border border-transparent transition-colors group-hover:border-border">
                #{tag}
            </span>
                    ))}
                </div>

                {/* Кнопка в List mode */}
                {viewMode === "list" && (
                    <div className="mt-4 sm:mt-0 sm:ml-auto self-end sm:self-center">
                        <Button variant="ghost" size="sm" className="gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Details <ArrowRight className="w-4 h-4"/>
                        </Button>
                    </div>
                )}
            </div>

            <Link href={`/objects/${data.id}`} className="absolute inset-0 z-20" />
        </div>
    );
}