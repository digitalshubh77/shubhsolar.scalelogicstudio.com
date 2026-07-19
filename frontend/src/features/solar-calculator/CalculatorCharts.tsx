"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SolarResult } from "./types";

type ChartKey = "generation" | "savings" | "roi" | "cashflow";

const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const compactNumber = (value: number) => {
  const absolute = Math.abs(value);
  if (absolute >= 10_000_000) return `${(value / 10_000_000).toFixed(1)}Cr`;
  if (absolute >= 100_000) return `${(value / 100_000).toFixed(1)}L`;
  if (absolute >= 1_000) return `${Math.round(value / 1_000)}K`;
  return String(Math.round(value));
};

export default function CalculatorCharts({ result }: { result: SolarResult }) {
  const [active, setActive] = useState<ChartKey>("generation");
  const chartTitles: Record<ChartKey, { title: string; description: string }> = {
    generation: {
      title: "Monthly solar generation",
      description: "Season-adjusted energy output across a typical year",
    },
    savings: {
      title: "Monthly electricity savings",
      description: "Estimated bill reduction from generated solar energy",
    },
    roi: {
      title: "25-year net ROI growth",
      description: "Return after system cost, maintenance and replacements",
    },
    cashflow: {
      title: "25-year cumulative cash flow",
      description: "Initial investment, payback crossover and lifetime value",
    },
  };
  const roiData = result.cashFlow.map((point) => ({
    year: `Y${point.year}`,
    roi: Math.round((point.cumulativeCashFlow / Math.max(result.netCost, 1)) * 100),
  }));

  return (
    <section className="calc-dashboard-card calc-charts" aria-labelledby="charts-title">
      <div className="calc-card-heading">
        <div>
          <p className="calc-kicker">Performance analytics</p>
          <h2 id="charts-title">{chartTitles[active].title}</h2>
          <p className="calc-chart-description">{chartTitles[active].description}</p>
        </div>
        <div className="calc-chart-tabs" role="tablist" aria-label="Chart type">
          {([
            ["generation", "Generation"],
            ["savings", "Savings"],
            ["roi", "ROI"],
            ["cashflow", "Cash flow"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              className={active === key ? "is-active" : ""}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="calc-chart-stage" role="tabpanel">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={230}
          initialDimension={{ width: 800, height: 300 }}
          debounce={50}
        >
          {active === "generation" ? (
            <BarChart data={result.monthlyProfile} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--calc-chart-grid)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} stroke="var(--calc-muted)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--calc-muted)" tickFormatter={compactNumber} />
              <Tooltip formatter={(value) => [`${Number(value).toLocaleString("en-IN")} kWh`, "Generation"]} />
              <Bar dataKey="generation" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : active === "savings" ? (
            <AreaChart data={result.monthlyProfile} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="savingFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--calc-chart-grid)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} stroke="var(--calc-muted)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--calc-muted)" tickFormatter={compactNumber} />
              <Tooltip formatter={(value) => [currency(Number(value)), "Savings"]} />
              <Area type="monotone" dataKey="savings" stroke="#16a34a" strokeWidth={3} fill="url(#savingFill)" />
            </AreaChart>
          ) : active === "roi" ? (
            <LineChart data={roiData} margin={{ top: 8, right: 10, left: -5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--calc-chart-grid)" />
              <XAxis dataKey="year" interval={4} tickLine={false} axisLine={false} fontSize={11} stroke="var(--calc-muted)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--calc-muted)" unit="%" />
              <Tooltip formatter={(value) => [`${Number(value)}%`, "Cumulative ROI"]} />
              <ReferenceLine y={0} stroke="var(--calc-muted)" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="roi" stroke="#f59e0b" strokeWidth={3} dot={false} />
            </LineChart>
          ) : (
            <AreaChart data={result.cashFlow} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cashFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--calc-chart-grid)" />
              <XAxis dataKey="year" interval={4} tickLine={false} axisLine={false} fontSize={11} stroke="var(--calc-muted)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--calc-muted)" tickFormatter={compactNumber} />
              <Tooltip formatter={(value) => [currency(Number(value)), "Cumulative cash flow"]} />
              <ReferenceLine y={0} stroke="var(--calc-muted)" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="cumulativeCashFlow" stroke="#0ea5e9" strokeWidth={3} fill="url(#cashFill)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}
