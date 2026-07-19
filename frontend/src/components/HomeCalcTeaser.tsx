"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, TrendingDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeCalcTeaser() {
  return (
    <motion.section
      className="home-calc-teaser"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease }}
    >
      <div className="home-container">
        <div className="home-calc-teaser__card">
          <div className="home-calc-teaser__left">
            <div className="home-calc-teaser__icon">
              <Calculator size={22} />
            </div>
            <div>
              <p className="home-calc-teaser__eyebrow">Free Savings Calculator</p>
              <h3 className="home-calc-teaser__title">See your exact savings in 30 seconds</h3>
              <p className="home-calc-teaser__text">
                Enter your monthly bill — get system size, subsidy amount, EMI and 25-year savings instantly.
              </p>
            </div>
          </div>
          <div className="home-calc-teaser__right">
            <div className="home-calc-teaser__preview">
              <span className="home-calc-teaser__preview-label">Typical result</span>
              <div className="home-calc-teaser__preview-row">
                <span>Monthly bill</span>
                <strong>₹4,500</strong>
              </div>
              <div className="home-calc-teaser__preview-row home-calc-teaser__preview-row--save">
                <span><TrendingDown size={14} /> After solar</span>
                <strong>₹420</strong>
              </div>
            </div>
            <Link href="/calculator" className="home-btn home-btn--primary">
              Calculate My Savings →
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
