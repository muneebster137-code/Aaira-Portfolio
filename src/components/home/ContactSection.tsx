"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Check, Copy, ArrowUpRight } from "lucide-react";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";
import { CityClock, SocialPills } from "@/components/common/Bits";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "aaira.basit80@gmail.com";

  const handleCopy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="theme-dark gutter relative py-32 border-t border-white/15">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Monumental Invitation */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="t-label text-lime">
            06 / INITIATION & INTAKE [連絡先]
          </div>

          <RevealLines
            as="h2"
            lines={["HAVE AN IDEA?", "LET'S BUILD", "SOMETHING", "UNFORGETTABLE."]}
            className="t-section text-white font-medium tracking-tighter"
          />

          <p className="t-body text-white/70 max-w-xl text-lg md:text-xl font-light leading-relaxed">
            Direct access for European & global founders, agencies, and institutions looking for complete brand architecture or ongoing creative directorship.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link href="/contact" className="btn btn-thick !bg-lime !text-black !border-lime">
                Project Brief ↗
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={handleCopy}
              className="btn btn-solid flex items-center gap-2"
              data-cursor-label="Copy"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-lime" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Mail className="h-3.5 w-3.5" />
                  <span>{email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Studio Card & Quick Channels */}
        <div className="lg:col-span-5 flex flex-col gap-8 border-t lg:border-t-0 lg:border-l border-white/15 pt-12 lg:pt-0 lg:pl-12">
          <div className="flex flex-col gap-3">
            <span className="t-label text-white/40">Studio Location</span>
            <CityClock />
            <p className="text-xs text-white/60 leading-relaxed font-light mt-1">
              Based in Islamabad, Pakistan (PKT). Working asynchronously with London, Berlin, Budapest, Tokyo and New York.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <span className="t-label text-white/40">Direct Channels</span>
            <SocialPills />
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <span className="t-label text-white/40">Formal Documentation</span>
            <a
              href="/Design%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="t-label u-draw inline-flex items-center gap-2 text-white/80 hover:text-lime self-start"
            >
              <span>Download Formal Resume & Credentials (PDF)</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
