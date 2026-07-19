"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Users } from "lucide-react";
import { BUSINESS_ADDRESS } from "@/lib/contact";

const highlights = [
  "Free site survey with a written savings report",
  "Subsidy documentation handled by our in-house team",
  "Local engineers for installation and after-sales support",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeIntro() {
  return (
    <section className="home-section home-intro">
      <div className="home-container">
        <div className="home-intro__grid">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="home-eyebrow">About Shubh Solar</p>
            <h2 className="home-h2 home-intro__title">
              Professional rooftop solar for homes and businesses in Sangli
            </h2>
            <p className="home-lead">
              We design, install and maintain on-grid solar systems with transparent pricing, compliant
              equipment and dedicated support — from your first inquiry to 25 years of performance.
            </p>
            <ul className="home-intro__list">
              {highlights.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="home-btn-row">
              <Link href="/about" className="home-btn home-btn--primary">
                Learn About Us <ArrowRight size={16} />
              </Link>
              <Link href="/projects" className="home-btn home-btn--ghost">
                View Our Work
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="home-intro__panel"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
          >
            <div className="home-intro__panel-head">
              <span className="home-intro__panel-badge">Since 2018</span>
              <p>Trusted solar partner across western Maharashtra</p>
            </div>
            <div className="home-intro__metrics">
              <div>
                <strong>750+</strong>
                <span>Customers served</span>
              </div>
              <div>
                <strong>500+</strong>
                <span>Installations</span>
              </div>
              <div>
                <strong>4.9★</strong>
                <span>Google rating</span>
              </div>
              <div>
                <strong>25 Yrs</strong>
                <span>Panel warranty</span>
              </div>
            </div>
            <div className="home-intro__location">
              <MapPin size={18} />
              <span>{BUSINESS_ADDRESS}</span>
            </div>
            <div className="home-intro__team">
              <Users size={18} />
              <span>In-house engineers · No subcontractor surprises</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
