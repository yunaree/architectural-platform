import React, { Suspense } from "react";
import HeroSection from "@/components/features/home/hero-section";
import { LatestObjectsSection } from "@/components/features/home/latest-objects-section";
import TeamSection from "@/components/features/home/team-section";
import { HomeStats } from "@/components/features/home/home-stats";
import { HomeProcess } from "@/components/features/home/home-process";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-background">
            <HeroSection />
            <div className="flex flex-col gap-24 md:gap-32 pb-24">
                <HomeStats />
                <Suspense fallback={<SectionSkeleton />}>
                    <LatestObjectsSection />
                </Suspense>
                <HomeProcess />
                <TeamSection />
            </div>
        </main>
    );
}

function SectionSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12 space-y-8">
            <Skeleton className="h-10 w-64 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-[300px] rounded-xl" />)}
            </div>
        </div>
    )
}