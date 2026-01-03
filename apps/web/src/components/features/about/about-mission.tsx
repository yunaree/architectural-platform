"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, ScanEye, Database, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function AboutMission() {
    return (
        <section className="container mx-auto px-4 py-24">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={container}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
            >
                <motion.div variants={item} className="md:col-span-2 p-8 rounded-3xl border bg-card relative overflow-hidden group">
                    <div className="relative z-10 max-w-lg">
                        <History className="w-10 h-10 mb-6 text-primary" />
                        <h3 className="text-2xl font-bold mb-3">Historical Context</h3>
                        <p className="text-muted-foreground text-lg">
                            Architecture is a living record of our history. Our platform provides a detailed comparison of objects before and after restoration, highlighting the effort put into preserving cultural identity.
                        </p>
                    </div>
                    <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
                </motion.div>

                <motion.div variants={item} className="p-8 rounded-3xl border bg-card flex flex-col justify-between group">
                    <ScanEye className="w-10 h-10 mb-6 text-primary" />
                    <div>
                        <h3 className="text-xl font-bold mb-2">3D Visualization</h3>
                        <p className="text-muted-foreground">
                            Interactive 3D models allow users to explore every detail of the restoration process from any angle.
                        </p>
                    </div>
                </motion.div>

                <motion.div variants={item} className="p-8 rounded-3xl border bg-card flex flex-col justify-between group">
                    <Database className="w-10 h-10 mb-6 text-primary" />
                    <div>
                        <h3 className="text-xl font-bold mb-2">Open Data</h3>
                        <p className="text-muted-foreground">
                            A structured database of architectural objects available for researchers, students, and historians.
                        </p>
                    </div>
                </motion.div>

                <motion.div variants={item} className="md:col-span-2 p-8 rounded-3xl border bg-primary text-primary-foreground relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Community Driven</h3>
                        <p className="opacity-90">
                            This project is open source. Contribute code, data, or suggestions to help us improve.
                        </p>
                    </div>
                    <Button variant="secondary" size="lg" className="gap-2 shrink-0">
                        <Github className="w-4 h-4" /> GitHub Repository
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}