 # Horizon Atlas

Horizon Atlas is an interactive planetary intelligence lab. It turns abstract global trade-offs into a tactile simulation: tune policy investment across energy, food, water, health, and education; run the model to 2100; compare futures; and export a concise mission brief.

## Experience design

The interface uses a kinetic editorial system inspired by cinematic spatial portfolios while keeping the product accessible and light enough to run without WebGL. Its coordinated motion language includes:

1. orbital boot and perimeter progress sequence;
2. staggered kinetic headline reveal;
3. pointer-reactive Earth with counter-rotating orbits;
4. continuous editorial marquee;
5. scroll-linked chapter reveals and page progress;
6. spring-like policy slider feedback and preset transitions;
7. cancel-safe simulation shockwave and node propagation;
8. animated metrics and interpretation state;
9. perspective-reactive future cards;
10. focus-managed spatial mission brief;
11. mobile bottom navigation; and
12. reduced-motion static fallbacks.

The cinematic interaction benchmark was [Sushant Gagneja's React Three Fiber portfolio](https://sushant-gagneja.vercel.app), used as inspiration rather than copied. Horizon Atlas deliberately prioritizes readable content, native controls, keyboard access, and performance.

## Why it exists

Most global-development tools are data viewers. Horizon Atlas is a conversation engine: it makes assumptions visible, demonstrates second-order effects, and helps an audience ask better questions. It is explicitly an educational systems model—not a forecasting or policy-prescription tool.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Quality checks

```bash
npm test
npm run lint
```


The production build targets Cloudflare-compatible ESM through Vinext. The interface supports keyboard navigation, reduced-motion preferences, mobile layouts, semantic controls, and print-to-PDF mission briefs.

## Model transparency

The current prototype uses documented, deterministic relationships for demonstration. A production research version should replace coefficients with versioned, peer-reviewed model modules and preserve uncertainty intervals. Suggested public data foundations: World Development Indicators, Our World in Data, WHO, FAO, IEA, and WRI.

## 90-day startup blueprint

### 1. Ideation — define the wedge (Week 1)

Mission: turn complex systems thinking into a product people can understand in five minutes.

1. Interview 10 climate-policy students, 5 educators, and 5 sustainability leads.
2. Rank use cases by urgency, frequency, and willingness to pay.
3. Choose one beachhead: university teaching labs.
4. Write a one-sentence promise and three explicit non-goals.
5. Establish an expert advisory circle for model integrity.

Tools: Notion, Google Meet, Perplexity, ChatGPT. KPIs: 20 interviews, 3 repeated pain points, 5 advisor introductions. Founder insight: a narrow initial user does not mean a small eventual market.

### 2. Validation — earn pull (Weeks 2–3)

Mission: prove that people return and bring the product into real conversations.

1. Run five live classroom demos.
2. Measure whether participants change at least three levers.
3. Ask faculty to design one lesson around the tool.
4. Collect objections about trust, assumptions, and usability.
5. Secure three written pilot commitments.

Tools: Tally, PostHog, Calendly, Loom. KPIs: 60% simulation completion, 30% brief exports, 3 pilots, 40% week-two return rate. Founder insight: requests to use the product without you are stronger evidence than compliments.

### 3. MVP — make trust a feature (Weeks 4–7)

Mission: evolve the prototype into a transparent, collaborative learning product.

1. Add accounts, saved scenarios, and shareable links.
2. Version every coefficient and source.
3. Add uncertainty ranges and sensitivity analysis.
4. Build an educator mode with assignments and cohorts.
5. Commission external scientific and security review.

Tools: Cloudflare, D1/Postgres, Sentry, GitHub Actions, OWASP ZAP. KPIs: 99.9% availability, <2s interactive load, zero critical audit findings, 10 weekly active cohorts. Founder insight: in decision software, provenance is part of the interface—not back-office documentation.

### 4. Launch — create an event (Weeks 8–10)

Mission: make the launch itself a public experiment in collective future design.

1. Publish a 90-second cinematic demo.
2. Run a live “8 billion futures” challenge.
3. Launch on Product Hunt, LinkedIn, Hacker News, and university networks.
4. Release a public model card and methodology note.
5. Turn the best community scenario into a visual case study.

Tools: Framer, Descript, Buffer, Beehiiv, Plausible. KPIs: 5,000 visitors, 1,000 completed simulations, 200 briefs, 25 qualified demos, 10 press/educator mentions. Founder insight: give the audience an identity and an artifact to share, not merely a link.

### 5. Scale — become infrastructure (Weeks 11–13)

Mission: move from impressive demo to the shared language for systems decisions.

1. Convert pilots into annual department licenses.
2. Publish an API and model-module specification.
3. Recruit research partners by domain.
4. Add localization and low-bandwidth mode.
5. Build scenario templates for cities, campuses, and companies.

Tools: HubSpot, Stripe, Cloudflare Analytics, Lokalise, OpenAPI. KPIs: 5 paying institutions, $25k pipeline, 50% pilot conversion, 4-week retention >35%, NPS >50. Founder insight: scale the standard and ecosystem, not only the app.

## 30-day sprint

- Days 1–5: conduct 10 interviews and instrument the prototype.
- Days 6–10: run two observed demos; fix every repeated comprehension failure.
- Days 11–15: recruit three model advisors and publish the first model card.
- Days 16–20: add saved/shareable scenarios and uncertainty bands.
- Days 21–25: run three classroom pilots and collect outcome data.
- Days 26–30: package the results into a launch film, case study, and pilot offer.

## High-impact prompts

- “Act as a skeptical climate systems scientist. Audit this coefficient table and list unsupported causal assumptions.”
- “Turn these five interview transcripts into ranked jobs-to-be-done, evidence quotes, and falsifiable product hypotheses.”
- “Design a 45-minute university lesson using Horizon Atlas, with learning objectives and an assessment rubric.”
- “Write a model card that explains scope, data lineage, uncertainty, exclusions, and responsible-use limits.”
- “Create a launch narrative that demonstrates one surprising second-order effect without overstating scientific certainty.”
