"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Mail, Check, Copy, Send, FileText, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/common/Footer";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";
import { CityClock, GlobeIcon, SOCIALS } from "@/components/common/Bits";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$5,000 – $10,000",
    scope: "Brand Identity System",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const email = "aaira.basit80@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const scopes = [
    "Brand Identity System",
    "Omnichannel Campaign",
    "Reels & Short-Form Video",
    "AI Creative Production",
    "Retainer Directorship",
  ];

  const budgets = [
    "$2,500 – $5,000",
    "$5,000 – $10,000",
    "$10,000+",
    "Advisory / Ongoing Retainer",
  ];

  return (
    <main className="theme-dark min-h-screen pt-36">
      <div className="gutter">
        {/* 01 Monumental Header */}
        <header className="pb-16 border-b border-white/15">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="t-label text-lime">
              04 / DIRECT COMMUNICATION & INTAKE [連絡先]
            </span>
            <CityClock />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <RevealLines
              as="h1"
              lines={["CONTACT."]}
              className="t-display text-white font-medium tracking-tighter"
            />

            <div className="t-label text-white/50 space-y-1 text-left lg:text-right">
              <div>AVAILABILITY: SELECTIVE RETAINERS & SPRINTS</div>
              <div className="text-lime">DIRECT ACCESS · ISLAMABAD / GLOBAL REMOTE</div>
            </div>
          </div>

          <p className="t-lead text-white/70 mt-8 max-w-3xl font-light leading-relaxed">
            Starting something ambitious, or have a brand that needs to look the part? Write to me directly and I&apos;ll get back to you.
          </p>
        </header>

        {/* 02 Contact & Intake Grid */}
        <div className="py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Direct channels and Studio coordinates */}
          <div className="lg:col-span-5 space-y-10">
            {/* Direct Email Card with Click-to-Copy */}
            <div className="space-y-3">
              <span className="t-label text-lime font-mono">DIRECT INBOX</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full text-left p-6 rounded-2xl bg-ink-raised border border-white/15 hover:border-lime/60 transition-all flex items-center justify-between group cursor-pointer"
                data-cursor-label={copied ? "COPIED" : "COPY"}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] text-lime flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-base sm:text-lg font-semibold text-white group-hover:text-lime transition-colors">
                      {email}
                    </div>
                    <div className="text-xs font-mono text-white/50">
                      {copied ? "COPIED TO CLIPBOARD ✺" : "Click to copy address"}
                    </div>
                  </div>
                </div>
                <div className="text-white/40 group-hover:text-lime transition-colors">
                  {copied ? <Check className="w-5 h-5 text-lime" /> : <Copy className="w-4 h-4" />}
                </div>
              </button>
            </div>

            {/* Studio Coordinates & Clock */}
            <div className="p-6 rounded-2xl bg-ink-raised border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="t-label text-lime font-mono">STUDIO LOCATION</span>
                <span className="t-label text-white/40 font-mono">PKT · GMT+5</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <GlobeIcon className="spin-slow w-5 h-5 text-lime" />
                <span className="text-lg font-medium">Islamabad, Pakistan</span>
              </div>
              <p className="t-body text-white/60 font-light text-sm leading-relaxed">
                I work remotely across time zones with founders in Budapest, London and Berlin and with regional multi-brand companies, using async workflows and tight milestones.
              </p>
            </div>

            {/* Verified Documents & Channels */}
            <div className="space-y-4">
              <span className="t-label text-lime font-mono">CREDENTIALS & NETWORK</span>
              <div className="space-y-2.5">
                <Link
                  href="/resume"
                  className="p-4 rounded-xl bg-ink-raised border border-white/10 hover:border-lime/40 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-lime transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-lime" />
                    <span>Resume: view or download PDF</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-lime transition-colors" />
                </Link>

                {SOCIALS.filter((s) => s.external).map((s) => (
                  <a
                    key={s.short}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-ink-raised border border-white/10 hover:border-lime/40 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-lime transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-4 text-center font-bold text-lime">{s.short}</span>
                      <span>{s.label}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-lime transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Intake Form */}
          <div className="lg:col-span-7 bg-ink-raised rounded-3xl border border-white/15 p-8 sm:p-12 shadow-2xl">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-lime/10 border border-lime mx-auto flex items-center justify-center text-lime">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="t-section text-white font-medium">Brief Received.</h3>
                <p className="t-body text-white/70 max-w-md mx-auto font-light leading-relaxed">
                  Thank you for telling me about your project. I&apos;ll read it myself and reply within 24 to 48 hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="btn"
                  >
                    <span className="roll">
                      <span className="roll-front">Submit Another Inquiry</span>
                      <span className="roll-back">Submit Another Inquiry</span>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <span className="t-label text-lime font-mono block mb-2">ENGAGEMENT BRIEF</span>
                  <h3 className="text-2xl sm:text-3xl font-medium text-white">
                    Project Intake Form
                  </h3>
                  <p className="t-body text-white/60 font-light mt-1 text-sm">
                    All inquiries are held in strict confidence.
                  </p>
                </div>

                {/* Scope selector */}
                <div className="space-y-3">
                  <label className="t-label text-white/70 block">
                    PRIMARY DISCIPLINE
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {scopes.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setFormData({ ...formData, scope: s })}
                        className={`text-xs font-mono px-4 py-2 rounded-full border transition-all cursor-pointer ${
                          formData.scope === s
                            ? "bg-lime text-black border-lime font-semibold"
                            : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="t-label text-white/70 block">
                      YOUR NAME *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Elena Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/15 text-white placeholder-white/20 text-sm focus:outline-none focus:border-lime transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="t-label text-white/70 block">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. elena@atelier.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/15 text-white placeholder-white/20 text-sm focus:outline-none focus:border-lime transition-colors"
                    />
                  </div>
                </div>

                {/* Company & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="t-label text-white/70 block">
                      COMPANY / BRAND
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vance Holding Group"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/15 text-white placeholder-white/20 text-sm focus:outline-none focus:border-lime transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="t-label text-white/70 block">
                      ESTIMATED BUDGET
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0e0e0e] border border-white/15 text-white text-sm focus:outline-none focus:border-lime transition-colors cursor-pointer"
                    >
                      {budgets.map((b) => (
                        <option key={b} value={b} className="bg-black text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="t-label text-white/70 block">
                    PROJECT VISION & DELIVERABLES *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your current brand posture, timeline expectations, and core objectives..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/15 text-white placeholder-white/20 text-sm focus:outline-none focus:border-lime transition-colors resize-none"
                  />
                </div>

                <Magnetic strength={8}>
                  <button
                    type="submit"
                    className="btn btn-solid w-full justify-center !py-4"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span className="roll">
                      <span className="roll-front">Transmit Project Brief</span>
                      <span className="roll-back">Transmit Project Brief</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
