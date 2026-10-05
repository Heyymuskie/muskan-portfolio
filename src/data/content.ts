import { EDUCATION, PROFILE, SITE } from "@/lib/site";

export const HERO = {
  eyebrow: "Data Analyst",
  heading: "I turn raw data into decisions people can act on.",
  intro:
    "I'm Muskan Choudhary, a final-year B.Tech Computer Science student at Jagannath University, Jaipur, specialising in data analysis. I work in SQL, Excel and Power BI to clean messy datasets, build interactive dashboards and surface the trend behind the number.",
  origin: PROFILE.origin,
  location: PROFILE.location,
  availableFor: PROFILE.openTo,
};

export const STATS: { value: string; label: string; hint: string }[] = [
  { value: "4", label: "Documented case studies", hint: "End-to-end analysis projects with full methodology" },
  { value: "7.5", label: "B.Tech CGPA", hint: "Out of 10, Jagannath University, Jaipur" },
  { value: "283", label: "Workouts modelled", hint: "Largest single dataset analysed to date" },
  { value: "200+", label: "Countries in one pipeline", hint: "COVID-19 data engineering project" },
];

export const ABOUT = {
  heading: "Detail-oriented analyst, built on a computer science foundation",
  paragraphs: [
    `I'm a final-year B.Tech Computer Science student at Jagannath University, Jaipur, looking for an entry-level ${SITE.role} role. A CS degree gives me the part that most analysts learn late — how data actually moves through a system — so I build pipelines that stay reproducible rather than one-off notebooks that break on the next run.`,
    "Day to day I work in SQL for querying and aggregation, Excel for fast validation and pivot analysis, and Power BI for interactive dashboards. Python with pandas and NumPy is what I reach for when the data needs reshaping before anyone can answer a question from it.",
    "What I care about is the last mile: a number that a non-technical stakeholder can read, trust and act on within about ten seconds of opening the report. That means clean data, a chart that answers one question, and an honest note about what the analysis does not prove.",
  ],
  focus: [
    {
      title: "Data cleaning & preparation",
      body: "Handling missing values, removing duplicates, standardising formats and validating data before a single chart is drawn.",
    },
    {
      title: "Reporting & insight",
      body: "Translating KPIs, distributions and trends into visual stories that a non-technical stakeholder can act on immediately.",
    },
    {
      title: "Collaboration & communication",
      body: "Comfortable presenting findings, documenting the pipeline behind them and working to a reporting deadline with a team.",
    },
  ],
};

export const SKILL_GROUPS: { group: string; blurb: string; items: string[] }[] = [
  {
    group: "Analysis & Visualisation",
    blurb: "Building the dashboard a stakeholder actually opens.",
    items: [
      "Microsoft Excel",
      "Pivot Tables",
      "XLOOKUP / VLOOKUP",
      "Power BI",
      "Interactive Dashboards",
      "Slicers",
      "Data Reporting",
    ],
  },
  {
    group: "Databases & Querying",
    blurb: "Getting the right rows out, quickly and correctly.",
    items: [
      "SQL",
      "MySQL",
      "PostgreSQL",
      "JOINs",
      "GROUP BY",
      "Subqueries",
      "Aggregations",
      "Conditional Filtering",
    ],
  },
  {
    group: "Programming",
    blurb: "Reshaping data that is not yet analyzable.",
    items: ["Python", "pandas", "NumPy", "Matplotlib", "Jupyter"],
  },
  {
    group: "Analytical Skills",
    blurb: "The method behind the output.",
    items: [
      "Data Cleaning",
      "Data Accuracy",
      "Ad-hoc Analysis",
      "Trend Analysis",
      "KPI Tracking",
      "Statistics & Probability",
      "Problem Solving",
    ],
  },
  {
    group: "Core Competencies",
    blurb: "How I work with the people reading the report.",
    items: [
      "Analytical Mindset",
      "Logical Thinking",
      "Verbal & Written Communication",
      "Team Collaboration",
      "Documentation",
    ],
  },
];

export const COMPETENCIES = [
  {
    title: "Data Cleaning & Preparation",
    body: "Missing values, duplicate removal, format standardisation and validation — done before analysis, not after a number looks wrong.",
    points: ["Deduplication", "Imputation", "Type validation", "Range checks"],
  },
  {
    title: "Reporting & Insights",
    body: "Turning KPIs and distributions into a visual narrative a stakeholder can read in seconds, without a walkthrough call.",
    points: ["KPI design", "Dashboard layout", "Trend framing", "Executive summary"],
  },
  {
    title: "Collaboration & Communication",
    body: "Documenting the pipeline behind every figure so results are reproducible and the reasoning survives handover.",
    points: ["Pipeline docs", "Peer review", "Stakeholder updates", "Deadline delivery"],
  },
];

/** Answer-engine oriented: each entry is a direct, self-contained answer. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Who is Muskan Choudhary?",
    a: "Muskan Choudhary is a data analyst and final-year B.Tech Computer Science student at Jagannath University, Jaipur, based in Jaipur, Rajasthan and originally from Darbhanga, Bihar. She works in SQL, Power BI, Excel and Python.",
  },
  {
    q: "What does Muskan Choudhary do as a data analyst?",
    a: "She cleans and validates raw datasets, writes SQL queries to aggregate business KPIs, builds interactive Power BI and Excel dashboards, and documents each analysis so the numbers can be reproduced and trusted.",
  },
  {
    q: "Which tools does Muskan use for data analysis?",
    a: "SQL (MySQL and PostgreSQL), Microsoft Excel including pivot tables and XLOOKUP, Power BI for dashboards, and Python with pandas, NumPy and Matplotlib for data wrangling and visualisation.",
  },
  {
    q: "Where did Muskan Choudhary study?",
    a: "She is completing a B.Tech in Computer Science and Engineering at Jagannath University in Jaipur, Rajasthan, India, with a CGPA of 7.5 out of 10.",
  },
  {
    q: "What kind of role is Muskan Choudhary looking for?",
    a: "An entry-level Data Analyst, Reporting Analyst or Business Intelligence Graduate position where she can work on dashboards, ad-hoc analysis and KPI reporting.",
  },
  {
    q: "What data projects has Muskan Choudhary worked on?",
    a: "Four documented case studies: a COVID-19 pandemic data pipeline across 200+ countries, a Cracow property price regression model, an FX trading performance analysis with Monte Carlo simulation, and a fitness workload regression on 283 workouts.",
  },
];

export const CAREER_INTERESTS = PROFILE.openTo;

export const TIMELINE = [
  {
    period: EDUCATION.period,
    title: EDUCATION.degree,
    org: EDUCATION.institution,
    orgUrl: EDUCATION.institutionUrl,
    place: EDUCATION.institutionLocation,
    detail: `CGPA ${EDUCATION.cgpa} / ${EDUCATION.cgpaMax} · ${EDUCATION.coursework.join(", ")}.`,
    kind: "Education" as const,
  },
];
