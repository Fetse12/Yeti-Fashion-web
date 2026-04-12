import { useEffect, useState } from "react";

const LIME = "#9ACD32";
const TRAIL_CAP = 52;

export default function NeedleCursor() {
  const [active, setActive] = useState(false);
  const [needle, setNeedle] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setActive(true);
    document.body.classList.add("yeti-cursor-hide");

    const onMove = (e) => {
      const p = { x: e.clientX, y: e.clientY };
      setNeedle(p);
      setTrail((prev) => [p, ...prev].slice(0, TRAIL_CAP));
    };

    const onLeave = () => setTrail([]);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("yeti-cursor-hide");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!active) return null;

  const points = trail.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0 z-[100] h-screen w-screen"
        aria-hidden
      >
        <defs>
          <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {points ? (
          <polyline
            points={points}
            fill="none"
            stroke={LIME}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.78}
            filter="url(#threadGlow)"
          />
        ) : null}
      </svg>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[110]"
        style={{
          transform: `translate(calc(${needle.x}px - 1px), calc(${needle.y}px - 2px))`,
        }}
        aria-hidden
      >
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
          <path
            d="M11 2v20M11 22l-4-4M11 22l4-4"
            stroke="#141414"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="11" cy="25" r="2" fill={LIME} />
        </svg>
      </div>
    </>
  );
}
