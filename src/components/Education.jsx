// src/components/Education.jsx
import Section    from "./Section";
import education  from "../data/education";

export default function Education() {
  return (
    <Section id="education">
      <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>
        Education
      </h2>

      <ul className="experience-timeline">
        {education.map((ed, i) => (
          <li key={i}>
            <article className="exp-card">
              {/* meta line */}
              <p className="exp-meta">
                {ed.date} &nbsp; {ed.location}
              </p>

              <h3 className="exp-title">{ed.school}</h3>

              <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
                {ed.degree}
                {ed.cgpa && (
                  <>
                    &nbsp;&nbsp; <span style={{ opacity: 0.8 }}>{ed.cgpa}</span>
                  </>
                )}
              </p>

              <p style={{ margin: 0 }}>
                <strong>Relevant Coursework:</strong> {ed.coursework}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
