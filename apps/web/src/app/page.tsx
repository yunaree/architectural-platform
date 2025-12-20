import Image from "next/image";
import HeroSection from "@/components/features/home/hero-section";
import {FeaturesSection} from "@/components/features/home/features-section";
import TeamSection from "@/components/features/home/team-section";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col">
        <HeroSection/>

        {/* Додаємо gap або space-y для відступів між величезними блоками */}
        <div className="flex flex-col gap-12 md:gap-24">
          <FeaturesSection/>
          <TeamSection/>
        </div>
      </main>
  );
}
