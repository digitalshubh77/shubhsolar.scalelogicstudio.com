"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Calculator,
  CheckCircle2,
  Download,
  Factory,
  Home,
  Info,
  Leaf,
  Loader2,
  MapPin,
  Moon,
  PanelsTopLeft,
  RotateCcw,
  Ruler,
  Sun,
  TrendingUp,
  WalletCards,
  Zap,
} from "lucide-react";
import CountUp from "@/components/CountUp";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/contact";
import { LOCATION_CONFIG, PANEL_LABELS, PROPERTY_LABELS, ROOF_LABELS } from "./config";
import { downloadSolarReport } from "./report";
import type { CalculatorInputs, PropertyType } from "./types";
import { useSolarCalculator } from "./useSolarCalculator";

const CalculatorCharts = dynamic(() => import("./CalculatorCharts"), {
  ssr: false,
  loading: () => (
    <div className="calc-dashboard-card calc-chart-skeleton" aria-label="Loading charts">
      <Skeleton className="h-7 w-56" />
      <Skeleton className="mt-5 h-64 w-full" />
    </div>
  ),
});

const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const propertyIcons = { residential: Home, commercial: Building2, industrial: Factory };

function FieldHelp({ children }: { children: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="calc-help" aria-label={children}>
          <Info size={14} />
        </button>
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder,
  suffix,
  error,
}: {
  id: string;
  label: string;
  value?: number;
  onChange: (value?: number) => void;
  placeholder: string;
  suffix?: string;
  error?: string;
}) {
  return (
    <label className="calc-input-group" htmlFor={id}>
      <span>{label}</span>
      <div className="calc-number-wrap">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value ?? ""}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value === "" ? undefined : Number(event.target.value))}
        />
        {suffix ? <small>{suffix}</small> : null}
      </div>
      {error ? <em id={`${id}-error`}>{error}</em> : null}
    </label>
  );
}

function CircularProgress({
  value,
  label,
  display,
  tone = "green",
}: {
  value: number;
  label: string;
  display: string;
  tone?: "green" | "blue" | "amber";
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={`calc-ring calc-ring--${tone}`} style={{ "--ring-progress": `${clamped * 3.6}deg` } as CSSProperties}>
      <div>
        <strong>{display}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function SolarCalculator() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("property");
  const initialProperty: PropertyType =
    preset === "commercial" || preset === "industrial" ? preset : "residential";
  const { inputs, result, comparisons, errors, isValid, setInput, setProperty, reset } =
    useSolarCalculator(initialProperty);
  const [dark, setDark] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDark(localStorage.getItem("solar-calculator-theme") === "dark");
      setHydrated(true);
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setDark((current) => {
      const next = !current;
      localStorage.setItem("solar-calculator-theme", next ? "dark" : "light");
      return next;
    });
  };

  const cities = Object.keys(LOCATION_CONFIG[inputs.state]?.cities ?? {});
  const billMax = inputs.propertyType === "residential" ? 100000 : inputs.propertyType === "commercial" ? 500000 : 2000000;
  const remainingMonthlyBill = Math.max(0, inputs.monthlyBill - result.monthlySavings);
  const monthlySavingPercent = Math.min(100, Math.round((result.monthlySavings / Math.max(inputs.monthlyBill, 1)) * 100));
  const recommendationMessage = useMemo(
    () =>
      `Hi Shubh Solar! I used your solar calculator for a ${PROPERTY_LABELS[inputs.propertyType].toLowerCase()} property in ${inputs.city}. My bill is ${currency(inputs.monthlyBill)}. Recommendation: ${result.systemSizeKw} kW, ${result.panelCount} panels, estimated saving ${currency(result.monthlySavings)}/month and ${result.paybackYears}-year payback. Please verify this with a free site survey.`,
    [inputs, result],
  );

  const handleDownload = async () => {
    if (!isValid || downloading) return;
    setDownloading(true);
    try {
      await downloadSolarReport(inputs, result, comparisons);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <TooltipProvider delayDuration={250}>
      <div className={dark ? "calc-experience dark" : "calc-experience"}>
        <section className="calc-premium-hero">
          <div className="calc-orb calc-orb--one" />
          <div className="calc-orb calc-orb--two" />
          <div className="calc-hero-solar" aria-hidden="true">
            <div className="calc-hero-solar__grid">
              {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
            </div>
            <span className="calc-hero-solar__stand" />
          </div>
          <div className="calc-shell calc-hero-inner">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <p className="calc-eyebrow-new"><Calculator size={14} /> Enterprise solar intelligence</p>
              <h1>Turn Your Power Bill Into a <span>25-Year Asset</span></h1>
              <p>Live solar sizing, subsidy, ROI and generation modelling for homes, businesses and industry across India.</p>
              <div className="calc-trust-row">
                <span><CheckCircle2 size={14} /> Real-time results</span>
                <span><CheckCircle2 size={14} /> Configurable assumptions</span>
                <span><CheckCircle2 size={14} /> Downloadable report</span>
              </div>
              <div className="calc-hero-proof">
                <div><strong>₹78K</strong><span>Max subsidy</span></div>
                <div><strong>25 Yrs</strong><span>Cash-flow model</span></div>
                <div><strong>3 Types</strong><span>Home to industry</span></div>
              </div>
            </motion.div>
            <div className="calc-hero-actions">
              <button type="button" className="calc-theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>
                {dark ? <Sun size={17} /> : <Moon size={17} />}
                {dark ? "Light" : "Dark"}
              </button>
              <div className="calc-live"><i /> Live calculation</div>
            </div>
          </div>
        </section>

        <main className="calc-shell calc-workspace">
          <aside className="calc-input-panel" aria-labelledby="calculator-inputs">
            <div className="calc-card-heading">
              <div>
                <p className="calc-kicker">Project details</p>
                <h2 id="calculator-inputs">Build your solar plan</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={reset} aria-label="Reset calculator"><RotateCcw size={16} /></Button>
            </div>

            <div className="calc-field-block">
              <div className="calc-label-line">
                <label htmlFor="monthly-bill">Monthly electricity bill</label>
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
              <div className="calc-range-labels"><span>₹500</span><span>{currency(billMax)}</span></div>
              {errors.monthlyBill ? <p className="calc-error">{errors.monthlyBill}</p> : null}
            </div>

            <NumberField
              id="monthly-units"
              label="Monthly units (optional)"
              value={inputs.monthlyUnits}
              onChange={(value) => setInput("monthlyUnits", value)}
              placeholder={`Estimated: ${result.monthlyUnits}`}
              suffix="kWh"
              error={errors.monthlyUnits}
            />

            <fieldset className="calc-fieldset">
              <legend>Property type</legend>
              <div className="calc-property-grid">
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
                      <Icon size={18} />
                      <span>{PROPERTY_LABELS[type]}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="calc-two-cols">
              <label className="calc-input-group">
                <span><MapPin size={14} /> State</span>
                <select
                  value={inputs.state}
                  onChange={(event) => {
                    const state = event.target.value;
                    setInput("state", state);
                    setInput("city", Object.keys(LOCATION_CONFIG[state].cities)[0]);
                  }}
                >
                  {Object.keys(LOCATION_CONFIG).map((state) => <option key={state}>{state}</option>)}
                </select>
              </label>
              <label className="calc-input-group">
                <span>City</span>
                <select value={inputs.city} onChange={(event) => setInput("city", event.target.value)}>
                  {cities.map((city) => <option key={city}>{city}</option>)}
                </select>
              </label>
            </div>

            <div className="calc-label-line calc-roof-label">
              <span>Roof dimensions <small>optional</small></span>
              <FieldHelp>Usable roof area is calculated after allowing space for access and maintenance.</FieldHelp>
            </div>
            <div className="calc-two-cols">
              <NumberField id="roof-length" label="Length" value={inputs.roofLength} onChange={(value) => setInput("roofLength", value)} placeholder="e.g. 40" suffix="ft" error={errors.roofLength} />
              <NumberField id="roof-width" label="Width" value={inputs.roofWidth} onChange={(value) => setInput("roofWidth", value)} placeholder="e.g. 30" suffix="ft" error={errors.roofWidth} />
            </div>

            <label className="calc-input-group">
              <span><Ruler size={14} /> Roof type</span>
              <select value={inputs.roofType} onChange={(event) => setInput("roofType", event.target.value as CalculatorInputs["roofType"])}>
                {Object.entries(ROOF_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>

            <label className="calc-input-group">
              <span><PanelsTopLeft size={14} /> Solar panel technology</span>
              <select value={inputs.panelType} onChange={(event) => setInput("panelType", event.target.value as CalculatorInputs["panelType"])}>
                {Object.entries(PANEL_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>

            <fieldset className="calc-fieldset">
              <legend><BatteryCharging size={14} /> Battery storage</legend>
              <div className="calc-binary">
                <button type="button" className={inputs.battery === "no" ? "is-active" : ""} onClick={() => setInput("battery", "no")}>No battery</button>
                <button type="button" className={inputs.battery === "yes" ? "is-active" : ""} onClick={() => setInput("battery", "yes")}>Add battery</button>
              </div>
            </fieldset>
          </aside>

          <section className="calc-results-panel" aria-live="polite" aria-busy={!hydrated}>
            {!hydrated ? (
              <div className="calc-dashboard-card">
                <Skeleton className="h-8 w-52" />
                <div className="calc-skeleton-grid">
                  {Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-28" />)}
                </div>
              </div>
            ) : (
              <>
                <motion.section className="calc-dashboard-card calc-recommendation" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="calc-card-heading">
                    <div>
                      <p className="calc-kicker">Recommended configuration</p>
                      <h2>{PROPERTY_LABELS[inputs.propertyType]} solar system</h2>
                    </div>
                    <span className="calc-confidence"><CheckCircle2 size={14} /> Best fit</span>
                  </div>
                  <div className="calc-recommend-grid">
                    <div className="calc-system-size">
                      <span>System size</span>
                      <strong><CountUp end={result.systemSizeKw} decimals={2} duration={0.45} /> <small>kW</small></strong>
                      <p>{result.panelCount} × {result.panelWattage}W panels</p>
                    </div>
                    <CircularProgress value={result.offsetPercent} display={`${result.offsetPercent}%`} label="Bill offset" />
                    <CircularProgress value={Math.min(result.roiPercent / 8, 100)} display={`${result.roiPercent}%`} label="25Y ROI" tone="blue" />
                    <CircularProgress value={Math.max(0, 100 - result.paybackYears * 10)} display={`${result.paybackYears} yr`} label="Payback" tone="amber" />
                  </div>
                  {result.roofLimited ? <div className="calc-warning">Your entered roof area limits the recommended system. A site survey can optimize the layout.</div> : null}
                </motion.section>

                <motion.section
                  className="calc-dashboard-card calc-electric-compare"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  aria-labelledby="electricity-comparison-title"
                >
                  <div className="calc-card-heading">
                    <div>
                      <p className="calc-kicker">Electricity cost comparison</p>
                      <h2 id="electricity-comparison-title">Your bill before vs after solar</h2>
                    </div>
                    <span className="calc-saving-badge">{monthlySavingPercent}% lower</span>
                  </div>
                  <div className="calc-electric-grid">
                    <div className="calc-electric-item">
                      <div><span>Current electricity bill</span><strong>{currency(inputs.monthlyBill)}/mo</strong></div>
                      <div className="calc-electric-track"><i className="is-before" style={{ width: "100%" }} /></div>
                      <small>{currency(inputs.monthlyBill * 12)} paid every year</small>
                    </div>
                    <div className="calc-electric-arrow"><ArrowRight size={18} /></div>
                    <div className="calc-electric-item is-after">
                      <div><span>Estimated bill after solar</span><strong>{currency(remainingMonthlyBill)}/mo</strong></div>
                      <div className="calc-electric-track">
                        <i className="is-after" style={{ width: `${Math.max(3, 100 - monthlySavingPercent)}%` }} />
                      </div>
                      <small>Fixed charges and grid usage retained</small>
                    </div>
                    <div className="calc-electric-saving">
                      <TrendingUp size={19} />
                      <div><span>You save</span><strong>{currency(result.monthlySavings)}/month</strong></div>
                      <p>{currency(result.annualSavings)} yearly savings</p>
                    </div>
                  </div>
                </motion.section>

                <section className="calc-metrics-grid" aria-label="Solar estimate results">
                  {[
                    { label: "Panels", value: result.panelCount.toLocaleString("en-IN"), sub: `${result.panelWattage}W each`, icon: PanelsTopLeft },
                    { label: "Roof area", value: `${result.requiredRoofAreaSqFt.toLocaleString("en-IN")} ft²`, sub: "Required usable area", icon: Ruler },
                    { label: "Daily generation", value: `${result.dailyGenerationKwh} kWh`, sub: "Location adjusted", icon: Sun },
                    { label: "Monthly generation", value: `${result.monthlyGenerationKwh.toLocaleString("en-IN")} kWh`, sub: `${result.annualGenerationKwh.toLocaleString("en-IN")} kWh/year`, icon: Zap },
                    { label: "System cost", value: currency(result.grossCost), sub: result.batteryCost ? `Includes ${currency(result.batteryCost)} battery` : "Before subsidy", icon: WalletCards },
                    { label: "Government subsidy", value: currency(result.subsidy), sub: inputs.propertyType === "residential" ? "PM Surya Ghar estimate" : "Not applicable", icon: CheckCircle2 },
                    { label: "Net cost", value: currency(result.netCost), sub: "After eligible subsidy", icon: Calculator },
                    { label: "Monthly savings", value: currency(result.monthlySavings), sub: `${currency(result.annualSavings)}/year`, icon: TrendingUp },
                    { label: "25-year savings", value: currency(result.savings25Years), sub: "After modelled expenses", icon: WalletCards },
                    { label: "CO₂ reduction", value: `${result.co2ReductionKgAnnual.toLocaleString("en-IN")} kg`, sub: "Avoided every year", icon: Leaf },
                    { label: "Trees equivalent", value: result.treesEquivalent.toLocaleString("en-IN"), sub: "Trees absorbing CO₂/year", icon: Leaf },
                    { label: "Consumption", value: `${result.monthlyUnits.toLocaleString("en-IN")} units`, sub: `Tariff: ${currency(result.tariff)}/unit`, icon: Zap },
                  ].map((metric) => (
                    <motion.article key={metric.label} className="calc-metric" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <metric.icon size={17} />
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                      <small>{metric.sub}</small>
                    </motion.article>
                  ))}
                </section>
              </>
            )}
          </section>
        </main>

        <div className="calc-shell calc-lower">
          <CalculatorCharts result={result} />

          <section className="calc-dashboard-card calc-comparison" aria-labelledby="comparison-title">
            <div className="calc-card-heading">
              <div><p className="calc-kicker">Compare capacity</p><h2 id="comparison-title">3, 5, 8 and 10 kW systems</h2></div>
              <p>Same assumptions, side by side</p>
            </div>
            <div className="calc-compare-table-wrap">
              <table>
                <thead><tr><th>System</th><th>Panels</th><th>Annual generation</th><th>Net cost</th><th>Annual savings</th><th>Payback</th></tr></thead>
                <tbody>
                  {comparisons.map((item) => (
                    <tr key={item.sizeKw} className={item.recommended ? "is-recommended" : ""}>
                      <th>{item.sizeKw} kW {item.recommended ? <span>Closest fit</span> : null}</th>
                      <td>{item.panels}</td>
                      <td>{item.annualGeneration.toLocaleString("en-IN")} kWh</td>
                      <td>{currency(item.netCost)}</td>
                      <td>{currency(item.annualSavings)}</td>
                      <td>{item.paybackYears} yr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="calc-cta-premium">
            <div>
              <p className="calc-kicker">Take the next step</p>
              <h2>Save this estimate or let our engineer verify it.</h2>
              <p>Final pricing and generation are confirmed after a free shade and roof assessment.</p>
            </div>
            <div className="calc-cta-grid">
              <Button onClick={handleDownload} disabled={!isValid || downloading}>
                {downloading ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
                Download PDF Report
              </Button>
              <Link className={cn(buttonVariants({ variant: "secondary" }))} href="/contact">Get Free Quote <ArrowRight size={16} /></Link>
              <a className={cn(buttonVariants({ variant: "outline" }))} href={whatsappLink(`${recommendationMessage} I would like to book a free site survey.`)} target="_blank" rel="noopener noreferrer">Book Site Survey</a>
              <a className={cn(buttonVariants({ variant: "outline" }))} href={whatsappLink(recommendationMessage)} target="_blank" rel="noopener noreferrer">WhatsApp Expert</a>
            </div>
          </section>

          <section className="calc-disclaimer">
            <Info size={16} />
            <p><strong>Transparent assumptions:</strong> Results use location irradiation, selected equipment, property tariff, 0.5% annual panel degradation, 5% tariff escalation, standard O&M and replacement costs. This is an indicative feasibility model—not a final engineering proposal.</p>
          </section>
        </div>
      </div>
    </TooltipProvider>
  );
}
