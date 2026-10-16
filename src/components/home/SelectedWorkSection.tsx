"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, X } from "lucide-react";
import { projects } from "@/data/projectsData";
import RevealLines from "@/components/motion/RevealLines";
import RevealImage from "@/components/motion/RevealImage";
import Magnetic from "@/components/motion/Magnetic";
import PlayableReel from "@/components/media/PlayableReel";

export default function SelectedWorkSection() {
  const [activeReelProject, setActiveReelProject] = useState<string | null>(null);

  return (
    <section id="selected-work" className="theme-dark gutter relative py-32 border-t border-white/15">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/15">
        <div>
          <div className="t-label mb-3 text-lime">
            01 / SELECTED WORK [選定実績]
          </div>
          <RevealLines
            as="h2"
            lines={[`WORK (${String(projects.length).padStart(2, "0")})`]}
            className="t-section text-white font-medium tracking-tighter"
          />
        </div>

        <p className="t-body max-w-md text-white/60">
          The brands I&apos;ve built end to end, from international higher education and European runway fashion to a multi-brand holding group and its family of labels.
        </p>
      </div>

      {/* Asymmetric 2-Column Elastic List */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 items-start">
        {projects.map((project, idx) => {
          const isOffset = idx % 2 === 1;
          const isReelOpen = activeReelProject === project.id;
          const hasReel = project.reels && project.reels.length > 0;

          return (
            <article
              key={project.id}
              className={`group relative flex flex-col justify-between ${
                isOffset ? "md:pt-20" : ""
              }`}
            >
              {/* Meta Label Row */}
              <div className="flex items-center justify-between pb-3 text-xs uppercase tracking-wider text-white/50 border-b border-white/10 mb-4">
                <span className="text-lime font-mono font-medium">0{idx + 1} / {project.client}</span>
                <span>{project.year}</span>
              </div>

              {/* Media Display */}
              <div
                data-fx="rise"
                className="rounded-media relative aspect-[4/3] w-full bg-neutral-900"
              >
                {isReelOpen && project.reels[0] ? (
                  <div className="relative h-full w-full bg-black p-4 flex items-center justify-center">
                    <button
                      onClick={() => setActiveReelProject(null)}
                      className="absolute top-4 right-4 z-30 btn btn-solid text-xs"
                      aria-label="Close reel"
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
                    onClick={() => setActiveReelProject(project.id)}
                    className="absolute bottom-4 right-4 z-20 btn btn-solid !text-[0.75rem]"
                    aria-label={`Watch reel for ${project.title}`}
                  >
                    <Play className="w-3 h-3 fill-current mr-1" /> Reel
                  </button>
                )}
              </div>

              {/* Project Headline & Details */}
              <div className="pt-6 flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="t-row text-white hover:text-lime transition-colors duration-300">
                    <Link href={`/work/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
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

      {/* Bottom Archive Link */}
      <div className="mt-28 pt-12 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="t-label text-white/50">
          Everything I&apos;ve made across brand identity, reels, campaigns and print.
        </span>
        <Magnetic>
          <Link href="/work" className="btn btn-thick">
            All Work ({String(projects.length).padStart(2, "0")})
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
