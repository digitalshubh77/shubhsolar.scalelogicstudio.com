"use client";

import Link from "next/link";
import { MotionCard, MotionItem, MotionSection } from "@/components/Motion";

const reasons = [
  { title: "Professional In-House Team", text: "Trained engineers and installers on our payroll — not random contractors." },
  { title: "Tier-1 Quality Products", text: "ALMM List-II panels and reputed inverters built to last 25+ years." },
  { title: "Subsidy Assistance", text: "We prepare and file your PM Surya Ghar application end-to-end." },
  { title: "Fast Installation", text: "Most residential systems installed within 7–10 days of confirmation." },
  { title: "Local After-Sales Service", text: "Sangli-based service team that actually picks up the phone." },
  { title: "Written Warranty Support", text: "25-year panel performance warranty documented at handover." },
];

const steps = [
  { title: "Free Consultation", text: "Call or WhatsApp. We understand your bill in 10 minutes.", time: "Today — Free" },
  { title: "Free Site Survey", text: "Engineer checks shading, structure and usable roof area.", time: "Within 48 hours" },
  { title: "Custom Proposal", text: "Clear size, savings estimate, subsidy amount and payback.", time: "Same visit" },
  { title: "Installation", text: "Certified team installs clean, safe and fast.", time: "7–10 days" },
  { title: "Net Metering", text: "We complete MSEDCL net-metering application for you.", time: "Handled by us" },
  { title: "Lifetime Support", text: "Monitoring, service visits and local support for 25 years.", time: "25 years" },
];

const projects = [
  {
    meta: "Residential · Vishrambag, Sangli",
    title: "5 kW Deshmukh Family Home",
    result: "Bill down from ₹4,800 → ₹450/month. On-grid with subsidy, installed in 8 days.",
    before: "₹4,800",
    after: "₹450",
  },
  {
    meta: "Commercial · Miraj",
    title: "50 kW Multi-Speciality Hospital",
    result: "Saving ≈ ₹55,000 every month. Covers 70% of daytime load; payback under 4 years.",
    before: "₹80,000",
    after: "₹25,000",
  },
  {
    meta: "Industrial · Kupwad MIDC",
    title: "120 kW Textile Processing Unit",
    result: "Per-unit power cost cut by ~60%. Shed-mounted plant with remote monitoring.",
    before: "High HT cost",
    after: "~60% down",
  },
];

const faqs = [
  {
    q: "How much does a rooftop solar system cost in Sangli?",
    a: "A typical 3 kW home system costs about ₹1.8–2.2 lakh before subsidy. Net cost drops substantially after PM Surya Ghar subsidy.",
  },
  {
    q: "How much will I actually save on my electricity bill?",
    a: "Most residential customers save 70–90% of their monthly bill, with payback usually in 3–5 years.",
  },
  {
    q: "How much roof space do I need?",
    a: "Roughly 80–100 sq. ft. of shadow-free roof per kW. A 3 kW system needs about 250–300 sq. ft.",
  },
  {
    q: "What is net metering and will you arrange it?",
    a: "Net metering credits surplus solar units to your MSEDCL bill. Yes — we handle the complete application for you.",
  },
  {
    q: "What maintenance does a solar system need?",
    a: "Periodic panel cleaning and an annual health check. Our Sangli team provides AMC support.",
  },
];

export default function HomeFeatureSections() {
  return (
    <>
      <MotionSection id="why-us" className="home-section home-section--alt">
        <div className="home-container">
          <MotionItem>
            <p className="home-eyebrow">Why Us</p>
            <h2 className="home-h2">Why 750+ Customers Trust Us With Their Rooftops</h2>
            <p className="home-lead">
              Solar is a 25-year decision. Choose a company that will still be around to service it — right here in Sangli.
            </p>
          </MotionItem>
          <div className="home-grid-3 feature-grid">
            {reasons.map((item, i) => (
              <MotionCard key={item.title} className="home-why feature-card">
                <div className="home-why__num">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="home-why__title">{item.title}</h3>
                <p className="home-why__text">{item.text}</p>
              </MotionCard>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="how-it-works" className="home-section">
        <div className="home-container">
          <MotionItem>
            <p className="home-eyebrow">How It Works</p>
            <h2 className="home-h2">From Enquiry to Free Electricity in 6 Steps</h2>
            <p className="home-lead">
              You make one phone call. We handle survey, paperwork, subsidy and net metering.
            </p>
          </MotionItem>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <MotionCard key={step.title} className="step-card">
                <div className="step-card__top">
                  <span className="step-card__num">{i + 1}</span>
                  <span className="step-card__time">{step.time}</span>
                </div>
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__text">{step.text}</p>
              </MotionCard>
            ))}
          </div>
          <MotionItem>
            <div className="home-btn-row">
              <Link href="/contact" className="home-btn home-btn--primary">
                Start With a Free Site Visit
              </Link>
            </div>
          </MotionItem>
        </div>
      </MotionSection>

      <MotionSection className="home-section home-section--alt">
        <div className="home-container">
          <MotionItem>
            <p className="home-eyebrow">Projects</p>
            <h2 className="home-h2">Recent Projects Across Sangli</h2>
            <p className="home-lead">Real rooftops. Real bills. Real savings — installed and serviced by our team.</p>
          </MotionItem>
          <div className="home-grid-3">
            {projects.map((p) => (
              <MotionCard key={p.title} className="home-project project-card">
                <p className="home-project__meta">{p.meta}</p>
                <h3 className="home-project__title">{p.title}</h3>
                <p className="home-project__result">{p.result}</p>
                <div className="project-card__metrics">
                  <div>
                    <span>Before</span>
                    <strong>{p.before}</strong>
                  </div>
                  <div>
                    <span>After</span>
                    <strong>{p.after}</strong>
                  </div>
                </div>
                <Link href="/projects" className="home-link">
                  View Project →
                </Link>
              </MotionCard>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="home-section">
        <div className="home-container">
          <MotionItem>
            <p className="home-eyebrow">FAQ</p>
            <h2 className="home-h2">Frequently Asked Questions</h2>
            <p className="home-lead">Honest answers before you spend a rupee. Tap a question to expand.</p>
          </MotionItem>
          <div className="faq-preview">
            {faqs.map((item) => (
              <MotionItem key={item.q}>
                <details className="faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              </MotionItem>
            ))}
          </div>
          <MotionItem>
            <div className="home-btn-row">
              <Link href="/faq" className="home-btn home-btn--ghost">
                View All FAQs
              </Link>
            </div>
          </MotionItem>
        </div>
      </MotionSection>
    </>
  );
}
