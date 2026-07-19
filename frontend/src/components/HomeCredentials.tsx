"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, FileCheck2, ShieldCheck } from "lucide-react";

const credentials = [
  { icon: ShieldCheck, label: "MNRE Empanelled", sub: "Certified EPC partner" },
  { icon: Award, label: "PM Surya Ghar", sub: "Subsidy filing support" },
  { icon: BadgeCheck, label: "ALMM List-II Panels", sub: "Tier-1 components" },
  { icon: FileCheck2, label: "MSEDCL Net Metering", sub: "End-to-end paperwork" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeCredentials() {
  return (
    <section className="home-credentials" aria-label="Certifications and compliance">
      <div className="home-container">
        <motion.div
          className="home-credentials__grid"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
        >
          {credentials.map((item) => (
            <div key={item.label} className="home-credentials__item">
              <span className="home-credentials__icon" aria-hidden="true">
                <item.icon size={20} />
              </span>
              <div>
                <p className="home-credentials__label">{item.label}</p>
                <p className="home-credentials__sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
