"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { telLink, whatsappLink } from "@/lib/contact";
import "../content-pages.css";

type Category = "All" | "Cost & Subsidy" | "Savings & Payback" | "Installation" | "Net Metering" | "Maintenance";

const faqItems: { category: Category; q: string; a: string }[] = [
  {
    category: "Cost & Subsidy",
    q: "How much does a rooftop solar system cost in Amravati?",
    a: "A typical 3 kW home system costs roughly ₹1.8–2.2 lakh before subsidy, depending on panel brand and structure type. After central subsidy up to ₹78,000, your net cost comes down substantially.",
  },
  {
    category: "Cost & Subsidy",
    q: "How much subsidy will I get under PM Surya Ghar?",
    a: "₹30,000 per kW for the first 2 kW and ₹18,000 for the third kW — maximum ₹78,000 for systems of 3 kW or larger. Credited to your bank, typically 30–45 days after commissioning.",
  },
  {
    category: "Cost & Subsidy",
    q: "Am I eligible for the subsidy?",
    a: "You need an owned residential property, active electricity connection matching Aadhaar used to apply, shadow-free roof area, and ALMM-compliant equipment installed by an empanelled vendor — which we are.",
  },
  {
    category: "Cost & Subsidy",
    q: "Can I get a loan / EMI for solar?",
    a: "Yes. Under PM Surya Ghar bank tie-ups, collateral-free loans up to ₹2 lakh are available for systems up to 3 kW, with rates starting around 5.75% p.a. We help with loan documentation.",
  },
  {
    category: "Savings & Payback",
    q: "How much will I actually save?",
    a: "Most residential customers save 70–90% of their monthly bill. A home paying ₹4,000–5,000/month typically recovers the full system cost in 3–5 years.",
  },
  {
    category: "Savings & Payback",
    q: "Why won't my bill become exactly zero?",
    a: "MSEDCL fixed charges and some night-time consumption remain. Net-metering credits offset most units, but a small residual amount (₹200–500 for most homes) usually stays.",
  },
  {
    category: "Installation",
    q: "How much roof space do I need?",
    a: "Roughly 80–100 sq. ft. of shadow-free roof per kW. A 3 kW home system needs about 250–300 sq. ft.",
  },
  {
    category: "Installation",
    q: "How long does installation take?",
    a: "Physical installation: 2–4 days for most homes. End-to-end (survey → net metering → subsidy credit): typically 6–8 weeks, mostly DISCOM processing time.",
  },
  {
    category: "Installation",
    q: "Will my roof be damaged?",
    a: "No. We use certified mounting structures with proper waterproofing. For RCC roofs we can also use non-penetrating ballast structures where suitable.",
  },
  {
    category: "Net Metering",
    q: "What is net metering and will you arrange it?",
    a: "Net metering lets you export surplus solar units to the grid and receive credit on your MSEDCL bill. Yes — we handle application, documentation, meter installation and activation.",
  },
  {
    category: "Net Metering",
    q: "What if my sanctioned load is less than the system I want?",
    a: "System capacity cannot exceed sanctioned load. If needed, we file a load-enhancement application with MSEDCL before installation.",
  },
  {
    category: "Maintenance",
    q: "What maintenance does a solar system need?",
    a: "Very little — periodic panel cleaning and an annual health check. We offer affordable AMC plans, and our Amravati service team is one call away.",
  },
  {
    category: "Maintenance",
    q: "What warranties do I get?",
    a: "Tier-1 panels carry a 25-year performance warranty; inverters carry 5–10 years depending on brand. You receive all warranty documents in writing at handover.",
  },
  {
    category: "Maintenance",
    q: "What if the company shuts down — who services my system?",
    a: "Manufacturer warranties remain valid independent of the installer. Choose established local players with a service track record — for exactly this reason.",
  },
];

const tabs: Category[] = ["All", "Cost & Subsidy", "Savings & Payback", "Installation", "Net Metering", "Maintenance"];

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function FaqPage() {
  const [tab, setTab] = useState<Category>("All");

  const items = useMemo(() => {
    if (tab === "All") return faqItems;
    return faqItems.filter((item) => item.category === tab);
  }, [tab]);

  return (
    <div className="page-wrap content-page">
      <section className="content-hero">
        <div className="content-container">
          <motion.div initial="hidden" animate="show" variants={fade}>
            <p className="content-eyebrow">Help Centre</p>
            <h1 className="content-h1">Every Question, Answered Honestly</h1>
            <p className="content-lead">
              Can&apos;t find your question? WhatsApp us — a real engineer replies, not a bot.
            </p>
            <div className="faq-tabs">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`content-chip${tab === item ? " is-active" : ""}`}
                  onClick={() => setTab(item)}
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
          <div className="faq-list">
            {items.map((item, index) => (
              <motion.div
                key={item.q}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={fade}
                transition={{ delay: Math.min(index * 0.03, 0.2) }}
              >
                <details className="faq-acc">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              </motion.div>
            ))}
          </div>

          <motion.div className="content-cta" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <h2>Still Have a Question?</h2>
            <p>Mon–Sat, 9:30 AM – 7:00 PM · Real engineer replies on WhatsApp and phone.</p>
            <div className="content-btn-row">
              <a href={whatsappLink("Hi Shubh Solar! I have a question about rooftop solar.")} className="content-btn content-btn--primary" target="_blank" rel="noopener noreferrer">
                WhatsApp Your Question
              </a>
              <a href={telLink()} className="content-btn content-btn--ghost">
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
