"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

/** 5×7 pixel glyphs; the bricks spell "404". */
const GLYPHS: Record<string, string[]> = {
  "4": ["1...1", "1...1", "1...1", "11111", "....1", "....1", "....1"],
  "0": [".111.", "1...1", "1..11", "1.1.1", "11..1", "1...1", ".111."],
};
const WORD = "404";
const COLS = WORD.length * 5 + (WORD.length - 1); // one empty column between glyphs
const LIVES = 3;
const BEST_KEY = "aaira-404-best";

type Status = "ready" | "playing" | "won" | "lost";
interface Brick { x: number; y: number; w: number; h: number; alive: boolean }

function buildBricks(W: number, H: number): Brick[] {
  const areaW = W * 0.86;
  const size = areaW / COLS;
  const left = (W - areaW) / 2;
  const top = H * 0.1;
  const bricks: Brick[] = [];
  WORD.split("").forEach((ch, gi) => {
    GLYPHS[ch].forEach((row, r) => {
      row.split("").forEach((cell, c) => {
        if (cell !== "1") return;
        const col = gi * 6 + c;
        bricks.push({ x: left + col * size + 1.5, y: top + r * size * 0.62 + 1.5, w: size - 3, h: size * 0.62 - 3, alive: true });
      });
    });
  });
  return bricks;
}

export default function BrickBreaker404() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [best, setBest] = useState(0);

  // Mutable game state lives in a ref so the loop never waits on React.
  const g = useRef({
    W: 0, H: 0, dpr: 1,
    paddle: { x: 0, w: 0, h: 0, y: 0 },
    ball: { x: 0, y: 0, vx: 0, vy: 0, r: 0, stuck: true },
    bricks: [] as Brick[],
    keys: { left: false, right: false },
    status: "ready" as Status,
    score: 0,
    lives: LIVES,
  });

  // Saved best score (read after mount so server and client markup match).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        setBest(Number(localStorage.getItem(BEST_KEY)) || 0);
      } catch {}
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const setGameStatus = useCallback((s: Status) => {
    g.current.status = s;
    setStatus(s);
  }, []);

  const resetBall = useCallback(() => {
    const s = g.current;
    s.ball.stuck = true;
    s.ball.x = s.paddle.x;
    s.ball.y = s.paddle.y - s.paddle.h / 2 - s.ball.r - 1;
    s.ball.vx = 0;
    s.ball.vy = 0;
  }, []);

  const newGame = useCallback(() => {
    const s = g.current;
    s.bricks = buildBricks(s.W, s.H);
    s.score = 0;
    s.lives = LIVES;
    setScore(0);
    setLives(LIVES);
    resetBall();
  }, [resetBall]);

  const launch = useCallback(() => {
    const s = g.current;
    if (s.status === "won" || s.status === "lost") {
      newGame();
    }
    if (!s.ball.stuck) return;
    const speed = Math.max(s.H, 320) * 0.85;
    const angle = (-Math.PI / 2) + (Math.random() - 0.5) * 0.9;
    s.ball.vx = Math.cos(angle) * speed;
    s.ball.vy = Math.sin(angle) * speed;
    s.ball.stuck = false;
    setGameStatus("playing");
  }, [newGame, setGameStatus]);

  // Size the canvas to its box (and re-lay out on resize).
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const fit = () => {
      const s = g.current;
      const r = wrap.getBoundingClientRect();
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.W = r.width;
      s.H = r.height;
      canvas.width = r.width * s.dpr;
      canvas.height = r.height * s.dpr;
      s.paddle.w = Math.max(70, r.width * 0.16);
      s.paddle.h = Math.max(10, r.height * 0.025);
      s.paddle.y = r.height - s.paddle.h * 2.5;
      s.paddle.x = s.paddle.x ? Math.min(Math.max(s.paddle.x, s.paddle.w / 2), r.width - s.paddle.w / 2) : r.width / 2;
      s.ball.r = Math.max(6, r.width * 0.009);
      const alive = s.bricks.map((b) => b.alive);
      s.bricks = buildBricks(r.width, r.height).map((b, i) => ({ ...b, alive: alive.length ? alive[i] : true }));
      if (s.ball.stuck) resetBall();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [resetBall]);

  // Pointer, touch and keyboard controls.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = g.current;
    const move = (clientX: number) => {
      const r = canvas.getBoundingClientRect();
      s.paddle.x = Math.min(Math.max(clientX - r.left, s.paddle.w / 2), s.W - s.paddle.w / 2);
    };
    const onPointerMove = (e: PointerEvent) => move(e.clientX);
    const onPointerDown = (e: PointerEvent) => {
      move(e.clientX);
      launch();
    };
    const onKey = (e: KeyboardEvent, down: boolean) => {
      const inView = canvas.getBoundingClientRect().bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowLeft" || e.key === "a") s.keys.left = down;
      else if (e.key === "ArrowRight" || e.key === "d") s.keys.right = down;
      else if ((e.key === " " || e.key === "Enter") && down) launch();
      else return;
      e.preventDefault();
    };
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, [launch]);

  // Game loop.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const s = g.current;
    let raf = 0;
    let last = performance.now();
    const lime = "#d3fd50";

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const { W, H, paddle, ball } = s;

      // Keyboard paddle.
      const kv = (s.keys.right ? 1 : 0) - (s.keys.left ? 1 : 0);
      if (kv) paddle.x = Math.min(Math.max(paddle.x + kv * W * 1.1 * dt, paddle.w / 2), W - paddle.w / 2);

      if (ball.stuck) {
        ball.x = paddle.x;
        ball.y = paddle.y - paddle.h / 2 - ball.r - 1;
      } else if (s.status === "playing") {
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;

        // Walls.
        if (ball.x < ball.r) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
        if (ball.x > W - ball.r) { ball.x = W - ball.r; ball.vx = -Math.abs(ball.vx); }
        if (ball.y < ball.r) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); }

        // Paddle: bounce angle depends on where it hits.
        const top = paddle.y - paddle.h / 2;
        if (ball.vy > 0 && ball.y + ball.r >= top && ball.y - ball.r <= top + paddle.h &&
            ball.x >= paddle.x - paddle.w / 2 - ball.r && ball.x <= paddle.x + paddle.w / 2 + ball.r) {
          const hit = (ball.x - paddle.x) / (paddle.w / 2);
          const speed = Math.hypot(ball.vx, ball.vy) * 1.015;
          const angle = hit * (Math.PI / 3);
          ball.vx = Math.sin(angle) * speed;
          ball.vy = -Math.cos(angle) * speed;
          ball.y = top - ball.r;
        }

        // Bricks.
        for (const b of s.bricks) {
          if (!b.alive) continue;
          const cx = Math.max(b.x, Math.min(ball.x, b.x + b.w));
          const cy = Math.max(b.y, Math.min(ball.y, b.y + b.h));
          if ((ball.x - cx) ** 2 + (ball.y - cy) ** 2 > ball.r ** 2) continue;
          b.alive = false;
          const overlapX = Math.min(ball.x + ball.r - b.x, b.x + b.w - (ball.x - ball.r));
          const overlapY = Math.min(ball.y + ball.r - b.y, b.y + b.h - (ball.y - ball.r));
          if (overlapX < overlapY) ball.vx *= -1;
          else ball.vy *= -1;
          s.score += 10;
          setScore(s.score);
          break;
        }

        if (s.bricks.every((b) => !b.alive)) {
          ball.vx = ball.vy = 0;
          setGameStatus("won");
          setBest((prev) => {
            const next = Math.max(prev, s.score + s.lives * 50);
            try { localStorage.setItem(BEST_KEY, String(next)); } catch {}
            return next;
          });
          s.score += s.lives * 50;
          setScore(s.score);
        }

        // Missed.
        if (ball.y - ball.r > H) {
          s.lives -= 1;
          setLives(s.lives);
          if (s.lives <= 0) {
            setGameStatus("lost");
            setBest((prev) => {
              const next = Math.max(prev, s.score);
              try { localStorage.setItem(BEST_KEY, String(next)); } catch {}
              return next;
            });
          } else {
            setGameStatus("ready");
          }
          resetBall();
        }
      }

      // Draw.
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      for (const b of s.bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = lime;
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, b.w, b.h, Math.min(4, b.h / 3));
        ctx.fill();
      }
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.roundRect(paddle.x - paddle.w / 2, paddle.y - paddle.h / 2, paddle.w, paddle.h, paddle.h / 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [resetBall, setGameStatus]);

  const message =
    status === "ready" ? "Click, tap or press space to launch" :
    status === "won" ? "You broke the 404. Click to play again" :
    status === "lost" ? "Out of balls. Click to try again" : "";

  return (
    <div className="w-full">
      <div className="t-label mb-3 flex items-center justify-between text-white/60">
        <span>Score <span className="text-lime tabular-nums">{score}</span></span>
        <span aria-label={`${lives} lives left`}>
          {Array.from({ length: LIVES }, (_, i) => (
            <span key={i} className={`ml-1 inline-block h-2 w-2 rounded-full ${i < lives ? "bg-lime" : "bg-white/15"}`} />
          ))}
        </span>
        <span>Best <span className="tabular-nums text-white">{best}</span></span>
      </div>

      <div
        ref={wrapRef}
        className="rounded-media relative aspect-[4/5] w-full touch-none select-none border border-white/15 bg-neutral-950 sm:aspect-[16/10]"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-none"
          aria-label="Breakout game: bounce the ball to break the bricks spelling 404"
          role="img"
        />
        {message && (
          <div className="pointer-events-none absolute inset-x-0 bottom-[18%] flex justify-center px-4">
            <span className="t-label rounded-full bg-black/70 px-4 py-2 text-center text-white backdrop-blur-md">
              {message}
            </span>
          </div>
        )}
      </div>

      <p className="t-label mt-3 text-white/40">Mouse or touch to move · Arrow keys work too</p>
    </div>
  );
}
