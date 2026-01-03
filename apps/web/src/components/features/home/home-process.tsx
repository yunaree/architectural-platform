"use client";

import React from "react";
import { ScanFace, Layers, Archive } from "lucide-react";

const STEPS = [
    {
        icon: ScanFace,
        title: "Scan & Digitize",
        desc: "Using photogrammetry and LIDAR to create precise 3D replicas of architectural landmarks."
    },
    {
        icon: Layers,
        title: "Analyze & Compare",
        desc: "Visualizing the restoration process by comparing historical states with modern renovations."
    },
    {
        icon: Archive,
        title: "Archive History",
        desc: "Preserving cultural heritage in a secure, accessible digital database for future generations."
    }
];

export function HomeProcess() {
    return (
        <section className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-4">How it works</h2>
                <p className="text-muted-foreground text-lg">
                    We bridge the gap between physical heritage and digital preservation through a three-step process.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {STEPS.map((step, i) => (
                    <div key={i} className="group p-8 rounded-2xl bg-background border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <step.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {step.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}