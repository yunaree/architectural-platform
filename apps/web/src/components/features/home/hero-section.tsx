import React from 'react';

import {cn} from "@/lib/utils";

import {InteractiveGridPattern} from "@/components/ui/shadcn-io/interactive-grid-pattern";

import { HexagonBackground } from '@/components/ui/shadcn-io/hexagon-background';

import BlurText from "@/components/ui/shadcn-io/blur-text";

import {Button} from "@/components/ui/button";

import {AuroraBackground} from "@/components/ui/shadcn-io/aurora-background";

import {BubbleBackground} from "@/components/ui/shadcn-io/bubble-background";

import Link from "next/link";


const HeroSection = () => {

    return (

        <div

            className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden bg-background">



            <BubbleBackground

                interactive

                className="absolute inset-0 flex items-center justify-center rounded-xl"

            >

                <div className="relative z-10 flex items-center justify-center h-full">

                    <div className="text-center max-w-xl flex flex-col gap-3">

                        <BlurText

                            text="Witness the Rebirth of Heritage"

                            delay={150}

                            animateBy="words"

                            direction="top"

                            className="text-4xl font-bold text-center max-w-4xl mx-auto flex justify-center"

                        />

                        <p className="text-xl text-muted-foreground">Explore the stunning transformation of the world's

                            most iconic cultural sites. From ruins to restoration — see history rewritten, one building

                            at a time.</p>

                        <div className="flex items-center justify-center gap-3">

                            <Button variant={"default"}>Get started</Button>

                            <Link href="/about">

                                <Button variant="outline">

                                    Learn more

                                </Button>

                            </Link>

                        </div>

                    </div>

                </div>

            </BubbleBackground>

        </div>

    );

};



export default HeroSection;