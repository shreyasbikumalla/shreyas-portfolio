// src/components/Certifications.jsx
import Section      from "./Section";
import certs        from "../data/certs";

import googleLogo   from "../assets/google.png";
import ciscoLogo    from "../assets/cisco.png";

const logoMap = {
  "google.png": googleLogo,
  "cisco.png":  ciscoLogo,
};

function Certifications() {
  return (
    <Section id="certifications">
      <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>Certifications</h2>

      <ul className="experience-timeline">
        {certs.map((c, i) => (
          <li key={i}>
            <article className="neon-card cert-card">
              <header style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src={logoMap[c.logo]} alt={c.issuer} className="cert-logo" />
                <div>
                  <h3 style={{ margin: 0 }}>{c.name}</h3>
                  <p style={{ opacity: .75, margin: "4px 0 0" }}>
                    {c.issuer} &nbsp;•&nbsp; {c.date}
                  </p>
                </div>
              </header>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Certifications;
