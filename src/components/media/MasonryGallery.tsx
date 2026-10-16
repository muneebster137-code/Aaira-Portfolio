"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Play, Sparkles, X, Tag } from "lucide-react";
import { MasonryMediaItem } from "@/data/projectsData";

interface MasonryGalleryProps {
  items: MasonryMediaItem[];
  title?: string;
  subtitle?: string;
}

export default function MasonryGallery({
  items,
  title = "Curated Visual Gallery",
  subtitle = "Masonry composition preserving true media aspect ratios & tactical print specs.",
}: MasonryGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MasonryMediaItem | null>(null);

  if (!items || items.length === 0) return null;

  const getAspectClass = (ratio: MasonryMediaItem["aspectRatio"]) => {
    switch (ratio) {
      case "9:16":
        return "aspect-[9/16]";
      case "4:5":
        return "aspect-[4/5]";
      case "16:9":
        return "aspect-[16/9]";
      case "3:2":
        return "aspect-[3/2]";
      case "4:3":
        return "aspect-[4/3]";
      case "1:1":
      default:
        return "aspect-square";
    }
  };

  return (
    <div className="w-full">
      {/* Gallery Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D3FD50] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D3FD50]" />
            Aspect-Calibrated Masonry
          </div>
          <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h3>
        </div>
        <p className="text-sm text-zinc-400 max-w-md">
          {subtitle}
        </p>
      </div>

      {/* True Masonry Columns (Non-rigid gridlock) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-zinc-900/60 border border-white/10 hover:border-[#D3FD50]/50 transition-all duration-500 hover:shadow-[0_10px_35px_rgba(211,253,80,0.15)] cursor-pointer"
            data-cursor="view"
            data-cursor-label="EXPAND"
          >
            {/* Media Container with custom aspect ratio */}
            <div className={`relative w-full ${getAspectClass(item.aspectRatio)} overflow-hidden`}>
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {item.videoUrl && (
                <video
                  src={item.videoUrl}
                  poster={item.imageUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}

              {/* Gradient Vignette on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Top Aspect Ratio Tag */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-zinc-300">
                  {item.aspectRatio}
                </span>
                {item.type === "reel" && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-[#D3FD50] text-black flex items-center gap-1 font-bold">
                    <Play className="w-2.5 h-2.5 fill-black" /> REEL
                  </span>
                )}
              </div>

              {/* Quick expand icon */}
              <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 group-hover:text-white group-hover:scale-110 transition-all">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-mono uppercase text-[#D3FD50] tracking-widest font-semibold block mb-1">
                  {item.category}
                </span>
                <h4 className="text-white font-bold text-base leading-snug drop-shadow-md">
                  {item.title}
                </h4>
                <p className="text-zinc-300 text-xs mt-1.5 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Display */}
            <div className="relative flex-1 min-h-[300px] md:min-h-[500px] bg-black flex items-center justify-center p-2">
              <div className="relative w-full h-full min-h-[350px]">
                {selectedItem.videoUrl ? (
                  <video
                    src={selectedItem.videoUrl}
                    poster={selectedItem.imageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                ) : (
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            </div>

            {/* Modal Sidebar Info */}
            <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-zinc-900/50">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[11px] font-mono uppercase text-[#D3FD50] tracking-wider px-2 py-0.5 rounded bg-[#D3FD50]/10 border border-[#D3FD50]/30 font-bold">
                    {selectedItem.type.toUpperCase()}
                  </span>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {selectedItem.title}
                </h3>

                <p className="text-xs font-mono text-zinc-400 mb-6">
                  Ratio: {selectedItem.aspectRatio} · {selectedItem.category}
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[10px] font-mono uppercase text-zinc-400 mb-1">
                      Art Direction Notes:
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {selectedItem.caption}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  Aaira Basit Portfolio 2026
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-xs font-mono font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
