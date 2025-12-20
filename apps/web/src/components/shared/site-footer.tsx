"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
    product: [
        { name: "Features", href: "#" },
        { name: "Restorations", href: "/objects" },
        { name: "Pricing", href: "#" },
        { name: "Case Studies", href: "#" },
    ],
    company: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
    ],
    resources: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "Partners", href: "#" },
    ],
    legal: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
    ],
};

export function SiteFooter() {
    return (
        <footer className="bg-background border-t border-border/40">
            <div className="container mx-auto px-4 py-12 md:py-24">

                {/* TOP SECTION: Branding & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-primary text-primary-foreground p-1 rounded-md">
                                <Command className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">architectural-platform.io</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                            Preserving history through digital innovation. Compare, analyze, and witness the rebirth of architectural heritage.
                        </p>
                    </div>

                    <div className="flex flex-col justify-start lg:items-end space-y-4">
                        <h3 className="font-semibold tracking-tight">Subscribe to our newsletter</h3>
                        <p className="text-muted-foreground text-sm">
                            Get the latest updates on new restorations and platform features.
                        </p>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                            />
                            <Button type="submit" size="icon">
                                <ArrowRight className="h-4 w-4" />
                                <span className="sr-only">Subscribe</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 opacity-50" />

                {/* MIDDLE SECTION: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
                    {/* Product Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground tracking-wider">PRODUCT</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground tracking-wider">COMPANY</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground tracking-wider">RESOURCES</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground tracking-wider">LEGAL</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 opacity-50" />

                {/* BOTTOM SECTION: Copyright & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Architectural Platform. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="hover:text-primary text-muted-foreground rounded-full h-8 w-8">
                            <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-primary text-muted-foreground rounded-full h-8 w-8">
                            <Instagram className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-primary text-muted-foreground rounded-full h-8 w-8">
                            <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-primary text-muted-foreground rounded-full h-8 w-8">
                            <Facebook className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}