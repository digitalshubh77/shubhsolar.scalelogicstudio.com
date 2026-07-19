import { describe, expect, it } from "vitest";
import { calculateComparisons, calculateResidentialSubsidy, calculateSolar } from "./calculate";
import type { CalculatorInputs } from "./types";

const base: CalculatorInputs = {
  monthlyBill: 5000,
  state: "Maharashtra",
  city: "Sangli",
  propertyType: "residential",
  roofType: "rcc",
  panelType: "topcon",
  battery: "no",
};

describe("solar calculation engine", () => {
  it("applies PM Surya Ghar subsidy slabs and cap", () => {
    expect(calculateResidentialSubsidy(1, "residential")).toBe(30000);
    expect(calculateResidentialSubsidy(2, "residential")).toBe(60000);
    expect(calculateResidentialSubsidy(3, "residential")).toBe(78000);
    expect(calculateResidentialSubsidy(8, "residential")).toBe(78000);
    expect(calculateResidentialSubsidy(3, "commercial")).toBe(0);
  });

  it("returns every requested financial and environmental output", () => {
    const result = calculateSolar(base);
    expect(result.systemSizeKw).toBeGreaterThan(0);
    expect(result.panelCount).toBeGreaterThan(0);
    expect(result.annualGenerationKwh).toBeGreaterThan(result.monthlyGenerationKwh);
    expect(result.grossCost).toBeGreaterThan(result.netCost);
    expect(result.annualSavings).toBe(result.monthlySavings * 12);
    expect(result.cashFlow).toHaveLength(25);
    expect(result.monthlyProfile).toHaveLength(12);
    expect(result.co2ReductionKgAnnual).toBeGreaterThan(0);
    expect(result.treesEquivalent).toBeGreaterThan(0);
  });

  it("uses supplied units instead of estimated bill units", () => {
    const result = calculateSolar({ ...base, monthlyUnits: 1000 });
    expect(result.monthlyUnits).toBe(1000);
  });

  it("limits the recommendation when roof dimensions are small", () => {
    const unlimited = calculateSolar({ ...base, monthlyBill: 25000 });
    const limited = calculateSolar({ ...base, monthlyBill: 25000, roofLength: 15, roofWidth: 15 });
    expect(limited.systemSizeKw).toBeLessThan(unlimited.systemSizeKw);
    expect(limited.roofLimited).toBe(true);
  });

  it("adds battery cost and replacement expense", () => {
    const withoutBattery = calculateSolar(base);
    const withBattery = calculateSolar({ ...base, battery: "yes" });
    expect(withBattery.batteryCost).toBeGreaterThan(0);
    expect(withBattery.grossCost).toBeGreaterThan(withoutBattery.grossCost);
    expect(withBattery.cashFlow[10].annualExpense).toBeGreaterThan(withoutBattery.cashFlow[10].annualExpense);
  });

  it("builds comparable 3, 5, 8 and 10 kW scenarios", () => {
    const recommended = calculateSolar(base);
    const comparisons = calculateComparisons(base, recommended.systemSizeKw);
    expect(comparisons).toHaveLength(4);
    expect(comparisons.map((item) => item.sizeKw)).toEqual([3, 5, 8, 10]);
    expect(comparisons[3].annualGeneration).toBeGreaterThan(comparisons[0].annualGeneration);
  });
});
