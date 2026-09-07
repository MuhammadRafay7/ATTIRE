import { getSectionData, saveSectionData } from "./storage";
import type {
  GeneralContent,
  HeroContent,
  StatsContent,
  FeaturesContent,
  ProcessContent,
  MaterialsContent,
  CompanyContent,
  TestimonialsContent,
} from "./content";

// Asynchronous loaders for Server Components, Route Handlers, and Dynamic Pages
export async function getGeneralContentAsync(): Promise<GeneralContent> {
  return getSectionData<GeneralContent>("general");
}

export async function getHeroContentAsync(): Promise<HeroContent> {
  return getSectionData<HeroContent>("hero");
}

export async function getStatsContentAsync(): Promise<StatsContent> {
  return getSectionData<StatsContent>("stats");
}

export async function getFeaturesContentAsync(): Promise<FeaturesContent> {
  return getSectionData<FeaturesContent>("features");
}

export async function getProcessContentAsync(): Promise<ProcessContent> {
  return getSectionData<ProcessContent>("process");
}

export async function getMaterialsContentAsync(): Promise<MaterialsContent> {
  return getSectionData<MaterialsContent>("materials");
}

export async function getCompanyContentAsync(): Promise<CompanyContent> {
  return getSectionData<CompanyContent>("company");
}

export async function getTestimonialsContentAsync(): Promise<TestimonialsContent> {
  return getSectionData<TestimonialsContent>("testimonials");
}

export { saveSectionData, getSectionData };
