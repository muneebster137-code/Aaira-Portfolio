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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parse duration in seconds
  const [min, sec] = reel.duration.split(":").map(Number);
  const totalSeconds = (min || 0) * 60 + (sec || 15);

  useEffect(() => {
    let currentProgress = progress;

    if (isPlaying) {
      const step = () => {
        currentProgress += 100 / (totalSeconds * 60);
        if (currentProgress >= 100) {
          currentProgress = 0;
        }
        setProgress(currentProgress);
        animationRef.current = requestAnimationFrame(step);
      };
      animationRef.current = requestAnimationFrame(step);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, totalSeconds]);

  // Dynamic canvas animation to simulate active video motion frames
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      if (isPlaying) {
        t += 0.05;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ambient fluid gradient lights simulating video lighting changes
        const grad = ctx.createLinearGradient(
          Math.sin(t * 0.5) * canvas.width * 0.5 + canvas.width * 0.5,
          0,
          canvas.width,
          canvas.height
        );
        grad.addColorStop(0, "rgba(211, 253, 80, 0.15)");
        grad.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0.08)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Film grain noise
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 16) {
          const noise = (Math.random() - 0.5) * 18;
          data[i] = Math.min(255, data[i] + noise);
          data[i + 1] = Math.min(255, data[i + 1] + noise);
          data[i + 2] = Math.min(255, data[i + 2] + noise);
        }
        ctx.putImageData(imgData, 0, 0);
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
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
        {/* Background Image Frame */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={reel.thumbnailUrl}
            alt={reel.title}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${
              isPlaying ? "scale-105 filter brightness-105" : "scale-100 filter brightness-90 group-hover:scale-102"
            }`}
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
        </div>

        {/* Dynamic Motion Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={340}
          height={604}
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60"
        />

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
