/* ──────────────────────────────────────────────────────────────
   CONSTRUCTION TIMELINE — the single source of truth.
   Both the home-page teaser and the /journey page read from here.

   To add a stage: copy one block, drop a photo into public/images/,
   and point `image` at it. Leave `image: ""` for a "Photo to come"
   placeholder. Set `upcoming: true` for a stage not yet reached.
   ────────────────────────────────────────────────────────────── */

export type JourneyStage = {
  date: string;
  title: string;
  image: string;
  imageAlt: string;
  upcoming?: boolean;
  body: string[];
};

export const timeline: JourneyStage[] = [
  {
    date: "The beginning",
    title: "A clearing in the jungle",
    image: "/images/journey-01-empty-lot.jpg",
    imageAlt:
      "A cleared patch of hillside at Samanea, dense jungle rising behind it",
    body: [
      "The first job was simply to see the ground. The undergrowth was cut back by hand to reveal the slope of the hill and the wall of mature trees that would sit behind the houses.",
      "Nothing was levelled and nothing was poured. This is the plot as it was found — the starting point for everything that followed.",
    ],
  },
  {
    date: "Foundations",
    title: "Digging in on a slope",
    image: "/images/journey-02-first-foundation.jpg",
    imageAlt:
      "Workers excavating the first foundation, a steel column cage set into a dug footing",
    body: [
      "Building on a hillside means the foundations do the hardest work. Each one is dug into the slope, deep enough to reach firm ground, and tied with a cage of steel before any concrete goes in.",
      "The first column cage going into its footing, with the crew setting the depth by eye and by string line.",
    ],
  },
  {
    date: "Foundations",
    title: "A grid of footings across the plot",
    image: "/images/journey-03-footings.jpg",
    imageAlt:
      "Multiple concrete column footings poured across the excavated plot, steel rebar rising from each",
    body: [
      "Footing by footing, the shape of the house appears in the ground before a single wall exists. Each pad is poured and left to cure with its steel standing proud, ready to become a column.",
      "The boundary wall along the road is already up at the back — the first thing that reads as a building rather than a construction site.",
    ],
  },
  {
    date: "Structure",
    title: "Columns up, first floor cast",
    image: "/images/journey-04-columns.jpg",
    imageAlt:
      "Concrete columns standing with the first-floor slab cast above, red props holding the formwork",
    body: [
      "The columns rise to full height and the first-floor slab is cast between them. The forest of red props underneath is temporary — it carries the wet concrete of the upper floor until it is strong enough to stand on its own.",
      "This is the moment the loft stops being a footprint and becomes two storeys.",
    ],
  },
  {
    date: "Structure",
    title: "Standing on the upper floor",
    image: "/images/journey-05-upper-slab.jpg",
    imageAlt:
      "The poured upper slab with reinforcing steel laid out, jungle and hillside surrounding it",
    body: [
      "The upper slab poured, with the reinforcing mesh set for the level above and the plumbing already routed through it. From up here the reason for the whole project is obvious — trees on every side and the hill falling away toward the coast.",
      "It is also the view the finished terrace will have, one floor down.",
    ],
  },
  {
    date: "Structure",
    title: "The shell takes shape",
    image: "/images/journey-06-shell.jpg",
    imageAlt:
      "The two-storey concrete shell of a Samanea loft with the steel pergola frame in place",
    body: [
      "Two floors of concrete, the covered terrace framed out, and the steel pergola in place across the front. From here the work turns to render, glazing, floors and joinery — the parts that make it a home rather than a structure.",
      "The finished loft in an earlier photograph sits at the top of the home page.",
    ],
  },
  {
    date: "Render and glazing",
    title: "Walls closed, glass in",
    image: "/images/construction-01.jpg",
    imageAlt:
      "The loft rendered white with black-framed sliding glass installed across the front and the steel pergola complete",
    body: [
      "Rendered, painted and glazed. The sliding walls of glass are in, the pergola is finished over the terrace, and the concrete shell now reads as a house.",
      "From outside, the deep terrace and the wall of glass do exactly what they were drawn to do — pull the jungle straight into the living space.",
    ],
  },
  {
    date: "Nearly there",
    title: "The first loft, almost done",
    image: "/images/construction-02.jpg",
    imageAlt:
      "The near-finished Samanea loft seen from the front, white render, full-width covered terrace and glazing complete",
    body: [
      "The first loft as it stands today — structurally complete, closed in, and down to the finishing work inside. This is the house guests will actually stay in.",
      "Interiors, furniture and landscaping are the last steps before opening.",
    ],
  },
  {
    date: "January 2027",
    title: "Opening",
    image: "",
    imageAlt: "",
    upcoming: true,
    body: [
      "Finished, furnished, and taking guests. Four lots are still available to build on before then.",
    ],
  },
];
