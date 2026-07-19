import Link from "next/link";
import { telLink } from "@/lib/contact";
import "../content-pages.css";

export default function AboutPage() {
  return (
    <div className="page-wrap content-page">
      <section className="content-hero">
        <div className="content-container">
          <p className="content-eyebrow">About Shubh Solar</p>
          <h1 className="content-h1">Vidarbha&apos;s Trusted Solar Partner Since 2018</h1>
          <p className="content-lead">
            We started with one belief: every family and business deserves freedom from rising electricity bills.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="content-container">
          <article className="proj-case">
            <h2 className="proj-case__title">Our Story</h2>
            <div className="proj-case__body">
              <p>
                Shubh Solar began in Amravati in 2018 with a simple promise: install solar the right way, file documents
                honestly, and stay available for service years after installation.
              </p>
              <p>
                Today we are a full-service EPC team serving homes, businesses and industries across Amravati, Wardha and
                the wider Vidarbha region.
              </p>
            </div>
          </article>

          <div className="proj-grid" style={{ marginTop: 20 }}>
            <div className="proj-mini">
              <strong>Mission</strong>
              <br />
              Make clean solar power accessible with honest advice and lifetime service.
            </div>
            <div className="proj-mini">
              <strong>Vision</strong>
              <br />A Vidarbha where rooftops earn, not just shelter.
            </div>
          </div>

          <h3 className="proj-case__title" style={{ marginTop: 36 }}>
            Numbers That Matter
          </h3>
          <div className="proj-grid">
            {[
              "8+ Years in business",
              "500+ Projects completed",
              "750+ Happy customers",
              "2.5+ MW installed",
              "4.9★ Google rating",
              "30 days avg subsidy filing turnaround",
            ].map((item) => (
              <div key={item} className="proj-mini">
                {item}
              </div>
            ))}
          </div>

          <div className="content-cta">
            <h2>Come Visit Us Before You Decide</h2>
            <p>See live panels, inverters and mounting structures at our Sangli office.</p>
            <div className="content-btn-row">
              <Link href="/contact" className="content-btn content-btn--primary">
                Get Free Quote
              </Link>
              <a href={telLink()} className="content-btn content-btn--ghost">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
