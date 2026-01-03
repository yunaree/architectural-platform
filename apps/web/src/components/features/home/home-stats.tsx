"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cuboid, Map, History, Box } from "lucide-react";

const STATS = [
    {
        label: "Restored Objects",
        value: 120,
        suffix: "+",
        icon: Cuboid,
        desc: "Preserved for future"
    },
    {
        label: "Historical Eras",
        value: 8,
        suffix: "",
        icon: History,
        desc: "Centuries of heritage"
    },
    {
        label: "3D Models",
        value: 45,
        suffix: "",
        icon: Box,
        desc: "High-poly scans"
    },
    {
        label: "Cities Mapped",
        value: 12,
        suffix: "",
        icon: Map,
        desc: "Across the country"
    },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${Math.floor(latest)}${suffix}`;
            }
        });
    }, [springValue, suffix]);

    return <span ref={ref} className="tabular-nums" />;
}

export function HomeStats() {
    return (
        <section className="container mx-auto px-4 mt-15 container">
            <div className="relative overflow-hidden rounded-3xl border bg-background/50 backdrop-blur-md shadow-sm">

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                     style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />

                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
                    {STATS.map((stat, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group relative flex flex-col items-center justify-center py-12 px-4 transition-colors hover:bg-muted/20",

                                index !== STATS.length - 1 && "lg:border-r border-border/50",
                                index < 2 && "md:max-lg:border-b border-border/50",
                                index < 3 && "max-md:border-b border-border/50"
                            )}
                        >
                            <div className="mb-4 p-3 rounded-2xl bg-secondary/50 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner">
                                <stat.icon className="w-6 h-6" />
                            </div>

                            <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>

                            <div className="text-center space-y-1">
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                                    {stat.label}
                                </h3>
                                <p className="text-xs text-muted-foreground font-medium">
                                    {stat.desc}
                                </p>
                            </div>

                            {index !== STATS.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-8 bottom-8 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}