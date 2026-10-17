import React from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import type { NewsletterDesign } from "@/data/projectsData";

/**
 * Newsletter designs: the first issue shown full-length inside an email frame
 * (scrolls inside the frame), the rest as a grid of mockups.
 */
export default function NewsletterShowcase({ items, brand }: { items: NewsletterDesign[]; brand: string }) {
  const [featured, ...rest] = items;
  if (!featured) return null;

  return (
    <div>
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="t-label mb-2 block text-lime">
            <Mail className="mr-1 inline-block h-3.5 w-3.5" />
            Email Design [ニュースレター]
          </span>
          <h3 className="t-section font-medium text-white">Newsletter Designs</h3>
        </div>
        <p className="max-w-md text-sm font-light text-white/60">
          Email layouts I designed for {brand}: one full issue to scroll through, plus more from the series.
        </p>
      </div>

      {/* Featured layout: full-length issue inside an email frame */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        <div data-fx="rise" className="rounded-media border border-white/15 bg-neutral-950 lg:col-span-7">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </span>
            <span className="t-label truncate text-white/50">
              {brand} · {featured.title}
            </span>
          </div>
          <div data-lenis-prevent className="max-h-[78vh] overflow-y-auto bg-white">
            <Image
              src={featured.imageUrl}
              alt={`${brand} newsletter: ${featured.title}`}
              width={1200}
              height={3600}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:col-span-5">
          <span className="t-label text-white/50">Newsletter Layout Showcase</span>
          <h4 className="text-2xl font-medium tracking-tight text-white md:text-3xl">{featured.title}</h4>
          <p className="t-body text-white/70">{featured.caption}</p>
          <span className="t-label text-white/40">Scroll inside the frame to read the full issue ↓</span>
        </div>
      </div>

      {/* More issues */}
      {rest.length > 0 && (
        <div data-fx="pop" className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <figure key={n.id} className="group">
              <div className="rounded-media relative aspect-[3/4] w-full border border-white/10 bg-neutral-900">
                <Image
                  src={n.imageUrl}
                  alt={`${brand} newsletter: ${n.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="zoom-img object-cover object-top"
                />
              </div>
              <figcaption className="mt-4">
                <div className="text-base font-medium text-white">{n.title}</div>
                <div className="mt-1 text-sm font-light text-white/60">{n.caption}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
