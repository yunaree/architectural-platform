"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LayoutGrid, List, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { ObjectCard } from "@/components/features/objects/object-card";
import { useGetObjects } from "@/features/objects/api/use-get-objects";

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

const FiltersContent = () => (
    <div className="space-y-6">
        <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-wide text-muted-foreground">TAGS</h3>
            <div className="flex flex-col gap-2">
                {["Restoration", "Modernism", "Baroque", "UNESCO"].map((tag) => (
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

export default function ObjectsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const page = Number(searchParams.get("page")) || 1;
    const PAGE_SIZE = 9;
    const searchQuery = searchParams.get("q") || "";

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const { data: objects, isLoading, isError, error, isFetching } = useGetObjects(page, PAGE_SIZE);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    const isLastPage = objects && objects.length < PAGE_SIZE;

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {searchQuery ? `Results for "${searchQuery}"` : "All Objects"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isLoading ? "Loading..." : `Showing page ${page}`}
                    </p>
                </div>

                <div className="flex items-center gap-2">
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

                    <Select defaultValue="newest">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest first</SelectItem>
                            <SelectItem value="popular">Most popular</SelectItem>
                        </SelectContent>
                    </Select>

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
                <aside className="hidden md:block w-64 shrink-0 space-y-8">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search..." className="pl-8" />
                    </div>
                    <FiltersContent />
                    <Button className={"w-full"} variant={"outline"} disabled>Clear all</Button>
                </aside>

                <main className="flex-1">
                    {isLoading ? (
                        <ObjectsSkeleton viewMode={viewMode} />
                    ) : isError ? (
                        <div className="text-center py-10 text-red-500">
                            Error loading objects: {(error as Error).message}
                        </div>
                    ) : (
                        <>
                            <div
                                className={cn(
                                    "grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
                                    viewMode === "grid"
                                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                        : "grid-cols-1",
                                    isFetching ? "opacity-50 transition-opacity" : "opacity-100"
                                )}
                            >
                                {objects?.map((obj) => (
                                    <ObjectCard
                                        key={obj.documentId}
                                        data={obj}
                                        viewMode={viewMode}
                                    />
                                ))}

                                {objects?.length === 0 && (
                                    <div className="col-span-full text-center py-10 text-muted-foreground">
                                        No objects found.
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center pt-8 w-full">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (page > 1) handlePageChange(page - 1);
                                                }}
                                                className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>

                                        <PaginationItem>
                                            <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>

                                        <PaginationItem>
                                            <PaginationNext
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!isLastPage) handlePageChange(page + 1);
                                                }}
                                                className={isLastPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}