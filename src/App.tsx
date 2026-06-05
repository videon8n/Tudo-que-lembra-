import { useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Calculators from "./components/Calculators";
import About from "./components/About";
import Journal from "./components/Journal";
import Methodology from "./components/Methodology";
import Stats from "./components/Stats";
import Contact from "./components/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <ScrollProgress />
      <motion.main
        className="relative"
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={isLoading ? {} : { opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero />
        <Services />
        <Calculators />
        <About />
        <Journal />
        <Methodology />
        <Stats />
        <Contact />
      </motion.main>
    </>
  );
}
