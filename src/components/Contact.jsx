// src/components/Contact.jsx
import Section from "./Section";

import gmailLogo    from "../assets/gmail.png";
import linkedinLogo from "../assets/linkedin.png";
import phoneLogo    from "../assets/phone.png";      // ← new icon

export default function Contact() {
  return (
    <Section id="contact">
      <p style={{ textAlign: "center", opacity: 0.7, marginBottom: ".4rem" }}>
        Get in Touch
      </p>
      <h2 style={{ textAlign: "center", marginBottom: "2.5rem" }}>Contact Me</h2>

      {/* neon bordered card */}
      <div className="neon-card contact-card">
        {/* email */}
        <a
          href="mailto:shreyasbikumalla@gmail.com"
          className="contact-link"
          title="Send Email"
        >
          <img src={gmailLogo} alt="Gmail" className="contact-icon" />
          shreyasbikumalla@gmail.com
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/shreyas-bikumalla-178475193/"
          className="contact-link"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn profile"
        >
          <img src={linkedinLogo} alt="LinkedIn" className="contact-icon" />
          LinkedIn
        </a>

        {/* phone */}
        <a
          href="tel:+13346630810"
          className="contact-link"
          title="Call mobile"
        >
          <img src={phoneLogo} alt="Phone" className="contact-icon" />
          (334)-663-0810
        </a>
      </div>
    </Section>
  );
}
