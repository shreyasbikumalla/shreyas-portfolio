// src/components/Skills.jsx
import Section from "./Section";
import skills  from "../data/skills";

export default function Skills() {
  return (
    <Section id="skills">
      <h2 style={{ textAlign: "center", marginBottom: "2.8rem" }}>
        My <span style={{ opacity: 0.8 }}>Skills</span>
      </h2>

      {/* neon-border card */}
      <div className="skills-card neon-card">
        {skills.map(({ group, items }) => (
          <div key={group} style={{ marginBottom: "2.2rem" }}>
            <h3 className="skills-heading">{group}</h3>

            <ul className="skills-chiplist">
              {items.map((s) => (
                <li key={s} className="skill-chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
