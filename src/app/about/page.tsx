"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Award, FileText, CheckCircle2 } from "lucide-react";
import Footer from "@/components/common/Footer";
import RevealLines from "@/components/motion/RevealLines";
import RevealImage from "@/components/motion/RevealImage";
import ScrollWords from "@/components/motion/ScrollWords";
import Magnetic from "@/components/motion/Magnetic";
import { CityClock } from "@/components/common/Bits";
import { media } from "@/data/media";

const certifications = [
  { title: "Foundations of User Experience (UX) Design", org: "Google", year: "2024" },
  { title: "Graphic Design Specialization", org: "University of Colorado Boulder", year: "2024" },
  { title: "Fundamentals of Marketing Strategy", org: "University of London", year: "2024" },
  { title: "Creative Design, Prototyping & Testing", org: "University of Maryland", year: "2024" },
  { title: "Foundation of Project Management", org: "Google", year: "2024" },
  { title: "Responsive Web Design in Adobe XD", org: "Google", year: "2023" },
  { title: "Agile Leadership & Operations", org: "University of Colorado Denver", year: "2024" },
  { title: "Executive Communication & Public Speaking", org: "University of Colorado Boulder", year: "2023" },
  { title: "Business Writing & Pitch Architecture", org: "University of Colorado Boulder", year: "2023" },
  { title: "Data Analytics & Strategic Insights", org: "Google", year: "2024" },
];

const timeline = [
  {
    year: "2026",
    role: "Lead Visual Designer & Brand Architect",
    company: "Manaaq Creatives Holding Group",
    location: "Islamabad, PK",
    detail:
      "Directing the overarching visual brand system for Manaaq and its three subsidiaries (Ellie Junior, Oopsies, NH Consultants). Governing brand books, cross-channel launch campaigns, and high-velocity social video suites. Completing BSc in Social Sciences (Psychology) at SZABIST Islamabad.",
  },
  {
    year: "2025",
    role: "Creative Designer & Marketing Associate",
    company: "Buda Fashion Atelier",
    location: "Budapest, Hungary",
    detail:
      "Collaborated remotely with the atelier's European leadership to engineer high-end runway visuals, campaign lookbooks, and editorial storytelling for seasonal international releases.",
  },
  {
    year: "2024 — 2026",
    role: "Design Operations & Visual Lead",
    company: "Amigos Overseas Education",
    location: "Islamabad / Multi-city",
    detail:
      "Orchestrated nationwide international education expos across Islamabad, Lahore, Karachi, and Peshawar. Authored multi-meter environmental graphics, print prospectuses, and multi-channel student enrollment acquisition funnels.",
  },
  {
    year: "2024 — 2025",
    role: "COO & Co-Founder",
    company: "Anebos Studios",
    location: "Islamabad, PK",
    detail:
      "Co-founded and scaled a boutique creative studio delivering brand identity, corporate decks, and high-converting marketing collateral for regional founders and tech startups.",
  },
  {
    year: "2023 — 2024",
    role: "Co-Lead Marketing & Design",
    company: "SZABIST Incubation Centre",
    location: "Islamabad, PK",
    detail:
      "Spearheaded marketing collateral, investor pitch decks, and brand identity sprints for university-backed early-stage startups and annual innovation summits.",
  },
];

export default function AboutPage() {
  return (
    <main className="theme-dark min-h-screen pt-36">
      <div className="gutter">
        {/* 01 Monumental Header */}
        <header className="pb-16 border-b border-white/15">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="t-label text-lime">
              02 / ABOUT & PHILOSOPHY [概要]
            </span>
            <CityClock />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <RevealLines
              as="h1"
              lines={["ABOUT."]}
              className="t-display text-white font-medium tracking-tighter"
            />

            <div className="t-label text-white/50 space-y-1 text-left lg:text-right">
              <div>AAIRA BASIT · アイラ・バシット</div>
              <div className="text-lime">CREATIVE DIRECTRESS · PSYCHOLOGY LEAD</div>
            </div>
          </div>

          <p className="t-lead text-white/70 mt-8 max-w-3xl font-light leading-relaxed">
            I trained in psychology at SZABIST and I work in design. I build visual identities and brand systems made to stick in people&apos;s memory.
          </p>
        </header>

        {/* 02 Portrait & Narrative Split */}
        <section className="py-24 border-b border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div data-fx="rise" className="rounded-media relative aspect-[3/4] w-full border border-white/15 bg-neutral-900 shadow-2xl">
              <RevealImage
                src={media.about.portrait}
                alt="Aaira Basit — Creative Director"
                className="w-full h-full"
                data-cursor-label="Directress"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Aaira Basit</div>
                  <div className="text-[11px] font-mono text-lime">Creative Lead · Islamabad</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Magnetic strength={10}>
                <Link
                  href="/resume"
                  className="btn inline-flex"
                >
                  <FileText className="w-3.5 h-3.5 mr-2" />
                  <span className="roll">
                    <span className="roll-front">View My Resume</span>
                    <span className="roll-back">View My Resume</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                </Link>
              </Magnetic>
              <span className="t-label text-white/40 text-xs">2026 Archive</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="t-label text-lime">DIRECTORSHIP PHILOSOPHY</div>
            <h2 className="t-section text-white font-medium leading-[1.05]">
              Managing the brand&apos;s whole visual world.
            </h2>

            <div className="space-y-5 t-body text-white/70 font-light leading-relaxed">
              <p>
                I do not operate as an isolated production designer ticking tickets. I step in as a creative directress who conceives, articulates, and protects entire brand universes — from foundational typography guidelines and color physics to high-velocity daily reels, packaging, exhibition architecture, and multi-brand holding governance.
              </p>
              <p>
                Because I studied psychology at SZABIST Islamabad, I ground every visual decision in cognitive heuristics: information hierarchy structured for instant retention, typographic balance establishing subconscious institutional authority, and deliberate contrast commanding human attention.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div data-fx="pop" className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10">
              <div>
                <div className="t-display text-lime font-mono">04+</div>
                <div className="t-label text-white/50 mt-1">Years Directing</div>
              </div>
              <div>
                <div className="t-display text-white font-mono">10</div>
                <div className="t-label text-white/50 mt-1">Google/Uni Accreditations</div>
              </div>
              <div>
                <div className="t-display text-white font-mono">03</div>
                <div className="t-label text-white/50 mt-1">Holding Subsidiaries</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 03 High-Contrast Breakout Section (Amanation Theme-Light) */}
      <section data-fx="sheet" className="fx-sheet theme-light py-20 md:py-28 my-16">
        <div className="gutter">
          <div className="max-w-4xl space-y-6">
            <span className="t-label text-black/60">
              02.1 / COGNITIVE FOUNDATION [心理学的アプローチ]
            </span>
            <h2 className="t-section text-black font-medium leading-[1.05]">
              The Psychology Advantage.
            </h2>
            <ScrollWords
              text="To me, design isn't cosmetic ornament. It's applied human cognition. When a brand's visual language works with how people think, they accept it without resistance, and a passing impression turns into something they remember."
              className="text-2xl sm:text-3xl md:text-4xl text-black font-light leading-snug"
            />
          </div>

          <div data-fx="pop" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-black/10">
            <div className="space-y-4">
              <div className="t-label font-mono text-black">01 / COGNITIVE LOAD</div>
              <h3 className="text-xl font-medium text-black">Information Hierarchy</h3>
              <p className="t-body text-black/70 font-light leading-relaxed">
                Structuring high-density brand systems and educational collateral so readers digest key value propositions within milliseconds without visual fatigue.
              </p>
            </div>

            <div className="space-y-4">
              <div className="t-label font-mono text-black">02 / HEURISTIC TRUST</div>
              <h3 className="text-xl font-medium text-black">Subconscious Authority</h3>
              <p className="t-body text-black/70 font-light leading-relaxed">
                Leveraging typographic precision, architectural negative space, and Swiss balance to establish institutional credibility for high-stakes startups and institutions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="t-label font-mono text-black">03 / CHROMATIC PHYSICS</div>
              <h3 className="text-xl font-medium text-black">Emotional Cadence</h3>
              <p className="t-body text-black/70 font-light leading-relaxed">
                Orchestrating high-contrast color palettes (acid lime on absolute black, pure editorial white) to guide optic focus, trigger consumer appetite, and lock recall.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="gutter">
        {/* 04 Career Trajectory (2023–2026) */}
        <section className="py-24 border-b border-white/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="t-label text-lime block mb-2">02.2 / CHRONOLOGY [経歴]</span>
              <h2 className="t-section text-white font-medium">Career Trajectory</h2>
            </div>
            <div className="t-label text-white/50 font-mono">
              2023 — 2026 · CONTINUOUS IMPACT
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline group hover:bg-white/[0.02] transition-colors -mx-4 px-4 rounded-xl"
              >
                <div className="lg:col-span-2 font-mono text-xl sm:text-2xl text-lime font-semibold">
                  {item.year}
                </div>
                <div className="lg:col-span-4 space-y-1">
                  <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-lime transition-colors">
                    {item.role}
                  </h3>
                  <div className="t-label text-white/50">
                    {item.company} · {item.location}
                  </div>
                </div>
                <div className="lg:col-span-6 t-body text-white/70 font-light leading-relaxed">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05 Accreditations & Masteries */}
        <section className="py-24 border-b border-white/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="t-label text-lime block mb-2">02.3 / ACCREDITATIONS [認証]</span>
              <h2 className="t-section text-white font-medium">Certifications & Masteries</h2>
            </div>
            <div className="t-label text-white/50 font-mono">
              10 VERIFIED CREDENTIALS
            </div>
          </div>

          <div data-fx="pop" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl bg-ink-raised border border-white/10 flex items-center justify-between gap-4 hover:border-lime/40 transition-colors group"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-white group-hover:text-lime transition-colors">
                    {c.title}
                  </h3>
                  <div className="t-label text-white/50 flex items-center gap-2">
                    <span>{c.org}</span>
                    <span>·</span>
                    <span className="text-lime">{c.year}</span>
                  </div>
                </div>
                <Award className="w-5 h-5 text-white/40 group-hover:text-lime transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* 06 Closing Banner */}
        <section className="py-24">
          <div className="p-10 md:p-16 rounded-3xl bg-ink-raised border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="t-label text-lime">START A COLLABORATION</span>
              <h3 className="t-section text-white font-medium">
                Ready to build something people remember?
              </h3>
              <p className="t-body text-white/70 font-light">
                I take on a few creative direction retainers, brand-building sprints and design consulting projects at a time.
              </p>
            </div>

            <Magnetic strength={15}>
              <Link href="/contact" className="btn btn-solid whitespace-nowrap">
                <span className="roll">
                  <span className="roll-front">Initiate Project Brief</span>
                  <span className="roll-back">Initiate Project Brief</span>
                </span>
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Magnetic>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
