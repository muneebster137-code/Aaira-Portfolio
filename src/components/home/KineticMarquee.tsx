"use client";

import React from "react";
import VelocityMarquee from "@/components/motion/VelocityMarquee";

/** K72 velocity ticker on an Amanation-style tilted band. */
export default function KineticMarquee() {
  const items = [
    { en: "Brand Systems", jp: "ブランド体系" },
    { en: "Playable Reels", jp: "映像制作" },
    { en: "Cognitive Psychology", jp: "認知心理学" },
    { en: "Campaign Architecture", jp: "戦略的設計" },
    { en: "AI Creative Production", jp: "次世代生成" },
    { en: "Editorial & Print", jp: "紙面設計" },
    { en: "Tokyo ✺ Budapest ✺ Islamabad", jp: "世界展開" },
  ];

  return (
    <div className="relative z-10 -my-4 overflow-hidden py-10 select-none md:-my-6 md:py-14">
      {/* Back band, tilted the other way */}
      <div className="absolute inset-x-[-5vw] top-1/2 h-12 -translate-y-1/2 rotate-[1.6deg] border-y border-white/15 bg-neutral-900 md:h-14" aria-hidden="true" />
      <div className="relative -mx-[5vw] -rotate-[1.6deg] bg-lime py-3 text-black md:py-4">
        <VelocityMarquee speed={65} className="w-full">
          <div className="flex items-center">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 px-6 text-sm uppercase tracking-wider">
                <span className="font-medium tracking-tight">{item.en}</span>
                <span className="t-label text-black/50">[{item.jp}]</span>
                <span className="text-base">✺</span>
              </div>
            ))}
          </div>
        </VelocityMarquee>
      </div>
    </div>
  );
}
