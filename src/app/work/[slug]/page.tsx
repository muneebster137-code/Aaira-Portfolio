import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Play, Sparkles } from "lucide-react";
import Footer from "@/components/common/Footer";
import { projects } from "@/data/projectsData";
import PlayableReel from "@/components/media/PlayableReel";
import PostDesignCarousel from "@/components/media/PostDesignCarousel";
import MasonryGallery from "@/components/media/MasonryGallery";
import RevealLines from "@/components/motion/RevealLines";
import RevealImage from "@/components/motion/RevealImage";
import Magnetic from "@/components/motion/Magnetic";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const nextProject = projects.find((p) => p.slug === project.nextProjectSlug) || projects[0];

  return (
    <main className="theme-dark min-h-screen pt-36">
      <div className="gutter">
        {/* Back Link */}
        <div className="pb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 t-label text-white/50 hover:text-lime transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Work [アーカイブ]
          </Link>
        </div>

        {/* 01 Hero Header (K72 Monumental Layout) */}
        <div className="pb-16 border-b border-white/15">
          <div className="t-label text-lime mb-4">
            {project.category} · {project.year}
          </div>

          <RevealLines
            as="h1"
            lines={[project.title]}
            className="t-display text-white font-medium tracking-tighter"
          />

          <p className="t-lead text-white/70 mt-6 max-w-3xl font-light leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* 02 Large Hero Image with Parallax */}
        <div className="py-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border border-white/15">
            <RevealImage
              src={project.heroImage}
              alt={project.title}
              className="h-full w-full"
              priority={true}
              sizes="100vw"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-md flex items-center justify-between text-xs uppercase tracking-wider text-white border border-white/10">
              <span className="text-white/60">Client:</span>
              <span className="text-lime font-bold">{project.client}</span>
            </div>
          </div>
        </div>

        {/* 03 The Fact Bar (5 Cells) */}
        <div className="py-12 border-y border-white/15 grid grid-cols-2 md:grid-cols-5 gap-6 text-xs font-mono">
          <div>
            <span className="text-white/40 uppercase block mb-1">01 / Client</span>
            <span className="text-white font-semibold">{project.client}</span>
          </div>
          <div>
            <span className="text-white/40 uppercase block mb-1">02 / Role</span>
            <span className="text-white font-semibold">{project.role}</span>
          </div>
          <div>
            <span className="text-white/40 uppercase block mb-1">03 / Timeline</span>
            <span className="text-white font-semibold">{project.year}</span>
          </div>
          <div>
            <span className="text-white/40 uppercase block mb-1">04 / Tooling</span>
            <span className="text-white/70">{project.tools.join(", ")}</span>
          </div>
          <div className="col-span-2 md:col-span-1">
            <span className="text-white/40 uppercase block mb-1">05 / Scope</span>
            <span className="text-lime font-semibold">{project.scope.slice(0, 2).join(" · ")}</span>
          </div>
        </div>

        {/* 04 Strategic Overview & Challenge */}
        <section className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/15">
          <div className="lg:col-span-5 space-y-4">
            <span className="t-label text-lime">01 / STRATEGIC OVERVIEW</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
              The Architecture & Scope
            </h2>
            <p className="t-body text-white/70 font-light leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl border border-white/15 bg-white/[0.02] space-y-3">
              <span className="t-label text-lime">THE STRATEGIC CHALLENGE</span>
              <p className="t-body text-white/80 leading-relaxed font-light">
                {project.challenge}
              </p>
            </div>
          </div>
        </section>

        {/* 05 Methodology */}
        <section className="py-20 border-b border-white/15">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="t-label text-lime block mb-2">02 / METHODOLOGY [手法]</span>
              <h3 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">Execution Roadmap</h3>
            </div>
            <div className="t-label text-white/40">4-PHASE PROTOCOL</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.approach.map((step) => (
              <div
                key={step.number}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.01] flex flex-col justify-between gap-6 hover:border-lime/40 transition-colors"
              >
                <span className="font-mono text-2xl font-bold text-lime">{step.number}</span>
                <div className="space-y-2">
                  <h4 className="text-base font-medium uppercase tracking-tight text-white">{step.title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 Playable Reels */}
        {project.reels && project.reels.length > 0 && (
          <section className="py-24 border-t border-white/15">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="t-label text-lime block mb-2">
                  <Play className="inline-block w-3.5 h-3.5 mr-1 fill-current" />
                  Motion Architecture [映像演出]
                </span>
                <h3 className="t-section text-white font-medium">In-Feed Playable Reels</h3>
              </div>
              <p className="text-sm text-white/60 max-w-md font-light">
                Interactive 9:16 vertical video players with playback controls, soundbar, and live metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {project.reels.map((reel) => (
                <div key={reel.id} className="flex justify-center">
                  <PlayableReel reel={reel} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 07 Post Design Carousel */}
        {project.postSlides && project.postSlides.length > 0 && (
          <section className="py-24 border-t border-white/15">
            <PostDesignCarousel
              slides={project.postSlides}
              projectName={project.title}
            />
          </section>
        )}

        {/* 08 Masonry Gallery */}
        <section className="py-24 border-t border-white/15">
          <MasonryGallery
            items={project.masonryGallery}
            title={`${project.title} Masonry Showcase`}
            subtitle="True aspect ratios: 9:16 vertical reels, 4:5 posters, 16:9 banners, and 1:1 packaging."
          />
        </section>

        {/* 09 Impact & Outcomes */}
        <section className="py-24 border-t border-white/15">
          <div className="mb-12">
            <span className="t-label text-lime block mb-2">Deliverables & Metrics [成果]</span>
            <h3 className="t-section text-white font-medium">Measured Outcomes</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.outcomes.map((item) => (
              <div
                key={item.label}
                className="p-8 border border-white/15 flex flex-col justify-between gap-4 hover:border-lime/40 transition-colors"
              >
                <div className="text-5xl font-mono font-bold text-white">{item.metric}</div>
                <div>
                  <div className="text-xs font-mono uppercase text-lime tracking-wider font-semibold mb-1">
                    {item.label}
                  </div>
                  <p className="text-xs text-white/60 font-light leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10 Next Project Banner (K72 Monumental Style) */}
        <section className="py-24 border-t border-white/15">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group block p-12 md:p-20 border border-white/15 hover:border-lime transition-all duration-500 bg-neutral-950 relative overflow-hidden"
            data-cursor-label="Next Project"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div>
                <span className="t-label text-lime block mb-3">
                  Next Project Showcase [次のプロジェクト] →
                </span>
                <h4 className="t-section text-white group-hover:text-lime transition-colors">
                  {nextProject.title}
                </h4>
                <p className="t-label text-white/50 mt-2">
                  {nextProject.category} · {nextProject.year}
                </p>
              </div>

              <div className="h-16 w-16 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-lime group-hover:text-black transition-all transform group-hover:scale-110">
                <ArrowUpRight className="h-8 w-8 stroke-[2]" />
              </div>
            </div>
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  );
}
