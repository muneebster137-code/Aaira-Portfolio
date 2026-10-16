import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import Footer from "@/components/common/Footer";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";
import { CityClock } from "@/components/common/Bits";
import { LINKEDIN_URL } from "@/data/links";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Resume | Aaira Basit",
  description: "Experience, education, skills and certifications of Aaira Basit, creative director and visual designer.",
};

// Mirrors public/media/resume/aaira-basit-resume.pdf; update both together.
const experience = [
  {
    role: "Executive Assistant (Design & Operations)",
    company: "Amigos Overseas Education",
    mode: "Remote",
    dates: "Dec 2024 – Apr 2026",
    points: [
      "Coordinated executive schedules, internal meetings and stakeholders to keep day-to-day operations running.",
      "Guided clients through the study and tourist visa process, punctually and professionally.",
      "Prepared, organised and maintained official documents, forms and application records.",
      "Kept business reports, operation updates and performance data in Excel for executive review.",
      "Ran social media engagement: content creation, replies to questions and direct messages.",
      "Suggested live improvements to workflow, customer service and internal procedures.",
      "Represented the company at expos, events and training sessions.",
    ],
  },
  {
    role: "COO / Founder",
    company: "Anebos Studios",
    mode: "Remote / Hybrid",
    dates: "Dec 2024 – Dec 2025",
    points: [
      "Started a creative company specialising in branding, design and marketing solutions.",
      "Directed business strategy, client operations, service strategy and internal team coordination.",
      "Supervised the delivery of creative projects and operational decisions.",
    ],
  },
  {
    role: "Creative Designer & Marketing Associate",
    company: "Buda Fashion (startup brand), Hungary",
    mode: "Part time, Remote",
    dates: "Apr 2025 – Aug 2025",
    points: [
      "Led social media content and activity to grow brand awareness.",
      "Designed digital posters, images and campaign content in the brand's aesthetic.",
      "Worked with the design team and CEO on clothing designs and fashion ideas.",
      "Promoted the brand through visual storytelling for events and fashion shows.",
    ],
  },
  {
    role: "Marketing & Design Intern",
    company: "Consultivo",
    mode: "Remote",
    dates: "Feb 2024 – Mar 2024",
    points: [
      "Supported branding strategy and created digital marketing content.",
      "Assisted marketing campaigns with design, research and creative assets.",
    ],
  },
  {
    role: "Co-Lead Marketing & Design",
    company: "SZABIST Business Incubation Centre, Islamabad",
    mode: "Hybrid",
    dates: "2023 – 2024",
    points: [
      "Directed content creation and visual branding for incubation programmes and events.",
      "Monitored promotional efforts and aligned creative direction across platforms.",
      "Told startup stories through advertising content and online media.",
    ],
  },
];

const skills = [
  {
    group: "Design & Creative",
    items: [
      "Branding & visual identity",
      "Event branding & visual coordination",
      "Short-form video & visual content",
      "Social media content & campaigns",
      "Digital & print design (social, ads, magazines, brochures)",
    ],
  },
  {
    group: "Tools",
    items: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
      "CapCut",
      "Figma (basic)",
      "PowerPoint, Word, Excel",
      "Google Workspace",
      "Zoom & social platforms",
    ],
  },
  {
    group: "Professional",
    items: [
      "Executive support",
      "Calendar & meeting coordination",
      "Travel coordination",
      "Problem solving",
      "Multi-tasking & organisation",
      "Adaptability",
    ],
  },
  { group: "Languages", items: ["English", "Urdu"] },
];

const certifications = [
  { title: "Agile Leadership", org: "University of Colorado Denver" },
  { title: "Successful Presentation", org: "University of Colorado Boulder" },
  { title: "Business Writing", org: "University of Colorado Boulder" },
  { title: "Graphic Design", org: "University of Colorado Boulder" },
  { title: "Creative Design, Prototyping, and Testing", org: "University of Maryland" },
  { title: "Fundamentals of Marketing Strategy", org: "University of London" },
  { title: "Foundations of User Experience (UX) Design", org: "Google" },
  { title: "Foundations of Project Management", org: "Google" },
  { title: "Data, Data, Everywhere", org: "Google" },
  { title: "Responsive Web Design in Adobe XD", org: "Google" },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-6 border-b border-white/15 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-3">
        <span className="t-label text-lime lg:sticky lg:top-32">{label}</span>
      </div>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <main className="theme-dark min-h-screen pt-36">
      <div className="gutter">
        {/* Header */}
        <header className="border-b border-white/15 pb-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <span className="t-label text-lime">06 / RESUME [履歴書]</span>
            <CityClock />
          </div>

          <RevealLines
            as="h1"
            lines={["RESUME."]}
            trigger="load"
            className="t-display font-medium tracking-tighter text-white"
          />

          <p className="t-lead mt-8 max-w-3xl font-light leading-relaxed text-white/70">
            The short version of where I&apos;ve worked, what I studied and what I bring. The long version is in the work.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={media.resume.pdf}
                download="Aaira-Basit-Resume.pdf"
                className="btn btn-thick !border-lime !bg-lime !text-black"
              >
                <Download className="h-[0.7em] w-[0.7em]" /> Download PDF
              </a>
            </Magnetic>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn">
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <Link href="/contact" className="btn">
              Contact me <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="t-label mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/50">
            <span>Islamabad, Pakistan</span>
            <a href="mailto:aaira.basit80@gmail.com" className="u-draw hover:text-lime">
              aaira.basit80@gmail.com
            </a>
          </div>
        </header>

        <Row label="01 / Summary">
          <p className="t-lead max-w-4xl font-light leading-snug text-white/85">
            I&apos;m a detail-oriented visual communications designer working across graphic design, branding, content
            and digital marketing. I design for social media, presentations, campaigns and brand identities, often for
            several channels at once. I do my best work in fast-growing teams with real deadlines, and I care about
            design storytelling, how people engage, and where digital trends are heading.
          </p>
        </Row>

        <Row label="02 / Experience">
          <div className="divide-y divide-white/10">
            {experience.map((job) => (
              <article key={job.role + job.company} className="py-8 first:pt-0 last:pb-0">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                  <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl">{job.role}</h2>
                  <span className="t-label shrink-0 font-mono text-lime">{job.dates}</span>
                </div>
                <div className="t-label mt-2 text-white/50">
                  {job.company} · {job.mode}
                </div>
                <ul className="mt-5 grid gap-2.5 text-sm leading-relaxed text-white/70 md:text-base">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Row>

        <Row label="03 / Education">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
            <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
              BSc Social Sciences (Psychology)
            </h2>
            <span className="t-label shrink-0 font-mono text-lime">Nov 2023 – Jul 2026</span>
          </div>
          <div className="t-label mt-2 text-white/50">SZABIST, Islamabad</div>
        </Row>

        <Row label="04 / Skills">
          <div data-fx="pop" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} className="rounded-2xl border border-white/10 p-6">
                <span className="t-label text-white/50">{s.group}</span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wider text-white/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Row>

        <Row label="05 / Certifications">
          <ul data-fx="pop" className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {certifications.map((c) => (
              <li key={c.title} className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <div>
                  <div className="text-sm font-medium text-white">{c.title}</div>
                  <div className="t-label mt-1 text-white/50">{c.org}</div>
                </div>
                <span className="t-label shrink-0 text-lime">Credential</span>
              </li>
            ))}
          </ul>
        </Row>

        <Row label="06 / Interests">
          <p className="t-body max-w-2xl text-white/70">
            Visual art and design, human psychology, and making things people remember.
          </p>
        </Row>
      </div>

      <Footer />
    </main>
  );
}
