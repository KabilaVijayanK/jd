export interface ProductItem {
  name: string;
  note: string;
  specStatus: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  credit: string;
  creditUrl: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  code: string;
  title: string;
  image: ProductImage;
  shortDescription: string;
  fullDescription: string;
  materialsNote: string;
  items: ProductItem[];
  drawingNote: string;
  relevantIndustries: string[];
}

export interface IndustryItem {
  id: string;
  code: string;
  title: string;
  verificationStatus: 'confirmed' | 'pending_verification';
  verificationLabel: string;
  description: string;
  componentCategories: { label: string; categoryId: string }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
export const COMPANY_FACTS = {
  name: 'J.D. Associates',
  established: 'May 2000',
  establishedYear: 2000,
  businessType: 'Manufacturer',
  legalStatus: 'Partnership Firm',
  teamSize: '51–100 People',
  location: 'Faridabad, Haryana, India',
  address: {
    line: 'Plot No. 615, Pali Road, Bhakri, N.I.T., Faridabad, Haryana 121001',
    confirmed: false,
    statusLabel: 'Pending client confirmation',
  },
  contacts: {
    phone: 'Awaiting confirmation',
    email: 'Awaiting confirmation',
    whatsapp: 'Awaiting confirmation',
    confirmed: false,
  },
  materials: ['Steel', 'Stainless Steel', 'Brass', 'Copper', 'Aluminium'],
  machineryBrands: [
    {
      brand: 'Fanuc',
      role: 'CNC control systems and high-accuracy machining automation',
    },
    {
      brand: 'LMW',
      role: 'CNC turning centers and vertical machining infrastructure',
    },
    {
      brand: 'Ace',
      role: 'Precision CNC lathes and multi-axis turning operations',
    },
    {
      brand: 'Jyoti',
      role: 'CNC machining centers for complex automotive geometries',
    },
  ],
};

export const COMPANY_HIGHLIGHTS = [
  {
    code: '01',
    metric: 2000,
    metricPrefix: 'Est. May ',
    isNumeric: true,
    title: 'Established in May 2000',
    subtitle: 'Over two decades of continuous manufacturing continuity in Faridabad.',
  },
  {
    code: '02',
    metricLabel: 'CNC & VMC',
    isNumeric: false,
    title: 'CNC & VMC Machining',
    subtitle: 'Equipped with Fanuc, LMW, Ace, and Jyoti machining infrastructure.',
  },
  {
    code: '03',
    metricLabel: 'Drawing-Led',
    isNumeric: false,
    title: 'Custom Manufacturing',
    subtitle: 'Components engineered strictly to client drawings and OEM specifications.',
  },
  {
    code: '04',
    metric: 100,
    metricPrefix: '51–',
    isNumeric: true,
    title: 'Skilled Workforce',
    subtitle: 'Dedicated team of 51–100 professionals focused on precision repeatability.',
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'axle-shafts',
    slug: 'axle-shafts',
    code: 'CAT-01',
    title: 'Axle Shafts',
    image: {
      url: '/images/axle-shafts.jpg',
      alt: 'Steel machinery and industrial machined components',
      credit: 'Brando Louhivaara',
      creditUrl: 'https://unsplash.com/photos/k76Iqu0S120',
    },
    shortDescription:
      'Precision-turned electric vehicle and automotive rear axle shafts machined to OEM dimensional profiles.',
    fullDescription:
      'Manufactured using CNC turning and finishing operations to meet dimensional requirements for electric vehicle and conventional axle assemblies. Available across confirmed EV and legacy shaft lengths, as well as custom drawing-based variants.',
    materialsNote: 'Manufactured in Steel and Alloy Steels per client drawing requirements.',
    drawingNote: 'Tolerances, heat-treatment, and spline geometry details pending client confirmation.',
    relevantIndustries: ['Three-Wheeler and E-Rickshaw OEMs', 'Two-Wheeler OEMs', 'Four-Wheeler OEMs and Suppliers'],
    items: [
      {
        name: 'Electric Vehicle Rear Axle Shaft – 17 inch',
        note: 'Confirmed length configuration: 17 inch',
        specStatus: 'Material grade & spline specifications pending client confirmation',
      },
      {
        name: 'Rear Axle 17.2 inch EV Shaft',
        note: 'Confirmed length configuration: 17.2 inch',
        specStatus: 'Material grade & spline specifications pending client confirmation',
      },
      {
        name: 'Rear Axle 18.5 inch EV Shaft',
        note: 'Confirmed length configuration: 18.5 inch',
        specStatus: 'Material grade & spline specifications pending client confirmation',
      },
      {
        name: 'Electric Vehicle Axle Shaft – 17.5 inch',
        note: 'Confirmed length configuration: 17.5 inch',
        specStatus: 'Material grade & spline specifications pending client confirmation',
      },
      {
        name: 'Rear Axle Shaft – 18 inch (Older Model)',
        note: 'Confirmed length configuration: 18 inch legacy profile',
        specStatus: 'Material grade & spline specifications pending client confirmation',
      },
    ],
  },
  {
    id: 'metal-shafts',
    slug: 'metal-shafts',
    code: 'CAT-02',
    title: 'Metal Shafts',
    image: {
      url: '/images/metal-shafts.jpg',
      alt: 'Metal lathe in a workshop',
      credit: 'LISK OBE',
      creditUrl: 'https://unsplash.com/photos/close-up-of-an-old-metal-lathe-in-a-workshop-_VBsh_IKsD8',
    },
    shortDescription:
      'Precision-machined metal shafts including EV axle variants and specialized Excel shaft configurations.',
    fullDescription:
      'CNC-machined stepped and straight metal shafts engineered for concentricity and clean surface finish across mobility and drivetrain assemblies.',
    materialsNote: 'Machinable across Steel, Stainless Steel, Brass, Copper, and Aluminium per specification.',
    drawingNote: 'Full dimensional tolerances and surface finish specifications pending client confirmation.',
    relevantIndustries: ['Three-Wheeler and E-Rickshaw OEMs', 'Two-Wheeler OEMs', 'General Engineering and Industrial Machinery'],
    items: [
      {
        name: 'Electric Vehicle Rear Axle 18 inch Shaft',
        note: 'Confirmed length configuration: 18 inch',
        specStatus: 'Detailed drawing tolerances pending client confirmation',
      },
      {
        name: 'EV Exel Shaft',
        note: 'Confirmed EV drivetrain shaft line',
        specStatus: 'Dimensional specifications pending client confirmation',
      },
      {
        name: 'Excel Shaft',
        note: 'Confirmed standard shaft configuration',
        specStatus: 'Dimensional specifications pending client confirmation',
      },
    ],
  },
  {
    id: 'cardan-shafts',
    slug: 'cardan-shafts',
    code: 'CAT-03',
    title: 'Cardan Shafts',
    image: {
      url: '/images/cardan-shafts.jpg',
      alt: 'Forging steel with sparks',
      credit: 'Jacob Diehl',
      creditUrl: 'https://unsplash.com/photos/a-man-working-on-a-piece-of-metal-3r_9N1r6nn0',
    },
    shortDescription:
      'Heavy-duty torque transmission and welding shaft assemblies including RMU Welding Shaft and Shaft 6134.',
    fullDescription:
      'Precision-machined cardan and industrial coupling shafts engineered for consistent rotational alignment and reliable mechanical engagement.',
    materialsNote: 'Machined per client engineering specifications.',
    drawingNote: 'Torque ratings and material heat-treatment parameters pending client confirmation.',
    relevantIndustries: ['Three-Wheeler and E-Rickshaw OEMs', 'Four-Wheeler OEMs and Suppliers', 'General Engineering and Industrial Machinery'],
    items: [
      {
        name: 'RMU Welding Shaft',
        note: 'Confirmed cardan/welding shaft configuration',
        specStatus: 'Technical parameters pending client confirmation',
      },
      {
        name: 'Shaft 6134',
        note: 'Confirmed model 6134 shaft variant',
        specStatus: 'Technical parameters pending client confirmation',
      },
    ],
  },
  {
    id: 'connecting-rods',
    slug: 'connecting-rods',
    code: 'CAT-04',
    title: 'Connecting Rods',
    image: {
      url: '/images/connecting-rods.jpg',
      alt: 'Engine cross-section showing internal moving parts',
      credit: 'William Warby',
      creditUrl: 'https://unsplash.com/photos/a-close-up-of-a-machine-with-gears-on-it-GNlLdPeFh2E',
    },
    shortDescription:
      'Precision-bored and CNC/VMC machined connecting rods built to strict center-to-center drawing tolerances.',
    fullDescription:
      'Machined on multi-axis VMC and CNC equipment to achieve clean bore alignment and consistent geometry for automotive and mechanical drive assemblies.',
    materialsNote: 'Manufactured strictly from client-approved billet or forging specifications.',
    drawingNote: 'Specific vehicle models, bore dimensions, and weight classes pending client confirmation.',
    relevantIndustries: ['Two-Wheeler OEMs', 'Three-Wheeler and E-Rickshaw OEMs', 'Four-Wheeler OEMs and Suppliers'],
    items: [
      {
        name: 'Custom OEM Connecting Rods',
        note: 'Manufactured to client blueprint and bore requirements',
        specStatus: 'Model-specific dimensions pending client confirmation',
      },
    ],
  },
  {
    id: 'cams-and-gears',
    slug: 'cams-and-gears',
    code: 'CAT-05',
    title: 'Cams and Gears',
    image: {
      url: '/images/cams-and-gears.jpg',
      alt: 'Close-up of industrial gears and machinery',
      credit: 'Eric Prouzet',
      creditUrl: 'https://unsplash.com/photos/close-up-of-old-industrial-gears-and-machinery-3haIGP0Z2ME',
    },
    shortDescription:
      'Precision-profiled cams and gears engineered for smooth power transmission and timing accuracy.',
    fullDescription:
      'Produced with CNC and VMC machining processes to support automotive drivetrain, actuation, and industrial mechanical motion systems.',
    materialsNote: 'Machined in Steel, Stainless Steel, Brass, or Aluminium based on application load.',
    drawingNote: 'Module, pitch, and tooth profile specifications pending client confirmation.',
    relevantIndustries: ['Two-Wheeler OEMs', 'Four-Wheeler OEMs and Suppliers', 'General Engineering and Industrial Machinery'],
    items: [
      {
        name: 'Precision Machined Cams',
        note: 'Profiled to client timing and lift drawings',
        specStatus: 'Cam profile specifications pending client confirmation',
      },
      {
        name: 'Automotive & Industrial Gears',
        note: 'Machined blanks and gear components to specification',
        specStatus: 'Gear module and pitch specifications pending client confirmation',
      },
    ],
  },
  {
    id: 'custom-machined-parts',
    slug: 'custom-machined-parts',
    code: 'CAT-06',
    title: 'Custom Machined Parts, Jig Fixtures and Receiving Gauges',
    image: {
      url: '/images/custom-machined-parts.jpg',
      alt: 'CNC machine in an industrial metal workshop',
      credit: 'Zoshua Colah',
      creditUrl: 'https://unsplash.com/photos/man-standing-in-a-cluttered-industrial-workshop-OX3fv8D6QAk',
    },
    shortDescription:
      'Bespoke CNC/VMC machined components, production jig fixtures, and precision receiving gauges built to drawing.',
    fullDescription:
      'Dedicated manufacturing of custom parts, assembly/machining jig fixtures, and receiving gauges tailored to OEM production lines and quality verification workflows.',
    materialsNote: 'Steel, Stainless Steel, Brass, Copper, and Aluminium supported.',
    drawingNote: 'Custom-built per 2D/3D engineering drawings supplied by the client.',
    relevantIndustries: [
      'Two-Wheeler OEMs',
      'Three-Wheeler and E-Rickshaw OEMs',
      'Four-Wheeler OEMs and Suppliers',
      'Electrical and Switchgear Equipment',
      'General Engineering and Industrial Machinery',
    ],
    items: [
      {
        name: 'Custom CNC & VMC Machined Parts',
        note: 'Drawing-based production across 5 verified metals',
        specStatus: 'Quoted per engineering drawing',
      },
      {
        name: 'Production Jig Fixtures',
        note: 'Custom workholding and alignment fixtures',
        specStatus: 'Built to client assembly/machining specifications',
      },
      {
        name: 'Receiving Gauges',
        note: 'Custom component verification and go/no-go receiving gauges',
        specStatus: 'Built to client component geometry',
      },
    ],
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    code: '01',
    title: 'Experience Since 2000',
    description:
      'Operating as an established precision manufacturer since May 2000, supporting automotive supply chains with steady execution.',
  },
  {
    code: '02',
    title: 'Modern CNC and VMC Machines',
    description:
      'Machining floor equipped with Fanuc, LMW, Ace, and Jyoti CNC turning and vertical machining systems.',
  },
  {
    code: '03',
    title: 'Experienced R&D Team',
    description:
      'Dedicated R&D department supporting drawing interpretation, process planning, and fixture development.',
  },
  {
    code: '04',
    title: 'Wide Product Range',
    description:
      'From EV rear axle shafts and cardan shafts to connecting rods, cams, gears, and custom receiving gauges.',
  },
  {
    code: '05',
    title: 'Customised Solutions',
    description:
      'Flexible multi-metal machining across Steel, Stainless Steel, Brass, Copper, and Aluminium per client drawings.',
  },
  {
    code: '06',
    title: 'Timely Delivery',
    description:
      'Committed to accurate components, transparent fair pricing, and dependable delivery schedules.',
  },
];

export const INDUSTRIES_LIST: IndustryItem[] = [
  {
    id: 'two-wheeler-oems',
    code: 'IND-01',
    title: 'Two-Wheeler OEMs',
    verificationStatus: 'confirmed',
    verificationLabel: 'Confirmed OEM Sector',
    description:
      'Supplying precision-machined shafts, connecting rods, cams, gears, and custom drawing-based components engineered for two-wheeler powertrain and chassis assemblies.',
    componentCategories: [
      { label: 'Metal Shafts', categoryId: 'metal-shafts' },
      { label: 'Connecting Rods', categoryId: 'connecting-rods' },
      { label: 'Cams and Gears', categoryId: 'cams-and-gears' },
      { label: 'Custom Machined Parts', categoryId: 'custom-machined-parts' },
    ],
  },
  {
    id: 'three-wheeler-ev-oems',
    code: 'IND-02',
    title: 'Three-Wheeler and E-Rickshaw OEMs',
    verificationStatus: 'confirmed',
    verificationLabel: 'Confirmed OEM Sector',
    description:
      'Manufacturing confirmed EV rear axle shafts across 17 inch, 17.2 inch, 17.5 inch, 18 inch, and 18.5 inch configurations, along with EV Exel shafts and drivetrain hardware.',
    componentCategories: [
      { label: 'Axle Shafts', categoryId: 'axle-shafts' },
      { label: 'Metal Shafts', categoryId: 'metal-shafts' },
      { label: 'Cardan Shafts', categoryId: 'cardan-shafts' },
    ],
  },
  {
    id: 'four-wheeler-oems',
    code: 'IND-03',
    title: 'Four-Wheeler OEMs and Suppliers',
    verificationStatus: 'confirmed',
    verificationLabel: 'Confirmed OEM Sector',
    description:
      'Supporting four-wheeler OEMs and Tier suppliers with custom CNC/VMC machined components, connecting rods, cams, gears, cardan shafts, and production jig fixtures.',
    componentCategories: [
      { label: 'Cardan Shafts', categoryId: 'cardan-shafts' },
      { label: 'Connecting Rods', categoryId: 'connecting-rods' },
      { label: 'Cams and Gears', categoryId: 'cams-and-gears' },
      { label: 'Jig Fixtures & Gauges', categoryId: 'custom-machined-parts' },
    ],
  },
  {
    id: 'electrical-switchgear',
    code: 'IND-04',
    title: 'Electrical and Switchgear Equipment',
    verificationStatus: 'pending_verification',
    verificationLabel: 'Application scope subject to client verification',
    description:
      'Precision-machined Brass, Copper, Aluminium, and Stainless Steel components and custom fixtures tailored to electrical and switchgear equipment drawings.',
    componentCategories: [
      { label: 'Custom Machined Parts', categoryId: 'custom-machined-parts' },
      { label: 'Metal Shafts', categoryId: 'metal-shafts' },
    ],
  },
  {
    id: 'general-engineering',
    code: 'IND-05',
    title: 'General Engineering and Industrial Machinery',
    verificationStatus: 'pending_verification',
    verificationLabel: 'Application scope subject to client verification',
    description:
      'Drawing-led CNC and VMC machined shafts, gears, jig fixtures, and receiving gauges supporting broader industrial machinery and engineering assemblies.',
    componentCategories: [
      { label: 'Custom Machined Parts', categoryId: 'custom-machined-parts' },
      { label: 'Cams and Gears', categoryId: 'cams-and-gears' },
      { label: 'Cardan Shafts', categoryId: 'cardan-shafts' },
    ],
  },
];

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'What types of components does J.D. Associates manufacture?',
    answer:
      'J.D. Associates manufactures Axle Shafts (including 17 inch, 17.2 inch, 17.5 inch, 18 inch, and 18.5 inch EV variants), Metal Shafts (including EV Exel and Excel Shafts), Cardan Shafts (including RMU Welding Shaft and Shaft 6134), Connecting Rods, Cams and Gears, and Custom Machined Parts, Jig Fixtures, and Receiving Gauges.',
  },
  {
    question: 'Do you manufacture components according to custom client drawings?',
    answer:
      'Yes. With our CNC and VMC machining capabilities and experienced R&D department, we manufacture precision shafts, machined parts, jig fixtures, and receiving gauges strictly according to client engineering drawings and specifications.',
  },
  {
    question: 'Which metals and raw materials can you machine?',
    answer:
      'Our CNC and VMC machining facility works with Steel, Stainless Steel, Brass, Copper, and Aluminium depending on the functional and structural requirements specified in your drawing.',
  },
  {
    question: 'What machining infrastructure does J.D. Associates operate?',
    answer:
      'Our Faridabad manufacturing setup utilizes CNC and VMC machines from established machinery brands including Fanuc, LMW, Ace, and Jyoti.',
  },
  {
    question: 'Which automotive OEM segments do you serve?',
    answer:
      'J.D. Associates serves two-wheeler, three-wheeler (including E-Rickshaw and EV axle applications), and four-wheeler OEMs, alongside custom engineering and switchgear requirements subject to drawing review.',
  },
  {
    question: 'How can OEM procurement teams request a manufacturing quote?',
    answer:
      'You can submit your component requirements, estimated batch quantities, and optional engineering drawings through our Contact Us / Request a Quote page. Official phone, email, and WhatsApp channels are currently marked for final client confirmation.',
  },
];

export const ABOUT_STRENGTHS = [
  {
    code: '01',
    title: 'Experienced R&D Department',
    description:
      'Dedicated engineering support for interpreting customer drawings, machining sequences, and fixture design.',
  },
  {
    code: '02',
    title: 'Hi-Tech Infrastructure',
    description:
      'Production floor powered by Fanuc, LMW, Ace, and Jyoti CNC and VMC machining equipment.',
  },
  {
    code: '03',
    title: 'Large Product Line',
    description:
      'Comprehensive portfolio spanning EV axle shafts, metal shafts, cardan shafts, connecting rods, cams, gears, and gauges.',
  },
  {
    code: '04',
    title: 'Total Quality Management',
    description:
      'Disciplined in-process verification and receiving gauge fabrication oriented toward consistent part accuracy.',
  },
  {
    code: '05',
    title: 'Wide Distribution Network',
    description:
      'Structured supply coordination serving automotive OEMs and engineering buyers across industrial hubs.',
  },
  {
    code: '06',
    title: 'Skilled Professionals',
    description:
      'Partnership-led team of 51–100 skilled machinists, engineers, and operational staff.',
  },
];
