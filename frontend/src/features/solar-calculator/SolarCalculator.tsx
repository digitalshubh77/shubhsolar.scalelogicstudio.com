"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Calculator,
  Factory,
  Home,
  IndianRupee,
  Info,
  Leaf,
  MapPin,
  PanelsTopLeft,
  Ruler,
  ShieldCheck,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react";
import CountUp from "@/components/CountUp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LOCATION_CONFIG, PROPERTY_LABELS } from "./config";
import SiteSurveyModal from "./SiteSurveyModal";
import type { PropertyType } from "./types";
import { useSolarCalculator } from "./useSolarCalculator";

const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const propertyIcons = { residential: Home, commercial: Building2, industrial: Factory };

const OUTPUT_ROWS = (result: ReturnType<typeof useSolarCalculator>["result"]) => [
  { label: "Recommended Solar System", value: `${result.systemSizeKw} kW`, icon: Sun, primary: true },
  { label: "Suitable Solar Type", value: result.suitableSolarTypeLabel, icon: Zap },
  { label: "Monthly Units Generated", value: `${result.monthlyGenerationKwh.toLocaleString("en-IN")} Units`, icon: Zap },
  { label: "Annual Units Generated", value: `${result.annualGenerationKwh.toLocaleString("en-IN")} Units`, icon: TrendingUp },
  { label: "Monthly Savings", value: currency(result.monthlySavings), icon: IndianRupee, primary: true },
  { label: "Annual Savings", value: currency(result.annualSavings), icon: TrendingUp },
  { label: "Required Solar Panels", value: String(result.panelCount), icon: PanelsTopLeft },
  { label: "Required Roof Space", value: `${result.requiredRoofAreaSqFt.toLocaleString("en-IN")} Sq.ft.`, icon: Ruler },
  { label: "Lifetime Savings (25 Years)", value: currency(result.savings25Years), icon: TrendingUp, primary: true },
  { label: "CO₂ Reduction", value: `${result.co2ReductionTons} Tons`, icon: Leaf },
];

export default function SolarCalculator() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("property");
  const initialProperty: PropertyType =
    preset === "commercial" || preset === "industrial" ? preset : "residential";
  const { inputs, result, errors, isValid, setInput, setProperty } = useSolarCalculator(initialProperty);
  const [hydrated, setHydrated] = useState(false);
  const [surveyOpen, setSurveyOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHydrated(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const billMax =
    inputs.propertyType === "residential" ? 100000 : inputs.propertyType === "commercial" ? 500000 : 2000000;
  const cities = inputs.state ? Object.keys(LOCATION_CONFIG[inputs.state]?.cities ?? {}) : [];
  const locationLabel =
    inputs.state && inputs.city ? `${inputs.city}, ${inputs.state}` : inputs.state || "Location not set";

  return (
    <TooltipProvider delayDuration={250}>
      <div className="calc-experience">
        <section className="calc-premium-hero calc-premium-hero--pro">
          <div className="calc-orb calc-orb--one" aria-hidden="true" />
          <div className="calc-orb calc-orb--two" aria-hidden="true" />
          <div className="calc-hero-solar" aria-hidden="true">
            <div className="calc-hero-solar__grid">
              {Array.from({ length: 24 }).map((_, index) => (
                <i key={index} />
              ))}
            </div>
            <span className="calc-hero-solar__stand" />
          </div>

          <div className="calc-shell calc-hero-inner calc-hero-inner--pro">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <p className="calc-eyebrow-new">
                <Calculator size={14} /> Solar Savings Calculator
              </p>
              <h1>
                Calculate Your <span>Solar Savings</span>
              </h1>
              <p>
                Enter your monthly electricity bill and property type to get an instant rooftop solar estimate.
              </p>
              <div className="calc-trust-row">
                <span>
                  <ShieldCheck size={14} /> Free site survey
                </span>
                <span>
                  <Zap size={14} /> Instant estimate
                </span>
                <span>
                  <WhatsAppIcon size={14} /> WhatsApp booking
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <main className="calc-shell calc-workspace calc-workspace--pro">
          <aside className="calc-input-panel calc-input-panel--pro" aria-labelledby="calculator-inputs">
            <div className="calc-card-heading">
              <div>
                <p className="calc-kicker">Inputs</p>
                <h2 id="calculator-inputs">Your property details</h2>
              </div>
            </div>

            <fieldset className="calc-fieldset">
              <legend>Where do you want to install solar?</legend>
              <div className="calc-property-grid calc-property-grid--pro">
                {(Object.keys(PROPERTY_LABELS) as PropertyType[]).map((type) => {
                  const Icon = propertyIcons[type];
                  return (
                    <button
                      key={type}
                      type="button"
                      className={inputs.propertyType === type ? "is-active" : ""}
                      onClick={() => setProperty(type)}
                      aria-pressed={inputs.propertyType === type}
                    >
                      <span className="calc-property-icon">
                        <Icon size={18} />
                      </span>
                      <span>{PROPERTY_LABELS[type]}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="calc-field-block">
              <div className="calc-label-line">
                <label htmlFor="monthly-bill">Monthly Electricity Bill</label>
                <strong>{currency(inputs.monthlyBill)}</strong>
              </div>
              <Slider
                id="monthly-bill"
                min={500}
                max={billMax}
                step={inputs.propertyType === "industrial" ? 5000 : inputs.propertyType === "commercial" ? 1000 : 500}
                value={[inputs.monthlyBill]}
                onValueChange={([value]) => setInput("monthlyBill", value)}
                aria-label="Monthly electricity bill"
              />
              <div className="calc-range-labels">
                <span>₹500</span>
                <span>{currency(billMax)}</span>
              </div>
              {errors.monthlyBill ? <p className="calc-error">{errors.monthlyBill}</p> : null}
            </div>

            <div className="calc-two-cols">
              <label className="calc-input-group">
                <span>
                  <MapPin size={14} /> State <small>(Optional)</small>
                </span>
                <select
                  value={inputs.state}
                  onChange={(event) => {
                    const state = event.target.value;
                    setInput("state", state);
                    setInput("city", "");
                  }}
                >
                  <option value="">Select state</option>
                  {Object.keys(LOCATION_CONFIG).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
              <label className="calc-input-group">
                <span>
                  City <small>(Optional)</small>
                </span>
                {inputs.state ? (
                  <select
                    value={inputs.city}
                    onChange={(event) => setInput("city", event.target.value)}
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={inputs.city}
                    onChange={(event) => setInput("city", event.target.value)}
                    placeholder="Enter city"
                  />
                )}
              </label>
            </div>

            <div className="calc-input-summary">
              <span>{PROPERTY_LABELS[inputs.propertyType]}</span>
              <span>{locationLabel}</span>
            </div>
          </aside>

          <section className="calc-results-panel" aria-live="polite" aria-busy={!hydrated}>
            {!hydrated ? (
              <div className="calc-dashboard-card calc-results-card">
                <Skeleton className="h-8 w-52" />
                <Skeleton className="mt-4 h-80 w-full rounded-xl" />
              </div>
            ) : (
              <motion.section
                className="calc-dashboard-card calc-results-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="calc-card-heading calc-card-heading--results">
                  <div>
                    <p className="calc-kicker">Outputs</p>
                    <h2>Your solar estimate</h2>
                  </div>
                  <div className="calc-result-pill">
                    <Sun size={15} />
                    <CountUp end={result.systemSizeKw} decimals={2} duration={0.45} /> kW
                  </div>
                </div>

                <dl className="calc-output-flat">
                  {OUTPUT_ROWS(result).map((row) => (
                    <div key={row.label} className={`calc-output-flat__row${row.primary ? " is-primary" : ""}`}>
                      <dt>
                        <row.icon size={14} />
                        {row.label}
                      </dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="calc-cta-row">
                  <Button
                    className="calc-survey-btn"
                    size="lg"
                    disabled={!isValid}
                    onClick={() => setSurveyOpen(true)}
                  >
                    <WhatsAppIcon size={17} />
                    Book Free Site Survey
                  </Button>
                </div>
              </motion.section>
            )}
          </section>
        </main>

        <div className="calc-shell">
          <section className="calc-disclaimer calc-disclaimer--pro">
            <Info size={16} />
            <p>
              Results shown are estimates only. Actual system size, savings, energy generation, and installation
              requirements may vary based on location, roof conditions, electricity usage, and site inspection.
            </p>
          </section>
        </div>

        <SiteSurveyModal
          open={surveyOpen}
          onClose={() => setSurveyOpen(false)}
          inputs={inputs}
          result={result}
        />
      </div>
    </TooltipProvider>
  );
}
