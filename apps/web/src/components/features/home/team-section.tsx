"use client";

import React from "react";
import Link from "next/link";
import { Github, Code2, Terminal, Cpu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CREATOR = {
    name: "yunaree",
    role: "Fullstack Developer",
    avatar: "https://github.com/yunaree.png",
    github: "https://github.com/yunaree",
    quote: "Architecture remembers our past. Code builds our future. This platform bridges the gap, preserving heritage through digital innovation."
};

const TeamSection = () => {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            {/* Background Grid Pattern - легка сітка на фоні для технічного вайбу */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Градієнтна пляма замість Землі */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium w-fit mb-6 border border-primary/10">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>Engineering & Design</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Built with passion for <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                                History & Technology
                            </span>
                        </h2>

                        <p className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed">
                            A centralized archive for restoration projects. This platform is open-source and built to help researchers visualize architectural transformation using modern web technologies.
                        </p>

                        <div className="flex items-center gap-4">
                            <Link href={CREATOR.github} target="_blank">
                                <Button size="lg" className="h-12 px-6 rounded-full gap-2 shadow-lg hover:shadow-primary/20 transition-all">
                                    <Github className="w-5 h-5" />
                                    GitHub Profile
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="ghost" size="lg" className="h-12 px-6 rounded-full gap-2">
                                    About Project <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Visual Composition (Code + Card) */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">

                        {/* 1. Декоративний блок коду (Mockup) */}
                        <div className="relative z-0 transform translate-x-4 translate-y-4 lg:translate-x-12 lg:translate-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="rounded-xl border bg-muted/50 p-4 shadow-sm">
                                <div className="flex items-center gap-1.5 mb-4">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                </div>
                                <div className="space-y-2 font-mono text-xs text-muted-foreground">
                                    <div className="flex gap-2"><span className="text-purple-500">const</span> <span className="text-blue-500">Archive</span> = <span className="text-yellow-500">{"{"}</span></div>
                                    <div className="pl-4">mission: <span className="text-green-500">"Preserve Heritage"</span>,</div>
                                    <div className="pl-4">techStack: [<span className="text-green-500">"Next.js"</span>, <span className="text-green-500">"Strapi"</span>],</div>
                                    <div className="pl-4">openSource: <span className="text-blue-500">true</span></div>
                                    <div className="text-yellow-500">{"}"}</div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Картка Розробника (Головний елемент) */}
                        <div className="relative z-10 -mt-24 lg:-mt-32">
                            <div className="relative overflow-hidden rounded-2xl border bg-background/80 backdrop-blur-md p-8 shadow-2xl transition-all hover:border-primary/20">
                                {/* Блик зверху */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

                                <div className="flex flex-col gap-6">
                                    <p className="text-lg font-medium leading-relaxed italic text-foreground/80">
                                        "{CREATOR.quote}"
                                    </p>

                                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
                                            <Avatar className="h-14 w-14 border-2 border-background relative">
                                                <AvatarImage src={CREATOR.avatar} alt={CREATOR.name} />
                                                <AvatarFallback>YN</AvatarFallback>
                                            </Avatar>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-base text-foreground">{CREATOR.name}</h4>
                                                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Available for work" />
                                            </div>
                                            <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                                                <Cpu className="w-3.5 h-3.5" />
                                                {CREATOR.role}
                                            </div>
                                        </div>

                                        <Link href={CREATOR.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Github className="w-6 h-6" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;