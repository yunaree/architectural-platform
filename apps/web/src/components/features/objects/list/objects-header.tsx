"use client";

import React from "react";
import { LayoutGrid, List, SlidersHorizontal, Search, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FiltersSidebar } from "@/components/features/objects/filters-sidebar";
import { Badge } from "@/components/ui/badge";

interface ObjectsHeaderProps {
    searchQuery: string;
    isLoading: boolean;
    page: number;
    sortParam: string;
    onSortChange: (value: string) => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    filterProps: {
        selectedTags: string[];
        selectedCountry: string | null;
        onTagToggle: (slug: string) => void;
        onCountryChange: (code: string) => void;
    }
}

export function ObjectsHeader({
                                  searchQuery,
                                  isLoading,
                                  sortParam,
                                  onSortChange,
                                  viewMode,
                                  setViewMode,
                                  filterProps
                              }: ObjectsHeaderProps) {
    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-end justify-between">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <Archive className="w-4 h-4" />
                    <span>Archive / Database</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {searchQuery ? (
                        <span className="flex items-center gap-2">
                            Search results: <span className="text-muted-foreground">"{searchQuery}"</span>
                        </span>
                    ) : (
                        "Restoration Catalogue"
                    )}
                </h1>
                <p className="text-muted-foreground max-w-lg">
                    Browse the complete collection of documented architectural heritage and restoration projects.
                </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-end">
                {/* Mobile Filters */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden gap-2">
                            <SlidersHorizontal className="h-4 w-4" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader className="mb-6 border-b pb-4">
                            <SheetTitle className="flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4" /> Filters
                            </SheetTitle>
                        </SheetHeader>
                        <FiltersSidebar {...filterProps} />
                    </SheetContent>
                </Sheet>

                {/* Sort Control */}
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm p-1 rounded-lg border">
                    <Select value={sortParam} onValueChange={onSortChange}>
                        <SelectTrigger className="w-[160px] border-0 bg-transparent focus:ring-0 h-8">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="newest">Newest Added</SelectItem>
                            <SelectItem value="popular">Most Viewed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* View Mode */}
                <div className="hidden md:flex items-center bg-background/50 backdrop-blur-sm p-1 rounded-lg border">
                    <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-8 w-8 rounded-md"
                        onClick={() => setViewMode("grid")}
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-8 w-8 rounded-md"
                        onClick={() => setViewMode("list")}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}