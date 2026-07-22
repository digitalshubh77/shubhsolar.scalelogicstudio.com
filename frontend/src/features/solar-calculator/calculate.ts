import { LOCATION_CONFIG, SOLAR_CONFIG, SOLAR_TYPE_LABELS } from "./config";
import type { CalculatorInputs, SolarResult, SolarSystemType, ValidationErrors } from "./types";

const round = (value: number, digits = 0) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

function getPeakSunHours(state: string, city: string) {
  if (!state) return LOCATION_CONFIG.Maharashtra.peakSunHours;
  const stateData = LOCATION_CONFIG[state] ?? LOCATION_CONFIG.Maharashtra;
  if (!city) return stateData.peakSunHours;
  return stateData.cities[city] ?? stateData.peakSunHours;
}

function getSuitableSolarType(propertyType: CalculatorInputs["propertyType"]): {
  type: SolarSystemType;
  label: string;
} {
  if (propertyType === "industrial") {
    return { type: "on-grid", label: SOLAR_TYPE_LABELS["on-grid"] };
  }
  if (propertyType === "commercial") {
    return { type: "on-grid", label: SOLAR_TYPE_LABELS["on-grid"] };
  }
  return { type: "on-grid", label: SOLAR_TYPE_LABELS["on-grid"] };
}

function calculate25YearSavings(
  annualSavings: number,
  monthlyBill: number,
  netCost: number,
  annualGenerationKwh: number,
) {
  let cumulative = -netCost;
  for (let year = 0; year < 25; year += 1) {
    const degradation = (1 - SOLAR_CONFIG.annualDegradation) ** year;
    const tariffGrowth = (1 + SOLAR_CONFIG.tariffEscalation) ** year;
    const yearlySaving = Math.min(
      monthlyBill * 12 * 0.96 * tariffGrowth,
      annualSavings * degradation * tariffGrowth,
    );
    let expense = netCost * SOLAR_CONFIG.annualMaintenanceRate;
    if (year + 1 === SOLAR_CONFIG.inverterReplacementYear) {
      expense += (annualGenerationKwh / 1200) * SOLAR_CONFIG.inverterReplacementCostPerKw;
    }
    cumulative += yearlySaving - expense;
  }
  return Math.max(0, Math.round(cumulative));
}

export function validateInputs(inputs: CalculatorInputs): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!Number.isFinite(inputs.monthlyBill) || inputs.monthlyBill < 500 || inputs.monthlyBill > 2_000_000) {
    errors.monthlyBill = "Enter a monthly bill between ₹500 and ₹20,00,000.";
  }
  return errors;
}

export function calculateSolar(inputs: CalculatorInputs): SolarResult {
  const property = SOLAR_CONFIG.property[inputs.propertyType];
  const panel = SOLAR_CONFIG.panel.topcon;
  const peakSunHours = getPeakSunHours(inputs.state, inputs.city);
  const monthlyUnits = inputs.monthlyBill / property.tariff;
  const generationPerKwMonth = peakSunHours * 30.42 * SOLAR_CONFIG.performanceRatio;
  const demandSize = (monthlyUnits * SOLAR_CONFIG.targetOffset) / generationPerKwMonth;
  const cappedSize = Math.min(Math.max(demandSize, 0.5), property.maxKw);
  const panelCount = Math.max(1, Math.ceil((cappedSize * 1000) / panel.wattage));
  const systemSizeKw = round((panelCount * panel.wattage) / 1000, 2);
  const requiredRoofAreaSqFt = Math.ceil(panelCount * panel.areaSqFt);

  const dailyGenerationKwh = systemSizeKw * peakSunHours * SOLAR_CONFIG.performanceRatio;
  const annualGenerationKwh = dailyGenerationKwh * 365;
  const monthlyGenerationKwh = annualGenerationKwh / 12;

  const selfConsumption = property.selfConsumption;
  const firstYearEnergyValue =
    annualGenerationKwh * selfConsumption * property.tariff +
    annualGenerationKwh * (1 - selfConsumption) * SOLAR_CONFIG.exportTariff;
  const annualSavings = Math.min(inputs.monthlyBill * 12 * 0.96, firstYearEnergyValue);
  const monthlySavings = annualSavings / 12;

  const grossCost = Math.round(systemSizeKw * property.costPerKw * panel.costMultiplier);
  const subsidy =
    inputs.propertyType === "residential"
      ? Math.min(
          78000,
          Math.round(Math.min(systemSizeKw, 2) * 30000 + Math.min(Math.max(systemSizeKw - 2, 0), 1) * 18000),
        )
      : 0;
  const netCost = Math.max(0, grossCost - subsidy);
  const savings25Years = calculate25YearSavings(annualSavings, inputs.monthlyBill, netCost, annualGenerationKwh);
  const co2Kg = annualGenerationKwh * SOLAR_CONFIG.gridEmissionKgPerKwh;
  const solarType = getSuitableSolarType(inputs.propertyType);

  return {
    systemSizeKw,
    suitableSolarType: solarType.type,
    suitableSolarTypeLabel: solarType.label,
    panelCount,
    panelWattage: panel.wattage,
    requiredRoofAreaSqFt,
    monthlyGenerationKwh: Math.round(monthlyGenerationKwh),
    annualGenerationKwh: Math.round(annualGenerationKwh),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(monthlySavings) * 12,
    savings25Years,
    co2ReductionTons: round(co2Kg / 1000, 1),
    tariff: property.tariff,
    monthlyUnits: Math.round(monthlyUnits),
  };
}
