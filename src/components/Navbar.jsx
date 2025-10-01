// src/components/Navbar.jsx
import { useState } from "react";

/* smooth-scroll helper */
const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  /* mobile burger (optional) */
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: "home",      label: "Home" },
    { id: "experience",label: "Experience" },
    { id: "skills",    label: "Skills" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "projects",  label: "Projects" },
    { id: "contact",   label: "Contact" },
  ];

  return (
    <nav className="navbar">
      {/* ─── left brand ─── */}
      <span className="brand" onClick={() => scrollTo("home")}>
      Shreyas&nbsp;Bikumalla
      </span>

      {/* ─── right pills ─── */}
      <ul className={`nav-links ${open ? "show" : ""}`}>
        {navItems.map((n) => (
          <li key={n.id}>
            <button className="pill nav" onClick={() => scrollTo(n.id)}>
              {n.label}
            </button>
          </li>
        ))}
      </ul>

      {/* burger icon for narrow screens (optional) */}
      <button
        className="burger"
        onClick={() => setOpen(!open)}
        aria-label="menu"
      >
        ☰
      </button>
    </nav>
  );
}
