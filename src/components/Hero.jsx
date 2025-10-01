// src/components/Hero.jsx
import avatar        from "../assets/avatar.jpg";
import gmailLogo     from "../assets/gmail.png";
import linkedinLogo  from "../assets/linkedin.png";
import githubLogo    from "../assets/github.png";   // ← add this file to src/assets/

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        paddingTop: "8rem",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        color: "#fff",
        textAlign: "center",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container" style={{ maxWidth: "780px" }}>
        {/* photo */}
        <img
          src={avatar}
          alt="Profile"
          className="hero-avatar"
          style={{
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "6px solid #cdd3d9",
            marginBottom: "2rem",
          }}
        />

        {/* greeting */}
        <p className="hero-description" style={{ marginBottom: ".25rem", opacity: 0.8 }}>
        <strong><em>HOLA</em></strong>, Welcome to my Portfolio&nbsp;I'm
        </p>

        <h1 className="hero-title animate-text-glow" style={{ fontSize: "3rem", margin: "0 0 .5rem" }}>
          Shreyas&nbsp;Srinivas&nbsp;Bikumalla
        </h1>

        <h2
          className="hero-subtitle"
          style={{
            fontSize: "1.5rem",
            fontWeight: 400,
            marginBottom: "2rem",
            color: "#cdd3d9",
          }}
        >
          Master's graduate in Computer Science
        </h2>

        {/* action buttons */}
        <div
          className="hero-buttons"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <a 
           href={`${import.meta.env.BASE_URL}resume.pdf`}
           className="btn-white"
           download
           >
            Download&nbsp;Resume
           </a>
          <a href="#contact" className="btn">
            Contact&nbsp;Info
          </a>
        </div>

        {/* social icons */}
        <div className="hero-social" style={{ marginBottom: "1.5rem" }}>
          {/* Gmail */}
          <a
            href="mailto:shreyasbikumalla@gmail.com"
            style={{ marginRight: "1.5rem" }}
            title="Email"
          >
            <img src={gmailLogo} alt="Gmail" className="hero-icon" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/shreyas-bikumalla-178475193/"
            target="_blank"
            rel="noreferrer"
            style={{ marginRight: "1.5rem" }}
            title="LinkedIn"
          >
            <img src={linkedinLogo} alt="LinkedIn" className="hero-icon" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/shreyasbikumalla"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <img src={githubLogo} alt="GitHub" className="hero-icon" />
          </a>
        </div>

        {/* inline contact details */}
        <p className="hero-contact" style={{ opacity: 0.8 }}>
          Email: shreyasbikumalla@gmail.com
          <span style={{ margin: "0 .5rem" }}>|</span>
          Mobile: (334)-663-0810
        </p>
      </div>
    </section>
  );
}
