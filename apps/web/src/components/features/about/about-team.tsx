"use client";

import React from "react";
import Link from "next/link";
import { Github, ArrowUpRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutCreator() {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-background via-muted/50 to-background p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="space-y-4 max-w-lg">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium w-fit mx-auto md:mx-0">
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Engineering & Design</span>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight">
                            Developed by <span className="text-primary">yunaree</span>
                        </h2>

                        <p className="text-muted-foreground text-lg">
                            Passionate about building clean, performant, and accessible web interfaces. Check out my other projects and contributions on GitHub.
                        </p>
                    </div>

                    <div className="shrink-0 relative z-10">
                        <Link href="https://github.com/yunaree" target="_blank">
                            <Button size="lg" className="h-14 px-8 rounded-full text-base gap-3 shadow-xl hover:shadow-primary/20 transition-all duration-300">
                                <Github className="w-5 h-5" />
                                github.com/yunaree
                                <ArrowUpRight className="w-4 h-4 opacity-50" />
                            </Button>
                        </Link>
                    </div>

                    <Github className="absolute -right-12 -bottom-12 w-64 h-64 text-foreground/5 rotate-12 pointer-events-none" />
                </div>
            </div>
        </section>
    );
}