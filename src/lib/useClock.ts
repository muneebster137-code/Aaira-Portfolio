"use client";

import { useEffect, useState } from "react";

/** Live Islamabad time (PKT), K72-style clock. Empty until mounted to avoid hydration mismatch. */
export function useIslamabadClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time || "--:--:--";
}
