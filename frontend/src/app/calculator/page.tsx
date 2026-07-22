import type { Metadata } from "next";
import { Suspense } from "react";
import SolarCalculator from "@/features/solar-calculator/SolarCalculator";
import { Skeleton } from "@/components/ui/skeleton";
import "../calculator-page.css";

export const metadata: Metadata = {
  title: "Solar Savings Calculator | Shubh Solar Sangli",
  description:
    "Estimate rooftop solar system size, generation, savings, and CO₂ reduction. Book a free site survey via WhatsApp.",
  alternates: { canonical: "/calculator" },
};

function CalculatorFallback() {
  return (
    <div className="page-wrap calc-experience">
      <div className="calc-shell" style={{ paddingBlock: 80 }}>
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="mt-5 h-[560px] w-full" />
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <div className="page-wrap">
      <Suspense fallback={<CalculatorFallback />}>
        <SolarCalculator />
      </Suspense>
    </div>
  );
}
