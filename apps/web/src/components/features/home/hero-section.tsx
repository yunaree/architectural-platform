"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, ScanLine, Database, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] w-full bg-background flex flex-col justify-center border-b overflow-hidden">
            <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10">
                <div className="w-px h-full bg-foreground/50"></div>
                <div className="w-px h-full bg-foreground/50 hidden md:block"></div>
                <div className="w-px h-full bg-foreground/50 hidden lg:block"></div>
                <div className="w-px h-full bg-foreground/50"></div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-20">

                <div className="flex flex-col items-start text-left space-y-8">

                    <div className="inline-flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        SYSTEM ONLINE v1.0
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
                        Restoring <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient bg-300%">
                            The Past
                        </span> <br />
                        For The Future.
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-xl leading-relaxed border-l-2 border-primary/20 pl-6">
                        An open-source digital archive dedicated to documenting, analyzing, and visualizing the restoration of architectural heritage.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/objects">
                            <Button size="lg" className="h-14 px-8 rounded-none border border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                                Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outline" size="lg" className="h-14 px-8 rounded-none border-2 hover:bg-muted/50">
                                Documentation
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="relative hidden lg:flex items-center justify-center h-full min-h-[400px]">
                    <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>


                    <div className="relative w-80 h-96">
                        <div className="absolute inset-0 bg-muted border border-border/50 rotate-6 rounded-xl scale-90 opacity-40 translate-x-8"></div>
                        <div className="absolute inset-0 bg-card border border-border rotate-3 rounded-xl scale-95 opacity-70 translate-x-4 shadow-lg"></div>
                        <div className="absolute inset-0 bg-background border-2 border-primary/20 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                            <div className="h-10 border-b bg-muted/30 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                            </div>

                            <div className="flex-1 p-6 relative">
                                <div className="space-y-4 opacity-50">
                                    <div className="h-4 w-3/4 bg-muted rounded"></div>
                                    <div className="h-4 w-1/2 bg-muted rounded"></div>
                                    <div className="h-32 w-full bg-muted/50 rounded border border-dashed border-border"></div>
                                    <div className="h-4 w-full bg-muted rounded"></div>
                                </div>

                                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.5)] animate-[scan_3s_ease-in-out_infinite]"></div>

                                <div className="absolute bottom-6 right-6">
                                    <Badge variant="outline" className="animate-pulse bg-background/80 backdrop-blur">
                                        Processing...
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 w-full border-t bg-muted/20 py-3 overflow-hidden">
                <div className="flex items-center gap-12 whitespace-nowrap animate-marquee text-xs font-mono text-muted-foreground uppercase tracking-widest opacity-70">
                    <span className="flex items-center gap-2"><Database className="w-3 h-3" /> 124 Objects Archived</span>
                    <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Kyiv Region</span>
                    <span className="flex items-center gap-2"><Layers className="w-3 h-3" /> 3D Scans Available</span>
                    <span className="flex items-center gap-2"><ScanLine className="w-3 h-3" /> Photogrammetry v2.0</span>

                    <span className="flex items-center gap-2"><Database className="w-3 h-3" /> 124 Objects Archived</span>
                    <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Kyiv Region</span>
                    <span className="flex items-center gap-2"><Layers className="w-3 h-3" /> 3D Scans Available</span>
                    <span className="flex items-center gap-2"><ScanLine className="w-3 h-3" /> Photogrammetry v2.0</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0%, 100% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;