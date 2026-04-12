import { motion } from "framer-motion";
import { useState } from "react";

const IMG_PRODUCTION = "/images/mass_garment_production.png";

/** The Digital CAD Pattern Background for the Academy Side */
function AcademyCADBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30 mix-blend-screen transition-transform duration-[20s] ease-out group-hover:scale-105">
      <svg viewBox="0 0 1000 1000" className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid slice">
        
        {/* Bodice Pattern CAD */}
        <g transform="translate(100, 150)">
          <path 
            d="M 150 0 L 250 50 L 200 150 C 350 250 350 400 350 700 L 50 750 L 50 350 C 100 350 150 250 150 150 Z" 
            stroke="#a3a3a3" 
            strokeWidth="8" 
            strokeLinejoin="round"
          />
          {/* Inner contour / details */}
          <path d="M 50 50 L 150 0" stroke="#a3a3a3" strokeWidth="8" strokeLinecap="round" />
          
          {/* Central alignment orange arrow */}
          <line x1="80" y1="150" x2="80" y2="700" stroke="#f97316" strokeWidth="2" />
          <polygon points="75,690 85,690 80,700" fill="#f97316" />
          
          <text x="65" y="450" fill="#a3a3a3" fontSize="18" transform="rotate(-90 65,450)" letterSpacing="4">CENTRE FRONT</text>

          {/* Technical lines */}
          <line x1="-50" y1="200" x2="450" y2="200" stroke="#00FFFF" strokeDasharray="12 12" strokeWidth="2" className="opacity-60" />
          <text x="460" y="206" fill="#00FFFF" fontSize="16" letterSpacing="2" className="opacity-60">BUST LINE</text>
          
          <line x1="20" y1="500" x2="450" y2="500" stroke="#00FFFF" strokeDasharray="12 12" strokeWidth="2" className="opacity-60" />
          <text x="460" y="490" fill="#00FFFF" fontSize="16" letterSpacing="2" className="opacity-60">WAIST</text>
          <text x="460" y="510" fill="#00FFFF" fontSize="16" letterSpacing="2" className="opacity-60">LINE</text>
          
          <line x1="20" y1="720" x2="450" y2="720" stroke="#00FFFF" strokeDasharray="12 12" strokeWidth="2" className="opacity-60" />
          <text x="460" y="726" fill="#00FFFF" fontSize="16" letterSpacing="2" className="opacity-60">HIP LINE</text>
        </g>

        {/* Sleeve Pattern CAD with Bounding Box Tool */}
        <g transform="translate(600, 200)">
          {/* Sleeve Body */}
          <path 
            d="M 50 100 C 150 -50 250 -50 350 100 L 320 650 L 80 650 Z" 
            stroke="#a3a3a3" 
            strokeWidth="8" 
            strokeLinejoin="round" 
          />
          
          {/* Active Edit Mesh / Sleeve Cap */}
          <path 
            d="M 50 100 C 150 -50 250 -50 350 100" 
            stroke="#a855f7" 
            strokeWidth="5" 
          />
          <path 
            d="M 50 0 C 150 -100 250 -100 350 0 C 300 50 200 50 150 0 C 100 50 50 20 50 0 Z" 
            stroke="#a855f7" 
            strokeWidth="5" 
          />
          
          {/* Purple Bounding Box (Illustrator/CAD style) */}
          <rect x="40" y="-80" width="320" height="180" fill="none" stroke="#a855f7" strokeWidth="1" />
          {/* Transform Controls / Anchors */}
          <rect x="36" y="-84" width="8" height="8" fill="white" stroke="#a855f7" />
          <rect x="196" y="-84" width="8" height="8" fill="white" stroke="#a855f7" />
          <rect x="356" y="-84" width="8" height="8" fill="white" stroke="#a855f7" />
          <rect x="36" y="96" width="8" height="8" fill="white" stroke="#a855f7" />
          <rect x="196" y="96" width="8" height="8" fill="white" stroke="#a855f7" />
          <rect x="356" y="96" width="8" height="8" fill="white" stroke="#a855f7" />
          <rect x="36" y="6" width="8" height="8" fill="white" stroke="#a855f7" />
          <rect x="356" y="6" width="8" height="8" fill="white" stroke="#a855f7" />
          
          {/* Technical Lines */}
          <line x1="-20" y1="150" x2="420" y2="150" stroke="#00FFFF" strokeDasharray="12 12" strokeWidth="2" className="opacity-60" />
          <text x="200" y="140" fill="#a3a3a3" fontSize="16" letterSpacing="4" textAnchor="middle">BICEP LINE</text>

          <line x1="-20" y1="400" x2="420" y2="400" stroke="#00FFFF" strokeDasharray="12 12" strokeWidth="2" className="opacity-60" />
          <text x="200" y="390" fill="#a3a3a3" fontSize="16" letterSpacing="4" textAnchor="middle">ELBOW LINE</text>

          {/* Central orange arrow line */}
          <line x1="200" y1="-20" x2="200" y2="600" stroke="#f97316" strokeWidth="2" />
          <polygon points="195,590 205,590 200,600" fill="#f97316" />
          <polygon points="195,-10 205,-10 200,-20" fill="#f97316" />
          
          {/* Black cursor graphic floating over the pattern */}
          <path d="M 230 40 L 230 70 L 240 60 L 250 75 L 255 70 L 245 55 L 255 55 Z" fill="#000" stroke="#FFF" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

/** The central wireframe graphic spanning both halves */
function CenterWireframeGraphic() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-[45%] lg:block">
      {/* Container for the blueprint graphic */}
      <div className="relative h-[500px] w-[500px] opacity-80 mix-blend-screen">
        <svg viewBox="0 0 500 500" fill="none" className="h-full w-full">
          {/* Wireframe Y */}
          <path
            d="M 150 100 L 250 250 L 250 450 L 220 450 L 220 270 L 120 120 Z"
            fill="rgba(255,255,255,0.1)"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
          />
          <path
            d="M 350 100 L 250 250 L 250 450 L 280 450 L 280 270 L 380 120 Z"
            fill="rgba(255,255,255,0.15)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
          />
          {/* Internal Y Geometry lines */}
          <line x1="150" y1="100" x2="250" y2="250" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="350" y1="100" x2="250" y2="250" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Wireframe Jacket / Pattern Blueprint (Orange & Cyan) */}
          <g strokeWidth="2" fill="none">
            {/* Cyan structural lines */}
            <path d="M 250 80 Q 280 90 320 180 L 330 380 L 250 400" stroke="#00FFFF" strokeDasharray="6 6" className="opacity-70" />
            <path d="M 250 80 Q 220 90 180 180 L 170 380 L 250 400" stroke="#00FFFF" strokeDasharray="6 6" className="opacity-70" />
            
            {/* Orange pattern contours */}
            <path d="M 230 110 L 250 200 L 300 240 L 300 380" stroke="#FF7F50" className="opacity-80" />
            <path d="M 270 110 L 250 200 L 200 240 L 200 380" stroke="#FF7F50" className="opacity-80" />
            
            {/* Sleeves */}
            <path d="M 310 160 L 370 280 L 350 300" stroke="#FF7F50" className="opacity-80" />
            <path d="M 190 160 L 130 280 L 150 300" stroke="#FF7F50" className="opacity-80" />
          </g>

          {/* Center alignment nodes */}
          <circle cx="250" cy="250" r="4" fill="#00FFFF" />
          <circle cx="250" cy="400" r="4" fill="#FF7F50" />
          <circle cx="250" cy="80" r="4" fill="white" />
        </svg>
      </div>
    </div>
  );
}

export default function HeroSplit({ onEnrollClick }) {
  const [hover, setHover] = useState(null);

  const flexAcademy =
    hover === "academy" ? 1.4 : hover === "production" ? 0.7 : 1;
  const flexProduction =
    hover === "production" ? 1.4 : hover === "academy" ? 0.7 : 1;

  return (
    <section
      className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-neutral-950 md:flex-row"
      aria-label="Academy and production"
    >
      <motion.div
        id="academy"
        className="group relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden border-b border-neutral-700 p-8 text-neutral-100 md:min-h-0 md:border-b-0 md:border-r md:p-12 lg:p-16"
        animate={{ flexGrow: flexAcademy, flexShrink: 1, flexBasis: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 25, mass: 1 }}
        onMouseEnter={() => setHover("academy")}
        onMouseLeave={() => setHover(null)}
      >
        {/* Subtle Slate Background - lighter than production but cohesive */}
        <div className="absolute inset-0 bg-slate-900" />
        
        {/* Custom SVG CAD Drawing replacing the photo */}
        <AcademyCADBackground />
        
        {/* Gradients identically mirroring Production Side */}
        <div className="absolute inset-0 bg-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 text-center transition-transform duration-500 md:translate-y-2 md:group-hover:translate-y-0">
          <h1 className="font-sans text-4xl font-black uppercase leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            The Academy:<br/>
            Unleash Your Skill
          </h1>
          <p className="mx-auto mt-4 max-w-sm font-sans text-lg font-medium text-neutral-200 shadow-neutral-950 drop-shadow-md">
            Hands-on training from sketch to pattern.
          </p>
          <div className="mt-8 overflow-hidden">
            <button
              onClick={() => onEnrollClick?.()}
              className="inline-flex items-center gap-2 border-2 border-white/80 bg-white/10 px-8 py-3 font-sans text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white hover:text-neutral-950 md:translate-y-[150%] md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            >
              Explore Course
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        id="production"
        className="group relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden border-t border-neutral-700 p-8 text-white md:min-h-0 md:border-l md:border-t-0 md:p-12 lg:p-16"
        animate={{
          flexGrow: flexProduction,
          flexShrink: 1,
          flexBasis: 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 25, mass: 1 }}
        onMouseEnter={() => setHover("production")}
        onMouseLeave={() => setHover(null)}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${IMG_PRODUCTION}')` }}
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-neutral-950/50" />
        <div className="absolute inset-0 bg-gradient-to-l from-neutral-950/80 via-neutral-950/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 text-center transition-transform duration-500 md:translate-y-2 md:group-hover:translate-y-0">
          <h2 className="font-sans text-4xl font-black uppercase leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            The Production:<br/>
            Visible Impact
          </h2>
          <p className="mx-auto mt-4 max-w-sm font-sans text-lg font-medium text-neutral-200 shadow-neutral-950 drop-shadow-md">
            Commercial fabrication for your brand.
          </p>
          <div className="mt-8 overflow-hidden">
            <button
              onClick={() => onEnrollClick?.()}
              className="inline-flex items-center gap-2 bg-yeti-lime px-8 py-3 font-sans text-sm font-bold uppercase tracking-wider text-neutral-950 shadow-lg shadow-yeti-lime/20 transition-all hover:bg-yeti-lime-dark md:translate-y-[150%] md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            >
              Request Quote
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
