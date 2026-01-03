"use client";

import React from "react";
import { AboutHero } from "@/components/features/about/about-hero";
import { AboutMission } from "@/components/features/about/about-mission";
import { AboutTechStack } from "@/components/features/about/about-tech-stack";
import { AboutCreator } from "@/components/features/about/about-team";
import { AboutCTA } from "@/components/features/about/about-cta";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <AboutHero />
            <AboutMission />
            <AboutTechStack />
            <AboutCreator />
            <AboutCTA />
        </div>
    );
}