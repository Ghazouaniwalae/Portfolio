import { Preloader } from "@/components/sections/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TerminalStrip } from "@/components/sections/TerminalStrip";
import { Portals } from "@/components/sections/Portals";
import { ByTheNumbers } from "@/components/sections/ByTheNumbers";
import { Projects } from "@/components/sections/Projects";
import { Quote } from "@/components/sections/Quote";
import { FieldNotes } from "@/components/sections/FieldNotes";
import { SkillWheel } from "@/components/sections/SkillWheel";
import { WorkingTogether } from "@/components/sections/WorkingTogether";
import { Close } from "@/components/sections/Close";
import { Footer } from "@/components/sections/Footer";
import { MobileCTA } from "@/components/ui/MobileCTA";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <About />
        <TerminalStrip />
        <Portals />
        <ByTheNumbers />
        <Projects />
        <Quote />
        <FieldNotes />
        <SkillWheel />
        <WorkingTogether />
        <Close />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}