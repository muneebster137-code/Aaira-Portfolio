"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function KineticCoreCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    // 3D Geometry: Concentric geometric cubes and orbital rings
    const size = Math.min(width, height) * 0.28;
    const vertices: Point3D[] = [
      // Outer Cube
      { x: -size, y: -size, z: -size },
      { x: size, y: -size, z: -size },
      { x: size, y: size, z: -size },
      { x: -size, y: size, z: -size },
      { x: -size, y: -size, z: size },
      { x: size, y: -size, z: size },
      { x: size, y: size, z: size },
      { x: -size, y: size, z: size },
      // Inner Core Cube (offset rotation)
      { x: -size * 0.5, y: -size * 0.5, z: -size * 0.5 },
      { x: size * 0.5, y: -size * 0.5, z: -size * 0.5 },
      { x: size * 0.5, y: size * 0.5, z: -size * 0.5 },
      { x: -size * 0.5, y: size * 0.5, z: -size * 0.5 },
      { x: -size * 0.5, y: -size * 0.5, z: size * 0.5 },
      { x: size * 0.5, y: -size * 0.5, z: size * 0.5 },
      { x: size * 0.5, y: size * 0.5, z: size * 0.5 },
      { x: -size * 0.5, y: size * 0.5, z: size * 0.5 },
    ];

    const edges = [
      // Outer
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      // Inner
      [8, 9], [9, 10], [10, 11], [11, 8],
      [12, 13], [13, 14], [14, 15], [15, 12],
      [8, 12], [9, 13], [10, 14], [11, 15],
      // Connecting bridges
      [0, 8], [2, 10], [5, 13], [7, 15],
    ];

    // Orbital ring particles
    const ringParticles: { angle: number; radius: number; speed: number; y: number }[] = [];
    for (let i = 0; i < 40; i++) {
      ringParticles.push({
        angle: (i / 40) * Math.PI * 2,
        radius: size * (1.3 + Math.sin(i) * 0.2),
        speed: 0.008 + (i % 3) * 0.004,
        y: (Math.sin(i * 1.5) * size) * 0.4,
      });
    }

    let rotX = 0.4;
    let rotY = 0.6;
    let rotZ = 0.2;
    let targetRotX = 0.4;
    let targetRotY = 0.6;

    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        targetRotY += dx * 0.01;
        targetRotX += dy * 0.01;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      } else {
        targetRotY = 0.6 + relX * 1.2;
        targetRotX = 0.4 + relY * 0.8;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const fov = 450;

    const project = (p: Point3D): { x: number; y: number; scale: number } => {
      // Rotate around X
      let y1 = p.y * Math.cos(rotX) - p.z * Math.sin(rotX);
      let z1 = p.y * Math.sin(rotX) + p.z * Math.cos(rotX);

      // Rotate around Y
      let x2 = p.x * Math.cos(rotY) + z1 * Math.sin(rotY);
      let z2 = -p.x * Math.sin(rotY) + z1 * Math.cos(rotY);

      // Rotate around Z
      let x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
      let y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

      const scale = fov / (fov + z2 + size * 1.8);
      return {
        x: width / 2 + x3 * scale,
        y: height / 2 + y3 * scale,
        scale,
      };
    };

    const render = () => {
      // Continuous ambient rotation
      targetRotY += 0.003;
      rotX += (targetRotX - rotX) * 0.06;
      rotY += (targetRotY - rotY) * 0.06;
      rotZ += 0.001;

      ctx.clearRect(0, 0, width, height);

      // Project vertices
      const projected = vertices.map(project);

      // Draw subtle orbital rings
      ringParticles.forEach((rp, idx) => {
        rp.angle += rp.speed;
        const px = Math.cos(rp.angle) * rp.radius;
        const pz = Math.sin(rp.angle) * rp.radius;
        const p = project({ x: px, y: rp.y, z: pz });

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = idx % 5 === 0 ? "rgba(211, 253, 80, 0.85)" : "rgba(255, 255, 255, 0.25)";
        ctx.fill();
      });

      // Draw Edges with chromatic depth
      edges.forEach(([i, j], edgeIdx) => {
        const p1 = projected[i];
        const p2 = projected[j];

        const avgScale = (p1.scale + p2.scale) / 2;
        const isCore = i >= 8 && j >= 8;
        const isBridge = (i < 8 && j >= 8) || (i >= 8 && j < 8);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        if (isBridge) {
          ctx.strokeStyle = `rgba(211, 253, 80, ${Math.max(0.15, avgScale * 0.7)})`;
          ctx.lineWidth = 1.2 * avgScale;
        } else if (isCore) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.3, avgScale * 0.9)})`;
          ctx.lineWidth = 1.5 * avgScale;
        } else {
          ctx.strokeStyle = `rgba(200, 200, 200, ${Math.max(0.2, avgScale * 0.6)})`;
          ctx.lineWidth = 1.0 * avgScale;
        }

        ctx.stroke();
      });

      // Draw Nodes/Vertices
      projected.forEach((p, idx) => {
        ctx.beginPath();
        const isCore = idx >= 8;
        const radius = isCore ? 3.5 * p.scale : 2.5 * p.scale;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        if (idx === 0 || idx === 10 || idx === 13) {
          ctx.fillStyle = "#D3FD50";
          ctx.shadowColor = "#D3FD50";
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing w-full h-full pointer-events-auto"
        data-cursor="drag"
        data-cursor-label="ROTATE"
      />
      <div className="absolute bottom-4 right-4 pointer-events-none flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D3FD50] animate-ping" />
        <span>Kinetic Creative Core · Interactive</span>
      </div>
    </div>
  );
}
