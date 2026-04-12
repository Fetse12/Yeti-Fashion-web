import { motion } from "framer-motion";

const line =
  "አድራሻ:- አዳማ መብራት ኃይል ጨርጨር አጠገብ ካሌብ የገበያ ማዕከል 4ተኛ ፎቅ | Adama Mebrat Hail, Ghenet Commercial Center, 4th Floor";

export default function InfoTicker() {
  return (
    <div className="relative border-y border-yeti-lime/35 bg-yeti-lime/12 py-2.5 text-neutral-900">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-yeti-lime/25 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-yeti-lime/25 to-transparent"
        aria-hidden
      />
      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-[200%]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 42, ease: "linear" }}
        >
          <div className="flex w-1/2 items-center justify-center px-6">
            <span className="whitespace-nowrap font-sans text-xs font-semibold tracking-wide sm:text-sm">
              <span lang="am">{line}</span>
            </span>
          </div>
          <div className="flex w-1/2 items-center justify-center px-6" aria-hidden>
            <span className="whitespace-nowrap font-sans text-xs font-semibold tracking-wide sm:text-sm">
              <span lang="am">{line}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
