export default function Section({ id, title, children }) {
    return (
      <section id={id}>
        <div className="container">
          {title && (
            <h2 style={{ textAlign: "center", margin: "2rem 0", fontSize: "2rem" }}>
              {title}
            </h2>
          )}
          {children}
        </div>
      </section>
    );
  }
  