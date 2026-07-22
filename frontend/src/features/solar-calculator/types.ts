export type PropertyType = "residential" | "commercial" | "industrial";
export type SolarSystemType = "on-grid" | "hybrid" | "off-grid";
export type PanelType = "mono-perc" | "topcon" | "bifacial";
export type RoofType = "rcc" | "metal" | "tile" | "ground";

export interface CalculatorInputs {
  monthlyBill: number;
  state: string;
  city: string;
  propertyType: PropertyType;
}

export interface SolarResult {
  systemSizeKw: number;
  suitableSolarType: SolarSystemType;
  suitableSolarTypeLabel: string;
  panelCount: number;
  panelWattage: number;
  requiredRoofAreaSqFt: number;
  monthlyGenerationKwh: number;
  annualGenerationKwh: number;
  monthlySavings: number;
  annualSavings: number;
  savings25Years: number;
  co2ReductionTons: number;
  tariff: number;
  monthlyUnits: number;
}

export interface SiteSurveyForm {
  name: string;
  phone: string;
  city: string;
  address: string;
}

export interface ValidationErrors {
  monthlyBill?: string;
}
