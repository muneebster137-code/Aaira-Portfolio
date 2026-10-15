"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { entranceDelay, onLoaderDone } from "@/lib/loaderGate";

interface RevealImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  trigger?: "load" | "scroll";
  delay?: number;
  children?: React.ReactNode;
}

/** Image that wipes in from the bottom (clip-path) while de-zooming, with optional scroll parallax. */
export default function RevealImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  parallax = true,
  trigger = "scroll",
  delay = 0,
  children,
  ...rest
}: RevealImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    let unsubscribe = () => {};

    const ctx = gsap.context(() => {
      gsap.set(inner, { scale: 1.3 });
      if (parallax) {
        gsap.fromTo(
          inner,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    }, wrap);

    const play = (extra = 0) =>
      ctx.add(() => {
        gsap.to(wrap, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "expo.inOut",
          delay: delay + extra,
        });
        gsap.to(inner, { scale: 1, duration: 2, ease: "expo.out", delay: delay + extra + 0.2 });
      });

    if (trigger === "load") {
      unsubscribe = onLoaderDone(() => play(entranceDelay()));
    } else {
      ctx.add(() => {
        ScrollTrigger.create({ trigger: wrap, start: "top 90%", once: true, onEnter: () => play() });
      });
    }

    return () => {
      unsubscribe();
      ctx.revert();
    };
  }, [parallax, trigger, delay]);

  return (
    <div ref={wrapRef} className={`clip-start relative overflow-hidden ${className}`} {...rest}>
      <div ref={innerRef} className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
      </div>
      {children}
    </div>
  );
}
