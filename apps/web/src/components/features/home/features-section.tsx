"use client";

import React from "react";
import { FeatureCard } from "./feature-card";
import {TextRevealButton} from "@/components/ui/shadcn-io/text-reveal-button";
import {MagneticButton} from "@/components/ui/shadcn-io/magnetic-button";
import {Sparkles} from "lucide-react";

// MOCK DATA (Тестові дані, які пізніше замінимо на запит до Strapi)
const FEATURED_OBJECTS = [
    {
        id: 1,
        title: "/historical/lviv-opera",
        description: "Restoration of the Lviv National Opera facade to its original 19th-century glory.",
        gradient: "from-violet-500 via-purple-500 to-blue-500",
    },
    {
        id: 2,
        title: "/modern/kyiv-glass-tower",
        description: "A controversial addition of a glass structure to a brutalist foundation in Kyiv.",
        gradient: "from-emerald-400 via-cyan-500 to-blue-500",
    },
    {
        id: 3,
        title: "/industrial/kharkiv-factory",
        description: "Turning an abandoned Soviet factory into a vibrant creative art space.",
        gradient: "from-orange-500 via-amber-500 to-yellow-500",
    },
    {
        id: 4,
        title: "/baroque/st-george",
        description: "Subtle lighting improvements and stone cleaning of the St. George Cathedral.",
        gradient: "from-pink-500 via-rose-500 to-red-500",
    },
    {
        id: 5,
        title: "/urban/odesa-port",
        description: "Reimagining the sea terminal area with modern pedestrian zones.",
        gradient: "from-blue-600 via-indigo-500 to-violet-500",
    },
    {
        id: 6,
        title: "/residential/old-town",
        description: "Renovation of residential blocks maintaining the authentic Austrian style tiles.",
        gradient: "from-teal-500 via-green-500 to-emerald-500",
    },
];

export function FeaturesSection() {
    return (
        <section className="container mx-auto py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
                {FEATURED_OBJECTS.map((obj) => (
                    <FeatureCard
                        key={obj.id}
                        title={obj.title}
                        description={obj.description}
                        gradient={obj.gradient}
                    />
                ))}
            </div>
            <div className="w-full p-6 flex justify-center mt-15">
                <MagneticButton>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4"/>
                    Explore more!
                  </span>
                </MagneticButton>
            </div>
        </section>
);
}