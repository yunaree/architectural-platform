"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutCTA() {
    return (
        <section className="py-24 border-t">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                    Ready to explore the archive?
                </h2>
                <Link href="/objects">
                    <Button size="lg" className="h-12 px-8 text-base rounded-full">
                        Browse Catalogue <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}