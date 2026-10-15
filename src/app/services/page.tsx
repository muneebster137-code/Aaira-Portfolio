"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Layers, ShieldCheck, Zap } from "lucide-react";
import Footer from "@/components/common/Footer";
import { servicesData } from "@/data/servicesData";
import RevealLines from "@/components/motion/RevealLines";
import RevealImage from "@/components/motion/RevealImage";
import Magnetic from "@/components/motion/Magnetic";
import { CityClock } from "@/components/common/Bits";

export default function ServicesPage() {
  const engagementTiers = [
    {
      icon: Layers,
      title: "Retainer Creative Directress",
      timeline: "3 TO 12 MONTH COMMITMENTS",
      description:
        "Full-spectrum creative governance replacing an entire in-house agency department. Ongoing stewardship across foundational identity, weekly reel pipelines, physical collateral, and multi-brand holding systems.",
      idealFor: "Holding groups, scaling consumer brands & high-velocity startups",
    },
    {
      icon: Zap,
      title: "Brand Architecture Sprint",
      timeline: "4 TO 6 WEEK INTENSIVE",
      description:
        "Ground-up visual identity design from concept zero to market launch. Complete with monolithic logo suites, typographic rules, color physics, tokenized design systems, and comprehensive brand books.",
      idealFor: "Pre-seed / Series A startups, new ventures & brand re-positioning",
    },
    {
      icon: ShieldCheck,
      title: "Campaign & Reel Production",
      timeline: "PER CAMPAIGN MILESTONE",
      description:
        "High-stakes milestone executions: nationwide expo pavilion environments, luxury fashion seasonal lookbooks, investor deck visual systems, and turnkey viral short-form reel suites.",
      idealFor: "Seasonal launches, international expos & fundraising rounds",
    },
  ];

  return (
    <main className="theme-dark min-h-screen pt-36">
      <div className="gutter">
        {/* 01 Monumental Header */}
        <header className="pb-16 border-b border-white/15">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="t-label text-lime">
              03 / CAPABILITIES & DIRECTORSHIP [専門領域]
            </span>
            <CityClock />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <RevealLines
              as="h1"
              lines={["SERVICES."]}
              className="t-display text-white font-medium tracking-tighter"
            />

            <div className="t-label text-white/50 space-y-1 text-left lg:text-right">
              <div>DISCIPLINES: 09 · RETAINERS: ACTIVE</div>
              <div className="text-lime">ISLAMABAD ✺ BUDAPEST ✺ GLOBAL REMOTE</div>
            </div>
          </div>

          <p className="t-lead text-white/70 mt-8 max-w-3xl font-light leading-relaxed">
            I do not supply piecemeal graphic decoration. I architect enduring visual systems, high-velocity reel engines, and AI-augmented creative pipelines that convert attention into measurable brand equity.
          </p>
        </header>

        {/* 02 Engagement Models (3 Tiers - K72 / Amanation Style) */}
        <section className="py-20 border-b border-white/15">
          <div className="mb-12">
            <span className="t-label text-lime block mb-2">03.1 / ENGAGEMENT ARCHITECTURE</span>
            <h2 className="t-section text-white font-medium">How We Collaborate</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.title}
                  className="p-8 rounded-3xl bg-ink-raised border border-white/10 hover:border-lime/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-lime group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="t-label text-lime font-mono">{tier.timeline}</div>

                    <h3 className="text-2xl font-medium text-white group-hover:text-lime transition-colors">
                      {tier.title}
                    </h3>

                    <p className="t-body text-white/70 font-light leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pt-8 mt-6 border-t border-white/10">
                    <div className="t-label text-white/40 text-[11px] mb-1">BEST SUITED FOR</div>
                    <div className="text-xs font-mono text-white/80">{tier.idealFor}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 03 The 9 Disciplines */}
        <section className="py-24 border-b border-white/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="t-label text-lime block mb-2">03.2 / CORE PILLARS [9つの柱]</span>
              <h2 className="t-section text-white font-medium">The 9 Disciplines</h2>
            </div>
            <div className="t-label text-white/50 font-mono">
              END-TO-END CREATIVE PRODUCTION
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {servicesData.map((s) => (
              <div
                key={s.number}
                className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group"
              >
                {/* Left: Info */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-lime">
                      {s.number}
                    </span>
                    <h3 className="t-section text-white font-medium group-hover:text-lime transition-colors">
                      {s.title}
                    </h3>
                  </div>

                  <p className="t-lead text-white/80 font-light italic">
                    &ldquo;{s.tagline}&rdquo;
                  </p>

                  <p className="t-body text-white/70 font-light leading-relaxed">
                    {s.description}
                  </p>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="t-label text-lime font-mono">DELIVERABLES MATRIX</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {s.deliverables.map((d) => (
                        <div key={d} className="flex items-center gap-2.5 text-xs font-mono text-white/70">
                          <CheckCircle2 className="w-3.5 h-3.5 text-lime flex-shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="t-label text-white/40">
                      STACK: {s.tools.join(" · ")}
                    </div>

                    <Link
                      href="/contact"
                      className="t-label text-white hover:text-lime inline-flex items-center gap-1 transition-colors group-hover:translate-x-1"
                    >
                      Inquire on {s.title} <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right: Visual Preview */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 bg-ink-raised shadow-xl">
                    <RevealImage
                      src={s.previewImage}
                      alt={s.title}
                      className="w-full h-full"
                      data-cursor-label="Scope"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-lime">
                      {s.title} · Proven Execution
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04 Closing Banner */}
        <section className="py-24">
          <div className="p-10 md:p-16 rounded-3xl bg-ink-raised border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="t-label text-lime">READY TO COMMENCE</span>
              <h3 className="t-section text-white font-medium">
                Ready to elevate your brand&apos;s visual altitude?
              </h3>
              <p className="t-body text-white/70 font-light">
                Submit an intake brief to discuss deliverables, scope, and retainer availability directly with Aaira.
              </p>
            </div>

            <Magnetic strength={15}>
              <Link href="/contact" className="btn btn-solid whitespace-nowrap">
                <span className="roll">
                  <span className="roll-front">Initiate Project Brief</span>
                  <span className="roll-back">Initiate Project Brief</span>
                </span>
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Magnetic>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
