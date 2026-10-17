/**
 * MEDIA LIBRARY: every image and reel on the site, in one place.
 *
 * Each entry points to a file in /public/media. To change a picture or reel,
 * replace that file in /public/media with a new one of the SAME name and
 * extension. No code changes needed. MEDIA.md (repo root) lists every file and
 * where it shows up; `npm run media:check` confirms nothing is missing.
 *
 * Images are .jpg, the resume is .pdf. Reels are .webm (VP9/VP8, 9:16), each with a .jpg poster of
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
  counts: { reels: number; carousel: number; gallery: number; galleryReels?: number[]; newsletters?: number }
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
    /** Newsletter designs: newsletter-1.jpg is the full-length featured issue, the rest are mockups */
    newsletters: range(counts.newsletters ?? 0).map((n) => `${dir}/newsletter-${n}.jpg`),
  };
}

/**
 * Slots for one brand on the Anebos Studios page (/public/media/work/anebos-studios/<brand>/...).
 * Each category is numbered: logo-1.jpg, logo-2.jpg, ... Raise a count to add more.
 */
function studioBrand(
  brand: string,
  counts: { logo: number; identity: number; guidelines: number; posts: number; carousels: number; reels: number; marketing: number; other?: number }
) {
  const dir = `${M}/work/anebos-studios/${brand}`;
  const list = (name: string, n: number) => Array.from({ length: n }, (_, i) => `${dir}/${name}-${i + 1}.jpg`);
  return {
    logo: list("logo", counts.logo),
    identity: list("identity", counts.identity),
    guidelines: list("guidelines", counts.guidelines),
    posts: list("posts", counts.posts),
    carousels: list("carousel", counts.carousels),
    reels: Array.from({ length: counts.reels }, (_, i) => ({ video: `${dir}/reel-${i + 1}.webm`, poster: `${dir}/reel-${i + 1}.jpg` })),
    marketing: list("marketing", counts.marketing),
    other: list("other", counts.other ?? 0),
  };
}

export const media = {
  home: {
    /** Full-bleed still photo behind the whole hero (darkened for legibility; avoid big logos) */
    heroBackground: `${M}/home/hero-background.jpg`,
    /** The pill "monitor" slideshow inside the hero headline (in order) */
    heroReel: [1, 2, 3, 4, 5].map((n) => `${M}/home/hero-${n}.jpg`),
    /** Portrait in the white "Trained in psychology" section */
    philosophyPortrait: `${M}/home/philosophy-portrait.jpg`,
    /** Manaaq Creative Studios accordion panels */
    brands: {
      manaaq: `${M}/home/brands-manaaq.jpg`,
      ellieJunior: `${M}/home/brands-ellie-junior.jpg`,
      oopsies: `${M}/home/brands-oopsies.jpg`,
      nhConsultants: `${M}/home/brands-nh-consultants.jpg`,
    },
  },

  /** Hover previews in the full-screen menu */
  menu: {
    work: `${M}/menu/work.jpg`,
    about: `${M}/menu/about.jpg`,
    services: `${M}/menu/services.jpg`,
    contact: `${M}/menu/contact.jpg`,
  },

  /** Downloadable resume linked from the /resume page */
  resume: {
    pdf: `${M}/resume/aaira-basit-resume.pdf`,
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
    "ellie-junior": project("ellie-junior", { reels: 1, carousel: 2, gallery: 3, newsletters: 4 }),
    oopsies: project("oopsies", { reels: 1, carousel: 3, gallery: 3 }),
    /** Flagship studio page: cover + one block of slots per brand */
    "anebos-studios": {
      hero: `${M}/work/anebos-studios/hero.jpg`,
      brands: {
        "anebos-studios": studioBrand("anebos-studios", { logo: 2, identity: 2, guidelines: 2, posts: 3, carousels: 3, reels: 2, marketing: 2, other: 2 }),
        homeloom: studioBrand("homeloom", { logo: 2, identity: 2, guidelines: 2, posts: 3, carousels: 3, reels: 2, marketing: 2 }),
        "treats-for-life": studioBrand("treats-for-life", { logo: 2, identity: 2, guidelines: 2, posts: 3, carousels: 3, reels: 2, marketing: 2 }),
      },
    },
    "nh-consultants": project("nh-consultants", { reels: 1, carousel: 3, gallery: 3 }),
  },
};
