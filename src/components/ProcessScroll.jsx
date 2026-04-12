const steps = [
  {
    title: "Sketch",
    body: "Concept lines, proportions, and silhouette before cloth is touched.",
  },
  {
    title: "Pattern",
    body: "CAD or flat patterns graded for production-ready nests.",
  },
  {
    title: "Prototype",
    body: "First samples for fit, fabric behavior, and construction checks.",
  },
  {
    title: "Final garment",
    body: "Line-ready units with finishing, labels, and QC sign-off.",
  },
];

function ProcessBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(154, 205, 50, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(154, 205, 50, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-yeti-lime/40 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-yeti-lime/25 to-transparent" />
    </div>
  );
}

export default function ProcessScroll() {
  return (
    <section
      id="process"
      className="relative border-y border-neutral-200 bg-neutral-50 py-16 sm:py-20"
      aria-labelledby="process-title"
    >
      <ProcessBackdrop />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.25em] text-yeti-lime">
              <span
                className="inline-block h-2 w-2 rotate-45 border border-yeti-lime bg-yeti-lime/30"
                aria-hidden
              />
              Pipeline
            </p>
            <h2
              id="process-title"
              className="mt-2 font-sans text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
            >
              From idea to line
            </h2>
            <p className="mt-3 font-sans text-neutral-600">
              Four locked stages—scroll horizontally to explore each gate.
            </p>
          </div>
          <div
            className="hidden h-12 w-px bg-gradient-to-b from-yeti-lime/0 via-yeti-lime/50 to-yeti-lime/0 sm:block"
            aria-hidden
          />
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-0 top-1/2 z-0 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-yeti-lime/0 via-yeti-lime/20 to-yeti-lime/0 md:block"
            aria-hidden
          />
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yeti-lime/50">
            {steps.map((s, i) => (
              <article
                key={s.title}
                className="group relative w-[82vw] shrink-0 snap-center sm:w-[min(100%,22rem)] md:w-80"
              >
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:shadow-md group-hover:shadow-[0_12px_40px_-10px_rgba(154,205,50,0.18)]">
                  <div className="h-1 w-full bg-gradient-to-r from-yeti-lime via-yeti-lime/70 to-yeti-lime/30" />
                  <div className="p-8">
                    <span className="font-sans text-5xl font-black text-yeti-lime/35 transition group-hover:text-yeti-lime/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-sans text-xl font-bold text-neutral-900">
                      {s.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600">
                      {s.body}
                    </p>
                  </div>
                  <div
                    className="pointer-events-none absolute -right-1 bottom-8 h-24 w-24 rounded-full border border-yeti-lime/10 opacity-0 transition group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
