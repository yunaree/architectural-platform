"use client";

import React from "react";
import { Code2, Database, Layout, Server } from "lucide-react";

const STACK = [
    { name: "Next.js 15", desc: "App Router & SSR", icon: Code2 },
    { name: "TypeScript", desc: "Type Safety", icon: Layout },
    { name: "Tailwind CSS", desc: "Modern Styling", icon: Layout },
    { name: "Strapi CMS", desc: "Headless Backend", icon: Database },
    { name: "PostgreSQL", desc: "Reliable Data", icon: Server },
    { name: "Framer Motion", desc: "Animations", icon: Code2 },
];

export function AboutTechStack() {
    return (
        <section className="py-24 border-y bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Technology Stack</h2>
                    <p className="text-muted-foreground">Built with modern, scalable, and performant technologies.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {STACK.map((tech) => (
                        <div key={tech.name} className="flex flex-col items-center text-center p-4 rounded-xl bg-background border hover:border-primary/50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-3 text-primary">
                                <tech.icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-sm mb-1">{tech.name}</h3>
                            <p className="text-xs text-muted-foreground">{tech.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}