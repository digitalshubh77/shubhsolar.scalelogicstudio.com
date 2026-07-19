"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/contact";
import "../content-pages.css";

const cases = [
  {
    id: "residential",
    type: "Residential",
    tag: "Residential · 5 kW On-Grid",
    title: "Deshmukh Family Home",
    location: "Rajapeth, Amravati",
    problem: "Monthly bill of ₹4,800 and rising every year. AC usage in summer pushed bills past ₹6,500.",
    solution: "5 kW system with Tier-1 panels · PM Surya Ghar subsidy filed and credited · MSEDCL net metering active in 20 days.",
    result: "Bill ₹4,800/month → ₹450/month · ~₹52,000 saved per year · Payback ~4 years.",
    metrics: [
      { label: "Before", value: "₹4,800/mo" },
      { label: "After", value: "₹450/mo" },
      { label: "Annual Saving", value: "~₹52,000" },
    ],
  },
  {
    id: "commercial",
    type: "Commercial",
    tag: "Commercial · 50 kW",
    title: "Multi-Speciality Hospital",
    location: "Wardha",
    problem: "Electricity was the hospital's second-biggest operating cost (~₹80,000/month).",
    solution: "50 kW rooftop plant covering ~70% of daytime load · Installed in phases with zero disruption.",
    result: "Saving ≈ ₹55,000 every month · Payback expected under 4 years.",
    metrics: [
      { label: "Before", value: "~₹80,000/mo" },
      { label: "Saving", value: "₹55,000/mo" },
      { label: "Payback", value: "< 4 years" },
    ],
  },
  {
    id: "industrial",
    type: "Industrial",
    tag: "Industrial · 120 kW",
    title: "Textile Processing Unit",
    location: "MIDC, Amravati",
    problem: "High per-unit HT power cost was squeezing margins against competitors.",
    solution: "Shed-mounted 120 kW plant · Structural audit · CEIG and DISCOM liaison end-to-end.",
    result: "Per-unit power cost cut by ~60% on solar generation · 3 years of same-day service response.",
    metrics: [
      { label: "System", value: "120 kW" },
      { label: "Cost Cut", value: "~60%" },
      { label: "Service", value: "Same day" },
    ],
  },
];

const miniProjects = [
  "3 kW Residential — Badnera: Bill ₹2,900 → ₹280. Subsidy ₹78,000 credited in 38 days.",
  "7 kW Residential — Camp Area, Amravati: Bungalow with 2 ACs, bill down 85%.",
  "25 kW — School, Achalpur: Daytime load fully covered; savings fund two teacher salaries.",
  "40 kW — Dal Mill, Wardha: Processing cost reduced; payback 3.8 years.",
  "10 kW — Clinic + Residence, Paratwada: Combined connection optimised with net metering.",
  "60 kW — Cold Storage, Amravati: Daytime compressor load on solar; grid only at night.",
];

const filters = ["All", "Residential", "Commercial", "Industrial"] as const;

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visibleCases = useMemo(() => {
    if (filter === "All") return cases;
    return cases.filter((c) => c.type === filter);
  }, [filter]);

  return (
    <div className="page-wrap content-page">
      <section className="content-hero">
        <div className="content-container">
          <motion.div initial="hidden" animate="show" variants={fade}>
            <p className="content-eyebrow">Our Work</p>
            <h1 className="content-h1">500+ Rooftops. Real Bills. Real Savings.</h1>
            <p className="content-lead">
              Every project below is installed and serviced by our own team across Amravati, Wardha and Vidarbha.
            </p>
            <div className="content-chips">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`content-chip${filter === item ? " is-active" : ""}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-container">
          {visibleCases.map((item, index) => (
            <motion.article
              key={item.id}
              className="proj-case"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fade}
              transition={{ delay: index * 0.05 }}
            >
              <p className="proj-case__tag">{item.tag}</p>
              <h2 className="proj-case__title">{item.title}</h2>
              <p className="proj-case__loc">{item.location}</p>
              <div className="proj-case__body">
                <p>
                  <strong>Problem:</strong> {item.problem}
                </p>
                <p>
                  <strong>What we did:</strong> {item.solution}
                </p>
                <p>
                  <strong>Result:</strong> {item.result}
                </p>
              </div>
              <div className="proj-metrics">
                {item.metrics.map((m) => (
                  <div key={m.label} className="proj-metric">
                    <span>{m.label}</span>
                    <strong>{m.value}</strong>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <h3 className="content-h1" style={{ fontSize: "1.75rem", maxWidth: "100%", marginTop: 28 }}>
              More Installations
            </h3>
            <div className="proj-grid">
              {miniProjects.map((item) => (
                <div key={item} className="proj-mini">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="content-cta" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <h2>Your Roof Could Be Our Next Case Study</h2>
            <p>Get a free site survey and see exactly what your before/after numbers would look like.</p>
            <div className="content-btn-row">
              <Link href="/contact" className="content-btn content-btn--primary">
                Book Free Site Visit
              </Link>
              <a href={whatsappLink()} className="content-btn content-btn--ghost" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
