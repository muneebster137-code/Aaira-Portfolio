"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, X } from "lucide-react";
import Footer from "@/components/common/Footer";
import { projects, earlierProjects } from "@/data/projectsData";
import PlayableReel from "@/components/media/PlayableReel";
import RevealLines from "@/components/motion/RevealLines";
import RevealImage from "@/components/motion/RevealImage";
import Magnetic from "@/components/motion/Magnetic";

export default function WorkArchivePage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeReelId, setActiveReelId] = useState<string | null>(null);

  const filters = [
    "ALL",
    "BRAND IDENTITY",
    "CAMPAIGNS",
    "REELS & VIDEO",
    "SOCIAL SYSTEMS",
    "PRINT & EDITORIAL",
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "BRAND IDENTITY") {
      return (
        project.scope.some((s) => s.toLowerCase().includes("brand") || s.toLowerCase().includes("identity") || s.toLowerCase().includes("creative direction")) ||
        project.role.toLowerCase().includes("brand") ||
        project.category.toLowerCase().includes("brand")
      );
    }
    if (activeFilter === "CAMPAIGNS") {
      return (
        project.scope.some((s) => s.toLowerCase().includes("campaign")) ||
        project.category.toLowerCase().includes("campaign")
      );
    }
    if (activeFilter === "REELS & VIDEO") {
      return project.reels && project.reels.length > 0;
    }
    if (activeFilter === "SOCIAL SYSTEMS") {
      return (
        project.scope.some((s) => s.toLowerCase().includes("social") || s.toLowerCase().includes("systems")) ||
        project.tools.some((t) => t.toLowerCase().includes("capcut") || t.toLowerCase().includes("video"))
      );
    }
    if (activeFilter === "PRINT & EDITORIAL") {
      return (
        project.scope.some((s) => s.toLowerCase().includes("print") || s.toLowerCase().includes("editorial") || s.toLowerCase().includes("expo") || s.toLowerCase().includes("packaging")) ||
        project.masonryGallery.some((m) => m.type === "print" || m.category.toLowerCase().includes("print") || m.category.toLowerCase().includes("editorial"))
      );
    }
    return true;
  });

  return (
    <main className="theme-dark min-h-screen pt-36">
      <div className="gutter">
        {/* Page Header (K72 Style) */}
        <div className="pb-16 border-b border-white/15">
          <div className="t-label text-lime mb-4">
            01 / PROJECT ARCHIVE · COMPLETE CATALOGUE [プロジェクトアーカイブ]
          </div>

          <RevealLines
            as="h1"
            lines={["ALL WORK", `(${String(projects.length).padStart(2, "0")})`]}
            className="t-display text-white font-medium tracking-tighter"
          />

          <p className="t-body max-w-2xl text-white/70 mt-6 leading-relaxed">
            Brands, campaigns and systems, built end to end. A complete record of creative directorship across international consultancy, fashion runways, and brand holding groups.
          </p>

          {/* Filter Chips Bar (K72 Pill Style) */}
          <div className="pt-8 flex flex-wrap items-center gap-2">
            <span className="t-label text-white/40 mr-2">Filtrer:</span>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`btn !text-[0.75rem] ${
                  activeFilter === f
                    ? "!bg-lime !text-black !border-lime font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* K72 Signature Asymmetric 2-Column Grid */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 items-start">
          {filteredProjects.map((project, idx) => {
            const hasReel = project.reels && project.reels.length > 0;
            const isReelOpen = activeReelId === project.id;
            const isOffset = idx % 2 === 1;

            return (
              <article
                key={project.id}
                className={`group relative flex flex-col justify-between ${
                  isOffset ? "md:pt-16" : ""
                }`}
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between pb-3 text-xs uppercase tracking-wider text-white/50 border-b border-white/10 mb-4">
                  <span className="text-lime font-mono font-medium">0{idx + 1} / {project.client}</span>
                  <span>{project.year}</span>
                </div>

                {/* Media Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                  {isReelOpen && project.reels[0] ? (
                    <div className="relative h-full w-full bg-black p-4 flex items-center justify-center">
                      <button
                        onClick={() => setActiveReelId(null)}
                        className="absolute top-4 right-4 z-30 btn btn-solid text-xs"
                      >
                        <X className="w-3.5 h-3.5 mr-1" /> Close
                      </button>
                      <PlayableReel reel={project.reels[0]} />
                    </div>
                  ) : (
                    <Link
                      href={`/work/${project.slug}`}
                      data-cursor-label="See project"
                      className="block relative h-full w-full group/img"
                    >
                      <RevealImage
                        src={project.heroImage}
                        alt={project.title}
                        className="h-full w-full"
                        imgClassName="zoom-img object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors duration-500" />
                    </Link>
                  )}

                  {hasReel && !isReelOpen && (
                    <button
                      onClick={() => setActiveReelId(project.id)}
                      className="absolute bottom-4 right-4 z-20 btn btn-solid !text-[0.75rem]"
                    >
                      <Play className="w-3 h-3 fill-current mr-1" /> Reel
                    </button>
                  )}
                </div>

                {/* Title & Narrative */}
                <div className="pt-6 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="t-row text-white hover:text-lime transition-colors duration-300">
                      <Link href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-white hover:text-lime transition-colors"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight className="w-6 h-6 stroke-[1.5]" />
                    </Link>
                  </div>

                  <p className="t-body text-white/60 line-clamp-2 text-sm md:text-base">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.scope.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.75rem] uppercase tracking-wider text-white/50 border border-white/15 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Earlier Ventures Section */}
        <div className="py-20 border-t border-white/15">
          <div className="mb-12">
            <span className="t-label text-lime block mb-2">
              Foundations & Early Ventures [経歴実績]
            </span>
            <h3 className="t-section text-white font-medium">
              Incubation & Agency Milestones
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {earlierProjects.map((p) => (
              <div
                key={p.title}
                className="p-8 border border-white/15 flex flex-col justify-between gap-4 hover:border-lime/40 transition-colors"
              >
                <div className="flex justify-between items-center text-xs font-mono text-white/50">
                  <span>{p.year}</span>
                  <span className="text-lime">{p.role}</span>
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight text-white">{p.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed font-light">{p.description}</p>
                <div className="flex flex-wrap gap-1 pt-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 border border-white/10 text-white/40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="py-20 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="t-lead text-white font-medium">
              Don&apos;t see your category? Let&apos;s talk about it.
            </h4>
            <p className="text-sm text-white/60 font-light mt-1">
              Custom creative direction packages calibrated to specific commercial requirements.
            </p>
          </div>
          <Magnetic>
            <Link href="/contact" className="btn btn-thick !bg-lime !text-black !border-lime">
              Start a Conversation ↗
            </Link>
          </Magnetic>
        </div>
      </div>

      <Footer />
    </main>
  );
}
