/**
 * MEDIA LIBRARY: every image and reel on the site, in one place.
 *
 * Each entry points to a file in /public/media. To change a picture or reel,
 * replace that file in /public/media with a new one of the SAME name and
 * extension. No code changes needed. MEDIA.md (repo root) lists every file and
 * where it shows up; `npm run media:check` confirms nothing is missing.
 *
 * Images are .jpg. Reels are .webm (VP9/VP8, 9:16), each with a .jpg poster of
 * the same name that shows before the video loads and if it can't play.
 *
 * Keep this file free of imports: scripts/media-check.mjs reads it directly.
 */

const M = "/media";

export interface ReelMedia {
  /** 9:16 .webm clip */
  video: string;
  /** .jpg shown before playback / as fallback */
  poster: string;
}

export interface GalleryMedia {
  image: string;
  /** Only for gallery tiles that are reels */
  video?: string;
}

/** Builds the slot paths for one case study (/public/media/work/<slug>/...). */
function project(
  slug: string,
  counts: { reels: number; carousel: number; gallery: number; galleryReels?: number[] }
) {
  const dir = `${M}/work/${slug}`;
  const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);
  return {
    /** Project cover: home "Selected work", /work grid, case-study header */
    hero: `${dir}/hero.jpg`,
    /** 9:16 reels: reel-1.webm + reel-1.jpg poster, ... */
    reels: range(counts.reels).map<ReelMedia>((n) => ({
      video: `${dir}/reel-${n}.webm`,
      poster: `${dir}/reel-${n}.jpg`,
    })),
    /** Social carousel slides: carousel-1.jpg, ... */
    carousel: range(counts.carousel).map((n) => `${dir}/carousel-${n}.jpg`),
    /** Masonry showcase tiles: gallery-1.jpg, ... (+ gallery-N.webm for reel tiles) */
    gallery: range(counts.gallery).map<GalleryMedia>((n) =>
      counts.galleryReels?.includes(n)
        ? { image: `${dir}/gallery-${n}.jpg`, video: `${dir}/gallery-${n}.webm` }
        : { image: `${dir}/gallery-${n}.jpg` }
    ),
  };
}

export const media = {
  home: {
    /** Hero background slideshow + the pill "monitor" in the headline (in order) */
    heroReel: [1, 2, 3, 4, 5].map((n) => `${M}/home/hero-${n}.jpg`),
    /** Portrait in the white "Trained in psychology" section */
    philosophyPortrait: `${M}/home/philosophy-portrait.jpg`,
    /** Manaaq Holdings accordion panels */
    holdings: {
      manaaq: `${M}/home/holdings-manaaq.jpg`,
      ellieJunior: `${M}/home/holdings-ellie-junior.jpg`,
      oopsies: `${M}/home/holdings-oopsies.jpg`,
      nhConsultants: `${M}/home/holdings-nh-consultants.jpg`,
    },
  },

  /** Hover previews in the full-screen menu */
  menu: {
    work: `${M}/menu/work.jpg`,
    about: `${M}/menu/about.jpg`,
    services: `${M}/menu/services.jpg`,
    contact: `${M}/menu/contact.jpg`,
  },

  about: {
    /** Portrait beside "Managing the brand's whole visual world" */
    portrait: `${M}/about/portrait.jpg`,
  },

  /** One image per discipline: /services page rows + home "Nine disciplines" hover preview */
  services: {
    "01": `${M}/services/01-brand-identity.jpg`,
    "02": `${M}/services/02-campaign-design.jpg`,
    "03": `${M}/services/03-creative-direction.jpg`,
    "04": `${M}/services/04-print-editorial.jpg`,
    "05": `${M}/services/05-ai-creative-production.jpg`,
    "06": `${M}/services/06-social-media-systems.jpg`,
    "07": `${M}/services/07-presentation-pitch.jpg`,
    "08": `${M}/services/08-visual-storytelling.jpg`,
    "09": `${M}/services/09-marketing-launch.jpg`,
  } as Record<string, string>,

  work: {
    "amigos-overseas": project("amigos-overseas", { reels: 2, carousel: 3, gallery: 4, galleryReels: [3] }),
    "buda-fashion": project("buda-fashion", { reels: 2, carousel: 3, gallery: 4, galleryReels: [1] }),
    "manaaq-creatives": project("manaaq-creatives", { reels: 1, carousel: 3, gallery: 4 }),
    "ellie-junior": project("ellie-junior", { reels: 1, carousel: 2, gallery: 3 }),
  },
};
