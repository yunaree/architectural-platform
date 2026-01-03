"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Tag, Globe, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFilters } from "@/features/objects/api/use-get-filters";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FiltersSidebarProps {
    selectedTags: string[];
    selectedCountry: string | null;
    onTagToggle: (slug: string) => void;
    onCountryChange: (code: string) => void;
}

export function FiltersSidebar({
                                   selectedTags,
                                   selectedCountry,
                                   onTagToggle,
                                   onCountryChange,
                               }: FiltersSidebarProps) {
    const { data, isLoading } = useGetFilters();
    const [tagSearch, setTagSearch] = useState("");

    const displayedTags = useMemo(() => {
        if (!data?.tags) return [];
        let filtered = data.tags;

        if (tagSearch.trim()) {
            filtered = data.tags.filter((tag: any) =>
                tag.name.toLowerCase().includes(tagSearch.toLowerCase())
            );
        }

        return filtered;
    }, [data?.tags, tagSearch]);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Globe className="w-4 h-4 text-primary" />
                    <span>Location</span>
                </div>
                <Select
                    value={selectedCountry || "all"}
                    onValueChange={(val) => onCountryChange(val === "all" ? "" : val)}
                >
                    <SelectTrigger className="w-full bg-background/50">
                        <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Global (All)</SelectItem>
                        {data?.countries.map((country: any) => (
                            <SelectItem key={country.documentId} value={country.code}>
                                {country.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Tag className="w-4 h-4 text-primary" />
                        <span>Filter by Tags</span>
                    </div>
                    {selectedTags.length > 0 && (
                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                            {selectedTags.length} active
                        </Badge>
                    )}
                </div>

                <div className="relative">
                    <Input
                        placeholder="Search tags..."
                        value={tagSearch}
                        onChange={(e) => setTagSearch(e.target.value)}
                        className="pl-8 bg-background/50 h-9 text-sm"
                    />
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground opacity-50" />
                    {tagSearch && (
                        <button
                            onClick={() => setTagSearch("")}
                            className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    {displayedTags.length > 0 ? (
                        displayedTags.map((tag: any) => {
                            const isSelected = selectedTags.includes(tag.slug);
                            return (
                                <button
                                    key={tag.documentId}
                                    onClick={() => onTagToggle(tag.slug)}
                                    className={cn(
                                        "flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md transition-all group",
                                        isSelected
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <span className="truncate">{tag.name}</span>
                                    {isSelected && (
                                        <Check className="w-3.5 h-3.5 shrink-0" />
                                    )}
                                </button>
                            );
                        })
                    ) : (
                        <div className="text-xs text-muted-foreground py-2 text-center border border-dashed rounded-md">
                            No tags found
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground leading-relaxed">
                <p>
                    Use tags to combine filters. <br />
                    Example: Select <span className="text-foreground font-mono">Modernism</span> and <span className="text-foreground font-mono">Museum</span> to find specific adaptations.
                </p>
            </div>
        </div>
    );
}