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
  businessType: 'Manufacturer',
  legalStatus: 'Partnership Firm',
  location: 'Faridabad, Haryana, India',
  address: {
    line: 'Plot No. 6/15, Main Pali Bhakri Road, NIT Faridabad, Haryana – 121001, India',
    confirmed: true,
    statusLabel: 'Factory address',
  },
  contacts: {
    phone: '9810170102 / 9999517107',
    email: 'JDCNC2010@gmail.com / JDNPD2013@gmail.com',
    whatsapp: '9810170102',
    confirmed: true,
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
  machineEntries: [
    { name: 'CNC Turning', quantity: 11, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'VMC', quantity: 4, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Traub', quantity: 20, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Production Lathe', quantity: 4, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Drill Machines', quantity: 20, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Grinding Machines', quantity: 8, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Laser Machine', quantity: 1, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Welding Machines', quantity: 2, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: '350 Ton Hydraulic Press', quantity: null, manufacturer: 'Profile to confirm', capacity: '350 Ton' },
    { name: 'Mechanical Press', quantity: null, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Welding SPM Machine', quantity: null, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Digital Profile Projector', quantity: null, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Surface Roughness Tester', quantity: null, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
    { name: 'Hardness Tester', quantity: null, manufacturer: 'Profile to confirm', capacity: 'Profile to confirm' },
  ],
};

export const COMPANY_HIGHLIGHTS = [
  {
    code: '01',
    metric: 14,
    isNumeric: true,
    title: 'Machine Categories',
    subtitle: 'Manufacturing categories listed in the company profile.',
  },
  {
    code: '02',
    metric: 94,
    isNumeric: true,
    title: 'Listed Machine Units',
    subtitle: 'Verified total of listed machine units.',
  },
  {
    code: '03',
    metric: 11,
    isNumeric: true,
    title: 'CNC Turning Machines',
    subtitle: 'CNC turning capacity in the manufacturing setup.',
  },
  {
    code: '04',
    metric: 4,
    isNumeric: true,
    title: 'VMC Machines',
    subtitle: 'Vertical machining capacity in the manufacturing setup.',
  },
];

export const CUSTOMER_LOGOS = [
  { name: 'EFACEC', src: '/clients/client1.jpeg' },
  { name: 'C-SEC', src: '/clients/client2.jpeg' },
  { name: 'Baroda Moulds & Dies', src: '/clients/client3.jpeg' },
  { name: 'HGS', src: '/clients/client4.jpeg' },
  { name: 'Bhartia', src: '/clients/client5.jpeg' },
  { name: 'Havells', src: '/clients/client6.jpeg' },
  { name: 'Socomec', src: '/clients/client7.jpeg' },
  { name: 'Maruti Suzuki', src: '/clients/client8.jpeg' },
] as const;

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
    title: 'Quality-Focused Manufacturing',
    description:
      'Quality checks support components across the manufacturing process.',
  },
  {
    code: '02',
    title: 'Advanced Machinery',
    description:
      'CNC turning, VMC, Traub, grinding and specialised production equipment.',
  },
  {
    code: '03',
    title: 'Skilled Professionals',
    description:
      'Engineers and experienced manufacturing personnel support production requirements.',
  },
  {
    code: '04',
    title: 'Precision Inspection',
    description:
      'Dedicated metrology and inspection facilities support manufacturing quality.',
  },
  {
    code: '05',
    title: 'Customer-Specific Manufacturing',
    description:
      'Components can be manufactured according to customer drawings and specifications.',
  },
  {
    code: '06',
    title: 'Continuous Improvement',
    description:
      'Workforce development, training, innovation and quality enhancement guide ongoing improvement.',
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
    question: 'What types of precision components does JD Associates manufacture?',
    answer:
      'JD Associates manufactures assembly products, precision shafts and turned components, machined parts, gears and metal components, and custom drawing-based components including jig fixtures and receiving gauges.',
  },
  {
    question: 'Does JD Associates manufacture components according to customer drawings?',
    answer:
      'Yes. Components are manufactured according to customer drawings and specifications, subject to drawing review and feasibility confirmation.',
  },
  {
    question: 'What CNC and VMC machining facilities are available?',
    answer:
      'The manufacturing setup includes 11 CNC turning machines and 4 VMC machines, along with Traub, production lathe, drilling, grinding, laser and welding equipment.',
  },
  {
    question: 'What quality inspection equipment is available?',
    answer:
      'The company profile lists a digital profile projector, surface roughness tester, hardness tester and dedicated metrology support for precision inspection.',
  },
  {
    question: 'Does JD Associates support custom manufacturing requirements?',
    answer:
      'Yes. Custom CNC and VMC machined parts, jig fixtures and receiving gauges can be developed from customer technical drawings.',
  },
  {
    question: 'What types of mechanical assemblies does the company manufacture?',
    answer:
      'The listed assembly products include CDV3 Assembly, Bellow Assembly and CDV3 Truck Assembly.',
  },
  {
    question: 'How can customers submit technical drawings for quotation?',
    answer:
      'Use the Contact Us or Request a Quote page to provide component details and attach a PDF, CAD or image drawing. The supported upload limit is 5 MB.',
  },
  {
    question: 'What manufacturing and quality certifications does JD Associates hold?',
    answer:
      'The company profile identifies ISO 9001:2015 certification. Certification documents should be verified through the official company representative before publication or tender use.',
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
      'Skilled machinists, engineers and operational personnel support manufacturing requirements.',
  },
];
