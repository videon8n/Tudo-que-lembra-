import { motion, useScroll, useSpring } from "framer-motion";

// Barra fina no topo que acompanha o scroll — micro-interação premium.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left accent-gradient"
    />
  );
}
