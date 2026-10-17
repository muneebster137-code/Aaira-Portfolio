import { media } from "@/data/media";

/** Content for the Anebos Studios flagship page (/work/anebos-studios). Images live in media.ts. */

export type StudioCategoryKey = "logo" | "identity" | "guidelines" | "posts" | "carousels" | "reels" | "marketing" | "other";

export interface StudioCategory {
  key: StudioCategoryKey;
  title: string;
  blurb: string;
  /** Tailwind aspect class for the tiles */
  aspect: string;
  /** Tailwind grid columns for the tiles */
  cols: string;
}

/** Order the categories appear in for every brand. */
export const studioCategories: StudioCategory[] = [
  { key: "logo", title: "Logo Design", blurb: "The primary mark and its variations.", aspect: "aspect-square", cols: "grid-cols-1 sm:grid-cols-2" },
  { key: "identity", title: "Brand Identity", blurb: "Colour, type and the visual language around the logo.", aspect: "aspect-[4/3]", cols: "grid-cols-1 sm:grid-cols-2" },
  { key: "guidelines", title: "Brand Guidelines", blurb: "The rules that keep the brand consistent wherever it shows up.", aspect: "aspect-[3/2]", cols: "grid-cols-1 sm:grid-cols-2" },
  { key: "posts", title: "Social Media Posts", blurb: "Feed posts built on the brand system.", aspect: "aspect-[4/5]", cols: "grid-cols-1 sm:grid-cols-3" },
  { key: "carousels", title: "Carousel Designs", blurb: "Swipeable multi-slide posts, shown slide by slide.", aspect: "aspect-[4/5]", cols: "grid-cols-1 sm:grid-cols-3" },
  { key: "reels", title: "Reel Designs", blurb: "Short-form 9:16 video for the feed.", aspect: "aspect-[9/16]", cols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" },
  { key: "marketing", title: "Marketing Creatives", blurb: "Ads, promos and campaign pieces.", aspect: "aspect-[3/4]", cols: "grid-cols-1 sm:grid-cols-2" },
  { key: "other", title: "Other Brand Assets", blurb: "Everything else the brand needed: stationery, mockups and extras.", aspect: "aspect-[4/3]", cols: "grid-cols-1 sm:grid-cols-2" },
];

export interface StudioBrand {
  slug: string;
  name: string;
  kicker: string;
  intro: string;
  media: (typeof media.work)["anebos-studios"]["brands"][keyof (typeof media.work)["anebos-studios"]["brands"]];
}

export const anebosStudio = {
  name: "Anebos Studios",
  role: "Co-Founder & Creative Director",
  years: "2024 – 2025",
  services: "Branding · Design · Marketing",
  hero: media.work["anebos-studios"].hero,
  tagline: "The creative studio I co-founded, and the brands we built under it.",
  overview:
    "Anebos Studios is a creative studio I co-founded to offer branding, design and marketing to founders and growing businesses. As Co-Founder & Creative Director I set the studio's creative direction and service strategy, ran client work from first brief to final delivery, and coordinated the team behind it.",
  approach:
    "We started by building our own brand, then used the same end-to-end process for every client: logo, identity, guidelines, then the social content, reels and marketing that put the brand in front of people. Each brand below is its own case study, with every type of work kept in its own section.",
  brands: [
    {
      slug: "anebos-studios",
      name: "Anebos Studios",
      kicker: "The studio's own brand",
      intro:
        "Before taking on clients, the studio needed a brand of its own. This is the identity, guidelines and content I built for Anebos Studios itself.",
      media: media.work["anebos-studios"].brands["anebos-studios"],
    },
    {
      slug: "homeloom",
      name: "Homeloom",
      kicker: "Client brand",
      intro:
        "Homeloom is one of the client brands I built at Anebos Studios, from the logo and identity to the guidelines and the social content that launched it.",
      media: media.work["anebos-studios"].brands.homeloom,
    },
    {
      slug: "treats-for-life",
      name: "Treats For Life",
      kicker: "Client brand",
      intro:
        "Treats For Life is another brand built end to end at Anebos Studios, following the same process as Homeloom: identity first, then the content that brings it to life.",
      media: media.work["anebos-studios"].brands["treats-for-life"],
    },
  ] as StudioBrand[],
};
