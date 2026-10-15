/**
 * Coordinates entrance animations with the intro loader and page transitions.
 * - First visit: components wait until the loader columns start lifting.
 * - Client navigations: the loader is already done, so components play after
 *   the 5-column page wipe (see app/template.tsx) via `entranceDelay()`.
 */
let done = false;
const subscribers = new Set<() => void>();

export function markLoaderDone() {
  if (done) return;
  done = true;
  subscribers.forEach((cb) => cb());
  subscribers.clear();
}

export function isLoaderDone() {
  return done;
}

/** Runs `cb` once the loader is finished (immediately if it already is). */
export function onLoaderDone(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

/** Extra delay for entrance animations that run after a page wipe. */
export function entranceDelay() {
  return done ? 0.45 : 0.1;
}
