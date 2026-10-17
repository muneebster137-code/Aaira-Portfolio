import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "@/components/common/Footer";
import RevealLines from "@/components/motion/RevealLines";
import RevealImage from "@/components/motion/RevealImage";
import PlayableReel from "@/components/media/PlayableReel";
import { anebosStudio, studioCategories, type StudioBrand, type StudioCategory } from "@/data/anebosData";
import { projects, type ProjectReel } from "@/data/projectsData";

export const metadata: Metadata = {
  title: "Anebos Studios | Aaira Basit",
  description: "Anebos Studios, the creative studio Aaira Basit co-founded as Creative Director, and the brands built there: Homeloom and Treats For Life.",
};

function CategoryBlock({ brand, category, index }: { brand: StudioBrand; category: StudioCategory; index: number }) {
  const isReels = category.key === "reels";
  const items = isReels ? brand.media.reels : brand.media[category.key];
  if (!items.length) return null;

  return (
    <div className="grid grid-cols-1 gap-8 border-t border-white/10 py-16 md:py-20 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-32">
          <span className="t-label font-mono text-lime">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 text-2xl font-medium tracking-tight text-white md:text-3xl">{category.title}</h3>
          <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-white/60">{category.blurb}</p>
          <span className="t-label mt-4 block text-white/40">
            {String(items.length).padStart(2, "0")} {items.length === 1 ? "piece" : "pieces"}
          </span>
        </div>
      </div>

      <div className="lg:col-span-9">
        {isReels ? (
          <div className={`grid gap-8 ${category.cols}`}>
            {brand.media.reels.map((r, i) => {
              const reel: ProjectReel = {
                id: `${brand.slug}-reel-${i + 1}`,
                title: `${brand.name} Reel ${i + 1}`,
                duration: "0:06",
                views: "",
                caption: `Reel design for ${brand.name}.`,
                tags: [`#${brand.name.replace(/\s+/g, "")}`, "#AnebosStudios"],
                thumbnailUrl: r.poster,
                videoUrl: r.video,
                videoStyle: "studio",
                aspectRatio: "9:16",
              };
              return (
                <div key={reel.id} className="flex justify-center">
                  <PlayableReel reel={reel} />
                </div>
              );
            })}
          </div>
        ) : (
          <div data-fx="pop" className={`grid gap-5 ${category.cols}`}>
            {(items as string[]).map((src, i) => (
              <figure key={src} className="group">
                <div className={`rounded-media relative w-full border border-white/10 bg-neutral-900 ${category.aspect}`}>
                  <Image
                    src={src}
                    alt={`${brand.name}: ${category.title} ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="zoom-img object-cover"
                  />
                  {category.key === "carousels" && (
                    <span className="t-label absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-white backdrop-blur-md">
                      Slide {i + 1}/{items.length}
                    </span>
                  )}
                </div>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnebosStudiosPage() {
  const s = anebosStudio;
  const nextProject = projects.find((p) => p.slug === "amigos-overseas") ?? projects[0];

  return (
    <main className="theme-dark min-h-screen pt-36">
      <div className="gutter">
        <div className="pb-8">
          <Link href="/work" className="t-label inline-flex items-center gap-2 text-white/50 transition-colors hover:text-lime">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Work [アーカイブ]
          </Link>
        </div>

        {/* 01 Studio header */}
        <header className="border-b border-white/15 pb-16">
          <div className="t-label mb-4 text-lime">Flagship · Creative Studio · {s.years}</div>
          <RevealLines as="h1" lines={["ANEBOS", "STUDIOS."]} outlineLines={[1]} className="t-display font-medium tracking-tighter text-white" />
          <p className="t-lead mt-6 max-w-3xl font-light leading-relaxed text-white/70">{s.tagline}</p>
        </header>

        {/* 02 Cover */}
        <div className="py-16">
          <div data-fx="rise" className="rounded-media relative aspect-[16/9] w-full bg-neutral-900">
            <RevealImage src={s.hero} alt="Anebos Studios" className="h-full w-full" priority sizes="100vw" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-full border border-white/10 bg-black/80 px-5 py-3 text-xs uppercase tracking-wider text-white backdrop-blur-md md:bottom-4 md:left-4 md:right-4">
              <span className="text-white/60">Aaira Basit</span>
              <span className="font-bold text-lime">{s.role}</span>
            </div>
          </div>
        </div>

        {/* 03 Fact bar */}
        <div className="grid grid-cols-2 gap-6 border-y border-white/15 py-12 font-mono text-xs md:grid-cols-4">
          <div>
            <span className="mb-1 block uppercase text-white/40">01 / Role</span>
            <span className="font-semibold text-white">{s.role}</span>
          </div>
          <div>
            <span className="mb-1 block uppercase text-white/40">02 / Years</span>
            <span className="font-semibold text-white">{s.years}</span>
          </div>
          <div>
            <span className="mb-1 block uppercase text-white/40">03 / Services</span>
            <span className="text-white/70">{s.services}</span>
          </div>
          <div>
            <span className="mb-1 block uppercase text-white/40">04 / Brands</span>
            <span className="font-semibold text-lime">{s.brands.map((b) => b.name).join(" · ")}</span>
          </div>
        </div>

        {/* 04 Studio introduction */}
        <section className="grid grid-cols-1 gap-12 border-b border-white/15 py-20 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-6">
            <span className="t-label text-lime">01 / THE STUDIO</span>
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              A studio first, then the brands.
            </h2>
            <p className="t-body font-light leading-relaxed text-white/70">{s.overview}</p>
          </div>
          <div className="space-y-4 lg:col-span-5 lg:col-start-8">
            <span className="t-label text-lime">02 / HOW WE WORKED</span>
            <p className="t-body font-light leading-relaxed text-white/70">{s.approach}</p>
          </div>
        </section>

        {/* 05 Brand index */}
        <nav aria-label="Brands in this case study" className="py-16">
          <span className="t-label mb-6 block text-white/50">In this case study</span>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {s.brands.map((b, i) => (
              <li key={b.slug}>
                <a href={`#${b.slug}`} className="group flex items-baseline justify-between gap-6 py-6">
                  <span className="flex items-baseline gap-6">
                    <span className="font-mono text-xs font-bold text-lime">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t-row text-white transition-colors group-hover:text-lime">{b.name}</span>
                  </span>
                  <span className="t-label hidden text-white/40 sm:inline">{b.kicker}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 06 One mini case study per brand */}
        {s.brands.map((b, bi) => (
          <section key={b.slug} id={b.slug} className="scroll-mt-28 border-t border-white/15 pt-24 md:pt-32">
            <div className="grid grid-cols-1 gap-8 pb-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="t-label mb-4 block text-lime">
                  Brand {String(bi + 1).padStart(2, "0")} / {String(s.brands.length).padStart(2, "0")} · {b.kicker}
                </span>
                <RevealLines as="h2" lines={[b.name.toUpperCase()]} className="t-section font-medium tracking-tighter text-white" />
              </div>
              <p className="t-body self-end font-light leading-relaxed text-white/70 lg:col-span-4">{b.intro}</p>
            </div>

            {studioCategories
              .filter((c) => (c.key === "reels" ? b.media.reels.length : b.media[c.key].length) > 0)
              .map((c, ci) => (
                <CategoryBlock key={c.key} brand={b} category={c} index={ci} />
              ))}
          </section>
        ))}

        {/* 07 Next project */}
        <section className="border-t border-white/15 py-24">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group relative block overflow-hidden border border-white/15 bg-neutral-950 p-12 transition-all duration-500 hover:border-lime md:p-20"
            data-cursor-label="Next Project"
          >
            <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <span className="t-label mb-3 block text-lime">Next Project Showcase [次のプロジェクト] →</span>
                <h4 className="t-section text-white transition-colors group-hover:text-lime">{nextProject.title}</h4>
                <p className="t-label mt-2 text-white/50">
                  {nextProject.category} · {nextProject.year}
                </p>
              </div>
              <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-white text-black transition-all group-hover:scale-110 group-hover:bg-lime">
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
