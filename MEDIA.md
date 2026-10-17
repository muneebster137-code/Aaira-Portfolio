# Media library

Every image and reel on the site has its **own file** in `public/media/`. To change one,
replace that file with a new one that has **exactly the same name and extension**. No code changes needed.

```
public/media/
  home/       hero background + pill slideshow, philosophy portrait, Manaaq Creative Studios brand panels
  menu/       full-screen menu hover previews
  about/      about page portrait
  services/   one image per discipline
  resume/     the downloadable resume PDF
  work/<project>/   hero, reels, carousel slides, showcase gallery
```

The list of slots lives in [`src/data/media.ts`](src/data/media.ts); everything on the site reads from it.

## How to swap a file

1. Find the slot in the tables below.
2. Export your new image as **`.jpg`** or your reel as **`.webm`**, at roughly the size listed.
3. Name it exactly like the slot (e.g. `reel-1.webm`) and overwrite the file in `public/media/...`.
4. Run `npm run media:check`. It flags missing files, wrong extensions (e.g. `hero.png` instead
   of `hero.jpg`) and files that were renamed instead of converted.
5. Commit and push; the site updates on the next deploy.

**Rules**

- Images must be `.jpg`, reels must be `.webm` and the resume must be `.pdf`. Renaming a `.png`/`.mp4` doesn't convert it; export
  or convert it (Photoshop → Export As JPG; Premiere/After Effects/HandBrake/`ffmpeg -i in.mp4 -c:v libvpx-vp9 -b:v 2M -an out.webm`).
- Every reel has a matching **poster** `.jpg` with the same name (`reel-1.webm` + `reel-1.jpg`). The poster
  shows before the video loads and if a browser can't play it, so update both together.
- Reels play muted by default; keep them under ~8 MB (1080×1920, 2–4 Mbps VP9 is plenty).
- Images: under ~1 MB each; the site resizes them automatically for each screen.
- Seeing the old picture after a swap? That's browser cache; hard-refresh (Ctrl+Shift+R).
- The reel `.webm` files that ship now are placeholders (a slow zoom over the poster).
  Replace them with the real reels.

## Adding or removing slots

Counts per project (how many reels, carousel slides, gallery tiles) are set at the bottom of
`src/data/media.ts`, and the matching text (titles, captions) lives in `src/data/projectsData.ts`.
Add the entry in both, drop the file into `public/media/...`, then run `npm run media:check`.

## Site-wide

### Home: `public/media/home/`

| File | Where it shows | Best size |
|---|---|---|
| `hero-background.jpg` | Full-size photo behind the whole hero (darkened automatically). Pick a photo without a big logo or text in the middle | 16:9, 2400×1350 |
| `hero-1.jpg` … `hero-5.jpg` | The image pill inside "PEOPLE ◯ CAN'T", in that order | 16:9, 1600×900 |
| `philosophy-portrait.jpg` | Portrait in the white "Trained in psychology" section | 3:4, 1200×1600 |
| `brands-manaaq.jpg` | Manaaq Creative Studios accordion → Manaaq Creative Studios | 16:9, 1600×900 |
| `brands-ellie-junior.jpg` | Manaaq Creative Studios accordion → Ellie Junior | 16:9, 1600×900 |
| `brands-oopsies.jpg` | Manaaq Creative Studios accordion → Oopsies | 16:9, 1600×900 |
| `brands-nh-consultants.jpg` | Manaaq Creative Studios accordion → NH Consultants | 16:9, 1600×900 |

### Menu: `public/media/menu/`

| File | Where it shows | Best size |
|---|---|---|
| `work.jpg` | Menu preview when hovering "Work" | 4:3, 1200×900 |
| `about.jpg` | Menu preview when hovering "About" | 4:3, 1200×900 |
| `services.jpg` | Menu preview when hovering "Services" | 4:3, 1200×900 |
| `contact.jpg` | Menu preview when hovering "Contact" | 4:3, 1200×900 |

### About: `public/media/about/`

| File | Where it shows | Best size |
|---|---|---|
| `portrait.jpg` | Portrait next to "Managing the brand's whole visual world" | 3:4, 1200×1600 |

### Services: `public/media/services/`

Each image appears on the /services page row **and** as the hover preview in the home page's "Nine disciplines" list.

| File | Discipline | Best size |
|---|---|---|
| `01-brand-identity.jpg` | Brand Identity | 16:11, 1600×1100 |
| `02-campaign-design.jpg` | Campaign Design | 16:11, 1600×1100 |
| `03-creative-direction.jpg` | Creative Direction | 16:11, 1600×1100 |
| `04-print-editorial.jpg` | Print & Editorial Design | 16:11, 1600×1100 |
| `05-ai-creative-production.jpg` | AI Creative Production | 16:11, 1600×1100 |
| `06-social-media-systems.jpg` | Social Media Systems | 16:11, 1600×1100 |
| `07-presentation-pitch.jpg` | Presentation & Pitch Design | 16:11, 1600×1100 |
| `08-visual-storytelling.jpg` | Visual Storytelling | 16:11, 1600×1100 |
| `09-marketing-launch.jpg` | Marketing & Launch Systems | 16:11, 1600×1100 |

### Resume: `public/media/resume/`

| File | Where it shows | Notes |
|---|---|---|
| `aaira-basit-resume.pdf` | "Download PDF" button on /resume | Must be a real `.pdf`. The /resume page text lives in `src/app/resume/page.tsx`; update both together. |

## Anebos Studios (flagship): `public/media/work/anebos-studios/`

`hero.jpg` is the studio cover (top of /work/anebos-studios and the full-width flagship card on Home and /work), 16:9, 2400×1350.

Each brand has its own folder: `anebos-studios/`, `homeloom/`, `treats-for-life/`. Inside, every category is numbered. Replace a file to change it; to show **more** pieces in a category, add the next number (e.g. `posts-4.jpg`) and raise that brand's count in `src/data/media.ts` (`studioBrand(...)`).

| File(s) | Section on the page | Best size |
|---|---|---|
| `logo-1.jpg`, `logo-2.jpg` | Logo Design | 1:1, 1200×1200 |
| `identity-1.jpg`, `identity-2.jpg` | Brand Identity | 4:3, 1600×1200 |
| `guidelines-1.jpg`, `guidelines-2.jpg` | Brand Guidelines | 3:2, 1800×1200 |
| `posts-1.jpg` … `posts-3.jpg` | Social Media Posts | 4:5, 1080×1350 |
| `carousel-1.jpg` … `carousel-3.jpg` | Carousel Designs (shown as slides 1/3, 2/3, 3/3) | 4:5, 1080×1350 |
| `reel-1.webm` + `reel-1.jpg`, `reel-2.webm` + `reel-2.jpg` | Reel Designs (`.jpg` is the poster) | 9:16, 1080×1920 |
| `marketing-1.jpg`, `marketing-2.jpg` | Marketing Creatives | 3:4, 1200×1600 |
| `other-1.jpg`, `other-2.jpg` | Other Brand Assets (**anebos-studios/ only**) | 4:3, 1600×1200 |

The files there now are dark wireframe placeholders marked "placeholder"; replace them with the real work.

## Case studies

### Amigos Overseas: `public/media/work/amigos-overseas/`

| File | Where it shows | Best size |
|---|---|---|
| `hero.jpg` | Project cover: home "Selected work", /work grid, top of the case study | 16:9 or 4:3, 2400px wide |
| `reel-1.webm` + `reel-1.jpg` | Reel "Global Visa Roadmap 2026" (case study + Reel button on project cards) | 9:16, 1080×1920 |
| `reel-2.webm` + `reel-2.jpg` | Reel "Top 5 European Scholarships" (case study page) | 9:16, 1080×1920 |
| `carousel-1.jpg` | Carousel slide 1: "Navigating Study Abroad" | 4:5, 1080×1350 |
| `carousel-2.jpg` | Carousel slide 2: "Top 5 Student Visa Tips" | 4:5, 1080×1350 |
| `carousel-3.jpg` | Carousel slide 3: "University Admissions Guide" | 4:5, 1080×1350 |
| `gallery-1.jpg` | Showcase tile: "Global Pathways Campaign Visual" | 16:9 wide, 1920×1080 |
| `gallery-2.jpg` | Showcase tile: "Instagram Carousel Grid (3-Panel)" | 1:1 square, 1080×1080 |
| `gallery-3.webm` + `gallery-3.jpg` | Showcase reel tile: "Visa Acceptance Reels Showcase" | 9:16 vertical, 1080×1920 |
| `gallery-4.jpg` | Showcase tile: "Institutional Brand Guidelines" | 3:2 landscape, 1800×1200 |

### Buda Fashion: `public/media/work/buda-fashion/`

| File | Where it shows | Best size |
|---|---|---|
| `hero.jpg` | Project cover: home "Selected work", /work grid, top of the case study | 16:9 or 4:3, 2400px wide |
| `reel-1.webm` + `reel-1.jpg` | Reel "AW25 Runway Teaser // Budapest" (case study + Reel button on project cards) | 9:16, 1080×1920 |
| `reel-2.webm` + `reel-2.jpg` | Reel "Backstage Motion Study" (case study page) | 9:16, 1080×1920 |
| `carousel-1.jpg` | Carousel slide 1: "BUDA ESSENCE" | 4:5, 1080×1350 |
| `carousel-2.jpg` | Carousel slide 2: "FASHION RAW" | 4:5, 1080×1350 |
| `carousel-3.jpg` | Carousel slide 3: "THE NEW UNIFORM" | 4:5, 1080×1350 |
| `gallery-1.webm` + `gallery-1.jpg` | Showcase reel tile: "Runway Showcase Hero Visual" | 9:16 vertical, 1080×1920 |
| `gallery-2.jpg` | Showcase tile: "Social Lookbook 3-Grid Spread" | 1:1 square, 1080×1080 |
| `gallery-3.jpg` | Showcase tile: "Kinetic Sculpture & Spatial Concept" | 16:9 wide, 1920×1080 |
| `gallery-4.jpg` | Showcase tile: "Minimalist Brand Stationery" | 3:2 landscape, 1800×1200 |

### Manaaq Creative Studios: `public/media/work/manaaq-creatives/`

| File | Where it shows | Best size |
|---|---|---|
| `hero.jpg` | Project cover: home "Selected work", /work grid, top of the case study | 16:9 or 4:3, 2400px wide |
| `reel-1.webm` + `reel-1.jpg` | Reel "Brand Ecosystem Reveal" (case study + Reel button on project cards) | 9:16, 1080×1920 |
| `carousel-1.jpg` | Carousel slide 1: "Identity Manual" | 4:5, 1080×1350 |
| `carousel-2.jpg` | Carousel slide 2: "Brand Hierarchy" | 4:5, 1080×1350 |
| `carousel-3.jpg` | Carousel slide 3: "Nordic Nursery Lookbook" | 4:5, 1080×1350 |
| `gallery-1.jpg` | Showcase tile: "Corporate Identity Collateral & Book" | 3:2 landscape, 1800×1200 |
| `gallery-2.jpg` | Showcase tile: "Oopsies Playful Product Line" | 1:1 square, 1080×1080 |
| `gallery-3.jpg` | Showcase tile: "Ellie Junior Lookbook SS24" | 4:3 landscape, 1600×1200 |
| `gallery-4.jpg` | Showcase tile: "Amanation Kinetic Brand Sculpture" | 16:9 wide, 1920×1080 |

### Ellie Junior: `public/media/work/ellie-junior/`

| File | Where it shows | Best size |
|---|---|---|
| `hero.jpg` | Project cover: home "Selected work", /work grid, top of the case study | 16:9 or 4:3, 2400px wide |
| `reel-1.webm` + `reel-1.jpg` | Reel "SS24 Linen Collection" (case study + Reel button on project cards) | 9:16, 1080×1920 |
| `carousel-1.jpg` | Carousel slide 1: "SIMPLE MOMENTS" | 4:5, 1080×1350 |
| `carousel-2.jpg` | Carousel slide 2: "ESSENTIAL ESSENCE" | 4:5, 1080×1350 |
| `gallery-1.jpg` | Showcase tile: "Spring Lookbook Spread" | 4:3 landscape, 1600×1200 |
| `gallery-2.jpg` | Showcase tile: "Creative Studio Identity" | 3:2 landscape, 1800×1200 |
| `gallery-3.jpg` | Showcase tile: "Kids Lifestyle Packaging" | 1:1 square, 1080×1080 |
| `newsletter-1.jpg` | Newsletter Designs: featured full-length issue "Monthly Newsletter" (scrolls inside an email frame) | 1200px wide, any height (full email) |
| `newsletter-2.jpg` | Newsletter Designs: mockup "New Collection Launch" | 3:4, 1200×1600 |
| `newsletter-3.jpg` | Newsletter Designs: mockup "Seasonal Edit" | 3:4, 1200×1600 |
| `newsletter-4.jpg` | Newsletter Designs: mockup "Parent Tips" | 3:4, 1200×1600 |

### Oopsies: `public/media/work/oopsies/`

| File | Where it shows | Best size |
|---|---|---|
| `hero.jpg` | Project cover: home "Selected work", /work grid, top of the case study | 16:9 or 4:3, 2400px wide |
| `reel-1.webm` + `reel-1.jpg` | Reel "Oopsies Product Reel" (case study + Reel button on project cards) | 9:16, 1080×1920 |
| `carousel-1.jpg` | Carousel slide 1: "MEET OOPSIES" | 4:5, 1080×1350 |
| `carousel-2.jpg` | Carousel slide 2: "THE PRODUCTS" | 4:5, 1080×1350 |
| `carousel-3.jpg` | Carousel slide 3: "GET YOURS" | 4:5, 1080×1350 |
| `gallery-1.jpg` | Showcase tile: "Packaging System" | 4:3 landscape, 1600×1200 |
| `gallery-2.jpg` | Showcase tile: "Social Post Set" | 1:1 square, 1080×1080 |
| `gallery-3.jpg` | Showcase tile: "Brand Identity Sheet" | 3:2 landscape, 1800×1200 |

### NH Consultants: `public/media/work/nh-consultants/`

| File | Where it shows | Best size |
|---|---|---|
| `hero.jpg` | Project cover: home "Selected work", /work grid, top of the case study | 16:9 or 4:3, 2400px wide |
| `reel-1.webm` + `reel-1.jpg` | Reel "Study Abroad Explainer" (case study + Reel button on project cards) | 9:16, 1080×1920 |
| `carousel-1.jpg` | Carousel slide 1: "THINKING OF STUDYING ABROAD?" | 4:5, 1080×1350 |
| `carousel-2.jpg` | Carousel slide 2: "WHAT YOU'LL NEED" | 4:5, 1080×1350 |
| `carousel-3.jpg` | Carousel slide 3: "TALK TO US" | 4:5, 1080×1350 |
| `gallery-1.jpg` | Showcase tile: "Corporate Profile" | 16:9 wide, 1920×1080 |
| `gallery-2.jpg` | Showcase tile: "Presentation Deck" | 4:3 landscape, 1600×1200 |
| `gallery-3.jpg` | Showcase tile: "Social Templates" | 1:1 square, 1080×1080 |
