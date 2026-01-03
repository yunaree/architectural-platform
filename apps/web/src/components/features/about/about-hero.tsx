"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function AboutHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden border-b bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-xs font-medium uppercase tracking-widest border-primary/20 bg-primary/5 text-primary">
                        Mission
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
                        Digitizing Architectural <br />
                        <span className="text-muted-foreground">Heritage</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We build open-source tools to document, analyze, and visualize the restoration of historical landmarks. Bridging the gap between history and modern technology.
                    </p>
                </motion.div>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        </section>
    );
}