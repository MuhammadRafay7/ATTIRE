import generalData from "@/content/general.json";
import heroData from "@/content/hero.json";
import statsData from "@/content/stats.json";
import featuresData from "@/content/features.json";
import processData from "@/content/process.json";
import materialsData from "@/content/materials.json";
import companyData from "@/content/company.json";
import testimonialsData from "@/content/testimonials.json";

import type { z } from "zod";
import type {
  GeneralSchema,
  HeroSchema,
  StatsSchema,
  FeaturesSchema,
  ProcessSchema,
  MaterialsSchema,
  CompanySchema,
  TestimonialsSchema,
  MaterialItemSchema,
  FeatureItemSchema,
  ProcessStageSchema,
  RiskItemSchema,
  TestimonialItemSchema,
  StatItemSchema,
} from "./schemas";

export type GeneralContent = z.infer<typeof GeneralSchema>;
export type HeroContent = z.infer<typeof HeroSchema>;
export type StatsContent = z.infer<typeof StatsSchema>;
export type FeaturesContent = z.infer<typeof FeaturesSchema>;
export type ProcessContent = z.infer<typeof ProcessSchema>;
export type MaterialsContent = z.infer<typeof MaterialsSchema>;
export type CompanyContent = z.infer<typeof CompanySchema>;
export type TestimonialsContent = z.infer<typeof TestimonialsSchema>;

export type MaterialItem = z.infer<typeof MaterialItemSchema>;
export type FeatureItem = z.infer<typeof FeatureItemSchema>;
export type ProcessStage = z.infer<typeof ProcessStageSchema>;
export type RiskItem = z.infer<typeof RiskItemSchema>;
export type TestimonialItem = z.infer<typeof TestimonialItemSchema>;
export type StatItem = z.infer<typeof StatItemSchema>;

export function getGeneralContent(): GeneralContent {
  return generalData as GeneralContent;
}

export function getHeroContent(): HeroContent {
  return heroData as HeroContent;
}

export function getStatsContent(): StatsContent {
  return statsData as StatsContent;
}

export function getFeaturesContent(): FeaturesContent {
  return featuresData as FeaturesContent;
}

export function getProcessContent(): ProcessContent {
  return processData as ProcessContent;
}

export function getMaterialsContent(): MaterialsContent {
  return materialsData as MaterialsContent;
}

export function getCompanyContent(): CompanyContent {
  return companyData as CompanyContent;
}

export function getTestimonialsContent(): TestimonialsContent {
  return testimonialsData as TestimonialsContent;
}

export const siteContent = {
  general: generalData as GeneralContent,
  hero: heroData as HeroContent,
  stats: statsData as StatsContent,
  features: featuresData as FeaturesContent,
  process: processData as ProcessContent,
  materials: materialsData as MaterialsContent,
  company: companyData as CompanyContent,
  testimonials: testimonialsData as TestimonialsContent,
};
