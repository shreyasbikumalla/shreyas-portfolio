// src/App.jsx
// ───────────────────────────────────────────────────────────
import Navbar     from "./components/Navbar";
import ScrollCar  from "./components/ScrollCar.jsx";   // ← roaming car
import Hero       from "./components/Hero.jsx";
import Projects   from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Education  from "./components/Education.jsx";
import Contact    from "./components/Contact.jsx";
import Skills     from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
export default function App() {
  return (
    <>
      {/* fixed top navigation */}
      <Navbar />

      {/* roaming, clickable car */}
      <ScrollCar />

      {/* main page sections */}
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
    </>
  );
}
