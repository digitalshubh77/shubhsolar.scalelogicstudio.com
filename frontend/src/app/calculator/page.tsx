"use client";

import { useMemo, useState } from "react";
import { Calculator, Sun, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { whatsappLink } from "@/lib/contact";
import "../calculator-page.css";

function estimateKw(bill: number, property: "Home" | "Shop-Office" | "Factory") {
  const unitRate = property === "Home" ? 8.5 : property === "Shop-Office" ? 9.2 : 8.8;
  const monthlyUnits = bill / unitRate;
  const rawKw = monthlyUnits / 120;
  const maxKw = property === "Home" ? 10 : property === "Shop-Office" ? 100 : 200;
  return Math.min(maxKw, Math.max(1, Math.round(rawKw * 2) / 2));
}

function subsidyForKw(kw: number) {
  if (kw <= 0) return 0;
  if (kw <= 2) return Math.round(kw * 30000);
  if (kw < 3) return 60000 + Math.round((kw - 2) * 18000);
  return 78000;
}

function emi(principal: number, annualRate = 0.07, months = 60) {
  if (principal <= 0) return 0;
  const r = annualRate / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function CalculatorPage() {
  const [bill, setBill] = useState(3500);
  const [property, setProperty] = useState<"Home" | "Shop-Office" | "Factory">("Home");
  const [ownsRoof, setOwnsRoof] = useState<"Yes" | "No">("Yes");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const data = useMemo(() => {
    const kw = estimateKw(bill, property);
    const panelWatt = 540;
    const panelCount = Math.max(2, Math.ceil((kw * 1000) / panelWatt));
    const roofAreaSqft = Math.round(kw * 90);
    const costPerKw = property === "Home" ? 62000 : property === "Shop-Office" ? 55000 : 50000;
    const cost = kw * costPerKw;
    const subsidy = property === "Home" ? subsidyForKw(kw) : 0;
    const net = Math.max(0, cost - subsidy);
    const monthlyGenerationValue = Math.round(kw * 120 * (property === "Home" ? 8.5 : 9));
    const monthlySaving = Math.round(Math.min(bill * 0.9, monthlyGenerationValue));
    const monthlyEmi = Math.round(emi(net));
    const payback = monthlySaving > 0 ? Number((net / (monthlySaving * 12)).toFixed(1)) : 0;
    const total25 = Math.round((monthlySaving * 12 * 25) / 100000) / 10;
    const yearlySaving = monthlySaving * 12;
    return {
      kw,
      panelCount,
      roofAreaSqft,
      cost,
      subsidy,
      net,
      monthlySaving,
      monthlyEmi,
      payback,
      total25,
      yearlySaving,
    };
  }, [bill, property]);

  const canShowResults = ownsRoof === "Yes";
  const billBar = Math.min(100, Math.round(((bill - 1000) / 49000) * 100));
  const emiVsBill = bill > 0 ? Math.min(100, Math.round((data.monthlyEmi / bill) * 100)) : 0;
  const emiLower = data.monthlyEmi > 0 && data.monthlyEmi < bill;

  const waText = `Hi Shubh Solar! My bill is ₹${bill}, property: ${property}. Calculator showed ${data.kw} kW (~${data.panelCount} panels), saving ₹${data.monthlySaving}/month, EMI ₹${data.monthlyEmi}, payback ${data.payback} years. Please send my free report. Name: ${name}, Phone: ${phone}.`;

  return (
    <div className="page-wrap calc-page">
      <section className="calc-hero">
        <div className="calc-container">
          <motion.div initial="hidden" animate="show" variants={fade}>
            <p className="calc-eyebrow">
              <Calculator size={14} /> Free Solar Savings & EMI Calculator
            </p>
            <h1 className="calc-h1">See Your Solar Savings in 30 Seconds</h1>
            <p className="calc-lead">
              Enter your monthly electricity bill and get recommended system size, panel count, roof area, subsidy, monthly savings, EMI and payback — built for rooftop solar in Amravati & Vidarbha.
            </p>
            <div className="calc-chips">
              <span className="calc-chip">PM Surya Ghar subsidy logic</span>
              <span className="calc-chip">Indicative EMI @ ~7% p.a.</span>
              <span className="calc-chip">1 kW ≈ 120 units/month</span>
              <span className="calc-chip">No phone needed for results</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="calc-main">
        <div className="calc-container">
          <div className="calc-grid">
            <motion.div className="calc-card" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
              <h2 className="calc-card__title">Your Details</h2>
              <p className="calc-card__sub">Move the slider and choose property type. Results update live.</p>

              <div className="calc-field">
                <div className="calc-label-row">
                  <span className="calc-label">Average monthly electricity bill</span>
                  <span className="calc-value">₹{bill.toLocaleString("en-IN")}</span>
                </div>
                <input
                  className="calc-range"
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                />
                <div className="calc-progress">
                  <div className="calc-progress__bar" style={{ width: `${billBar}%` }} />
                </div>
              </div>

              <div className="calc-field">
                <div className="calc-label-row">
                  <span className="calc-label">Property type</span>
                </div>
                <div className="calc-options">
                  {(["Home", "Shop-Office", "Factory"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`calc-option${property === item ? " is-active" : ""}`}
                      onClick={() => setProperty(item)}
                    >
                      {item === "Home" ? <Sun size={16} /> : <Zap size={16} />}
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-field" style={{ marginBottom: 0 }}>
                <div className="calc-label-row">
                  <span className="calc-label">Do you own the roof / terrace?</span>
                </div>
                <div className="calc-options">
                  {(["Yes", "No"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`calc-option${ownsRoof === item ? " is-active" : ""}`}
                      onClick={() => setOwnsRoof(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {ownsRoof === "No" ? (
                  <motion.div
                    className="calc-warn"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>Solar needs roof ownership or owner&apos;s permission. Talk to us for options on rented / family property.</p>
                    <a
                      className="calc-ghost-btn"
                      href={whatsappLink("Hi Shubh Solar! I am interested but my roof is not owned. Please suggest options.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Talk on WhatsApp
                    </a>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>

            <motion.div className="calc-card calc-results" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
              {!canShowResults ? (
                <div className="calc-results__lock">Enable roof ownership to view complete solar estimates.</div>
              ) : null}

              <h2 className="calc-card__title">Your Solar Estimate</h2>
              <p className="calc-card__sub">Recommended rooftop system based on your bill and property type.</p>

              <div className="calc-summary">
                <div>
                  <span>Best fit system</span>
                  <strong>{data.kw} kW</strong>
                </div>
                <div>
                  <span>Panels needed</span>
                  <strong>{data.panelCount}</strong>
                </div>
                <div>
                  <span>Monthly saving</span>
                  <strong>₹{data.monthlySaving.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              <div className="calc-kpis">
                <div className="calc-kpi is-highlight">
                  <p className="calc-kpi__label">Recommended system</p>
                  <p className="calc-kpi__value">{data.kw} kW</p>
                </div>
                <div className="calc-kpi is-highlight">
                  <p className="calc-kpi__label">Approx panels (540W)</p>
                  <p className="calc-kpi__value">{data.panelCount} panels</p>
                </div>
                <div className="calc-kpi">
                  <p className="calc-kpi__label">Roof area needed</p>
                  <p className="calc-kpi__value">{data.roofAreaSqft} sq.ft.</p>
                </div>
                <div className="calc-kpi">
                  <p className="calc-kpi__label">System cost (before subsidy)</p>
                  <p className="calc-kpi__value">₹{Math.round(data.cost).toLocaleString("en-IN")}</p>
                </div>
                <div className="calc-kpi">
                  <p className="calc-kpi__label">PM Surya Ghar subsidy</p>
                  <p className="calc-kpi__value">₹{Math.round(data.subsidy).toLocaleString("en-IN")}</p>
                </div>
                <div className="calc-kpi">
                  <p className="calc-kpi__label">Net cost after subsidy</p>
                  <p className="calc-kpi__value">₹{Math.round(data.net).toLocaleString("en-IN")}</p>
                </div>
                <div className="calc-kpi is-highlight">
                  <p className="calc-kpi__label">Monthly saving</p>
                  <p className="calc-kpi__value">₹{data.monthlySaving.toLocaleString("en-IN")}</p>
                </div>
                <div className="calc-kpi">
                  <p className="calc-kpi__label">Estimated EMI (5 years)</p>
                  <p className="calc-kpi__value">₹{data.monthlyEmi.toLocaleString("en-IN")}</p>
                </div>
                <div className="calc-kpi">
                  <p className="calc-kpi__label">Payback period</p>
                  <p className="calc-kpi__value">{data.payback} years</p>
                </div>
                <div className="calc-kpi is-highlight">
                  <p className="calc-kpi__label">25-year total savings</p>
                  <p className="calc-kpi__value">₹{data.total25} lakh</p>
                </div>
              </div>

              <div className="calc-compare">
                <p className="calc-compare__title">Solar EMI vs Current Electricity Bill</p>
                <div className="calc-compare__row">
                  <div className="calc-compare__meta">
                    <span>Current bill</span>
                    <span>₹{bill.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="calc-compare__track">
                    <div className="calc-compare__fill calc-compare__fill--bill" style={{ width: "100%" }} />
                  </div>
                </div>
                <div className="calc-compare__row" style={{ marginBottom: 0 }}>
                  <div className="calc-compare__meta">
                    <span>Estimated EMI</span>
                    <span>₹{data.monthlyEmi.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="calc-compare__track">
                    <div
                      className="calc-compare__fill calc-compare__fill--emi"
                      style={{ width: `${Math.max(8, emiVsBill)}%` }}
                    />
                  </div>
                </div>
                {emiLower ? (
                  <p className="calc-wow">✓ Your solar EMI is lower than the electricity bill you already pay.</p>
                ) : (
                  <p className="calc-wow" style={{ color: "#64748b" }}>
                    Yearly saving estimate: ₹{data.yearlySaving.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div className="calc-cta" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <h3>Want These Numbers Confirmed for YOUR Roof?</h3>
            <p>
              Get a personalised savings report after a free site visit — exact system size, exact subsidy, exact payback.
            </p>
            <div className="calc-form">
              <input className="calc-input" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input
                className="calc-input"
                placeholder="WhatsApp Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <a className="calc-submit" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
                Get My Free Report
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="calc-bottom">
        <div className="calc-container">
          <div className="calc-bottom__grid">
            <div className="calc-info">
              <h3>Calculation Assumptions</h3>
              <ul>
                <li>1 kW generates ~120 units/month (Vidarbha average, shadow-free roof)</li>
                <li>MSEDCL tariff assumed ~₹8–9/unit blended for homes</li>
                <li>Installed cost assumed ~₹50,000–65,000/kW (varies by brand/structure)</li>
                <li>Residential subsidy: ₹30,000 × first 2 kW + ₹18,000 for 3rd kW (cap ₹78,000)</li>
                <li>EMI is indicative at ~7% p.a. for 5 years</li>
                <li>Exact figures are confirmed free during site survey</li>
              </ul>
            </div>

            <div className="calc-faq">
              <h3>Calculator FAQs</h3>
              <details open>
                <summary>Is the subsidy amount guaranteed?</summary>
                <p>
                  The central subsidy structure (up to ₹78,000 for 3 kW+) is active. Exact eligibility is confirmed during documentation — we file everything for you.
                </p>
              </details>
              <details>
                <summary>Is the EMI shown exact?</summary>
                <p>
                  It&apos;s indicative. Banks under PM Surya Ghar offer collateral-free loans up to ₹2 lakh for 3 kW systems; your rate depends on bank and profile.
                </p>
              </details>
              <details>
                <summary>Why is my saving not 100%?</summary>
                <p>
                  Fixed charges and night-time consumption remain on your MSEDCL bill; net metering credits reduce most of it.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
