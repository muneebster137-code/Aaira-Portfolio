"use client";

import React from "react";
import Link from "next/link";
import { useIslamabadClock } from "@/lib/useClock";

/** Wireframe globe, as in K72's clock. */
export function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4.2" ry="10" />
      <path d="M2 12h20M4 6.5h16M4 17.5h16" />
    </svg>
  );
}

/** "ISLAMABAD_14:22:09" */
export function CityClock({ className = "" }: { className?: string }) {
  const time = useIslamabadClock();
  return (
    <div className={`t-label flex items-center gap-2 tabular-nums ${className}`}>
      <GlobeIcon className="spin-slow h-4 w-4" />
      <span>
        ISLAMABAD_<span suppressHydrationWarning>{time}</span>
      </span>
    </div>
  );
}

/** Stacked logotype. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Aaira Basit — home" className={`group block leading-[0.78] ${className}`}>
      <span className="block text-[1.65rem] font-semibold uppercase tracking-[-0.06em]">Aaira</span>
      <span className="block text-[1.65rem] font-semibold uppercase tracking-[-0.06em]">
        Basit<span className="text-lime">.</span>
      </span>
    </Link>
  );
}

export const SOCIALS = [
  { short: "IN", label: "LinkedIn", href: "https://www.linkedin.com" },
  { short: "BE", label: "Behance", href: "https://www.behance.net" },
  { short: "IG", label: "Instagram", href: "https://www.instagram.com" },
  { short: "CV", label: "Resume", href: "/Design%20Resume.pdf" },
];

export function SocialPills({ className = "", ink = false }: { className?: string; ink?: boolean }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {SOCIALS.map((s) => (
        <li key={s.short}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`btn !px-4 ${ink ? "btn-ink" : ""}`}
          >
            {s.short}
          </a>
        </li>
      ))}
    </ul>
  );
}
