import { media } from "@/data/media";

export interface ProjectReel {
  id: string;
  title: string;
  duration: string;
  views: string;
  caption: string;
  tags: string[];
  thumbnailUrl: string;
  /** 9:16 .webm clip; thumbnailUrl is its poster */
  videoUrl: string;
  videoStyle: "fashion" | "education" | "studio" | "minimal";
  aspectRatio: "9:16";
}

export interface PostDesignSlide {
  id: string;
  title: string;
  tagline: string;
  slideNumber: number;
  totalSlides: number;
  imageUrl: string;
  description: string;
  category: string;
}

export interface MasonryMediaItem {
  id: string;
  title: string;
  aspectRatio: "9:16" | "4:5" | "16:9" | "1:1" | "3:2" | "4:3";
  imageUrl: string;
  /** .webm clip for reel tiles; imageUrl is its poster */
  videoUrl?: string;
  category: string;
  spanCol?: number; // 1 or 2 columns in grid
  caption: string;
  type: "reel" | "post" | "brand-identity" | "print" | "mockup";
}

export interface NewsletterDesign {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  role: string;
  scope: string[];
  tools: string[];
  tagline: string;
  overview: string;
  challenge: string;
  approach: {
    number: string;
    title: string;
    description: string;
  }[];
  heroImage: string;
  featuredAspect: "16:9" | "4:5" | "9:16" | "3:2" | "4:3";
  reels: ProjectReel[];
  postSlides: PostDesignSlide[];
  masonryGallery: MasonryMediaItem[];
  /** Optional "Newsletter Designs" section; the first item is shown full-length */
  newsletters?: NewsletterDesign[];
  outcomes: {
    label: string;
    metric: string;
    detail: string;
  }[];
  nextProjectSlug: string;
  nextProjectTitle: string;
  /** Shown full-width as the first card on Home and /work */
  flagship?: boolean;
  /** Has its own route under app/work/<slug>; skipped by the generic case-study page */
  customPage?: boolean;
}

export const projects: Project[] = [
  {
    id: "00",
    slug: "anebos-studios",
    title: "Anebos Studios",
    client: "Anebos Studios",
    category: "Creative Studio · 3 Brands",
    year: "2024 – 2025",
    role: "Co-Founder & Creative Director",
    scope: ["Brand Identity", "Logo Design", "Brand Guidelines", "Social Systems", "Marketing Creatives"],
    tools: ["Illustrator", "Photoshop", "InDesign", "Figma", "Premiere Pro", "After Effects", "Canva", "CapCut"],
    tagline: "The creative studio I co-founded, and the brands we built under it: Homeloom and Treats For Life.",
    overview:
      "Anebos Studios is a creative studio I co-founded to offer branding, design and marketing to founders and growing businesses.",
    challenge: "",
    approach: [],
    heroImage: media.work["anebos-studios"].hero,
    featuredAspect: "16:9",
    reels: [],
    postSlides: [],
    masonryGallery: [],
    outcomes: [],
    nextProjectSlug: "amigos-overseas",
    nextProjectTitle: "Amigos Overseas",
    flagship: true,
    customPage: true,
  },
  {
    id: "01",
    slug: "amigos-overseas",
    title: "Amigos Overseas",
    client: "Amigos Overseas Education",
    category: "Global Education & Visas",
    year: "2024 – 2026",
    role: "Creative Direction & Design Operations",
    scope: ["Creative Direction", "Campaign Systems", "Print & Expo", "Social Systems", "Presentations"],
    tools: ["Photoshop", "Illustrator", "Canva", "CapCut", "PowerPoint"],
    tagline: "A consultancy guiding students abroad with a brand that looks like it has already arrived.",
    overview:
      "Amigos Overseas guides students and professionals through international study and visa processes across the UK, Europe, Australia, and North America. As Creative Lead, I architected a unified visual language spanning digital social campaigns, live university expo pavilions, and student guides, elevating the firm into an authoritative market leader.",
    challenge:
      "An overseas education consultancy sells trust before anything else. Students and parents navigate high-stakes life decisions surrounded by aggressive competitors. The previous collateral felt fragmented and ad-hoc. The brand needed an authoritative, refined identity that felt globally accredited, approachable, and immediately recognizable at massive education expos and on high-velocity social feeds.",
    approach: [
      {
        number: "01",
        title: "Architectural Visual Identity",
        description:
          "Formulated a disciplined palette of deep midnight navy, warm amber energy, and structured typography. Created an institutional design system that conveys security and international prestige.",
      },
      {
        number: "02",
        title: "High-Velocity Social Systems",
        description:
          "Engineered modular multi-panel carousel layouts, visa alert templates, and short-form video reels that allow the admissions team to deploy daily updates without aesthetic dilution.",
      },
      {
        number: "03",
        title: "Large-Scale Exhibition Design",
        description:
          "Designed 8-foot expo backdrops, standees, student intake handbooks, and presentation decks engineered for long-distance legibility in high-density convention halls.",
      },
      {
        number: "04",
        title: "Operational Synergy",
        description:
          "Embedded directly with client operations to convert real student questions, policy updates, and visa deadlines into immediate, highly engaging educational visual content.",
      },
    ],
    heroImage: media.work["amigos-overseas"].hero,
    featuredAspect: "16:9",
    reels: [
      {
        id: "amigos-reel-1",
        title: "Global Visa Roadmap 2026",
        duration: "0:28",
        views: "184.2K",
        caption: "Navigating your student visa step-by-step. Key requirements for autumn admissions.",
        tags: ["#StudyAbroad", "#StudentVisa", "#AmigosOverseas", "#HigherEducation"],
        thumbnailUrl: media.work["amigos-overseas"].reels[0].poster,
        videoUrl: media.work["amigos-overseas"].reels[0].video,
        videoStyle: "education",
        aspectRatio: "9:16",
      },
      {
        id: "amigos-reel-2",
        title: "Top 5 European Scholarships",
        duration: "0:34",
        views: "98.5K",
        caption: "Fully-funded graduate scholarships across Germany, Hungary, and Sweden.",
        tags: ["#Scholarships", "#EuropeStudy", "#GlobalEducation"],
        thumbnailUrl: media.work["amigos-overseas"].reels[1].poster,
        videoUrl: media.work["amigos-overseas"].reels[1].video,
        videoStyle: "education",
        aspectRatio: "9:16",
      },
    ],
    postSlides: [
      {
        id: "slide-1",
        title: "Navigating Study Abroad",
        tagline: "Your Complete Guide to Student Visas",
        slideNumber: 1,
        totalSlides: 3,
        imageUrl: media.work["amigos-overseas"].carousel[0],
        description: "Cover slide introducing the multi-tier visa pathway.",
        category: "Social Carousel",
      },
      {
        id: "slide-2",
        title: "Top 5 Student Visa Tips",
        tagline: "Proof of Funds & Documentation",
        slideNumber: 2,
        totalSlides: 3,
        imageUrl: media.work["amigos-overseas"].carousel[1],
        description: "Actionable checklist broken down for rapid student comprehension.",
        category: "Social Carousel",
      },
      {
        id: "slide-3",
        title: "University Admissions Guide",
        tagline: "Deadlines & Acceptance Letters",
        slideNumber: 3,
        totalSlides: 3,
        imageUrl: media.work["amigos-overseas"].carousel[2],
        description: "Conversion panel driving direct consultation bookings.",
        category: "Social Carousel",
      },
    ],
    masonryGallery: [
      {
        id: "amigos-m-1",
        title: "Global Pathways Campaign Visual",
        aspectRatio: "16:9",
        imageUrl: media.work["amigos-overseas"].gallery[0].image,
        category: "Campaign Design",
        spanCol: 2,
        caption: "Lead hero key visual for nationwide international education recruitment.",
        type: "post",
      },
      {
        id: "amigos-m-2",
        title: "Instagram Carousel Grid (3-Panel)",
        aspectRatio: "1:1",
        imageUrl: media.work["amigos-overseas"].gallery[1].image,
        category: "Social Media System",
        spanCol: 1,
        caption: "Multi-panel social layout engineered for high engagement and swipe rate.",
        type: "post",
      },
      {
        id: "amigos-m-3",
        title: "Visa Acceptance Reels Showcase",
        aspectRatio: "9:16",
        imageUrl: media.work["amigos-overseas"].gallery[2].image,
        videoUrl: media.work["amigos-overseas"].gallery[2].video,
        category: "Short-Form Video Production",
        spanCol: 1,
        caption: "Vertical video campaign capturing student departure milestones.",
        type: "reel",
      },
      {
        id: "amigos-m-4",
        title: "Institutional Brand Guidelines",
        aspectRatio: "3:2",
        imageUrl: media.work["amigos-overseas"].gallery[3].image,
        category: "Brand Systems",
        spanCol: 2,
        caption: "Comprehensive print, typography, and visual ruleset across 4 global branches.",
        type: "brand-identity",
      },
    ],
    outcomes: [
      { label: "Asset Output", metric: "250+", detail: "Cohesive multi-channel assets designed & deployed" },
      { label: "Event Presence", metric: "12", detail: "Exhibitions & international education expos branded" },
      { label: "Engagement", metric: "+180%", detail: "Increase in organic social inquiry conversion" },
    ],
    nextProjectSlug: "buda-fashion",
    nextProjectTitle: "Buda Fashion",
  },
  {
    id: "02",
    slug: "buda-fashion",
    title: "Buda Fashion",
    client: "Buda Fashion Startup",
    category: "Fashion & Runway (Hungary)",
    year: "2025",
    role: "Creative Director & Marketing Associate",
    scope: ["Campaign Visuals", "Social Content", "Fashion Show Storytelling", "Poster Design"],
    tools: ["Photoshop", "Illustrator", "Canva", "AI Visual Synthesis"],
    tagline: "A young Hungarian fashion label with visuals carrying the mood before garments even hit the runway.",
    overview:
      "Buda Fashion is a Budapest-born fashion startup merging avant-garde European tailoring with raw industrial streetwear. Collaborating remotely with the CEO and lead apparel design team, I conceptualized the brand's visual identity, runway campaign teasers, social media editorial lookbooks, and fashion week promotional systems.",
    challenge:
      "A nascent fashion brand must appear culturally established and aspirational from its very first post. With saturated digital feeds, product photography alone is insufficient; the visuals needed to evoke an entire subculture, mood, and aesthetic philosophy before the commercial collection dropped.",
    approach: [
      {
        number: "01",
        title: "Textural Narrative",
        description:
          "Rooted the visual direction in brutalist architectural concrete, dramatic chiaroscuro lighting, and high-grain European cinematography to mirror the garments' angular silhouettes.",
      },
      {
        number: "02",
        title: "The 3-Panel Lookbook System",
        description:
          "Designed continuous swipeable Instagram carousels that function like digital editorial magazine spreads, breaking down runway looks with typography overlays and fabric close-ups.",
      },
      {
        number: "03",
        title: "Runway Event Storytelling",
        description:
          "Produced high-impact digital posters, invitation decks, and real-time social backstage video snippets for Budapest fashion presentations.",
      },
      {
        number: "04",
        title: "Consistent Cadence",
        description:
          "Maintained an uncompromising editorial standard across high-frequency daily drops, building anticipation between limited seasonal releases.",
      },
    ],
    heroImage: media.work["buda-fashion"].hero,
    featuredAspect: "9:16",
    reels: [
      {
        id: "buda-reel-1",
        title: "AW25 Runway Teaser // Budapest",
        duration: "0:15",
        views: "240.8K",
        caption: "Substance meets raw tailoring. Buda Fashion Autumn/Winter runway preview.",
        tags: ["#BudaFashion", "#BudapestFashionWeek", "#AvantGarde", "#Tailoring"],
        thumbnailUrl: media.work["buda-fashion"].reels[0].poster,
        videoUrl: media.work["buda-fashion"].reels[0].video,
        videoStyle: "fashion",
        aspectRatio: "9:16",
      },
      {
        id: "buda-reel-2",
        title: "Backstage Motion Study",
        duration: "0:22",
        views: "115.4K",
        caption: "Movement in monochrome. Model walk and structural silhouette study.",
        tags: ["#FashionFilm", "#Streetwear", "#MonochromeAesthetic"],
        thumbnailUrl: media.work["buda-fashion"].reels[1].poster,
        videoUrl: media.work["buda-fashion"].reels[1].video,
        videoStyle: "fashion",
        aspectRatio: "9:16",
      },
    ],
    postSlides: [
      {
        id: "buda-slide-1",
        title: "BUDA ESSENCE",
        tagline: "Monochrome Tailoring Vol. 1",
        slideNumber: 1,
        totalSlides: 3,
        imageUrl: media.work["buda-fashion"].carousel[0],
        description: "Minimalist coat tailoring shot against raw concrete textures.",
        category: "Editorial Lookbook",
      },
      {
        id: "buda-slide-2",
        title: "FASHION RAW",
        tagline: "Defining Style Through Substance",
        slideNumber: 2,
        totalSlides: 3,
        imageUrl: media.work["buda-fashion"].carousel[1],
        description: "Tactile leather craftsmanship and micro-detail stitchwork.",
        category: "Editorial Lookbook",
      },
      {
        id: "buda-slide-3",
        title: "THE NEW UNIFORM",
        tagline: "A/W 2024 Collection Drop",
        slideNumber: 3,
        totalSlides: 3,
        imageUrl: media.work["buda-fashion"].carousel[2],
        description: "Call-to-action slide directing enthusiasts to online private drops.",
        category: "Editorial Lookbook",
      },
    ],
    masonryGallery: [
      {
        id: "buda-m-1",
        title: "Runway Showcase Hero Visual",
        aspectRatio: "9:16",
        imageUrl: media.work["buda-fashion"].gallery[0].image,
        videoUrl: media.work["buda-fashion"].gallery[0].video,
        category: "Campaign Photography",
        spanCol: 1,
        caption: "Lead model walk at Budapest Industrial Runway presentation.",
        type: "reel",
      },
      {
        id: "buda-m-2",
        title: "Social Lookbook 3-Grid Spread",
        aspectRatio: "1:1",
        imageUrl: media.work["buda-fashion"].gallery[1].image,
        category: "Post Design Layout",
        spanCol: 1,
        caption: "Editorial Instagram triptych connecting three modular post frames.",
        type: "post",
      },
      {
        id: "buda-m-3",
        title: "Kinetic Sculpture & Spatial Concept",
        aspectRatio: "16:9",
        imageUrl: media.work["buda-fashion"].gallery[2].image,
        category: "Spatial Concept",
        spanCol: 2,
        caption: "3D installation concept for the Buda Fashion pop-up flagship experience.",
        type: "mockup",
      },
      {
        id: "buda-m-4",
        title: "Minimalist Brand Stationery",
        aspectRatio: "3:2",
        imageUrl: media.work["buda-fashion"].gallery[3].image,
        category: "Brand Collateral",
        spanCol: 2,
        caption: "Lookbook printing specifications, hangtags, and embossed invitations.",
        type: "brand-identity",
      },
    ],
    outcomes: [
      { label: "Community Growth", metric: "+320%", detail: "Follower acceleration during the 4-month runway launch" },
      { label: "Collection Sellout", metric: "48 hrs", detail: "Initial capsule release completely sold out" },
      { label: "Runway Coverage", metric: "6", detail: "European fashion blog features and press inclusions" },
    ],
    nextProjectSlug: "manaaq-creatives",
    nextProjectTitle: "Manaaq Creative Studios",
  },
  {
    id: "03",
    slug: "manaaq-creatives",
    title: "Manaaq Creative Studios",
    client: "Manaaq Creative Studios",
    category: "Brand Architecture · 4 Brands",
    year: "2024 – Current",
    role: "Creative Director",
    scope: ["Brand Identity", "Design Systems", "Social Media", "AI Creative Production", "Print"],
    tools: ["Photoshop", "Illustrator", "Canva", "CapCut", "Figma", "PowerPoint"],
    tagline: "One creative studio. Three brands under it. One Creative Director running the entire visual universe.",
    overview:
      "Manaaq Creative Studios is a multi-disciplinary creative studio behind several consumer and professional brands. As its Creative Director, I built and run the complete design ecosystems for the studio and its three brands: Ellie Junior (infant lifestyle), Oopsies (youth lifestyle), and NH Consultants (educational advising).",
    challenge:
      "Four separate brands with divergent audiences, aesthetics, and tones of voice required continuous daily asset generation without hiring an entire agency department. The challenge was maintaining absolute individuality for each brand while establishing a singular, hyper-efficient production machine behind the scenes.",
    approach: [
      {
        number: "01",
        title: "Divergent Brand Personas",
        description:
          "Formulated bespoke design languages for each brand: Ellie Junior is soft Scandinavian warmth, Oopsies is vibrant playful youth, NH is crisp corporate credibility, and Manaaq is minimalist luxury.",
      },
      {
        number: "02",
        title: "Shared Production Engine",
        description:
          "Standardized design tokens, typography rules, and reusable component libraries in Illustrator and Canva, drastically accelerating turnaround time without sacrificing fidelity.",
      },
      {
        number: "03",
        title: "AI-Augmented Creative Production",
        description:
          "Integrated generative creative tools to produce high-resolution lifestyle imagery, motion assets, and thematic backgrounds, curated and polished by hand for brand fidelity.",
      },
      {
        number: "04",
        title: "Cross-Disciplinary Deliverables",
        description:
          "Executed pitch decks for investors, packaging die-lines, retail signage, e-commerce promotional carousels, and high-impact reel content seamlessly.",
      },
    ],
    heroImage: media.work["manaaq-creatives"].hero,
    featuredAspect: "3:2",
    reels: [
      {
        id: "manaaq-reel-1",
        title: "Brand Ecosystem Reveal",
        duration: "0:30",
        views: "89.1K",
        caption: "Inside Manaaq: Four brands, singular architectural vision. From identity to product.",
        tags: ["#BrandArchitecture", "#CreativeDirection", "#ManaaqCreativeStudios"],
        thumbnailUrl: media.work["manaaq-creatives"].reels[0].poster,
        videoUrl: media.work["manaaq-creatives"].reels[0].video,
        videoStyle: "minimal",
        aspectRatio: "9:16",
      },
    ],
    postSlides: [
      {
        id: "manaaq-slide-1",
        title: "Identity Manual",
        tagline: "Spatial & Typographic Rules",
        slideNumber: 1,
        totalSlides: 3,
        imageUrl: media.work["manaaq-creatives"].carousel[0],
        description: "Parent entity identity and business collateral guidelines.",
        category: "System Design",
      },
      {
        id: "manaaq-slide-2",
        title: "Brand Hierarchy",
        tagline: "Ellie Junior · Oopsies · NH",
        slideNumber: 2,
        totalSlides: 3,
        imageUrl: media.work["manaaq-creatives"].carousel[1],
        description: "Subsidiary brand packaging and product aesthetic showcase.",
        category: "Packaging System",
      },
      {
        id: "manaaq-slide-3",
        title: "Nordic Nursery Lookbook",
        tagline: "Sustainable Toddler Essentials",
        slideNumber: 3,
        totalSlides: 3,
        imageUrl: media.work["manaaq-creatives"].carousel[2],
        description: "Ellie Junior editorial product catalog spread.",
        category: "Editorial Lookbook",
      },
    ],
    masonryGallery: [
      {
        id: "manaaq-m-1",
        title: "Corporate Identity Collateral & Book",
        aspectRatio: "3:2",
        imageUrl: media.work["manaaq-creatives"].gallery[0].image,
        category: "Brand Identity",
        spanCol: 2,
        caption: "Linen-bound identity manual, black foil business cards, and typographic posters.",
        type: "brand-identity",
      },
      {
        id: "manaaq-m-2",
        title: "Oopsies Playful Product Line",
        aspectRatio: "1:1",
        imageUrl: media.work["manaaq-creatives"].gallery[1].image,
        category: "Product & Packaging",
        spanCol: 1,
        caption: "Vibrant ceramic mugs, skincare serums, and lifestyle accessory packaging.",
        type: "mockup",
      },
      {
        id: "manaaq-m-3",
        title: "Ellie Junior Lookbook SS24",
        aspectRatio: "4:3",
        imageUrl: media.work["manaaq-creatives"].gallery[2].image,
        category: "Editorial Print",
        spanCol: 1,
        caption: "Organic linen romper and wooden toy catalog spread.",
        type: "print",
      },
      {
        id: "manaaq-m-4",
        title: "Amanation Kinetic Brand Sculpture",
        aspectRatio: "16:9",
        imageUrl: media.work["manaaq-creatives"].gallery[3].image,
        category: "Spatial Installation",
        spanCol: 2,
        caption: "Digital showroom centerpiece designed for interactive web experience.",
        type: "mockup",
      },
    ],
    outcomes: [
      { label: "Brands Directed", metric: "4", detail: "Independent brands managed end-to-end" },
      { label: "Assets Shipped", metric: "500+", detail: "Multi-channel designs produced within 12 months" },
      { label: "Team Overhead", metric: "Zero", detail: "Solo creative direction replacing an external agency" },
    ],
    nextProjectSlug: "ellie-junior",
    nextProjectTitle: "Ellie Junior",
  },
  {
    id: "04",
    slug: "ellie-junior",
    title: "Ellie Junior",
    client: "Ellie Junior (Manaaq Creative Studios)",
    category: "Toddler Apparel & Baby Lifestyle",
    year: "2024 – 2025",
    role: "Creative Director",
    scope: ["Social Campaigns", "Packaging Design", "Lookbook Editorial", "AI Creative Production"],
    tools: ["Photoshop", "Illustrator", "Canva", "AI Image Generation"],
    tagline: "Soft, trustworthy Scandinavian visuals designed for parents scrolling fast.",
    overview:
      "Ellie Junior is an eco-conscious baby and toddler brand specializing in sustainable organic linen rompers, swaddle sets, and artisan wooden toys. I shaped the complete digital storefront presence, creating a serene, heartwarming visual universe that builds instantaneous parental trust.",
    challenge:
      "Parents making baby care purchases have high sensory and safety expectations. The digital imagery had to convey fabric softness, non-toxic organic materials, and wholesome calm within fractions of a second on Instagram and Pinterest feeds.",
    approach: [
      {
        number: "01",
        title: "Neutral Earth Palette",
        description:
          "Curated warm oat, sage muslin, natural birch wood, and cloud cream tones to evoke purity and Scandinavian simplicity.",
      },
      {
        number: "02",
        title: "Editorial Catalog Direction",
        description:
          "Structured clean multi-page lookbooks pairing candid joyful infant photography with precise material callouts and sustainable certifications.",
      },
      {
        number: "03",
        title: "Playable Micro-Reels",
        description:
          "Produced calm, aesthetic unboxing reels highlighting organic textile textures and baby nursery styling tips.",
      },
      {
        number: "04",
        title: "Packaging Experience",
        description:
          "Designed recyclable seed-paper hangtags and minimalist cardboard box sleeves with delicate line art illustrations.",
      },
    ],
    heroImage: media.work["ellie-junior"].hero,
    featuredAspect: "4:3",
    reels: [
      {
        id: "ellie-reel-1",
        title: "SS24 Linen Collection",
        duration: "0:20",
        views: "142.3K",
        caption: "Gentle on sensitive skin. Organic linen rompers crafted for free exploration.",
        tags: ["#EllieJunior", "#BabyFashion", "#OrganicLinen", "#NordicBaby"],
        thumbnailUrl: media.work["ellie-junior"].reels[0].poster,
        videoUrl: media.work["ellie-junior"].reels[0].video,
        videoStyle: "minimal",
        aspectRatio: "9:16",
      },
    ],
    postSlides: [
      {
        id: "ellie-slide-1",
        title: "SIMPLE MOMENTS",
        tagline: "SS24 Collection: Gentle Organic Living",
        slideNumber: 1,
        totalSlides: 2,
        imageUrl: media.work["ellie-junior"].carousel[0],
        description: "Editorial introduction to the sustainable nursery line.",
        category: "Lookbook",
      },
      {
        id: "ellie-slide-2",
        title: "ESSENTIAL ESSENCE",
        tagline: "Pure Scandinavian Comfort",
        slideNumber: 2,
        totalSlides: 2,
        imageUrl: media.work["ellie-junior"].carousel[1],
        description: "Product detail callouts for linen romper, muslin swaddle, and wooden bunny.",
        category: "Product Specs",
      },
    ],
    masonryGallery: [
      {
        id: "ellie-m-1",
        title: "Spring Lookbook Spread",
        aspectRatio: "4:3",
        imageUrl: media.work["ellie-junior"].gallery[0].image,
        category: "Editorial Design",
        spanCol: 2,
        caption: "Minimalist two-page lookbook layout featuring natural nursery styling.",
        type: "print",
      },
      {
        id: "ellie-m-2",
        title: "Creative Studio Identity",
        aspectRatio: "3:2",
        imageUrl: media.work["ellie-junior"].gallery[1].image,
        category: "Brand Architecture",
        spanCol: 1,
        caption: "Parent company architectural branding and production systems.",
        type: "brand-identity",
      },
      {
        id: "ellie-m-3",
        title: "Kids Lifestyle Packaging",
        aspectRatio: "1:1",
        imageUrl: media.work["ellie-junior"].gallery[2].image,
        category: "Packaging System",
        spanCol: 1,
        caption: "Sister brand accessories showcasing modular brand consistency.",
        type: "mockup",
      },
    ],
    newsletters: [
      {
        id: "ellie-nl-1",
        title: "Monthly Newsletter",
        caption: "A full issue: new arrivals, care tips for organic fabrics and a soft call to shop, laid out for quick reading on a phone.",
        imageUrl: media.work["ellie-junior"].newsletters[0],
      },
      {
        id: "ellie-nl-2",
        title: "New Collection Launch",
        caption: "Launch email introducing a new collection.",
        imageUrl: media.work["ellie-junior"].newsletters[1],
      },
      {
        id: "ellie-nl-3",
        title: "Seasonal Edit",
        caption: "Seasonal picks styled around the nursery.",
        imageUrl: media.work["ellie-junior"].newsletters[2],
      },
      {
        id: "ellie-nl-4",
        title: "Parent Tips",
        caption: "Helpful content issue that keeps parents opening between launches.",
        imageUrl: media.work["ellie-junior"].newsletters[3],
      },
    ],
    outcomes: [
      { label: "Lookbook Views", metric: "45K+", detail: "Digital catalog reads during launch month" },
      { label: "ROAS Increase", metric: "2.4x", detail: "Return on ad spend across social campaign sets" },
      { label: "Return Rate", metric: "<1.2%", detail: "High product accuracy reducing customer churn" },
    ],
    nextProjectSlug: "oopsies",
    nextProjectTitle: "Oopsies",
  },
  {
    id: "05",
    slug: "oopsies",
    title: "Oopsies",
    client: "Oopsies (Manaaq Creative Studios)",
    category: "Youth Lifestyle Goods · A Manaaq Brand",
    year: "2024 – Current",
    role: "Creative Director",
    scope: ["Brand Identity", "Social Systems", "Packaging Design", "Merchandising"],
    tools: ["Photoshop", "Illustrator", "Canva", "CapCut", "AI Image Generation"],
    tagline: "A subsidiary brand with a look of its own.",
    overview:
      "Oopsies is a youth lifestyle brand under Manaaq Creative Studios, selling playful accessories, packaging-led products and stationery. I'm its creative lead: I built the visual identity, design the packaging and run the social feed, alongside the other Manaaq brands.",
    challenge:
      "Oopsies shares a parent company, a production system and a Creative Director with three other brands, yet it speaks to a much younger, louder audience. It had to feel bold and fun on its own terms without ever being mistaken for Manaaq, Ellie Junior or NH Consultants.",
    approach: [
      {
        number: "01",
        title: "A Voice of Its Own",
        description:
          "I gave Oopsies its own colour, type and layout rules, louder and more playful than its sister brands, so a post is recognisable before the logo appears.",
      },
      {
        number: "02",
        title: "Packaging First",
        description:
          "I designed packaging and product labels as the brand's main stage, so the products themselves carry the identity into people's hands and photos.",
      },
      {
        number: "03",
        title: "Social on a Shared Engine",
        description:
          "I run the feed on the same templates, asset libraries and content calendar as the other Manaaq brands, restyled for Oopsies, so it keeps a steady rhythm without extra hands.",
      },
      {
        number: "04",
        title: "AI as a Production Tool",
        description:
          "I use AI-generated imagery to cover volume, then direct, select and finish everything by hand so it still looks like Oopsies.",
      },
    ],
    heroImage: media.work.oopsies.hero,
    featuredAspect: "4:3",
    reels: [
      {
        id: "oopsies-reel-1",
        title: "Oopsies Product Reel",
        duration: "0:06",
        views: "",
        caption: "Short-form product reel built for the Oopsies feed.",
        tags: ["#Oopsies", "#ManaaqCreativeStudios", "#ProductReel"],
        thumbnailUrl: media.work.oopsies.reels[0].poster,
        videoUrl: media.work.oopsies.reels[0].video,
        videoStyle: "studio",
        aspectRatio: "9:16",
      },
    ],
    postSlides: [
      {
        id: "oopsies-slide-1",
        title: "MEET OOPSIES",
        tagline: "Brand introduction",
        slideNumber: 1,
        totalSlides: 3,
        imageUrl: media.work.oopsies.carousel[0],
        description: "Opening slide that sets the brand's tone.",
        category: "Social Carousel",
      },
      {
        id: "oopsies-slide-2",
        title: "THE PRODUCTS",
        tagline: "What's in the range",
        slideNumber: 2,
        totalSlides: 3,
        imageUrl: media.work.oopsies.carousel[1],
        description: "Product slide showing the range in the brand's styling.",
        category: "Social Carousel",
      },
      {
        id: "oopsies-slide-3",
        title: "GET YOURS",
        tagline: "Where to shop",
        slideNumber: 3,
        totalSlides: 3,
        imageUrl: media.work.oopsies.carousel[2],
        description: "Closing slide that sends people to shop.",
        category: "Social Carousel",
      },
    ],
    masonryGallery: [
      {
        id: "oopsies-m-1",
        title: "Packaging System",
        aspectRatio: "4:3",
        imageUrl: media.work.oopsies.gallery[0].image,
        category: "Packaging Design",
        spanCol: 2,
        caption: "Packaging and labels that carry the identity onto the product.",
        type: "mockup",
      },
      {
        id: "oopsies-m-2",
        title: "Social Post Set",
        aspectRatio: "1:1",
        imageUrl: media.work.oopsies.gallery[1].image,
        category: "Social Media",
        spanCol: 1,
        caption: "Feed posts built on the shared Manaaq templates, restyled for Oopsies.",
        type: "post",
      },
      {
        id: "oopsies-m-3",
        title: "Brand Identity Sheet",
        aspectRatio: "3:2",
        imageUrl: media.work.oopsies.gallery[2].image,
        category: "Brand Identity",
        spanCol: 1,
        caption: "Logo, colour and type rules that keep Oopsies distinct from its sister brands.",
        type: "brand-identity",
      },
    ],
    outcomes: [
      { label: "Design Team", metric: "1", detail: "I handle identity, packaging and social myself" },
      { label: "Brands on One System", metric: "4", detail: "Oopsies shares one production system with the other Manaaq brands" },
      { label: "Formats", metric: "3", detail: "Packaging, social posts and reels, in one consistent look" },
    ],
    nextProjectSlug: "nh-consultants",
    nextProjectTitle: "NH Consultants",
  },
  {
    id: "06",
    slug: "nh-consultants",
    title: "NH Consultants",
    client: "NH Consultants (Manaaq Creative Studios)",
    category: "Overseas Educational Consultancy",
    year: "2024 – Current",
    role: "Creative Director",
    scope: ["Social Systems", "Presentations", "Corporate Profiles", "Brand Identity"],
    tools: ["Photoshop", "Illustrator", "Canva", "PowerPoint"],
    tagline: "Clear, credible design for families making a big decision.",
    overview:
      "NH Consultants is an overseas educational consultancy under Manaaq Creative Studios, guiding students and their families through studying abroad. I lead its visual communication: the social feed, presentation decks and the corporate profile that introduces the firm.",
    challenge:
      "Choosing to study abroad is a big, expensive decision, and families need to trust the consultancy before they read a word. The design had to feel calm, clear and credible, while the feed kept up with deadlines and policy updates every week.",
    approach: [
      {
        number: "01",
        title: "Clarity Over Decoration",
        description:
          "I set a restrained palette and strict type hierarchy so every post answers one question fast and nothing feels like a sales pitch.",
      },
      {
        number: "02",
        title: "Decks That Explain",
        description:
          "I designed presentation decks and a corporate profile that walk families through the process step by step, built to work in a meeting room and on a phone.",
      },
      {
        number: "03",
        title: "A Feed That Keeps Up",
        description:
          "I built reusable social templates for deadlines, requirements and updates, so new information goes out the same day without the look slipping.",
      },
      {
        number: "04",
        title: "Part of the Manaaq System",
        description:
          "NH runs on the same shared production system as the other Manaaq brands, with its own calm, institutional face.",
      },
    ],
    heroImage: media.work["nh-consultants"].hero,
    featuredAspect: "16:9",
    reels: [
      {
        id: "nh-reel-1",
        title: "Study Abroad Explainer",
        duration: "0:06",
        views: "",
        caption: "Short explainer reel for students and families planning to study abroad.",
        tags: ["#NHConsultants", "#StudyAbroad", "#ManaaqCreativeStudios"],
        thumbnailUrl: media.work["nh-consultants"].reels[0].poster,
        videoUrl: media.work["nh-consultants"].reels[0].video,
        videoStyle: "education",
        aspectRatio: "9:16",
      },
    ],
    postSlides: [
      {
        id: "nh-slide-1",
        title: "THINKING OF STUDYING ABROAD?",
        tagline: "Where to start",
        slideNumber: 1,
        totalSlides: 3,
        imageUrl: media.work["nh-consultants"].carousel[0],
        description: "Opening slide that frames the decision.",
        category: "Social Carousel",
      },
      {
        id: "nh-slide-2",
        title: "WHAT YOU'LL NEED",
        tagline: "Documents & deadlines",
        slideNumber: 2,
        totalSlides: 3,
        imageUrl: media.work["nh-consultants"].carousel[1],
        description: "Checklist slide laid out for quick reading.",
        category: "Social Carousel",
      },
      {
        id: "nh-slide-3",
        title: "TALK TO US",
        tagline: "Book a consultation",
        slideNumber: 3,
        totalSlides: 3,
        imageUrl: media.work["nh-consultants"].carousel[2],
        description: "Closing slide that leads to a consultation.",
        category: "Social Carousel",
      },
    ],
    masonryGallery: [
      {
        id: "nh-m-1",
        title: "Corporate Profile",
        aspectRatio: "16:9",
        imageUrl: media.work["nh-consultants"].gallery[0].image,
        category: "Corporate Profile",
        spanCol: 2,
        caption: "The profile that introduces NH Consultants to students, parents and partners.",
        type: "print",
      },
      {
        id: "nh-m-2",
        title: "Presentation Deck",
        aspectRatio: "4:3",
        imageUrl: media.work["nh-consultants"].gallery[1].image,
        category: "Presentations",
        spanCol: 1,
        caption: "Deck slides that walk families through the process.",
        type: "post",
      },
      {
        id: "nh-m-3",
        title: "Social Templates",
        aspectRatio: "1:1",
        imageUrl: media.work["nh-consultants"].gallery[2].image,
        category: "Social Media",
        spanCol: 1,
        caption: "Reusable templates for deadlines, requirements and updates.",
        type: "post",
      },
    ],
    outcomes: [
      { label: "Design Team", metric: "1", detail: "I handle the feed, decks and profile myself" },
      { label: "Brands on One System", metric: "4", detail: "NH shares one production system with the other Manaaq brands" },
      { label: "Formats", metric: "3", detail: "Social posts, presentation decks and a corporate profile" },
    ],
    nextProjectSlug: "anebos-studios",
    nextProjectTitle: "Anebos Studios",
  },
];

export const earlierProjects = [
  {
    title: "SZABIST Incubation Centre",
    role: "Co-Lead Marketing & Design",
    year: "2023 – 2024",
    description: "Spearheaded content creation, artistic direction, and startup brand storytelling for tech incubatees.",
    tags: ["Incubation", "Startup Branding", "Event Design"],
  },
  {
    title: "Consultivo",
    role: "Marketing & Design Intern",
    year: "2024",
    description: "Supported brand identity initiatives, digital campaign collateral, and market research property.",
    tags: ["Digital Campaigns", "Brand Strategy", "Research"],
  },
];
