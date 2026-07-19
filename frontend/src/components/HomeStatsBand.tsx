"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

const stats = [
  { value: 750, suffix: "+", label: "Happy Customers", sub: "Across Sangli region" },
  { value: 500, suffix: "+", label: "Projects Completed", sub: "Homes to factories" },
  { value: 78, prefix: "₹", suffix: "K", label: "Max Subsidy", sub: "PM Surya Ghar" },
  { value: 4.9, suffix: "★", label: "Google Rating", sub: "Verified reviews", decimals: 1 },
  { value: 25, suffix: " Yrs", label: "Panel Warranty", sub: "Performance assured" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeStatsBand() {
  return (
    <section className="home-stats-band" aria-label="Key statistics">
      <div className="home-container">
        <p className="home-stats-band__tagline">Proven results from real rooftops in Sangli</p>
        <div className="home-stats-band__grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="home-stats-band__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <p className="home-stats-band__value">
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </p>
              <p className="home-stats-band__label">{stat.label}</p>
              <p className="home-stats-band__sub">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
