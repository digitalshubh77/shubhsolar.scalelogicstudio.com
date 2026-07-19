"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ShieldCheck, Star, Zap } from "lucide-react";
import CountUp from "@/components/CountUp";
import { buildInquiryMessage, whatsappLink } from "@/lib/contact";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease },
  }),
};

const heroChips = [
  { icon: ShieldCheck, text: "25-year warranty" },
  { icon: Zap, text: "7–10 day install" },
  { icon: Calculator, text: "Free savings report" },
];

const meterStats = [
  { value: 500, suffix: "+", label: "Projects" },
  { value: 750, suffix: "+", label: "Customers" },
  { value: 8, suffix: "+", label: "Years" },
  { value: 4.9, suffix: "★", label: "Rating", decimals: 1 },
];

export default function HomeHero() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bill, setBill] = useState("₹3,000-6,000");
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inquiryMessage = buildInquiryMessage({
      name: name.trim(),
      phone: phone.trim(),
      bill,
      source: "Homepage hero form",
    });

    window.open(whatsappLink(inquiryMessage), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section className="home-hero home-hero--video">
      <div className="home-hero__media" aria-hidden="true">
        <div className="home-hero__sun" />
        <div className="home-hero__solar-scene">
          <div className="home-hero__solar-panel">
            {Array.from({ length: 24 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="home-hero__solar-base" />
        </div>
        <div className="home-hero__orbit home-hero__orbit--one" />
        <div className="home-hero__orbit home-hero__orbit--two" />
        <div className="home-hero__energy-stream home-hero__energy-stream--one" />
        <div className="home-hero__energy-stream home-hero__energy-stream--two" />
        <div className="home-hero__energy-stream home-hero__energy-stream--three" />
        <div className="home-hero__overlay" />
        <div className="home-hero__glow" />
        <div className="home-hero__grain" />
      </div>

      <div className="home-container home-hero__inner">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <motion.p
              className="home-badge home-badge--hero"
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              <Star size={14} /> 4.9 Google Rating · Trusted across Sangli & Maharashtra
            </motion.p>

            <motion.h1
              className="home-h1 home-h1--hero"
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              Cut Your Electricity Bill by{" "}
              <span className="home-hero__accent">Up to 90%</span> with Rooftop Solar
            </motion.h1>

            <motion.p
              className="home-lead home-lead--hero"
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              Shubh Solar powers homes, shops and factories across Sangli with PM Surya Ghar subsidy support, Tier-1 equipment and a local service team you can reach directly.
            </motion.p>

            <motion.div
              className="home-hero__chips"
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              {heroChips.map((chip) => (
                <span key={chip.text} className="home-hero__chip">
                  <chip.icon size={14} /> {chip.text}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="home-btn-row"
              custom={4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              <Link href="/contact" className="home-btn home-btn--primary home-btn--hero">
                <Zap size={16} /> Get Free Quote
              </Link>
              <Link href="/calculator" className="home-btn home-btn--ghost home-btn--hero-ghost">
                Calculate Savings
              </Link>
            </motion.div>

            <motion.p
              className="home-note home-note--hero"
              custom={5}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              ✓ Free site visit & savings report — no obligation, no hidden charges
            </motion.p>
          </div>

          <motion.div
            className="home-meter home-meter--glass"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.35, ease }}
          >
            <div className="home-meter__pulse" />
            <p className="home-meter__label">Live Savings Snapshot</p>
            <h3 className="home-meter__value">
              ₹<CountUp end={4120} duration={2.2} /> saved
            </h3>
            <p className="home-meter__sub">Typical monthly saving · 5 kW home system, Sangli</p>

            <div className="home-meter__compare">
              <div className="home-meter__bar-group">
                <div className="home-meter__bar-label">
                  <span>Before solar</span>
                  <strong>₹5,200</strong>
                </div>
                <div className="home-meter__bar-track">
                  <motion.div
                    className="home-meter__bar home-meter__bar--before"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.1, delay: 0.7, ease }}
                  />
                </div>
              </div>
              <div className="home-meter__bar-group">
                <div className="home-meter__bar-label">
                  <span>After solar</span>
                  <strong className="home-meter__bar-save">₹480</strong>
                </div>
                <div className="home-meter__bar-track">
                  <motion.div
                    className="home-meter__bar home-meter__bar--after"
                    initial={{ width: 0 }}
                    animate={{ width: "18%" }}
                    transition={{ duration: 1.1, delay: 0.95, ease }}
                  />
                </div>
              </div>
            </div>

            <div className="home-meter__stats">
              {meterStats.map((stat) => (
                <div key={stat.label} className="home-meter__stat">
                  <strong>
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                      duration={1.6}
                    />
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="home-meter__inquiry">
              {submitted ? (
                <div className="home-meter__inquiry-success">
                  <p className="home-meter__inquiry-title">Thank you, {name || "there"}!</p>
                  <p className="home-meter__inquiry-copy">
                    Your inquiry is ready in WhatsApp. Tap send and our engineer will reply within 2 working hours.
                  </p>
                  <button
                    type="button"
                    className="home-meter__inquiry-btn"
                    onClick={() =>
                      window.open(
                        whatsappLink(
                          buildInquiryMessage({
                            name: name.trim(),
                            phone: phone.trim(),
                            bill,
                            source: "Homepage hero form",
                          })
                        ),
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    Open WhatsApp Again
                  </button>
                </div>
              ) : (
                <form className="home-meter__inquiry-form" onSubmit={handleInquirySubmit}>
                  <p className="home-meter__inquiry-title">Get Your Free Solar Quote</p>
                  <p className="home-meter__inquiry-copy">Share your details — we&apos;ll send your savings estimate on WhatsApp.</p>
                  <div className="home-meter__inquiry-fields">
                    <input
                      className="home-meter__inquiry-input"
                      placeholder="Your Name *"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                    <input
                      className="home-meter__inquiry-input"
                      placeholder="WhatsApp Number *"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      inputMode="tel"
                      required
                    />
                  </div>
                  <select
                    className="home-meter__inquiry-input"
                    value={bill}
                    onChange={(event) => setBill(event.target.value)}
                  >
                    <option>Below ₹1,500</option>
                    <option>₹1,500-3,000</option>
                    <option>₹3,000-6,000</option>
                    <option>₹6,000-15,000</option>
                    <option>Above ₹15,000</option>
                  </select>
                  <button type="submit" className="home-meter__inquiry-btn">
                    Request Free Quote
                  </button>
                  <p className="home-meter__inquiry-note">Response within 2 working hours · No spam</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="home-hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="home-hero__scroll-line" />
      </motion.div>
    </section>
  );
}
