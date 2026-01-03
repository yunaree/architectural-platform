"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetObjects } from "@/features/objects/api/use-get-objects";
import { FiltersSidebar } from "@/components/features/objects/filters-sidebar";
import { ObjectsHeader } from "@/components/features/objects/list/objects-header";
import { ObjectsGrid } from "@/components/features/objects/list/objects-grid";
import { ObjectsPagination } from "@/components/features/objects/list/objects-pagination";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ObjectsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <ObjectsPageContent />
        </Suspense>
    );
}

function ObjectsPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = Number(searchParams.get("page")) || 1;
    const PAGE_SIZE = 9;
    const searchQuery = searchParams.get("q") || "";
    const selectedTags = searchParams.get("tags") ? searchParams.get("tags")!.split(",") : [];
    const selectedCountry = searchParams.get("country");
    const sortParam = searchParams.get("sort") || "newest";

    const sortQuery = sortParam === "popular" ? ["views:desc"] : ["publishedAt:desc"];
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const { data: objects, isLoading, isError, error, isFetching } = useGetObjects(
        page,
        PAGE_SIZE,
        searchQuery,
        selectedTags,
        selectedCountry,
        sortQuery
    );

    // --- Params Logic ---
    const updateParams = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === "") params.delete(key);
            else params.set(key, value);
        });
        if (newParams.tags !== undefined || newParams.country !== undefined) params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    const handleTagToggle = (slug: string) => {
        const newTags = selectedTags.includes(slug)
            ? selectedTags.filter(t => t !== slug)
            : [...selectedTags, slug];
        updateParams({ tags: newTags.length > 0 ? newTags.join(",") : null });
    };

    const handleCountryChange = (code: string) => updateParams({ country: code || null });
    const handleSortChange = (value: string) => updateParams({ sort: value });
    const handlePageChange = (newPage: number) => updateParams({ page: newPage.toString() });
    const handleClearAll = () => router.push("/objects");
    const isLastPage = objects ? objects.length < PAGE_SIZE : true;

    return (
        <div className="min-h-screen bg-background relative">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section with Border */}
                <div className="py-8 border-b border-border/50">
                    <ObjectsHeader
                        searchQuery={searchQuery}
                        isLoading={isLoading}
                        page={page}
                        sortParam={sortParam}
                        onSortChange={handleSortChange}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        filterProps={{
                            selectedTags,
                            selectedCountry,
                            onTagToggle: handleTagToggle,
                            onCountryChange: handleCountryChange
                        }}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-8 py-8 items-start">
                    {/* Sticky Sidebar */}
                    <aside className="hidden md:block w-64 shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-none">
                        <div className="space-y-8 pb-10">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                    Config / Filters
                                </span>
                                {(selectedTags.length > 0 || selectedCountry) && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearAll}
                                        className="h-6 text-xs text-muted-foreground hover:text-foreground px-2"
                                    >
                                        Reset <X className="ml-1 w-3 h-3" />
                                    </Button>
                                )}
                            </div>

                            <FiltersSidebar
                                selectedTags={selectedTags}
                                selectedCountry={selectedCountry}
                                onTagToggle={handleTagToggle}
                                onCountryChange={handleCountryChange}
                            />
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0">
                        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                            <div className="h-2 w-2 rounded-full bg-green-500/50 animate-pulse" />
                            <span>System: Online</span>
                            <span className="text-border">|</span>
                            <span>Loaded: {objects?.length || 0} items</span>
                        </div>

                        <ObjectsGrid
                            isLoading={isLoading}
                            isError={isError}
                            error={error}
                            isFetching={isFetching}
                            objects={objects}
                            viewMode={viewMode}
                        />

                        {objects && objects.length > 0 && (
                            <div className="mt-12 border-t border-border/50 pt-8">
                                <ObjectsPagination
                                    page={page}
                                    isLastPage={isLastPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}