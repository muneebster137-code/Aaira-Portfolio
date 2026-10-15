"use client";

import React from "react";
import VelocityMarquee from "@/components/motion/VelocityMarquee";

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
    <div className="relative border-y border-white/20 bg-black py-4 select-none">
      <VelocityMarquee speed={65} className="w-full">
        <div className="flex items-center">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 px-6 text-sm uppercase tracking-wider text-white/80">
              <span className="font-medium tracking-tight text-white">{item.en}</span>
              <span className="t-label text-white/40">[{item.jp}]</span>
              <span className="text-lime text-base">✺</span>
            </div>
          ))}
        </div>
      </VelocityMarquee>
    </div>
  );
}
