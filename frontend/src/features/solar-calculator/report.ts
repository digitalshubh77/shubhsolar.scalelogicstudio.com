import { PANEL_LABELS, PROPERTY_LABELS, ROOF_LABELS } from "./config";
import type { CalculatorInputs, SolarResult, SystemComparison } from "./types";

const money = (value: number) => `Rs. ${Math.round(value).toLocaleString("en-IN")}`;

export async function downloadSolarReport(
  inputs: CalculatorInputs,
  result: SolarResult,
  comparisons: SystemComparison[],
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 18;
  let y = 20;

  const addLine = (label: string, value: string, strong = false) => {
    if (y > 278) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", strong ? "bold" : "normal");
    doc.setTextColor(strong ? 20 : 70, strong ? 83 : 85, strong ? 45 : 95);
    doc.text(label, left, y);
    doc.setTextColor(15, 23, 42);
    doc.text(value, 92, y);
    y += 7;
  };

  doc.setFillColor(7, 26, 19);
  doc.rect(0, 0, 210, 42, "F");
  doc.setTextColor(74, 222, 128);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("SHUBH SOLAR", left, 14);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Solar Savings Report", left, 27);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated ${new Date().toLocaleDateString("en-IN")} | +91 82757 20252`, left, 35);

  y = 54;
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("Your inputs", left, y);
  y += 10;
  doc.setFontSize(10);
  addLine("Property", PROPERTY_LABELS[inputs.propertyType]);
  addLine("Location", `${inputs.city}, ${inputs.state}`);
  addLine("Monthly bill", money(inputs.monthlyBill));
  addLine("Monthly consumption", `${result.monthlyUnits.toLocaleString("en-IN")} units`);
  addLine("Roof", ROOF_LABELS[inputs.roofType]);
  addLine("Panel", PANEL_LABELS[inputs.panelType]);
  addLine("Battery", inputs.battery === "yes" ? "Included" : "Not included");

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("Recommended system", left, y);
  y += 10;
  doc.setFontSize(10);
  addLine("System size", `${result.systemSizeKw} kW`, true);
  addLine("Panels", `${result.panelCount} x ${result.panelWattage}W`);
  addLine("Required roof area", `${result.requiredRoofAreaSqFt.toLocaleString("en-IN")} sq.ft.`);
  addLine("Annual generation", `${result.annualGenerationKwh.toLocaleString("en-IN")} kWh`);
  addLine("Energy offset", `${result.offsetPercent}%`);

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("Financial outlook", left, y);
  y += 10;
  doc.setFontSize(10);
  addLine("Estimated system cost", money(result.grossCost));
  addLine("Government subsidy", money(result.subsidy));
  addLine("Net cost", money(result.netCost), true);
  addLine("Current monthly bill", money(inputs.monthlyBill));
  addLine("Estimated bill after solar", money(Math.max(0, inputs.monthlyBill - result.monthlySavings)));
  addLine("Monthly savings", money(result.monthlySavings));
  addLine("Annual savings", money(result.annualSavings));
  addLine("25-year net savings", money(result.savings25Years), true);
  addLine("Payback", `${result.paybackYears} years`);
  addLine("25-year ROI", `${result.roiPercent}%`);

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("System comparison", left, y);
  y += 9;
  doc.setFontSize(9);
  comparisons.forEach((item) => {
    addLine(
      `${item.sizeKw} kW (${item.panels} panels)`,
      `${money(item.netCost)} | ${money(item.annualSavings)}/yr | ${item.paybackYears} yr payback`,
    );
  });

  y += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Environmental impact", left, y);
  y += 8;
  doc.setFontSize(10);
  addLine("CO2 avoided annually", `${result.co2ReductionKgAnnual.toLocaleString("en-IN")} kg`);
  addLine("Trees equivalent", `${result.treesEquivalent.toLocaleString("en-IN")} trees/year`);

  y += 5;
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const disclaimer =
    "Indicative estimate based on selected assumptions, irradiation averages, tariff escalation and standard equipment costs. Final generation, subsidy, pricing and savings depend on site survey, shading, sanctioned load, DISCOM rules and selected brands.";
  doc.text(doc.splitTextToSize(disclaimer, 174), left, y);
  doc.save(`Shubh-Solar-${inputs.propertyType}-${result.systemSizeKw}kW-report.pdf`);
}
