"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, IndianRupee, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeSubsidyBanner() {
  return (
    <motion.section
      className="home-subsidy-banner"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease }}
    >
      <div className="home-container">
        <div className="home-subsidy-banner__inner">
          <div className="home-subsidy-banner__icon" aria-hidden="true">
            <IndianRupee size={28} />
          </div>
          <div className="home-subsidy-banner__copy">
            <p className="home-subsidy-banner__eyebrow">
              <Sparkles size={14} /> Government Subsidy Available
            </p>
            <h2 className="home-subsidy-banner__title">
              Get up to <span>₹78,000</span> back with PM Surya Ghar — we file everything for you
            </h2>
            <p className="home-subsidy-banner__text">
              Most homeowners in Sangli and Maharashtra qualify. Our team handles documentation, portal submission and follow-up — at no extra charge.
            </p>
          </div>
          <div className="home-subsidy-banner__actions">
            <Link href="/calculator" className="home-btn home-btn--primary">
              Check My Subsidy <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="home-btn home-btn--ghost home-subsidy-banner__ghost">
              Talk to Expert
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
