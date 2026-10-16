import { media } from "@/data/media";

export interface ServicePillar {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
  previewImage: string;
  accent: string;
}

export const servicesData: ServicePillar[] = [
  {
    number: "01",
    title: "Brand Identity",
    tagline: "Logos, colour, type and guidelines that hold together under pressure.",
    description:
      "Creating foundational visual identities that communicate authority and distinction. Every mark, typographic pairing, and chromatic choice is engineered to endure across screens, print, and physical spaces.",
    deliverables: ["Visual Identity Systems", "Logo Suites & Monograms", "Brand Books & Styleguides", "Design Tokens & Typography Rules"],
    tools: ["Illustrator", "Photoshop", "Figma"],
    previewImage: media.services["01"],
    accent: "#D3FD50",
  },
  {
    number: "02",
    title: "Campaign Design",
    tagline: "High-impact visual ideas engineered to travel seamlessly across channels.",
    description:
      "Translating brand strategy into cohesive seasonal, product launch, or institutional campaigns. Built for maximum resonance across digital billboards, social carousels, and print touchpoints.",
    deliverables: ["Key Visuals (KV)", "Omnichannel Campaign Kits", "Event Visual Themes", "Digital & Out-of-Home Banners"],
    tools: ["Photoshop", "Illustrator", "After Effects"],
    previewImage: media.services["02"],
    accent: "#D3FD50",
  },
  {
    number: "03",
    title: "Creative Direction",
    tagline: "Setting the standard, the aesthetic altitude, and the unifying story.",
    description:
      "Directing cross-functional teams and brand ecosystems. Ensuring every piece of creative output aligns with commercial objectives and artistic integrity from concept to completion.",
    deliverables: ["Creative Vision & Pitch Books", "Moodboards & Art Direction", "Production Supervision", "Multi-Brand Portfolio Cohesion"],
    tools: ["Figma", "Canva", "Notion"],
    previewImage: media.services["03"],
    accent: "#D3FD50",
  },
  {
    number: "04",
    title: "Print & Editorial Design",
    tagline: "Magazines, brochures, standees, and environmental spaces that command touch.",
    description:
      "Tactile print executions with typographic rigor. From international education expo pavilions to fashion lookbooks and premium packaging finishes.",
    deliverables: ["Exhibition Standees & Booths", "Editorial Magazines & Lookbooks", "Packaging & Unboxing Collateral", "Corporate Brochures & Folders"],
    tools: ["InDesign", "Illustrator", "Photoshop"],
    previewImage: media.services["04"],
    accent: "#D3FD50",
  },
  {
    number: "05",
    title: "AI Creative Production",
    tagline: "AI-assisted imagery, short-form reels, and visual synthesis, directed with human intent.",
    description:
      "Harnessing state-of-the-art generative visual tools as an amplifier for creative throughput. Every AI-generated asset is curated, color-graded, and art-directed with exacting fidelity.",
    deliverables: ["Generative Campaign Concepts", "Short-Form Video Synthetics", "Lifestyle Mood Assets", "Visual Prototyping"],
    tools: ["Midjourney", "Runway Gen-3", "CapCut", "Photoshop"],
    previewImage: media.services["05"],
    accent: "#D3FD50",
  },
  {
    number: "06",
    title: "Social Media Systems",
    tagline: "Modular templates and publishing rhythms that stay immaculate at scale.",
    description:
      "Building high-velocity content architectures. From multi-slide Instagram carousels and animated story sequences to vertical reel layouts that captivate scrolling feeds.",
    deliverables: ["Multi-Panel Carousel Systems", "Reel / TikTok Grid Templates", "Story Sequence Frameworks", "Content Calendar Art Direction"],
    tools: ["Photoshop", "Canva Pro", "CapCut"],
    previewImage: media.services["06"],
    accent: "#D3FD50",
  },
  {
    number: "07",
    title: "Presentation & Pitch Design",
    tagline: "Pitch decks and corporate profiles that command investor and client buy-in.",
    description:
      "Transforming complex business propositions, metrics, and narratives into persuasive, beautifully orchestrated slide decks that close deals.",
    deliverables: ["Investor Pitch Decks", "Corporate Capabilities Profiles", "Executive Keynotes", "Interactive PDF Proposals"],
    tools: ["PowerPoint", "Google Slides", "Figma", "Keynote"],
    previewImage: media.services["07"],
    accent: "#D3FD50",
  },
  {
    number: "08",
    title: "Visual Storytelling",
    tagline: "Turning intricate strategic briefs into cinematic sequences people follow.",
    description:
      "Applying psychological narrative pacing and emotional resonance to brand narratives. Guiding viewers through a deliberate progression of curiosity, desire, and action.",
    deliverables: ["Brand Narratives & Case Studies", "Storyboards & Shot Lists", "Content Arc Roadmaps", "Founder Journey Videos"],
    tools: ["Photoshop", "Premiere Pro", "CapCut"],
    previewImage: media.services["08"],
    accent: "#D3FD50",
  },
  {
    number: "09",
    title: "Marketing & Launch Systems",
    tagline: "Strategic launch assets that drive real conversion and commercial velocity.",
    description:
      "Engineering holistic promotional toolkits for product drops, branch openings, and campaign launches that convert interest into measurable business value.",
    deliverables: ["Launch Teaser Suites", "Ad Creatives (Static & Motion)", "Lead Gen Collateral", "Conversion-Focused Visual Assets"],
    tools: ["Photoshop", "Illustrator", "CapCut"],
    previewImage: media.services["09"],
    accent: "#D3FD50",
  },
];
