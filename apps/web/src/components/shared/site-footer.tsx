"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight, Command, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
    return (
        <footer className="bg-background border-t border-border/40">
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                                <Command className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">architectural-platform.io</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            A digital archive dedicated to preserving and analyzing architectural heritage through modern technology. Compare, visualize, and explore restoration projects.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialButton icon={<Github className="h-4 w-4" />} />
                            <SocialButton icon={<Twitter className="h-4 w-4" />} />
                            <SocialButton icon={<Instagram className="h-4 w-4" />} />
                            <SocialButton icon={<Linkedin className="h-4 w-4" />} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-start lg:items-end space-y-4">
                        <h3 className="font-semibold text-foreground tracking-tight">Stay updated</h3>
                        <p className="text-muted-foreground text-sm lg:text-right max-w-sm">
                            Subscribe to our newsletter to receive the latest updates on new restoration projects and features.
                        </p>
                        <form className="flex w-full max-w-sm items-center space-x-2" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-secondary/30 border-border focus-visible:ring-primary"
                            />
                            <Button type="submit">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <Separator className="mb-12 opacity-50" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Platform</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/objects" className="hover:text-primary transition-colors">Catalogue</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">3D Models</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Comparisons</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Map View</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Resources</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Restoration Guidelines</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">API Reference</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Company</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Our Mission</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Partners</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Legal</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <Separator className="mb-8 opacity-50" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Architectural Platform. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <span>Made with ❤️ for Architecture</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
    return (
        <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 bg-background hover:bg-primary hover:text-primary-foreground border-border/60 transition-colors"
        >
            {icon}
        </Button>
    )
}