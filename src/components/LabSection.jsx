export default function LabSection() {
  return (
    <section
      id="lab"
      className="bg-neutral-900 py-16 sm:py-20"
      aria-labelledby="lab-title"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:gap-16 lg:px-8">
        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-yeti-lime">
            Lab
          </p>
          <h2
            id="lab-title"
            className="mt-2 font-sans text-3xl font-bold tracking-tight text-neutral-100"
          >
            Prototype & test
          </h2>
          <p className="mt-4 font-sans text-neutral-400">
            The lab bridges academy exercises and production reality—mock retail
            specs, fabric trials, and small runs before the factory floor scales
            up.
          </p>
        </div>
        <ul className="space-y-4 font-sans text-sm text-neutral-400">
          <li className="flex gap-3 border-l-2 border-yeti-lime pl-4">
            <span className="font-bold text-yeti-lime">01</span>
            Sample room with industrial machines and pressing.
          </li>
          <li className="flex gap-3 border-l-2 border-yeti-lime/50 pl-4">
            <span className="font-bold text-yeti-lime">02</span>
            Measurement and fitting blocks for student collections.
          </li>
          <li className="flex gap-3 border-l-2 border-yeti-lime/30 pl-4">
            <span className="font-bold text-yeti-lime">03</span>
            Partner trials for brands exploring Adama-based production.
          </li>
        </ul>
      </div>
    </section>
  );
}
