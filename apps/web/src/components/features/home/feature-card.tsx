"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {PinContainer} from "@/components/ui/shadcn-io/3d-pin";

interface FeatureCardProps {
    title: string;
    description: string;
    href?: string;
    gradient: string; // Наприклад: "from-violet-500 via-purple-500 to-blue-500"
}

export function FeatureCard({ title, description, href = "/", gradient }: FeatureCardProps) {
    return (
        <div className="flex items-center justify-center w-full">
            <PinContainer title={title} href={href}>
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                        {title}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 line-clamp-3">
              {description}
            </span>
                    </div>

                    {/* Блок з градієнтом */}
                    <div className={cn(
                        "flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br",
                        gradient
                    )} />
                </div>
            </PinContainer>
        </div>
    );
}