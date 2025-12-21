"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FeatureCard } from "@/components/features/home/feature-card"; // Твоя картка
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {ObjectCard} from "@/components/features/objects/object-card";
import {ObjectEntity} from "@/types/objects";

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

// --- MOCK DATA (Тимчасові дані) ---
const MOCK_RESULTS: ObjectEntity[] = [
    { id: 1, title: "Lviv Opera House", description: "Complete restoration of the main facade sculptures and roof elements.", tags: ["Baroque", "Restoration"] },
    { id: 2, title: "Kyiv River Station", description: "Adaptive reuse of the modernist building into a food market and creative space.", tags: ["Modernism", "Adaptive Reuse"]},
    { id: 3, title: "Sharivka Palace", description: "Emergency conservation works to prevent the collapse of the neo-gothic towers.", tags: ["Neo-Gothic", "Conservation"]},
    { id: 4, title: "Chernivtsi University", description: "Restoration of the authentic mosaic tiles in the main hall.", tags: ["UNESCO", "Interior"] },
    { id: 5, title: "Odesa Fine Arts Museum", description: "Underground structural reinforcement and facade painting.", tags: ["Classicism", "Museum"] },
    { id: 6, title: "Potocki Palace", description: "Landscape design restoration and gate reconstruction.", tags: ["Palace", "Landscape"] },
    { id: 7, title: "Potocki Palace", description: "Landscape design restoration and gate reconstruction.", tags: ["Palace", "Landscape"] },
    { id: 8, title: "Potocki Palace", description: "Landscape design restoration and gate reconstruction.", tags: ["Palace", "Landscape"] },
    { id: 9, title: "Potocki Palace", description: "Landscape design restoration and gate reconstruction.", tags: ["Palace", "Landscape"] },
];

export default function ObjectsPage() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q") || "Architecture";
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isLoading, setIsLoading] = useState(true);

    // Емуляція завантаження даних
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Це "Filters Sidebar", який ми будемо використовувати і на мобілці, і на десктопі
    const FiltersContent = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-sm font-medium tracking-wide text-muted-foreground">TAGS</h3>
                <div className="flex flex-col gap-2">
                    {/* Тут будуть твої чекбокси або Shadcn ToggleGroup */}
                    {["React", "Next.js", "TypeScript", "Tailwind", "Architecture"].map((tag) => (
                        <Button key={tag} variant="ghost" className="justify-start h-8 px-2 text-sm font-normal">
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-medium tracking-wide text-muted-foreground">COUNTRY</h3>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ua">Ukraine</SelectItem>
                        <SelectItem value="pl">Poland</SelectItem>
                        <SelectItem value="us">USA</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">

            {/* HEADER: Title & Mobile Filter Trigger */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Results for "{searchQuery}"
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Showing 1-12 of 42 objects
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Mobile Filters (Sheet) - Видно тільки на мобільному */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="md:hidden gap-2">
                                <SlidersHorizontal className="h-4 w-4" /> Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader className="mb-4">
                                <SheetTitle>Filters</SheetTitle>
                            </SheetHeader>
                            <FiltersContent />
                        </SheetContent>
                    </Sheet>

                    {/* Sort Select */}
                    <Select defaultValue="newest">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest first</SelectItem>
                            <SelectItem value="popular">Most popular</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* View Toggle */}
                    <div className="hidden md:flex p-1 rounded-md">
                        <Button
                            variant={viewMode === "grid" ? "secondary" : "ghost"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "secondary" : "ghost"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">

                {/* LEFT SIDEBAR (Desktop Filters) - Сховано на моб, видно на десктопі */}
                <aside className="hidden md:block w-64 shrink-0 space-y-8">
                    {/* Пошук всередині результатів */}
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search tags..." className="pl-8" />
                    </div>
                    <FiltersContent />
                    <Button className={"w-full"} variant={"outline"} disabled={true}>Clear all</Button>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1">
                    {isLoading ? (
                        <ObjectsSkeleton viewMode={viewMode} />
                    ) : (
                        <div
                            className={cn(
                                "grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
                                // Логіка сітки:
                                viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // 3 колонки
                                    : "grid-cols-1" // 1 колонка (список)
                            )}
                        >
                            {MOCK_RESULTS.map((obj) => (
                                <ObjectCard
                                    key={obj.id}
                                    data={obj}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    )}

                    <div
                        className="flex justify-center self-start pt-6 w-full"
                        style={{
                            all: 'revert',
                            display: 'flex',
                            justifyContent: 'center',
                            alignSelf: 'flex-start',
                            paddingTop: '3.5rem',
                            width: '100%',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            letterSpacing: 'normal'
                        }}
                    >
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" onClick={(e) => e.preventDefault()}/>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" onClick={(e) => e.preventDefault()}/>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </main>
            </div>
        </div>
    );
}