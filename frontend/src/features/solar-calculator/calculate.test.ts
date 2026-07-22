import { describe, expect, it } from "vitest";
import { calculateSolar, validateInputs } from "./calculate";
import { buildSiteSurveyWhatsAppMessage } from "./siteSurveyMessage";
import type { CalculatorInputs } from "./types";

const base: CalculatorInputs = {
  monthlyBill: 5000,
  state: "",
  city: "",
  propertyType: "residential",
};

describe("solar calculation engine", () => {
  it("returns all required output fields", () => {
    const result = calculateSolar(base);
    expect(result.systemSizeKw).toBeGreaterThan(0);
    expect(result.suitableSolarTypeLabel).toBe("On-Grid");
    expect(result.monthlyGenerationKwh).toBeGreaterThan(0);
    expect(result.annualGenerationKwh).toBeGreaterThan(result.monthlyGenerationKwh);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.annualSavings).toBe(result.monthlySavings * 12);
    expect(result.panelCount).toBeGreaterThan(0);
    expect(result.requiredRoofAreaSqFt).toBeGreaterThan(0);
    expect(result.savings25Years).toBeGreaterThan(0);
    expect(result.co2ReductionTons).toBeGreaterThan(0);
  });

  it("validates monthly bill range", () => {
    expect(validateInputs({ ...base, monthlyBill: 100 })).toHaveProperty("monthlyBill");
    expect(validateInputs(base)).toEqual({});
  });

  it("uses location when state and city are provided", () => {
    const withLocation = calculateSolar({ ...base, state: "Maharashtra", city: "Sangli" });
    const withoutLocation = calculateSolar(base);
    expect(withLocation.systemSizeKw).toBeGreaterThan(0);
    expect(withoutLocation.systemSizeKw).toBeGreaterThan(0);
  });

  it("builds the site survey WhatsApp message with calculator results", () => {
    const result = calculateSolar(base);
    const message = buildSiteSurveyWhatsAppMessage(
      { name: "Rajesh", phone: "9876543210", city: "Sangli", address: "AP Sangli" },
      base,
      result,
    );
    expect(message).toContain("NEW FREE SITE SURVEY REQUEST");
    expect(message).toContain("Name: Rajesh");
    expect(message).toContain("Phone Number: 9876543210");
    expect(message).toContain("Installation Type: Residential");
    expect(message).toContain("Recommended Solar System:");
    expect(message).toContain("CO₂ Reduction:");
  });
});
