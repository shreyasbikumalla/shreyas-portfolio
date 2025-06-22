// src/components/Projects.jsx
import Section  from "./Section";
import projects from "../data/projects";

export default function Projects() {
  return (
    <Section id="projects">
      {/* heading */}
      <p
        style={{
        opacity: 0.7,
        textAlign: "center",
        marginBottom: ".4rem",
        fontWeight: 600        // ← makes the text bold
    }}
    >
        You can check my&nbsp;Recent
    </p>

      <h2 style={{ textAlign: "center", marginBottom: "2.5rem" }}>Projects</h2>

      {/* grid (add className="projects-grid") */}
      <div style={gridStyle} className="projects-grid">
        {projects.map((p) => (
          /* article must use className="project-card" */
          <article key={p.title} className="project-card">
            <h3 style={{ color: "#357cff" }}>{p.title}</h3>
            <p style={{ lineHeight: 1.55 }}>{p.description}</p>

            <h4
              style={{
                marginTop: "auto",
                marginBottom: ".5rem",
                color: "#357cff",
              }}
            >
              Technologies Used
            </h4>

            {/* chips */}
            <ul className="tag-list">
              {p.tech.map((t) => (
                <li key={t} className="tech-chip">
                  {t}
                </li>
              ))}
            </ul>

            {/* GitHub pill */}
            <a
              href={p.repo || "#"}          /* placeholder */
              className="btn-outline-dark"
              style={{ marginTop: "1.3rem" , alignSelf: "center"}}
              target="_blank"
              rel="noreferrer"
            >
              <span style={{ fontSize: "1.1rem" }}>🐙</span> GITHUB
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}

const gridStyle = {
  display: "grid",
  gap: "2.5rem",
  justifyContent: "center",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  maxWidth: "700px",
  margin: "0 auto",
};
