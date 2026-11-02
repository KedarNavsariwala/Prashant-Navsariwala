import mediaConfig from '../media.config.json'

/**
 * Every string, date and figure on the site lives in this file.
 * Source of truth: `Prashant Navsariwala Resume.pdf` (repo root).
 * Vehicle launch years: `research/vehicle-data.md`.
 *
 * Voice: first person. Timeline: forward, 1994 → today.
 * Sales, volume and market-share figures are deliberately absent (PRD §5.2.4).
 */

export const media = mediaConfig.images

export type ImageKey = keyof typeof mediaConfig.images

export type Vehicle = {
  id: string
  name: string
  oem: 'Mahindra & Mahindra' | 'Tata Motors'
  type: string
  launchYear: number
  review: string
  image: ImageKey
  /** Optical mass, not real scale: the Signa must read as a truck, the Jeeto as a mini truck. */
  mass: number
  /** Optional glTF binary, supplied later. Absent → the stage shows the PNG cut-out. */
  model?: string
  modelPoster?: string
}

export type Role = {
  id: string
  org: string
  title: string
  /** ISO-ish month, used only for the machine-readable end of the timeline. */
  start: string
  end: string | null
  /** Human display, e.g. "1994 to 2012". */
  dates: string
  tenure?: string
  location?: string
  summary: string
  image?: string
  imageCaption?: string
  /** Earlier positions held inside this tenure, shown nested under the card. */
  children?: Role[]
}

export const site = {
  name: 'Prashant Navsariwala',
  role: 'Automotive Product Design and Development Professional',
  location: 'Pune, Maharashtra, India',
  url: 'https://prashant-navsariwala.github.io/',
  title: 'Prashant Navsariwala | Automotive Product Design & Development',
  description:
    'Thirty years in automotive body engineering: vehicle programmes, body systems and a patent, from Mahindra & Mahindra to Tata Motors.',
  linkedin: 'https://www.linkedin.com/in/prashant-navsariwala-560b4335',
  company: 'https://www.tatamotors.com',
  resume: 'resume.pdf',
  portrait: 'portrait' as ImageKey,
} as const

export const nav = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Career', href: '#career' },
  ],
  linkedinLabel: 'LinkedIn',
} as const

export const hero = {
  eyebrow: 'Vehicle design leader · Pune, India',
  roleLine: 'Vehicle Design Leader',
  display: 'Innovation',
  /** Character index where the intro opens the gap: "Innov" / "ation". */
  displaySplit: 5,
  name: 'Prashant Navsariwala',
  title: 'Automotive Product Design and Development Professional',
  lede: 'I have spent thirty years shaping the body, closures and cockpits of the vehicles India drives.',
  actions: {
    primary: { label: 'Explore', href: '#work' },
    secondary: { label: 'Download résumé', href: 'resume.pdf' },
  },
  meta: ['30 years in the industry', '25 years leading programmes'],
} as const

export const about = {
  eyebrow: '01 · About',
  heading: 'Thirty years, one discipline: the body of the vehicle.',
  lede:
    'I have spent thirty years in the automobile industry, twenty-five of them leading vehicle programmes and Centres of Competence. My work sits in the structures you touch and the surfaces you see: BIW, load bodies, closures, glass, sealing, mechanisms, exteriors, interiors, cockpits, seating and restraints. I have taken vehicles from a clean sheet to the line at Mahindra & Mahindra and now at Tata Motors, and I still believe the best engineering is the kind a customer never has to think about.',
  disciplines: [
    { value: '25', unit: 'years', label: 'Leading vehicle programmes and Centres of Competence' },
    { value: '1.5', unit: 'years', label: 'Manufacturing Engineering' },
    { value: '3.5', unit: 'years', label: 'Body (sheet metal) production' },
    { value: '1', unit: 'year', label: 'Central Quality Assurance' },
  ],
  skills: ['Product Development', 'Program Management', 'Project Planning'],
} as const

export const impact = {
  heading: 'Impact in numbers',
  items: [
    { value: 30, suffix: '', caption: 'Years in the automobile industry' },
    { value: 25, suffix: '', caption: 'Years leading vehicle programmes' },
    { value: 6, suffix: '+', caption: 'Vehicle programmes shown here' },
    { value: 1, suffix: '', caption: 'Patent for an impact-absorbing structure' },
  ],
} as const

export const work = {
  eyebrow: '02 · Selected work',
  heading: 'The vehicles.',
  note: 'Six programmes, six sets of body systems. Hover, tap or use the arrow keys to bring one into the light.',
  defaultVehicle: 'mahindra-maxx',
} as const

export const vehicles: Vehicle[] = [
  {
    id: 'mahindra-maxx',
    name: 'Mahindra Maxx',
    oem: 'Mahindra & Mahindra',
    type: 'MUV · 9/10-seat station wagon',
    launchYear: 2001,
    review:
      'A nine-seat workhorse built to carry families and goods on one body, and to be repaired anywhere.',
    image: 'maxx',
    mass: 0.94,
  },
  {
    id: 'bolero-xl',
    name: 'Mahindra Bolero XL',
    oem: 'Mahindra & Mahindra',
    type: 'SUV · 9/10-seat, taxi-oriented',
    launchYear: 2001,
    review: 'The Bolero widened for the taxi trade: more seats, the same body-on-frame stamina.',
    image: 'bolero',
    mass: 0.98,
  },
  {
    id: 'xylo',
    name: 'Mahindra Xylo',
    oem: 'Mahindra & Mahindra',
    type: 'Compact MPV',
    launchYear: 2009,
    review: 'A compact MPV that put space and ride comfort ahead of style, and found its market.',
    image: 'xylo',
    mass: 1,
  },
  {
    id: 'maxximo',
    name: 'Mahindra Maxximo',
    oem: 'Mahindra & Mahindra',
    type: 'LCV · 0.85–0.9 t mini truck',
    launchYear: 2010,
    review: "A greenfield mini truck from Chakan, designed around payload and a first-time buyer's budget.",
    image: 'maxximo',
    mass: 0.82,
  },
  {
    id: 'jeeto',
    name: 'Mahindra Jeeto',
    oem: 'Mahindra & Mahindra',
    type: 'LCV · sub-1 t mini truck',
    launchYear: 2015,
    review: 'A modular light truck that traded payload for agility and took the last mile on price.',
    image: 'jeeto',
    mass: 0.8,
  },
  {
    id: 'tata-signa',
    name: 'Tata Signa',
    oem: 'Tata Motors',
    type: 'MHCV · tipper / tractor / truck',
    launchYear: 2016,
    review:
      "A commercial range built around the driver's cab, where long-haul comfort becomes a safety argument.",
    image: 'signa',
    mass: 1.14,
  },
]

export const career = {
  eyebrow: '03 · Career',
  heading: 'Thirty years, two companies.',
  lede: 'Forward from 1994: body systems at Mahindra & Mahindra, then Body & Trims for commercial vehicles at Tata Motors.',
} as const

export const roles: Role[] = [
  {
    id: 'mahindra-body-systems',
    org: 'Mahindra & Mahindra',
    title: 'DGM, Product Development (Body Systems)',
    start: '1994-08',
    end: '2012-02',
    dates: 'Aug 1994 to Feb 2012',
    tenure: '17 years 7 months',
    summary:
      "Head of Department for the design and development of body systems across Mahindra's range, building the capability behind Maxx, Bolero XL, Xylo and Maxximo.",
    children: [
      {
        id: 'mahindra-central-qa',
        org: 'Mahindra & Mahindra',
        title: 'Senior Engineer, Central Quality Assurance',
        start: '1999-01',
        end: '2000-12',
        dates: '1999 to 2000',
        tenure: '1 year',
        location: 'Nashik',
        summary:
          'Managed NOVA-C, manufacturing audits, launch sampling and quality planning for body manufacturing.',
      },
      {
        id: 'mahindra-vehicle-engineering',
        org: 'Mahindra & Mahindra',
        title: 'Manager, Vehicle Engineering',
        start: '2002-01',
        end: '2004-12',
        dates: '2002 to 2004',
        tenure: '2 years',
        summary:
          'Designed, developed and implemented the Bolero XL and XLS, and shaped the first concept for what became the Xylo.',
      },
    ],
  },
  {
    id: 'mahindra-projects',
    org: 'Mahindra & Mahindra, Automotive Sector',
    title: 'DGM, Projects (Product Development)',
    start: '2012-02',
    end: '2014-02',
    dates: 'Feb 2012 to Feb 2014',
    tenure: '2 years 1 month',
    location: 'Mahindra World City, Chennai',
    summary:
      'Project leader for the Mahindra Jeeto, taking a new mini-truck platform from programme definition to launch with the Chennai product development team.',
  },
  {
    id: 'tata-body-trims',
    org: 'Tata Motors',
    title: 'General Manager (Body & Trims Engg.)',
    start: '2014-02',
    end: null,
    dates: 'Feb 2014 to Present',
    tenure: '12 years 9 months',
    location: 'Pune',
    summary:
      'Leads the Centre of Competence for Body & Trims in commercial vehicles at Tata Motors, owning body engineering capability, delivery and standards across programmes.',
  },
]

export const patent = {
  eyebrow: '04 · Patent',
  title: 'Impact Absorbing Structure for Vehicles',
  number: 'WO/2009/113096',
  date: '17 September 2009',
  datetime: '2009-09-17',
  note:
    'A body structure that takes the energy of an impact before it reaches the cabin: the quiet, early work of passive safety, done in sheet metal.',
} as const

export const credentials = {
  eyebrow: '05 · Credentials',
  heading: 'Continued study.',
  certifications: [
    'Fundamentals of AI & ML: Introduction to Artificial Intelligence',
    'Inside Agentic AI: Foundations and Frontiers',
    'Becoming a DEI Ally and Agent for Change',
    'Modern Systems Engineering: Model-based Systems Engineering (MBSE)',
    'Workplace Diversity, Equity, and Inclusion in Action',
  ],
  education: [
    {
      qualification: 'B.E., Machine Tools Engineering',
      institution: 'K. J. Somaiya College of Engineering, University of Mumbai',
      years: '1991 to 1994',
    },
    {
      qualification: 'M.B.A., Materials Management',
      institution: 'NIMS, Pune University',
      years: '1996 to 1998',
    },
  ],
} as const

export const footer = {
  year: '2026',
  linkLabel: 'LinkedIn',
} as const
