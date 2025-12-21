import { HeroHeader } from "@/app/(marketing)/_components/header";
import HeroSection from "@/app/(marketing)/_components/hero-section";
import { ThemeToggle } from "@/components/ui/tehem-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroHeader />
      <HeroSection />
    </div>
  );
}
