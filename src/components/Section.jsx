// src/components/Section.jsx
// ──────────────────────────
import { motion } from "framer-motion";

/**
 * Generic wrapper for page sections.
 *
 * Props
 * ─────
 * id      → anchor name (e.g. "projects")
 * title   → optional <h2> text
 * children → section body
 */
export default function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      style={sectionStyle}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        {title && (
          <h2 style={headingStyle}>
            {title}
          </h2>
        )}
        {/* body */}
        {children}
      </div>
    </motion.section>
  );
}

/* ---------- inline styles ---------- */

const sectionStyle = {
  paddingTop: "70px",   /* matches fixed-nav offset from globals.css   */
  marginTop: "-70px",   /* so anchor links scroll to correct position */
  marginBottom: "4rem"  /* extra breathing room between sections      */
};

const headingStyle = {
  textAlign: "center",
  margin: "0 0 2rem",
  fontSize: "2rem"
};
