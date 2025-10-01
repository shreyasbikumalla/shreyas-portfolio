// src/components/Experience.jsx
import { useState } from "react";
import Section     from "./Section";
import timeline    from "../data/timeline";

export default function Experience() {
  /* track which cards are expanded (store indexes that are open) */
  const [openSet, setOpenSet] = useState(new Set());

  const toggle = (idx) => {
    const next = new Set(openSet);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setOpenSet(next);
  };

  return (
    <Section id="experience">
      <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>
        Work Experience
      </h2>

      <ul className="experience-timeline">
        {timeline.map((job, i) => {
          const open = openSet.has(i);
          const visiblePoints = open ? job.points : job.points.slice(0, 2);

          return (
            <li key={i}>
              <article className="exp-card">
                {/* meta */}
                <p className="exp-meta">
                  {job.date} &nbsp; {job.location}
                </p>

                <h3 className="exp-title">{job.title}</h3>
                <h4 className="exp-company">{job.company}</h4>

                {/* bullet list */}
                <ul className="exp-bullets">
                  {visiblePoints.map((pt, k) => (
                    <li key={k}>{pt}</li>
                  ))}
                </ul>

                {/* toggle link (show only if more than 2 points) */}
                {job.points.length > 2 && (
                  <button
                    className="expand-link"
                    onClick={() => toggle(i)}
                  >
                    {open ? "Show less ▲" : "Show more ▼"}
                  </button>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
