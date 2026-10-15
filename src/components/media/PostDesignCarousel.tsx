"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Layers, ArrowUpRight } from "lucide-react";
import { PostDesignSlide } from "@/data/projectsData";

interface PostDesignCarouselProps {
  slides: PostDesignSlide[];
  projectName: string;
}

export default function PostDesignCarousel({ slides, projectName }: PostDesignCarouselProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full bg-zinc-950/80 rounded-2xl border border-white/10 p-6 md:p-8 backdrop-blur-md">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D3FD50]/10 border border-[#D3FD50]/30 flex items-center justify-center text-[#D3FD50]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#D3FD50] uppercase font-semibold">
              Post Design Layout · Social Carousel
            </span>
            <h4 className="text-lg md:text-xl font-bold text-white tracking-tight">
              {projectName} Multi-Slide Architecture
            </h4>
          </div>
        </div>

        {/* Slide Counter & Arrows */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-zinc-400 bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/10">
            Slide <span className="text-white font-bold">{currentSlideIndex + 1}</span> of {slides.length}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-[#D3FD50] hover:bg-[#D3FD50]/90 text-black flex items-center justify-center transition-colors font-bold"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Post Canvas / Image Mockup */}
        <div className="lg:col-span-7 relative group">
          <div className="relative aspect-square md:aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl">
            <Image
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              fill
              className="object-contain p-2 md:p-4 transition-transform duration-500 group-hover:scale-102"
            />
            {/* Slide Badge */}
            <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[11px] font-mono text-zinc-300">
              Panel {currentSlide.slideNumber}/{currentSlide.totalSlides}
            </div>
            <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[11px] font-mono text-[#D3FD50]">
              {currentSlide.category}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlideIndex === idx ? "w-8 bg-[#D3FD50]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide Strategic Narrative */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D3FD50]" />
            Slide Intent & Rationale
          </div>

          <h5 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {currentSlide.title}
          </h5>

          <p className="text-base text-zinc-300 leading-relaxed font-normal">
            {currentSlide.description}
          </p>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Strategic Function:
            </div>
            <p className="text-sm text-zinc-200">
              {currentSlide.tagline}
            </p>
          </div>

          {/* Thumbnails preview row */}
          <div className="pt-2">
            <div className="text-xs font-mono text-zinc-500 mb-2 uppercase">Carousel Sequence:</div>
            <div className="flex gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border transition-all ${
                    currentSlideIndex === idx
                      ? "border-[#D3FD50] ring-2 ring-[#D3FD50]/40 scale-105"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={s.imageUrl} alt={s.title} fill className="object-cover" />
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 text-white px-1 rounded">
                    #{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
