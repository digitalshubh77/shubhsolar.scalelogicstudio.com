"use client";

import Link from "next/link";
import { Building2, Factory, Home, ShieldCheck, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { telLink, whatsappLink } from "@/lib/contact";
import "../services-page.css";

const services = [
  {
    id: "residential",
    title: "Residential Rooftop Solar",
    tag: "Most Popular",
    subtitle: "Make Your Home Electricity Bill Almost Zero",
    body: "1–10 kW on-grid systems designed for your exact consumption — with PM Surya Ghar subsidy assistance and easy EMI options.",
    points: [
      "Subsidy support up to ₹78,000 with end-to-end filing",
      "Collateral-free loan guidance up to ₹2 lakh for 3 kW",
      "ALMM List-II panels with 25-year performance warranty",
    ],
    ideal: "Monthly bills above ₹1,500 · Owned house with shadow-free roof",
    cta: "Book your free site survey → exact size, subsidy & payback in one visit.",
  },
  {
    id: "commercial",
    title: "Commercial Solar",
    tag: null,
    subtitle: "Cut Your Business's Second-Biggest Expense",
    body: "10–100 kW systems for shops, hospitals, schools and offices. Turn a fixed electricity cost into a long-term asset.",
    points: [
      "Savings projection with payback analysis (often 3.5–5 years)",
      "Zero business disruption — installation around working hours",
      "Remote monitoring + AMC plans for guaranteed uptime",
    ],
    ideal: "Monthly bills above ₹25,000 · Owned building or long-term lease",
    cta: "Share your last 3 electricity bills on WhatsApp — free report in 48 hours.",
  },
  {
    id: "industrial",
    title: "Industrial Solar",
    tag: null,
    subtitle: "Bring Down Your Per-Unit Power Cost",
    body: "100 kW+ shed-mounted and ground-mounted plants for factories and MIDC units across Vidarbha.",
    points: [
      "Structural audit before design — safety first",
      "CEIG approval, HT liaison and DISCOM support handled by us",
      "SCADA/remote monitoring with monthly generation reports",
    ],
    ideal: "Factories, processing units, cold storage, rice/dal mills",
    cta: "Request a techno-commercial feasibility study — free above 50 kW.",
  },
  {
    id: "amc",
    title: "Maintenance & AMC",
    tag: null,
    subtitle: "Your System Should Perform for 25 Years",
    body: "A dirty or faulty system silently loses 10–25% generation. Our Amravati team keeps yours at peak output.",
    points: [
      "Scheduled panel cleaning + inverter health checks",
      "Wiring, earthing and structure inspection",
      "Priority breakdown support — same-day response in city",
    ],
    ideal: "Any rooftop system, including third-party installations",
    cta: "WhatsApp “AMC” to get plans and pricing.",
  },
];

const serviceIcons = {
  residential: Home,
  commercial: Building2,
  industrial: Factory,
  amc: Wrench,
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ServicesPage() {
  return (
    <div className="page-wrap svc-page">
      <section className="svc-hero">
        <div className="svc-container">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="svc-eyebrow">Our Services</p>
            <h1 className="svc-h1">Complete Solar Solutions for Homes, Businesses & Industries</h1>
            <p className="svc-lead">
              From your first site survey to net metering and 25 years of service — one team, one responsibility, zero running around.
            </p>
            <div className="svc-actions">
              <Link href="/contact" className="svc-btn svc-btn--primary">
                Get Free Quote
              </Link>
              <a href={whatsappLink()} className="svc-btn svc-btn--ghost" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </div>
            <div className="svc-trust">
              <div className="svc-trust__item">8+ Years · 500+ Projects</div>
              <div className="svc-trust__item">MNRE-Empanelled Team</div>
              <div className="svc-trust__item">Tier-1 ALMM List-II Panels</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="svc-main">
        <div className="svc-container">
          <div className="svc-list">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.id as keyof typeof serviceIcons] ?? ShieldCheck;
              return (
                <motion.article
                  key={service.id}
                  id={service.id}
                  className="svc-card"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="svc-card__head">
                    <span className="svc-card__icon">
                      <Icon size={22} />
                    </span>
                    <h2 className="svc-card__title">{service.title}</h2>
                    {service.tag ? <span className="svc-card__tag">{service.tag}</span> : null}
                  </div>
                  <h3 className="svc-card__subtitle">{service.subtitle}</h3>
                  <p className="svc-card__body">{service.body}</p>
                  <ul className="svc-points">
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <p className="svc-meta">
                    <strong>Ideal for:</strong> {service.ideal}
                  </p>
                  <p className="svc-micro">{service.cta}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            className="svc-cta"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2>Not Sure Which Service Fits You?</h2>
            <p>Call us for 10 minutes. We&apos;ll tell you honestly what you need — and what you don&apos;t.</p>
            <div className="svc-actions">
              <a href={telLink()} className="svc-btn svc-btn--primary">
                Call Now
              </a>
              <a href={whatsappLink()} className="svc-btn svc-btn--ghost" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <Link href="/contact" className="svc-btn svc-btn--ghost">
                Book Free Site Visit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
