import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import Services from "./components/Services";
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
      <main className="relative">
        <Hero />
        <Services />
        <About />
        <Journal />
        <Methodology />
        <Stats />
        <Contact />
      </main>
    </>
  );
}
