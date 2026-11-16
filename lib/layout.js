export const layoutConfig = {
  identity: {
    name: "Ayusha",
    role: "Presentation & Documentation Specialist",
    experience: "2 years at WNS (a Capgemini company)",
    location: "Visakhapatnam, India",
    email: "ayushaardhi@gmail.com",
    phone: "+91-7386612135",
    linkedin: "https://www.linkedin.com/in/ayusha-ardhi-006104327/",
    behance: "#",
  },
  designSystem: {
    colors: {
      carbon: "#0B0B0A",
      bone: "#F1EEE7",
      ash: "#A8A49B",
      vermilion: "#E24A32",
      field: "#687A68",
    },
    type: {
      display: "Cormorant Garamond",
      sans: "Arial",
      mono: "IBM Plex Mono",
    },
    motion: {
      slideDuration: 1.15,
      revealDuration: 1.4,
      microDuration: 0.45,
      ease: "power4.out",
      reducedMotion: "prefers-reduced-motion: reduce",
      opening: {
        labelAt: 0,
        ruleAt: 1,
        nameAt: 1.5,
        headlineAt: 2.2,
        portraitAt: 3,
        settleAt: 4.2,
      },
    },
  },
  slides: [
    {
      id: "hook",
      index: "01",
      kicker: "Presentation / Documentation / Data",
      title: ["I transform messy data", "into polished, executive-ready", "presentations."],
      description:
        "I build clear, persuasive presentations from complex information—using PowerPoint, Excel, and data visualization to help people understand what matters.",
      action: "VIEW MY WORK",
      theme: "dark",
    },
    {
      id: "gallery",
      index: "02",
      kicker: "Selected work / 2024—2026",
      title: ["A clear story", "changes everything."],
      description:
        "Explore selected work across corporate redesigns, investor pitches, executive dashboards, and documentation systems. Each project begins with a communication problem and ends with a clearer way forward.",
      action: "DRAG TO EXPLORE",
      theme: "bone",
      projects: [
        {
          id: "before-after",
          number: "01",
          type: "Redesign",
          title: "Before → After",
          subtitle: "Corporate Deck Transformation",
          tags: ["PowerPoint", "Data Visualization", "Corporate"],
          cardText:
            "I reduced a dense 50-slide corporate deck to 25 focused slides, giving the story a stronger rhythm and every insight a clear place.",
          accent: "vermilion",
          metric: "50 → 25 slides",
          tone: "#1A1A1A",
          deckSlides: [
            { label: "The brief", title: "50 slides. One story.", kind: "before" },
            { label: "The problem", title: "Information without hierarchy.", kind: "before" },
            { label: "The shift", title: "Structure before styling.", kind: "after" },
            { label: "The system", title: "Every slide earns its place.", kind: "after" },
            { label: "The result", title: "25 slides. Executive clarity.", kind: "after" },
          ],
          whatChanged: [
            "Slide count: Optimized 50 → 25",
            "Information hierarchy: Raw Excel grid → Executive KPI view",
            "Color system: 12 arbitrary fills → Strict corporate guideline",
          ],
          challenge:
            "50 text-heavy slides, inconsistent fonts, no visual hierarchy, misaligned elements.",
          approach:
            "Restructured narrative flow, applied an editorial color and typography pairing, converted text blocks to custom diagrams, and rebuilt charts.",
          result:
            "Reduced slide count from 50 to 25. Information clarity increased dramatically. Approved on first review.",
        },
        {
          id: "investor-pitch",
          number: "02",
          type: "Original Concept Design",
          title: "The Ask",
          subtitle: "Startup Investor Pitch Deck",
          tags: ["PowerPoint", "Pitch Decks", "Startup"],
          cardText:
            "I shaped a 10-slide investor story that moves cleanly from the problem to the opportunity, the business model, and the ask.",
          accent: "field",
          metric: "10-slide narrative",
          tone: "#3F5042",
          whatChanged: [
            "Narrative: Loose idea → Investor-ready story arc",
            "Structure: Feature list → Problem / Solution / Ask",
            "Visual system: One-off slides → Repeatable pitch language",
          ],
          challenge: "A high-stakes story needed to make a business model legible in minutes.",
          approach:
            "Built a tight narrative sequence across Problem, Solution, Market Size, Business Model, Competition, Team, Financials, and The Ask.",
          result:
            "A focused pitch system that gives every slide one job and lets the story compound.",
        },
        {
          id: "qbr",
          number: "03",
          type: "Corporate Data-Heavy Design",
          title: "Quarterly",
          subtitle: "Business Review Presentation",
          tags: ["Excel Dashboards", "PowerPoint", "KPI Visualization"],
          cardText:
            "I turned multi-quarter business data into a seven-slide review that lets leaders see performance, movement, and next actions quickly.",
          accent: "vermilion",
          metric: "7-slide framework",
          tone: "#EAE9E4",
          whatChanged: [
            "Reporting: Dense dataset → Executive dashboard",
            "Hierarchy: Equal-weight metrics → KPI / variance / action",
            "Output: Monthly report → Repeatable QBR ritual",
          ],
          challenge: "Multi-quarter enterprise datasets were difficult to scan and compare.",
          approach:
            "Defined a hierarchy for KPIs, variance, trend, and action so every dashboard could be read at a glance.",
          result:
            "A repeatable QBR structure that turns reporting into a decision-making ritual.",
        },
        {
          id: "task-tracking",
          number: "04",
          type: "Technical Data Visualization",
          title: "Signal",
          subtitle: "Task-Tracking & Analytics Dashboard",
          tags: ["Advanced Excel", "Formulating", "Data Architecture"],
          cardText:
            "I connected formulas, conditional logic, and visual summaries into one task-tracking dashboard that makes operational progress easy to read.",
          accent: "field",
          metric: "Automated outputs",
          tone: "#3F5042",
          whatChanged: [
            "Tracking: Manual updates → Connected formulas",
            "Logic: Hidden status → Visible operational signals",
            "Output: Static sheet → Living analytics ecosystem",
          ],
          challenge: "Task status, ownership, and progress signals were spread across manual views.",
          approach:
            "Connected formulas, conditional logic, and visual summaries into one working data architecture.",
          result:
            "A living dashboard that makes operational signals visible without adding reporting overhead.",
        },
        {
          id: "document-system",
          number: "05",
          type: "Premium Documentation Architecture",
          title: "The Brief",
          subtitle: "Enterprise Document & Report System",
          tags: ["Microsoft Word", "PDF Layout Design", "Editorial Formats"],
          cardText:
            "I designed a flexible document system for proposals and executive briefs, with a clear rhythm from the opening page to the final decision.",
          accent: "vermilion",
          metric: "3–5 page system",
          tone: "#EAE9E4",
          whatChanged: [
            "Document: Generic template → Editorial report system",
            "Layout: Dense copy → Clear executive scanning",
            "Format: One-off file → Reusable document family",
          ],
          challenge: "Business documents needed consistency without feeling generic or over-designed.",
          approach:
            "Created a flexible editorial system for hierarchy, page rhythm, tables, callouts, and executive scanning.",
          result:
            "A polished document family that feels intentional from first page to final signature.",
        },
      ],
    },
    {
      id: "profile",
      index: "03",
      kicker: "The person behind the polish",
      title: ["Clarity is not", "a finishing touch."],
      description:
        "I’m Ayusha, a Presentation and Documentation Specialist based in Visakhapatnam. For the past two years at WNS, I’ve turned business data and rough content into clear presentations, useful dashboards, and polished documents.",
      theme: "dark",
      capabilities: {
        advanced: [
          "PowerPoint",
          "Excel",
          "Word",
          "Data Visualization",
          "Proofreading",
          "Quality Check",
          "Document Organization",
        ],
        agile: ["Canva", "Google Slides"],
        credentials: [
          "Pearson MePro — English & Communication Skills",
          "Oracle — DBMS and Java",
          "IBM Professional — Analyzing Data with Excel",
          "ULearn — Marketing Workshop",
        ],
      },
    },
    {
      id: "closing",
      index: "04",
      kicker: "Available for the right story",
      title: ["Let's work", "together."],
      description:
        "I’m open to remote full-time roles, thoughtful freelance projects, and executive assistant engagements where clear communication makes the work stronger.",
      theme: "bone",
    },
  ],
};
