import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import RevealLines from "@/components/motion/RevealLines";
import BrickBreaker404 from "@/components/fun/BrickBreaker404";

export default function NotFound() {
  return (
    <main className="theme-dark min-h-screen pt-32 pb-20">
      <title>Page not found | Aaira Basit</title>
      <div className="gutter grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <span className="t-label text-lime">404 / PAGE NOT FOUND [迷子]</span>
          <RevealLines
            as="h1"
            lines={["LOST?", "BREAK", "THE 404."]}
            outlineLines={[1]}
            trigger="load"
            className="t-section font-medium tracking-tighter text-white"
          />
          <p className="t-body max-w-md text-white/70">
            This page doesn&apos;t exist, or I moved it. Since you&apos;re here anyway, knock out every brick, then
            I&apos;ll show you something that does exist.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/" className="btn !border-lime !bg-lime !text-black">
              Take me home <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/work" className="btn">
              See my work <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <BrickBreaker404 />
        </div>
      </div>
    </main>
  );
}
