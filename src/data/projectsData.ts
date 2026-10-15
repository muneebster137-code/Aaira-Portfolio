export interface ProjectReel {
  id: string;
  title: string;
  duration: string;
  views: string;
  caption: string;
  tags: string[];
  thumbnailUrl: string;
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
  category: string;
  spanCol?: number; // 1 or 2 columns in grid
  caption: string;
  type: "reel" | "post" | "brand-identity" | "print" | "mockup";
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
  outcomes: {
    label: string;
    metric: string;
    detail: string;
  }[];
  nextProjectSlug: string;
  nextProjectTitle: string;
}

export const projects: Project[] = [
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
    heroImage: "/images/amigos_overseas_hero.jpg",
    featuredAspect: "16:9",
    reels: [
      {
        id: "amigos-reel-1",
        title: "Global Visa Roadmap 2026",
        duration: "0:28",
        views: "184.2K",
        caption: "Navigating your student visa step-by-step. Key requirements for autumn admissions.",
        tags: ["#StudyAbroad", "#StudentVisa", "#AmigosOverseas", "#HigherEducation"],
        thumbnailUrl: "/images/amigos_overseas_hero.jpg",
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
        thumbnailUrl: "/images/amigos_social_grid.jpg",
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
        imageUrl: "/images/amigos_social_grid.jpg",
        description: "Cover slide introducing the multi-tier visa pathway.",
        category: "Social Carousel",
      },
      {
        id: "slide-2",
        title: "Top 5 Student Visa Tips",
        tagline: "Proof of Funds & Documentation",
        slideNumber: 2,
        totalSlides: 3,
        imageUrl: "/images/amigos_social_grid.jpg",
        description: "Actionable checklist broken down for rapid student comprehension.",
        category: "Social Carousel",
      },
      {
        id: "slide-3",
        title: "University Admissions Guide",
        tagline: "Deadlines & Acceptance Letters",
        slideNumber: 3,
        totalSlides: 3,
        imageUrl: "/images/amigos_social_grid.jpg",
        description: "Conversion panel driving direct consultation bookings.",
        category: "Social Carousel",
      },
    ],
    masonryGallery: [
      {
        id: "amigos-m-1",
        title: "Global Pathways Campaign Visual",
        aspectRatio: "16:9",
        imageUrl: "/images/amigos_overseas_hero.jpg",
        category: "Campaign Design",
        spanCol: 2,
        caption: "Lead hero key visual for nationwide international education recruitment.",
        type: "post",
      },
      {
        id: "amigos-m-2",
        title: "Instagram Carousel Grid (3-Panel)",
        aspectRatio: "1:1",
        imageUrl: "/images/amigos_social_grid.jpg",
        category: "Social Media System",
        spanCol: 1,
        caption: "Multi-panel social layout engineered for high engagement and swipe rate.",
        type: "post",
      },
      {
        id: "amigos-m-3",
        title: "Visa Acceptance Reels Showcase",
        aspectRatio: "9:16",
        imageUrl: "/images/amigos_overseas_hero.jpg",
        category: "Short-Form Video Production",
        spanCol: 1,
        caption: "Vertical video campaign capturing student departure milestones.",
        type: "reel",
      },
      {
        id: "amigos-m-4",
        title: "Institutional Brand Guidelines",
        aspectRatio: "3:2",
        imageUrl: "/images/manaaq_system_design.jpg",
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
    role: "Creative Designer & Marketing Associate",
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
    heroImage: "/images/buda_fashion_campaign.jpg",
    featuredAspect: "9:16",
    reels: [
      {
        id: "buda-reel-1",
        title: "AW25 Runway Teaser // Budapest",
        duration: "0:15",
        views: "240.8K",
        caption: "Substance meets raw tailoring. Buda Fashion Autumn/Winter runway preview.",
        tags: ["#BudaFashion", "#BudapestFashionWeek", "#AvantGarde", "#Tailoring"],
        thumbnailUrl: "/images/buda_fashion_campaign.jpg",
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
        thumbnailUrl: "/images/buda_post_grid.jpg",
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
        imageUrl: "/images/buda_post_grid.jpg",
        description: "Minimalist coat tailoring shot against raw concrete textures.",
        category: "Editorial Lookbook",
      },
      {
        id: "buda-slide-2",
        title: "FASHION RAW",
        tagline: "Defining Style Through Substance",
        slideNumber: 2,
        totalSlides: 3,
        imageUrl: "/images/buda_post_grid.jpg",
        description: "Tactile leather craftsmanship and micro-detail stitchwork.",
        category: "Editorial Lookbook",
      },
      {
        id: "buda-slide-3",
        title: "THE NEW UNIFORM",
        tagline: "A/W 2024 Collection Drop",
        slideNumber: 3,
        totalSlides: 3,
        imageUrl: "/images/buda_post_grid.jpg",
        description: "Call-to-action slide directing enthusiasts to online private drops.",
        category: "Editorial Lookbook",
      },
    ],
    masonryGallery: [
      {
        id: "buda-m-1",
        title: "Runway Showcase Hero Visual",
        aspectRatio: "9:16",
        imageUrl: "/images/buda_fashion_campaign.jpg",
        category: "Campaign Photography",
        spanCol: 1,
        caption: "Lead model walk at Budapest Industrial Runway presentation.",
        type: "reel",
      },
      {
        id: "buda-m-2",
        title: "Social Lookbook 3-Grid Spread",
        aspectRatio: "1:1",
        imageUrl: "/images/buda_post_grid.jpg",
        category: "Post Design Layout",
        spanCol: 1,
        caption: "Editorial Instagram triptych connecting three modular post frames.",
        type: "post",
      },
      {
        id: "buda-m-3",
        title: "Kinetic Sculpture & Spatial Concept",
        aspectRatio: "16:9",
        imageUrl: "/images/amanation_hero_kinetic.jpg",
        category: "Spatial Concept",
        spanCol: 2,
        caption: "3D installation concept for the Buda Fashion pop-up flagship experience.",
        type: "mockup",
      },
      {
        id: "buda-m-4",
        title: "Minimalist Brand Stationery",
        aspectRatio: "3:2",
        imageUrl: "/images/manaaq_system_design.jpg",
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
    nextProjectTitle: "Manaaq Creatives",
  },
  {
    id: "03",
    slug: "manaaq-creatives",
    title: "Manaaq Creatives",
    client: "Manaaq Umbrella Group",
    category: "Brand Architecture · 4 Brands",
    year: "2024 – Current",
    role: "Lead Visual Designer & Brand Architect",
    scope: ["Brand Identity", "Design Systems", "Social Media", "AI Creative Production", "Print"],
    tools: ["Photoshop", "Illustrator", "Canva", "CapCut", "Figma", "PowerPoint"],
    tagline: "One parent company. Three distinct subsidiaries. One creative lead managing the entire visual universe.",
    overview:
      "Manaaq Creatives is a multi-disciplinary holding entity directing multiple consumer and professional brands. Acting as the sole creative lead, I formulated and sustained the complete design ecosystems for the parent company and its three sub-brands: Ellie Junior (infant lifestyle), Oopsies (youth lifestyle), and NH Consultants (educational advising).",
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
    heroImage: "/images/manaaq_system_design.jpg",
    featuredAspect: "3:2",
    reels: [
      {
        id: "manaaq-reel-1",
        title: "Brand Ecosystem Reveal",
        duration: "0:30",
        views: "89.1K",
        caption: "Inside Manaaq: Four brands, singular architectural vision. From identity to product.",
        tags: ["#BrandArchitecture", "#CreativeDirection", "#ManaaqCreatives"],
        thumbnailUrl: "/images/manaaq_system_design.jpg",
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
        imageUrl: "/images/manaaq_system_design.jpg",
        description: "Parent entity identity and business collateral guidelines.",
        category: "System Design",
      },
      {
        id: "manaaq-slide-2",
        title: "Brand Hierarchy",
        tagline: "Ellie Junior · Oopsies · NH",
        slideNumber: 2,
        totalSlides: 3,
        imageUrl: "/images/oopsies_brand.jpg",
        description: "Subsidiary brand packaging and product aesthetic showcase.",
        category: "Packaging System",
      },
      {
        id: "manaaq-slide-3",
        title: "Nordic Nursery Lookbook",
        tagline: "Sustainable Toddler Essentials",
        slideNumber: 3,
        totalSlides: 3,
        imageUrl: "/images/ellie_junior_brand.jpg",
        description: "Ellie Junior editorial product catalog spread.",
        category: "Editorial Lookbook",
      },
    ],
    masonryGallery: [
      {
        id: "manaaq-m-1",
        title: "Corporate Identity Collateral & Book",
        aspectRatio: "3:2",
        imageUrl: "/images/manaaq_system_design.jpg",
        category: "Brand Identity",
        spanCol: 2,
        caption: "Linen-bound identity manual, black foil business cards, and typographic posters.",
        type: "brand-identity",
      },
      {
        id: "manaaq-m-2",
        title: "Oopsies Playful Product Line",
        aspectRatio: "1:1",
        imageUrl: "/images/oopsies_brand.jpg",
        category: "Product & Packaging",
        spanCol: 1,
        caption: "Vibrant ceramic mugs, skincare serums, and lifestyle accessory packaging.",
        type: "mockup",
      },
      {
        id: "manaaq-m-3",
        title: "Ellie Junior Lookbook SS24",
        aspectRatio: "4:3",
        imageUrl: "/images/ellie_junior_brand.jpg",
        category: "Editorial Print",
        spanCol: 1,
        caption: "Organic linen romper and wooden toy catalog spread.",
        type: "print",
      },
      {
        id: "manaaq-m-4",
        title: "Amanation Kinetic Brand Sculpture",
        aspectRatio: "16:9",
        imageUrl: "/images/amanation_hero_kinetic.jpg",
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
    client: "Ellie Junior (Manaaq Group)",
    category: "Toddler Apparel & Baby Lifestyle",
    year: "2024 – 2025",
    role: "Brand Identity & Content Director",
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
    heroImage: "/images/ellie_junior_brand.jpg",
    featuredAspect: "4:3",
    reels: [
      {
        id: "ellie-reel-1",
        title: "SS24 Linen Collection",
        duration: "0:20",
        views: "142.3K",
        caption: "Gentle on sensitive skin. Organic linen rompers crafted for free exploration.",
        tags: ["#EllieJunior", "#BabyFashion", "#OrganicLinen", "#NordicBaby"],
        thumbnailUrl: "/images/ellie_junior_brand.jpg",
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
        imageUrl: "/images/ellie_junior_brand.jpg",
        description: "Editorial introduction to the sustainable nursery line.",
        category: "Lookbook",
      },
      {
        id: "ellie-slide-2",
        title: "ESSENTIAL ESSENCE",
        tagline: "Pure Scandinavian Comfort",
        slideNumber: 2,
        totalSlides: 2,
        imageUrl: "/images/ellie_junior_brand.jpg",
        description: "Product detail callouts for linen romper, muslin swaddle, and wooden bunny.",
        category: "Product Specs",
      },
    ],
    masonryGallery: [
      {
        id: "ellie-m-1",
        title: "Spring Lookbook Spread",
        aspectRatio: "4:3",
        imageUrl: "/images/ellie_junior_brand.jpg",
        category: "Editorial Design",
        spanCol: 2,
        caption: "Minimalist two-page lookbook layout featuring natural nursery styling.",
        type: "print",
      },
      {
        id: "ellie-m-2",
        title: "Creative Studio Identity",
        aspectRatio: "3:2",
        imageUrl: "/images/manaaq_system_design.jpg",
        category: "Brand Architecture",
        spanCol: 1,
        caption: "Parent company architectural branding and production systems.",
        type: "brand-identity",
      },
      {
        id: "ellie-m-3",
        title: "Kids Lifestyle Packaging",
        aspectRatio: "1:1",
        imageUrl: "/images/oopsies_brand.jpg",
        category: "Packaging System",
        spanCol: 1,
        caption: "Sister brand accessories showcasing modular brand consistency.",
        type: "mockup",
      },
    ],
    outcomes: [
      { label: "Lookbook Views", metric: "45K+", detail: "Digital catalog reads during launch month" },
      { label: "ROAS Increase", metric: "2.4x", detail: "Return on ad spend across social campaign sets" },
      { label: "Return Rate", metric: "<1.2%", detail: "High product accuracy reducing customer churn" },
    ],
    nextProjectSlug: "amigos-overseas",
    nextProjectTitle: "Amigos Overseas",
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
  {
    title: "Anebos Studios",
    role: "COO / Founder",
    year: "2024 – 2025",
    description: "Founded and operated a boutique creative studio specializing in corporate branding and marketing solutions.",
    tags: ["Studio Management", "Operations", "Creative Strategy"],
  },
];
