export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Kpi = { label: string; value: string; hint?: string };

export type MethodStep = { title: string; detail: string };
export type Finding = { title: string; detail: string; metric?: string };

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  role: string;
  status: "Completed" | "In progress";
  year: string;
  accent: "sky" | "emerald" | "amber" | "violet";
  tags: string[];
  stack: string[];
  kpis: Kpi[];
  problem: string[];
  questions: string[];
  data: { source: string; size: string; notes: string[] };
  methodology: MethodStep[];
  findings: Finding[];
  results: { name: string; note: string; metrics: { label: string; value: string }[] };
  resultsHead: string[];
  gallery: ProjectImage[];
  limitations: string[];
  nextSteps: string[];
  repo: string;
  seo: { title: string; description: string; keywords: string[] };
  /** MIT attribution retained for licence compliance. */
  attribution: string;
};

const MIT_ATTRIBUTION =
  "Adapted from an MIT-licensed open-source analysis by Sarvesh Kumar Sharma. Copyright (c) 2020 Sarvesh Kumar Sharma — MIT Licence. Reworked, re-documented and extended for this portfolio.";

export const PROJECTS: Project[] = [
  {
    slug: "covid19-pandemic-analysis",
    title: "COVID-19 Pandemic Analysis",
    kicker: "Public health data engineering",
    summary:
      "An end-to-end pipeline that turns raw JHU CSSE daily case files into 13 clean, analysis-ready datasets, then explores how the first ten months of the pandemic behaved across 200+ countries and how far socioeconomic indicators actually explain mortality.",
    role: "Data cleaning · Feature engineering · EDA",
    status: "Completed",
    year: "2024",
    accent: "sky",
    tags: ["Python", "Pandas", "Matplotlib", "ETL pipeline", "Time series", "Correlation"],
    stack: ["Python 3", "pandas", "NumPy", "Matplotlib", "wbdata", "Jupyter"],
    kpis: [
      { label: "Countries analysed", value: "200+" },
      { label: "Datasets produced", value: "13" },
      { label: "Socioeconomic indicators", value: "7" },
      { label: "Analysis window", value: "10 months" },
    ],
    problem: [
      "COVID-19 case data was published daily, but in a shape that made comparison almost impossible: province-level rows, cruise-ship outliers mixed into country totals, inconsistent date indexes, and socioeconomic context locked in a separate World Bank source.",
      "The goal was to build a reproducible pipeline that normalises all of it once, and then answer a sharper question than “how many cases”: how much of the difference in mortality between countries is actually explained by wealth, healthcare spend and demographics?",
    ],
    questions: [
      "How quickly did countries suppress exponential growth after their 100th confirmed case?",
      "Which socioeconomic indicators correlate with cases and deaths per million?",
      "Is mortality rate better explained by economics or by demography?",
    ],
    data: {
      source: "Johns Hopkins CSSE COVID-19 time series + World Bank indicators via wbdata",
      size: "200+ countries · Dec 2019 – Oct 2020 · 13 processed outputs",
      notes: [
        "Province/state rows aggregated to country level before any analysis.",
        "Cruise-ship and boat cases excluded from national totals.",
        "Forward-filled where countries reported intermittently; flagged where data was insufficient.",
        "Pinned to the JHU CSSE snapshot from 5 October 2020 so numbers are reproducible.",
      ],
    },
    methodology: [
      {
        title: "Automated acquisition",
        detail:
          "download_data.py pulls JHU CSSE daily CSVs, World Bank indicator metadata and country→continent mappings, then caches everything under data/processed/.",
      },
      {
        title: "Normalisation layer",
        detail:
          "Ten focused feature scripts (make_cases, make_mortality, make_continents, make_world_bank …) each own one transformation and write one CSV, so any step can be re-run in isolation.",
      },
      {
        title: "Derived metrics",
        detail:
          "Daily change via first differencing, cases-since-t0 reindexing off each country's 100th case, mortality = deaths / confirmed, active = confirmed − recovered − dead.",
      },
      {
        title: "Socioeconomic merge",
        detail:
          "Latest available World Bank value per country (GDP, population, healthcare expenditure, life expectancy, rural/urban split) joined onto the case table by country code.",
      },
      {
        title: "Reusable visualisation",
        detail:
          "A single CovidDataViz class exposes world, continent and country plots, top-N rankings, growth-factor curves and correlation heatmaps so every chart shares one styling contract.",
      },
    ],
    findings: [
      {
        title: "Most countries flattened the curve within 30–40 days",
        detail:
          "Reindexing each country off its 100th case shows that the initial exponential phase rarely lasted longer than a month and a half before growth factors dropped below the doubling reference lines.",
        metric: "30–40 days",
      },
      {
        title: "Rural population share is the strongest economic signal",
        detail:
          "Rural population % vs cases per million came in at −0.46 — the virus spread faster in denser, more urbanised countries, which is exactly the pattern the map shows.",
        metric: "r = −0.46",
      },
      {
        title: "Healthcare spend vs deaths per million is a reporting artefact",
        detail:
          "A +0.38 correlation is better read as “richer countries test and report more” rather than “healthcare spend causes deaths” — a distinction the write-up calls out explicitly.",
        metric: "r = +0.38",
      },
      {
        title: "Life expectancy does not predict mortality linearly",
        detail:
          "The scatter of mortality % against life expectancy returns R² = 0.074. The outliers on the right-hand side point at age-structure, not wealth, as the driver.",
        metric: "R² = 0.074",
      },
    ],
    results: {
      name: "Correlation summary",
      note: "Pearson correlation against country-level outcomes, Yemen excluded as an outlier.",
      metrics: [
        { label: "Rural population % → cases / million", value: "−0.46" },
        { label: "Healthcare spend → deaths / million", value: "+0.38" },
        { label: "Life expectancy → mortality %", value: "R² 0.074 (non-linear)" },
        { label: "Countries analysed", value: "200+" },
      ],
    },
    resultsHead: ["Indicator pair", "Correlation"],
    gallery: [
      {
        src: "/projects/covid19-pandemic-analysis/covid-heatmap.png",
        alt: "Heatmap of new daily COVID-19 cases for ten major countries from January to September 2020, with India, the US and Brazil showing the brightest late-year bands.",
        caption: "New daily cases by country — the second wave is visible as the bright band from June onwards.",
        width: 533,
        height: 280,
      },
      {
        src: "/projects/covid19-pandemic-analysis/covid-daily-average.png",
        alt: "Bar chart of Sudan's daily new COVID-19 cases with a black seven-day rolling average line smoothing the reporting noise.",
        caption: "Seven-day rolling average — the standard fix for weekend reporting gaps.",
        width: 640,
        height: 352,
      },
      {
        src: "/projects/covid19-pandemic-analysis/covid-doubling.png",
        alt: "Log-scale line chart of confirmed cases against days since each country's 100th case, with dashed reference lines for doubling every two, four and eight days.",
        caption: "Cases re-indexed to day 100 with doubling reference lines — growth slows well before day 40.",
        width: 352,
        height: 352,
      },
      {
        src: "/projects/covid19-pandemic-analysis/covid-life-expectancy.png",
        alt: "Scatter plot of country life expectancy against mortality percentage with a fitted regression line and an annotated R squared value of 0.074.",
        caption: "Life expectancy explains almost none of the variance in mortality (R² = 0.074).",
        width: 351,
        height: 352,
      },
    ],
    limitations: [
      "Reported cases are not true infections — testing capacity varied enormously between countries.",
      "World Bank indicators are annual snapshots, so they cannot capture within-year policy changes.",
      "The correlations are ecological: country-level relationships do not imply individual-level causality.",
      "Excluding Yemen and other low-reporting countries may bias the correlation estimates.",
      "The window stops in October 2020, so it says nothing about vaccines or later variants.",
    ],
    nextSteps: [
      "Extend the window through 2022 to compare pre- and post-vaccination dynamics.",
      "Move from pairwise correlation to multivariate regression to control for confounders.",
      "Add Google Mobility Reports to model spread mechanics rather than just outcomes.",
      "Publish the CovidDataViz layer as a Streamlit dashboard with a scheduled daily refresh.",
    ],
    repo: "https://github.com/Heyymuskie/covid19-pandemic-analysis",
    seo: {
      title: "COVID-19 Pandemic Analysis — Case Study",
      description:
        "Case study of a COVID-19 data pipeline: 13 processed datasets, 200+ countries, and a correlation analysis showing rural population share (r = −0.46) as the strongest economic signal.",
      keywords: [
        "COVID-19 data analysis",
        "pandas EDA",
        "JHU CSSE dataset",
        "mortality rate analysis",
        "correlation analysis",
        "data pipeline",
      ],
    },
    attribution: MIT_ATTRIBUTION,
  },

  {
    slug: "cracow-property-price-model",
    title: "Cracow Property Price Model",
    kicker: "Regression modelling",
    summary:
      "A full modelling workflow on web-scraped flat listings in Cracow: dedupe and KNN-impute the raw scrape, engineer eight ratio features, then benchmark a neural network and gradient boosting against a voting ensemble to predict sale price.",
    role: "Feature engineering · Model selection · Evaluation",
    status: "Completed",
    year: "2024",
    accent: "emerald",
    tags: ["scikit-learn", "Regression", "Ensemble", "Feature engineering", "GridSearchCV"],
    stack: ["Python 3", "scikit-learn", "pandas", "NumPy", "Matplotlib", "Jupyter"],
    kpis: [
      { label: "Features after engineering", value: "29" },
      { label: "Cross-validation folds", value: "5" },
      { label: "Models benchmarked", value: "4" },
      { label: "Train / test split", value: "80 / 20" },
    ],
    problem: [
      "Property listings are noisy: duplicate adverts, missing room counts, inconsistent districts and amenities buried inside free-text descriptions. A price model trained on the raw scrape would simply learn the scrape's defects.",
      "The brief was threefold — identify which features actually move price in the Cracow market, prove whether an ensemble beats the individual regressors, and quantify how much of pricing is location rather than the flat itself.",
    ],
    questions: [
      "Which property features correlate most strongly with sale price?",
      "Does an ensemble outperform individual regressors on held-out data?",
      "How much of the price is determined by district rather than the flat?",
    ],
    data: {
      source: "Web-scraped residential flat listings from a Polish real-estate portal",
      size: "Thousands of listings · PLN · Cracow only · 29 final features",
      notes: [
        "Duplicates detected on Title and resolved to the most recent listing.",
        "Amount clipped to the 2.5–97.5 percentile band; Area to the 1–99 band.",
        "Parking extracted from the description text into a structured category.",
        "Missing numeric values imputed with KNNImputer (k = 5) rather than dropped.",
      ],
    },
    methodology: [
      {
        title: "Dedupe and filter",
        detail:
          "Sort newest-first, keep one row per Title, then restrict to City = kraków, Currency = pln, Property = flat and a known district and seller.",
      },
      {
        title: "Text → structure",
        detail:
          "Parking status (covered, garage, street, none) parsed out of the free-text description so it can be used as a genuine predictor.",
      },
      {
        title: "KNN imputation",
        detail:
          "Amount, Area, Rooms and Bathrooms filled from their five nearest neighbours instead of dropping rows — the dataset stays large enough to model.",
      },
      {
        title: "Ratio feature engineering",
        detail:
          "Eight derived features: log(Area), an amenity count, space-per-amenity, rooms-to-bathrooms, total rooms, area-per-room and their interactions — chosen to capture non-linearity the raw columns miss.",
      },
      {
        title: "Pipeline + tuning",
        detail:
          "ColumnTransformer applies OneHotEncoder(handle_unknown='ignore') to categoricals and MinMaxScaler to numeric features; GridSearchCV with 5-fold CV tunes both candidate models on neg_root_mean_squared_error.",
      },
    ],
    findings: [
      {
        title: "The voting ensemble wins on every metric",
        detail:
          "A uniform VotingRegressor combining the tuned MLP and GradientBoostingRegressor beat both constituents and the dummy baseline on RMSE, MAE and MSLE — tree interactions plus smooth NN fits are complementary.",
        metric: "Best on all 3",
      },
      {
        title: "Area is the primary price driver",
        detail:
          "Predicted price against area is close to linear, and area-per-room stays stable across districts — square metres dominate over amenity counts.",
        metric: "Near-linear",
      },
      {
        title: "District beats flat characteristics",
        detail:
          "Stare Miasto and Zwierzyniec sit at the top of the district ranking while Bieżanów and Łagiewniki sit at the bottom, showing location carries more signal than any single amenity.",
        metric: "Top driver",
      },
      {
        title: "Parking and seller type move the mean",
        detail:
          "Grouped bar charts show a measurable average-price lift where parking is present, and consistent differences between private and developer sellers.",
        metric: "Measurable lift",
      },
    ],
    results: {
      name: "Model benchmark",
      note: "Held-out test set, 5-fold CV, random_state = 123, scoring on negative RMSE.",
      metrics: [
        { label: "DummyRegressor (baseline)", value: "Reference" },
        { label: "MLPRegressor (100,100,100)", value: "Beaten by ensemble" },
        { label: "GradientBoostingRegressor", value: "Beaten by ensemble" },
        { label: "VotingRegressor (MLP + GBR)", value: "Best RMSE / MAE / MSLE" },
      ],
    },
    resultsHead: ["Model", "Outcome"],
    gallery: [
      {
        src: "/projects/cracow-property-price-model/district_vs_avg_amount.png",
        alt: "Horizontal bar chart ranking Cracow districts by mean predicted flat price in thousands of PLN, with Stare Miasto highest at about 740k and Biezaniow lowest at about 390k.",
        caption: "District ranking — the old town carries a near-2× premium over the outer districts.",
        width: 576,
        height: 288,
      },
      {
        src: "/projects/cracow-property-price-model/area_vs_amount.png",
        alt: "Scatter plot of flat area against modelled sale price showing a strong positive linear relationship.",
        caption: "Area vs price — the strongest linear relationship in the feature set.",
        width: 288,
        height: 288,
      },
      {
        src: "/projects/cracow-property-price-model/rooms_vs_amount.png",
        alt: "Scatter plot of total rooms against modelled sale price showing a positive correlation.",
        caption: "Total rooms vs price — positive, but noisier than area.",
        width: 288,
        height: 288,
      },
      {
        src: "/projects/cracow-property-price-model/feature_parking.png",
        alt: "Grouped bar chart comparing average flat price between listings with and without parking.",
        caption: "Parking is worth a visible step up in average asking price.",
        width: 288,
        height: 288,
      },
    ],
    limitations: [
      "Listing-quality amenities can leak into the Bool Sum feature without reflecting the property itself.",
      "Random splitting ignores time: the market moved during the scrape window and the model does not know that.",
      "The model is Cracow-specific — other cities would need retraining.",
      "Sample size after cleaning was not recorded, so MLP overfitting risk cannot be ruled out.",
      "Scraped listings carry selection bias toward certain districts and seller types.",
    ],
    nextSteps: [
      "Replace random split with temporal cross-validation so the test set is always in the future.",
      "Add SHAP values to explain each prediction instead of relying on district rankings.",
      "Benchmark against XGBoost and LightGBM, which usually win on tabular data.",
      "Add distance-to-centre and GPS coordinates as location features.",
      "Serve get_pred() through a small FastAPI endpoint for live price estimation.",
    ],
    repo: "https://github.com/Heyymuskie/cracow-property-price-model",
    seo: {
      title: "Cracow Property Price Model — Case Study",
      description:
        "Case study of a Cracow flat-price model: KNN imputation, 8 engineered features, 5-fold GridSearchCV and a VotingRegressor that beats MLP and gradient boosting on RMSE, MAE and MSLE.",
      keywords: [
        "housing price prediction",
        "scikit-learn regression",
        "feature engineering",
        "voting regressor ensemble",
        "GridSearchCV",
        "real estate analytics",
      ],
    },
    attribution: MIT_ATTRIBUTION,
  },

  {
    slug: "fx-trading-performance-analysis",
    title: "FX Trading Performance Analysis",
    kicker: "Financial risk analytics",
    summary:
      "Walk-forward performance review of an algorithmic trading system over 92 broker-reported trades: distribution fitting, drawdown and loss-run statistics, and a 100,000-run Monte Carlo simulation to estimate forward expectancy.",
    role: "Data cleaning · Statistical analysis · Simulation",
    status: "In progress",
    year: "2025",
    accent: "amber",
    tags: ["SciPy", "Statistics", "Monte Carlo", "Risk metrics", "Time series"],
    stack: ["Python 3", "SciPy", "pandas", "Matplotlib", "Jupyter"],
    kpis: [
      { label: "Trades analysed", value: "92" },
      { label: "Monte Carlo runs", value: "100k" },
      { label: "Instruments", value: "6+" },
      { label: "Win rate", value: "~40%" },
    ],
    problem: [
      "A single profit-and-loss number says almost nothing about a trading system. A strategy can be net profitable and still be one losing streak away from ruin, and the profit figure alone will never show that.",
      "The brief was to go beyond P&L: characterise the shape of returns, quantify drawdown and consecutive-loss risk, look for genuine timing effects rather than noise, and estimate what the next 100 trades are likely to deliver.",
    ],
    questions: [
      "What is the net profitability and risk profile of the system?",
      "Does the distribution of profit per lot match a known probability distribution?",
      "Are there real intraday or day-of-week edges, or just noise?",
      "What is the probability of an extended losing streak?",
    ],
    data: {
      source: "Broker-generated trade report (MetaTrader / MQL4 CSV export)",
      size: "92 closed trades · ~1 month · FX pairs and commodities",
      notes: [
        "Dataset intentionally private — reproduction requires your own broker export.",
        "Magic-number identifier corrected from 12345 to 4444 so the algorithm's trades could be isolated.",
        "Price, lot and completeness checks all passed: no missing values, no non-positive sizes.",
        "Duration, direction and stop-loss / take-profit flags parsed out of the Comment column.",
      ],
    },
    methodology: [
      {
        title: "Repair and validate",
        detail:
          "Fix the magic-number mismatch, validate open/close prices and lot sizes, strip '+' and '.' from symbol names so instruments group correctly.",
      },
      {
        title: "Feature extraction",
        detail:
          "Net profit = Profit + Swap + Commission; profit-per-lot normalises across position sizes; holding period in minutes; SL/TP exit flags decoded from the broker comment field.",
      },
      {
        title: "Distributional analysis",
        detail:
          "Histogram plus skewness and kurtosis on profit per lot, with the empirical CDF tested against power-law and exponential fits.",
      },
      {
        title: "Risk statistics",
        detail:
          "Peak-to-trough drawdown from the cumulative profit curve, its duration, and loss-run lengths modelled with a geometric distribution.",
      },
      {
        title: "Monte Carlo forward estimate",
        detail:
          "100,000 simulations of 100 trades, resampling observed profit-per-lot with replacement at a fixed 0.01 lot, to produce 5th and 95th percentile outcomes.",
      },
    ],
    findings: [
      {
        title: "Positive total P&L, negative median",
        detail:
          "The system is net profitable, yet the median trade loses money — small frequent stop-loss hits are paid for by occasional large wins, the signature of a defined-risk strategy.",
        metric: "Skewed right",
      },
      {
        title: "Returns are leptokurtic",
        detail:
          "Fat tails relative to a normal distribution mean extreme outcomes are more likely than a Gaussian would predict, which is exactly why a plain VaR would understate risk here.",
        metric: "Fat tails",
      },
      {
        title: "Two hours show a real edge",
        detail:
          "Median profit per lot is positive for trades opened at 14:00 and 16:00 — aligning with macro news releases and the European session close liquidity transition.",
        metric: "14:00 & 16:00",
      },
      {
        title: "Loss runs are the real exposure",
        detail:
          "With a ~60% loss rate, a geometric model puts ten consecutive losses well inside the realm of possibility — the number that actually decides position sizing.",
        metric: "p ≈ 0.60",
      },
    ],
    results: {
      name: "Instrument breakdown",
      note: "Median profit per lot by symbol and direction over the one-month window.",
      metrics: [
        { label: "USDCHF (short)", value: "Best performer" },
        { label: "US500 (long)", value: "Worst performer" },
        { label: "Win rate", value: "~40%" },
        { label: "Loss rate", value: "~60%" },
        { label: "Trade duration", value: "2 min → ~4 days" },
        { label: "Monte Carlo simulations", value: "100,000" },
      ],
    },
    resultsHead: ["Instrument", "Outcome"],
    gallery: [
      {
        src: "/projects/fx-trading-performance-analysis/drawdown.png",
        alt: "Cumulative profit line chart across 92 trades with green and red markers showing the start and end of the maximum drawdown.",
        caption: "Maximum drawdown marked on the equity curve — the peak-to-trough stretch that decides survival.",
        width: 576,
        height: 288,
      },
      {
        src: "/projects/fx-trading-performance-analysis/probability_of_loss.png",
        alt: "Monte Carlo simulation output showing the probability distribution of outcomes over the next one hundred trades.",
        caption: "Monte Carlo distribution over the next 100 trades — the 5th and 95th percentile band.",
        width: 576,
        height: 288,
      },
      {
        src: "/projects/fx-trading-performance-analysis/profit_histogram.png",
        alt: "Histogram of profit per lot showing a positively skewed distribution with a long right tail of large winning trades.",
        caption: "Profit per lot — right-skewed, with the bulk of trades sitting slightly below zero.",
        width: 288,
        height: 288,
      },
    ],
    limitations: [
      "92 trades is a small sample; the statistics are indicative, not conclusive.",
      "Only closed trades are present — open positions and survivorship effects are invisible.",
      "Market outcomes are autocorrelated, which breaks the independence assumption behind the Monte Carlo.",
      "No spread, slippage or commission model, so net P&L is optimistic.",
      "The 14:00 / 16:00 pattern may be a chance discovery in a single month of data.",
    ],
    nextSteps: [
      "Roll the window forward and re-test on each new month to see if the timing edge survives.",
      "Layer in spread, slippage and commission to get a realistic net expectancy.",
      "Benchmark against a buy-and-hold and a random-entry baseline to isolate genuine alpha.",
      "Build a small dashboard that reports daily P&L, drawdown and loss-run statistics automatically.",
    ],
    repo: "https://github.com/Heyymuskie/fx-trading-performance-analysis",
    seo: {
      title: "FX Trading Performance Analysis — Case Study",
      description:
        "Case study of an algorithmic trading review: 92 trades, skew and kurtosis on profit per lot, geometric loss-run modelling and a 100,000-run Monte Carlo forward simulation.",
      keywords: [
        "trading performance analysis",
        "monte carlo simulation",
        "drawdown analysis",
        "profit distribution",
        "financial data analysis",
        "risk metrics",
      ],
    },
    attribution: MIT_ATTRIBUTION,
  },

  {
    slug: "fitness-workload-regression",
    title: "Fitness Workload Regression",
    kicker: "Statistical modelling",
    summary:
      "A year of Polar watch exports — 283 workouts flattened from nested JSON — used to compare strength against cardio physiology and to test whether a linear mixed model predicts calories burned better than plain regression.",
    role: "JSON extraction · Statistical modelling · Diagnostics",
    status: "Completed",
    year: "2024",
    accent: "violet",
    tags: ["statsmodels", "OLS", "Mixed effects", "Diagnostics", "JSON"],
    stack: ["Python 3", "statsmodels", "SciPy", "pandas", "Matplotlib", "Jupyter"],
    kpis: [
      { label: "Workouts analysed", value: "283" },
      { label: "Activity types", value: "6" },
      { label: "Model RMSE improvement", value: "79 → 61" },
      { label: "Duration ↔ calories", value: "0.92" },
    ],
    problem: [
      "Fitness trackers export deeply nested JSON with heart-rate samples, GPS traces and device metadata all interleaved. Turning that into an analysis-ready table is most of the work — and doing it wrong silently corrupts every downstream number.",
      "Once clean, the real question: can session duration and peak heart rate reliably predict energy expenditure, and does treating activity type as a random effect materially improve that prediction?",
    ],
    questions: [
      "How do heart-rate distributions differ between strength and cardio sessions?",
      "Can calories burned be predicted reliably from session characteristics?",
      "When do people actually train — hour of day and day of week?",
      "Does a mixed model beat ordinary least squares here?",
    ],
    data: {
      source: "Personal Polar Flow export (training-session-*.json)",
      size: "283 workouts · ~1 year · 6 activity types",
      notes: [
        "Raw health data stays private — reproduction requires exporting your own Polar Flow account.",
        "GPS coordinates and ascent/descent dropped for privacy and irrelevance.",
        "Indoor sessions flagged by a null distance field so treadmill and outdoor work separate cleanly.",
        "IQR filtering (k = 1.5) applied to duration, calories and 99th-percentile heart rate before modelling.",
      ],
    },
    methodology: [
      {
        title: "Flatten the JSON",
        detail:
          "Walk each nested export and pull heartRateAvg2, heartRateStd and the 1/25/50/75/99th percentile heart rates into flat columns alongside sport, start/stop time and calories.",
      },
      {
        title: "Derive session features",
        detail:
          "Duration in minutes from start/stop timestamps, isStrength boolean from the sport name, and an isInside flag for sessions with no distance reading.",
      },
      {
        title: "Exploratory pass",
        detail:
          "Heart-rate histograms, a calorie time series with a daily average, intensity scatters and hour-of-day / day-of-week bar charts.",
      },
      {
        title: "Model ladder",
        detail:
          "Baseline OLS on duration alone, per-sport OLS, OLS with 99th-percentile heart rate added, then a linear mixed model with a random slope for duration by activity type.",
      },
      {
        title: "Diagnostics",
        detail:
          "VIF for multicollinearity, Goldfeld-Quandt for heteroscedasticity, Shapiro-Wilk and a Q-Q plot for residual normality, plus standardised residual plots.",
      },
    ],
    findings: [
      {
        title: "A mixed model cuts error by 23%",
        detail:
          "Modelling activity type as a random effect drops RMSE from 79 to 61 by absorbing the variance that strength sessions inject into a pooled regression.",
        metric: "RMSE 79 → 61",
      },
      {
        title: "Duration alone explains 85% of variance",
        detail:
          "kiloCalories ~ totalTime reaches R² = 0.85, and the correlation between duration and calories is 0.92 — session length is the dominant predictor.",
        metric: "R² = 0.85",
      },
      {
        title: "Sport-specific fits diverge sharply",
        detail:
          "Cycling reaches R² = 0.98 and treadmill running 0.96, while strength training sits at 0.44 — the same duration burns wildly different amounts depending on intensity.",
        metric: "0.98 vs 0.44",
      },
      {
        title: "Training follows a bimodal clock",
        detail:
          "Workouts cluster at 12:00 and 20:00 with no strong day-of-week preference — a stable pattern across the full year of data.",
        metric: "12:00 & 20:00",
      },
    ],
    results: {
      name: "Model comparison",
      note: "RMSE and R² for each specification; diagnostics run on the final mixed model.",
      metrics: [
        { label: "OLS — duration only", value: "RMSE 79 · R² 0.85" },
        { label: "OLS — cycling", value: "R² 0.98" },
        { label: "OLS — treadmill running", value: "R² 0.96" },
        { label: "OLS — walking", value: "R² 0.82" },
        { label: "OLS — strength training", value: "R² 0.44" },
        { label: "Linear mixed model", value: "RMSE 61 — best overall" },
      ],
    },
    resultsHead: ["Model", "Result"],
    gallery: [
      {
        src: "/projects/fitness-workload-regression/kilocalories_ts.png",
        alt: "Time series of kilocalories burned per workout across a year with a daily average trend line overlaid.",
        caption: "Calories per session across the year — roughly 111,000 kcal in total.",
        width: 576,
        height: 288,
      },
      {
        src: "/projects/fitness-workload-regression/duration_histogram.png",
        alt: "Histogram of workout session durations showing how long sessions typically last.",
        caption: "Session duration distribution — the input the baseline regression leans on.",
        width: 288,
        height: 288,
      },
      {
        src: "/projects/fitness-workload-regression/mdl_predicted_vs_actual.png",
        alt: "Scatter plot comparing predicted against actual kilocalories for the fitted mixed model.",
        caption: "Predicted vs actual for the mixed model — the fit the diagnostics were run against.",
        width: 288,
        height: 288,
      },
      {
        src: "/projects/fitness-workload-regression/workouts_by_day_of_week.png",
        alt: "Bar chart showing the number of workouts completed on each day of the week.",
        caption: "Workouts by day of week — no strong preference, training is spread evenly.",
        width: 288,
        height: 288,
      },
    ],
    limitations: [
      "Running had only two sessions and was excluded; strength training's R² of 0.44 points at high intra-session variance.",
      "Indoor sessions have no GPS or distance, so spatial analysis is impossible for them.",
      "The data is one person's habits, not a randomised sample of exercise types.",
      "The mixed model is fitted to a single user and would need recalibration for anyone else.",
      "IQR filtering may have removed legitimate high-intensity sessions along with true outliers.",
    ],
    nextSteps: [
      "Collect data across multiple users to build a generalisable expenditure model.",
      "Promote Polar's heart-rate zone fields into intensity features.",
      "Validate predictions against published MET tables for external credibility.",
      "Forecast weekly calorie trends with Prophet and ship a Streamlit dashboard.",
    ],
    repo: "https://github.com/Heyymuskie/fitness-workload-regression",
    seo: {
      title: "Fitness Workload Regression — Case Study",
      description:
        "Case study of a 283-workout fitness dataset: JSON flattening, OLS versus linear mixed modelling, and diagnostics that cut calorie-prediction RMSE from 79 to 61.",
      keywords: [
        "linear mixed model",
        "OLS regression",
        "statsmodels diagnostics",
        "fitness data analysis",
        "heart rate analysis",
        "JSON data pipeline",
      ],
    },
    attribution: MIT_ATTRIBUTION,
  },
];

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

export const projectSlugs = PROJECTS.map((p) => p.slug);
