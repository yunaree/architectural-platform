"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Share2, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ObjectCard } from "@/components/features/objects/object-card";
// 1. ОНОВЛЕНИЙ ІМПОРТ (імпортуємо всі частини компонента)
import {
    Comparison,
    ComparisonItem,
    ComparisonHandle
} from "@/components/ui/shadcn-io/comparison";

// --- MOCK DATA ---
const OBJECT_DATA = {
    id: 1,
    title: "Lviv Opera House Restoration",
    rating: 4.8,
    votes: 4332,
    description: "A comprehensive restoration of the Lviv National Opera facade. The project involved cleaning the sculptures, reinforcing the cornices, and restoring the original color palette of the 19th-century masterpiece. The work was carried out using authentic materials and techniques to preserve the historical integrity of the building. This iconic landmark now shines with renewed brilliance, attracting tourists from all over the world.",
    // Фото для слайдера
    beforeImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop&sat=-100", // Чорно-біле (Old)
    afterImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop", // Кольорове (New)
    tags: ["Baroque", "Facade", "UNESCO"],
    location: "Svobody Ave, 28, Lviv, Ukraine",
    year: "2024",
    country: "Ukraine",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.076587637877!2d24.0261094768396!3d49.841952331046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add717532d527%3A0x8c7c9c0c305380d1!2sLviv%20National%20Opera!5e0!3m2!1sen!2sua!4v1710000000000!5m2!1sen!2sua"
};

const SIMILAR_OBJECTS = [
    { id: 2, title: "Kyiv River Station", description: "Adaptive reuse of the modernist building.", tags: ["Modernism"], status: "in-progress" },
    { id: 3, title: "Potocki Palace", description: "Landscape design restoration.", tags: ["Palace"], status: "completed" },
    { id: 4, title: "Chernivtsi University", description: "Restoration of authentic mosaic.", tags: ["UNESCO"], status: "completed" },
    { id: 5, title: "Odesa Fine Arts", description: "Underground structural reinforcement.", tags: ["Museum"], status: "in-progress" },
] as const;

export default function ObjectDetailsPage({ params }: { params: { id: string } }) {

    return (
        <div className="min-h-screen bg-background pb-24">

            {/* 1. HEADER & META INFO */}
            <div className="container mx-auto px-4 pt-8 pb-6">
                <Link
                    href="/objects"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to catalogue
                </Link>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{OBJECT_DATA.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/40 border border-border/50">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                <span className="font-medium text-foreground">{OBJECT_DATA.location}</span>
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/40 border border-border/50">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{OBJECT_DATA.year}</span>
                            </span>
                        </div>
                    </div>

                    {/* Rating Box */}
                    <div className="flex items-center gap-3 self-start">
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                            <Share2 className="w-4 h-4" />
                        </Button>

                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1.5">
                                <span className="text-2xl font-bold text-primary">{OBJECT_DATA.rating}</span>
                                <Star className="w-5 h-5 fill-primary text-primary" />
                            </div>
                            <span className="text-xs text-muted-foreground font-medium">{OBJECT_DATA.votes} votes</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. COMPARISON SLIDER (The Hero Element) */}
            <div className="container mx-auto px-4 mb-12">
                <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden border bg-muted/20 shadow-sm ring-1 ring-border/50">

                    {/* ОНОВЛЕНО: Використання Compound Component Pattern */}
                    <Comparison className="w-full h-full" mode="hover">
                        {/* Права частина слайдера (те, що видно ліворуч від повзунка, зазвичай "До" або "Після" залежно від логіки) */}
                        <ComparisonItem position="right">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={OBJECT_DATA.beforeImage}
                                alt="Before"
                                className="w-full h-full object-cover object-center"
                            />
                        </ComparisonItem>

                        {/* Ліва частина слайдера (те, що видно праворуч від повзунка) */}
                        <ComparisonItem position="left">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={OBJECT_DATA.afterImage}
                                alt="After"
                                className="w-full h-full object-cover object-center"
                            />
                        </ComparisonItem>

                        {/* Повзунок */}
                        <ComparisonHandle />
                    </Comparison>

                    {/* Лейбли поверх слайдера */}
                    <div className="absolute top-4 left-4 z-20 pointer-events-none">
                        <Badge variant="secondary" className="bg-black/60 text-white border-0 backdrop-blur-md">1900 (Before)</Badge>
                    </div>
                    <div className="absolute top-4 right-4 z-20 pointer-events-none">
                        <Badge variant="secondary" className="bg-white/80 text-black border-0 backdrop-blur-md">2024 (After)</Badge>
                    </div>
                </div>
            </div>

            {/* 3. DETAILS GRID (Description + Map) */}
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">

                {/* LEFT: Text Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <h3 className="text-2xl font-semibold mb-4 text-foreground">About the Project</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {OBJECT_DATA.description}
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                            The restoration process utilized advanced 3D scanning technology to map every crack and imperfection.
                            Local artisans were employed to recreate the missing limestone ornaments using traditional methods.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="px-3 py-1.5 text-sm font-normal">{OBJECT_DATA.country}</Badge>
                            {OBJECT_DATA.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-normal text-secondary-foreground">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Map Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-4">
                        <div className="rounded-xl overflow-hidden border bg-card shadow-sm h-[320px] relative group">
                            {/* Dark Mode Map Filter */}
                            <iframe
                                src={OBJECT_DATA.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.8)' }}
                                className="dark:invert dark:grayscale dark:contrast-125 transition-all duration-500 group-hover:filter-none"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                                <Button className="w-full shadow-lg pointer-events-auto bg-background/90 text-foreground hover:bg-background backdrop-blur-sm border">
                                    <MapPin className="w-4 h-4 mr-2" /> Open in Google Maps
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats Block (Optional) */}
                        <div className="p-4 rounded-xl border bg-muted/30 flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Coordinates</span>
                            <span className="font-mono">49.8419° N, 24.0261° E</span>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="my-20 container mx-auto" />

            {/* 4. YOU MAY ALSO LIKE */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">You may also like</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" disabled className="rounded-full">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {SIMILAR_OBJECTS.map((obj) => (
                        <ObjectCard
                            key={obj.id}
                            data={obj as any}
                            viewMode="grid"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}