import { PROPERTY_LABELS } from "./config";
import type { CalculatorInputs, SiteSurveyForm, SolarResult } from "./types";

const fmt = (value: number) => Math.round(value).toLocaleString("en-IN");

export function buildSiteSurveyWhatsAppMessage(
  form: SiteSurveyForm,
  inputs: CalculatorInputs,
  result: SolarResult,
) {
  const locationLine =
    inputs.state && inputs.city
      ? `${inputs.city}, ${inputs.state}`
      : form.city || inputs.city || "Not specified";

  return [
    "🎯 NEW FREE SITE SURVEY REQUEST",
    "",
    "Hello,",
    "",
    "I am interested in installing a Solar System and would like to book a FREE Site Survey.",
    "",
    `👤 Name: ${form.name.trim()}`,
    `📞 Phone Number: ${form.phone.trim()}`,
    `📍 City: ${form.city.trim() || locationLine}`,
    `🏠 Address: ${form.address.trim()}`,
    "",
    "━━━━━━━━━━━━━━━━━━━",
    "",
    "⚡ SOLAR CALCULATOR RESULTS",
    "",
    `🏢 Installation Type: ${PROPERTY_LABELS[inputs.propertyType]}`,
    "",
    `💡 Monthly Electricity Bill: ₹${fmt(inputs.monthlyBill)}`,
    "",
    `☀ Recommended Solar System: ${result.systemSizeKw} KW`,
    "",
    `🔋 Suitable Solar Type: ${result.suitableSolarTypeLabel}`,
    "",
    `⚡ Monthly Units Generated: ${fmt(result.monthlyGenerationKwh)} Units`,
    "",
    `📈 Annual Units Generated: ${fmt(result.annualGenerationKwh)} Units`,
    "",
    `💰 Monthly Savings: ₹${fmt(result.monthlySavings)}`,
    "",
    `💰 Annual Savings: ₹${fmt(result.annualSavings)}`,
    "",
    `🔲 Required Solar Panels: ${result.panelCount}`,
    "",
    `🏡 Required Roof Space: ${fmt(result.requiredRoofAreaSqFt)} Sq.ft.`,
    "",
    `💵 Lifetime Savings (25 Years): ₹${fmt(result.savings25Years)}`,
    "",
    `🌱 CO₂ Reduction: ${result.co2ReductionTons} Tons`,
    "",
    "━━━━━━━━━━━━━━━━━━━",
    "",
    "Please contact me to schedule the site survey.",
    "",
    "Thank you.",
  ].join("\n");
}
