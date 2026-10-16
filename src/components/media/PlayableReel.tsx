"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share2, Bookmark, Maximize2, Sparkles } from "lucide-react";
import { ProjectReel } from "@/data/projectsData";

interface PlayableReelProps {
  reel: ProjectReel;
  autoPlayOnHover?: boolean;
}

export default function PlayableReel({ reel }: PlayableReelProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(1420);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const animationRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Parse duration in seconds (fallback when the clip doesn't report one)
  const [min, sec] = reel.duration.split(":").map(Number);
  const totalSeconds = (min || 0) * 60 + (sec || 15);

  // Progress bar follows the real clip; recorded .webm files sometimes lack a
  // duration header, so fall back to the listed duration.
  useEffect(() => {
    if (!isPlaying) return;
    let fallback = progress;
    const step = () => {
      const v = videoRef.current;
      if (v && videoReady && Number.isFinite(v.duration) && v.duration > 0) {
        setProgress((v.currentTime / v.duration) * 100);
      } else {
        fallback = (fallback + 100 / (totalSeconds * 60)) % 100;
        setProgress(fallback);
      }
      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, totalSeconds, videoReady]);

  const togglePlay = () => {
    const v = videoRef.current;
    const next = !isPlaying;
    setIsPlaying(next);
    if (!v) return;
    if (next) v.play().catch(() => {});
    else v.pause();
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  return (
    <>
      <div
        className="group relative w-full aspect-[9/16] max-w-[340px] mx-auto rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(211,253,80,0.25)] select-none cursor-pointer"
        onClick={togglePlay}
        data-cursor="reel"
        data-cursor-label={isPlaying ? "PAUSE" : "PLAY REEL"}
      >
        {/* Poster + reel video (public/media/.../reel-N.jpg + reel-N.webm) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={reel.thumbnailUrl}
            alt={reel.title}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${
              isPlaying ? "scale-105 filter brightness-105" : "scale-100 filter brightness-90 group-hover:scale-102"
            }`}
          />
          {reel.videoUrl && (
            <video
              ref={videoRef}
              src={reel.videoUrl}
              poster={reel.thumbnailUrl}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setVideoReady(true)}
              onError={() => setVideoReady(false)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
        </div>

        {/* Top Header Bar */}
        <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#D3FD50] animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-white font-medium">
              {reel.views} Views
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D3FD50]" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              title="Expand Reel"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Central Play/Pause indicator */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none z-20 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-[#D3FD50] text-black backdrop-blur-md flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
            <Play className="w-7 h-7 text-black fill-black ml-1" />
          </div>
        </div>

        {/* Right Action Rail */}
        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-20">
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 group/btn"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                isLiked
                  ? "bg-[#D3FD50] border-[#D3FD50] text-black scale-110"
                  : "bg-black/50 border-white/15 text-white hover:bg-black/80"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-black" : ""}`} />
            </div>
            <span className="text-[10px] font-mono text-white/90 font-medium">{likeCount}</span>
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-black/80 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-white/90">84</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                isSaved
                  ? "bg-white text-black border-white"
                  : "bg-black/50 border-white/15 text-white hover:bg-black/80"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </div>
            <span className="text-[10px] font-mono text-white/90">Save</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard?.writeText(window.location.href);
            }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-black/80 transition-colors">
              <Share2 className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Bottom Metadata & Sound Track */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-white tracking-wide">@aaira.basit</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70">
              Creative Dir
            </span>
          </div>

          <p className="text-xs text-white/90 font-medium leading-relaxed mb-2 line-clamp-2">
            {reel.caption}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {reel.tags.map((tag) => (
              <span key={tag} className="text-[10px] text-[#D3FD50] font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Soundbar / audio track indicator */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-2">
            <Sparkles className="w-3 h-3 text-[#D3FD50]" />
            <span className="truncate">Original Sound · Aaira Basit Visual Edit</span>
            {isPlaying && !isMuted && (
              <div className="flex items-end gap-0.5 h-3 ml-auto">
                <span className="w-0.5 h-full bg-[#D3FD50] animate-[bounce_0.6s_ease-in-out_infinite]" />
                <span className="w-0.5 h-2/3 bg-[#D3FD50] animate-[bounce_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 h-4/5 bg-[#D3FD50] animate-[bounce_0.5s_ease-in-out_infinite]" />
              </div>
            )}
          </div>

          {/* Scrubber progress bar */}
          <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#D3FD50] transition-all duration-100 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Expanded Modal View */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md aspect-[9/16] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={reel.thumbnailUrl}
              alt={reel.title}
              fill
              className="object-cover"
            />
            {reel.videoUrl && (
              <video
                src={reel.videoUrl}
                poster={reel.thumbnailUrl}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-bold text-lg">{reel.title}</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-mono"
                >
                  CLOSE ✕
                </button>
              </div>
              <div>
                <p className="text-white/90 text-sm mb-3">{reel.caption}</p>
                <div className="flex gap-2">
                  {reel.tags.map((t) => (
                    <span key={t} className="text-xs text-[#D3FD50]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
