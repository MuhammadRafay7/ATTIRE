import { z } from "zod";

export const GeneralSchema = z.object({
  site: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    description: z.string().min(1),
    registeredCompany: z.string().min(1),
    registrationNumber: z.string().min(1),
    registrationJurisdiction: z.string().min(1),
  }),
  navLinks: z.array(
    z.object({
      href: z.string().min(1),
      label: z.string().min(1),
    })
  ),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().min(1),
    hours: z.string().min(1),
    rfqSla: z.string().min(1),
  }),
  offices: z.array(
    z.object({
      id: z.string().min(1),
      city: z.string().min(1),
      fullCity: z.string().min(1),
      role: z.string().min(1),
      address: z.string().min(1),
      phone: z.string().min(1),
      focus: z.string().min(1),
    })
  ),
  accreditations: z.array(z.string()),
  footerColumns: z.array(
    z.object({
      heading: z.string().min(1),
      links: z.array(
        z.object({
          label: z.string().min(1),
          href: z.string().min(1),
        })
      ),
    })
  ),
  legalBadges: z.array(z.string()),
});

export const HeroSchema = z.object({
  title: z.object({
    lead: z.string().min(1),
    highlight: z.string().min(1),
  }),
  lede: z.string().min(1),
  buttons: z.object({
    primary: z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    }),
    secondary: z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    }),
  }),
  guaranteeBadges: z.array(
    z.object({
      text: z.string().min(1),
      dotColor: z.string().optional(),
    })
  ),
  stations: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      badge: z.string().min(1),
      location: z.string().min(1),
      capacityLabel: z.string().min(1),
      capacityMetric: z.string().min(1),
      imageSrc: z.string().min(1),
      imageAlt: z.string().min(1),
      tag1: z.string().min(1),
      tag2: z.string().min(1),
    })
  ),
  bottomMetrics: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
    })
  ),
});

export const StatItemSchema = z.object({
  value: z.string().min(1),
  unit: z.string().min(1),
  label: z.string().min(1),
  detail: z.string().min(1),
});

export const StatsSchema = z.array(StatItemSchema);

export const FeatureItemSchema = z.object({
  id: z.string().min(1),
  iconName: z.string().min(1),
  pillar: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  points: z.array(z.string()),
});

export const LabTestSchema = z.object({
  parameter: z.string().min(1),
  method: z.string().min(1),
  standard: z.string().min(1),
});

export const FeaturesSchema = z.object({
  features: z.array(FeatureItemSchema),
  labTests: z.array(LabTestSchema),
});

export const ProcessStageSchema = z.object({
  n: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  summary: z.string().min(1),
  documentName: z.string().min(1),
  documentType: z.string().min(1),
  docIconName: z.string().min(1),
  content: z.object({
    reference: z.string().min(1),
    items: z.array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        highlight: z.boolean().optional(),
      })
    ),
    stampText: z.string().min(1),
    footerNote: z.string().min(1),
  }),
});

export const RiskItemSchema = z.object({
  id: z.string().min(1),
  iconName: z.string().min(1),
  title: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
});

export const ProcessSchema = z.object({
  stages: z.array(ProcessStageSchema),
  risks: z.array(RiskItemSchema),
});

export const MaterialItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(["woven", "denim", "knit", "heavy"]),
  weave: z.string().min(1),
  comp: z.string().min(1),
  yarnCount: z.string().min(1),
  weight: z.string().min(1),
  weightOz: z.string().min(1),
  moq: z.string().min(1),
  shrinkage: z.string().min(1),
  tariff: z.string().min(1),
  image: z.string().min(1),
  finish: z.string().min(1),
});

export const FiberStandardSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
});

export const WeightConversionSchema = z.object({
  name: z.string().min(1),
  gsm: z.string().min(1),
  oz: z.string().min(1),
});

export const MaterialsSchema = z.object({
  materials: z.array(MaterialItemSchema),
  fiberStandards: z.array(FiberStandardSchema),
  weightConversions: z.array(WeightConversionSchema),
});

export const CompanySchema = z.object({
  story: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    lede: z.string().min(1),
    sectionTitle: z.string().min(1),
    paragraphs: z.array(z.string().min(1)),
    imageSrc: z.string().min(1),
    imageAlt: z.string().min(1),
    imageBadge: z.string().min(1),
    imageSub: z.string().min(1),
  }),
  standards: z.array(
    z.object({
      title: z.string().min(1),
      body: z.string().min(1),
    })
  ),
  governance: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
  }),
  factoryVisits: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    body: z.string().min(1),
    ctaLabel: z.string().min(1),
    ctaEmail: z.string().min(1),
  }),
});

export const TestimonialItemSchema = z.object({
  id: z.string().min(1),
  quote: z.string().min(1),
  buyer: z.string().min(1),
  sector: z.string().min(1),
  scale: z.string().min(1),
  impact: z.string().min(1),
});

export const TestimonialsSchema = z.object({
  sectionHeader: z.object({
    title: z.string().min(1),
    lede: z.string().min(1),
  }),
  testimonials: z.array(TestimonialItemSchema),
});

export const SectionSchemas = {
  general: GeneralSchema,
  hero: HeroSchema,
  stats: StatsSchema,
  features: FeaturesSchema,
  process: ProcessSchema,
  materials: MaterialsSchema,
  company: CompanySchema,
  testimonials: TestimonialsSchema,
} as const;

export type SectionName = keyof typeof SectionSchemas;
