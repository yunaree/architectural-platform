"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowRight, Code2, Database, Globe, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

// --- MOCK DATA: TEAM ---
const TEAM = [
    {
        name: "Oleksandr Dev", // Твоє ім'я
        role: "Lead Frontend Engineer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400", // Заміни на своє фото
        bio: "Passionate about building pixel-perfect interfaces and preserving architectural heritage through code.",
        socials: {
            github: "#",
            linkedin: "#",
            twitter: "#",
        },
    },
    // Можна додати ще когось, якщо є команда
];

// --- MOCK DATA: TECH STACK ---
const STACK = [
    { name: "Next.js 15", icon: Globe },
    { name: "TypeScript", icon: Code2 },
    { name: "Tailwind CSS", icon: Layers },
    { name: "Supabase / Strapi", icon: Database },
];

// Анімація появи
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">

            {/* 1. HERO SECTION */}
            <section className="relative pt-24 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 text-center z-10 relative">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm uppercase tracking-widest">
                            Our Mission
                        </Badge>
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                            Preserving History <br /> Through Digital Innovation
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            We build tools that help architects, historians, and enthusiasts visualize the restoration process and keep the memory of architectural masterpieces alive.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative background gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            </section>

            {/* 2. BENTO GRID (Values & Features) */}
            <section className="container mx-auto px-4 py-12">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Card 1: Vision */}
                    <motion.div variants={fadeInUp} className="md:col-span-2 p-8 rounded-3xl border bg-card/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">The Vision</h3>
                            <p className="text-muted-foreground text-lg">
                                Architecture is not just about buildings; it's about stories. Our platform creates a bridge between the past and the future, allowing users to see the transformation of cities in real-time.
                            </p>
                        </div>
                        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                    </motion.div>

                    {/* Card 2: Stats */}
                    <motion.div variants={fadeInUp} className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm flex flex-col justify-center items-center text-center">
                        <span className="text-5xl font-bold text-foreground mb-2">150+</span>
                        <span className="text-muted-foreground">Restored Objects</span>
                    </motion.div>

                    {/* Card 3: Technology */}
                    <motion.div variants={fadeInUp} className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm md:col-span-1">
                        <h3 className="text-xl font-bold mb-6">Powered by Modern Tech</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {STACK.map((item) => (
                                <div key={item.name} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50">
                                    <item.icon className="w-6 h-6 text-primary" />
                                    <span className="text-xs font-medium">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Card 4: Open Source */}
                    <motion.div variants={fadeInUp} className="md:col-span-2 p-8 rounded-3xl border bg-primary text-primary-foreground relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Open Source at Heart</h3>
                            <p className="opacity-90 max-w-md">
                                We believe in transparency. Our restoration data comparison algorithms are open for the community to improve.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <Button variant="secondary" className="gap-2">
                                <Github className="w-4 h-4" /> Star on GitHub
                            </Button>
                        </div>
                        {/* Decorative pattern */}
                        <Code2 className="absolute -bottom-8 -right-8 w-48 h-48 opacity-10 rotate-12" />
                    </motion.div>
                </motion.div>
            </section>

            {/* 3. TEAM SECTION */}
            <section className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Meet the Builders</h2>
                    <p className="text-muted-foreground">The minds behind the restoration platform.</p>
                </div>

                <div className="flex justify-center">
                    {TEAM.map((member) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative w-full max-w-sm"
                        >
                            <div className="relative overflow-hidden rounded-2xl border bg-card">
                                <div className="aspect-square relative overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                    <p className="text-sm text-primary font-medium mb-4">{member.role}</p>
                                    <p className="text-muted-foreground text-sm mb-6">
                                        {member.bio}
                                    </p>
                                    <div className="flex gap-4">
                                        <Link href={member.socials.github} className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Github className="w-5 h-5" />
                                        </Link>
                                        <Link href={member.socials.linkedin} className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </Link>
                                        <Link href={member.socials.twitter} className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. CTA */}
            <section className="py-24 border-t bg-muted/20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to explore history?</h2>
                    <Link href="/objects">
                        <Button size="lg" className="h-12 px-8 text-base">
                            View Catalogue <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    );
}