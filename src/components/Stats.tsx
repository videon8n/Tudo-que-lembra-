import { motion } from "framer-motion";
import { STATS } from "../lib/data";

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-10 px-6 text-center md:grid-cols-3 md:px-10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center"
          >
            <span className="font-display text-5xl md:text-6xl accent-text">
              {s.value}
            </span>
            <span className="mt-3 max-w-[220px] text-sm text-muted">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
