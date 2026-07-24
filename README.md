# Samanea Lofts

The website for Samanea Lofts — La Barbacoa, Samaná, Dominican Republic.

Next.js 15 (App Router) + Tailwind. Every page is statically generated, so it
serves as flat files from Vercel's CDN. Content lives in markdown.

---

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build — run this before pushing if unsure
```

---

## Editing content

You never need to touch the code to change what the site says. Everything below
is markdown in the `content/` folder. Edit it in GitHub's web editor, commit, and
Vercel rebuilds in about a minute.

### `content/site.md`

Contact details, opening date, location, and the travel-time list that appears on
the home page and the Samaná page.

```yaml
openingDate: "January 2027"
email: "hello@samanealofts.com"
whatsapp: "31600000000"      # digits only, including country code, no + or spaces
mapsUrl: "https://maps.app.goo.gl/..."
```

### `content/lots.md`

The lot schedule. Drives the interactive site plan, the table on `/invest`, and
the "2 lots still available" counters that appear across the site — change a
status here and every one of those updates.

```yaml
- id: 9
  terrain: 624.68     # plot size in m²
  villa: 102.86       # built area in m²
  status: available   # available | reserved | sold
  price: "US$ 000,000"  # optional — leave as "" to hide the row
```

### `content/journey/*.md`

The construction timeline. One file per stage, ordered by the `order` field.

To add a stage:

1. Put the photo in `public/images/` (e.g. `public/images/2024-clearing.jpg`)
2. Create `content/journey/06-something.md`:

```markdown
---
order: 6
date: "March 2026"
title: "Render and floors"
image: "/images/2024-clearing.jpg"
imageAlt: "Describe the photo for screen readers and search engines"
---

Two or three sentences about what happened at this stage.
```

`image` can be left as `""` — the entry renders with a "Photo to come"
placeholder. Add `upcoming: true` for stages that haven't happened yet.

Anything wrapped in a `>` blockquote renders as a **terracotta editor note**.
Those are notes I left for you. Delete them before launch.

---

## Deploying to Vercel

1. Push this folder to a new GitHub repository.
2. At [vercel.com/new](https://vercel.com/new), import that repository. Vercel
   detects Next.js — accept every default and deploy.
3. **Project → Settings → Domains**, add `samanealofts.com` and `www.samanealofts.com`.
4. At your domain registrar, replace the DNS records pointing at the WordPress
   host with the A record and CNAME Vercel shows you.
5. Wait for DNS to propagate, then confirm HTTPS is live.

Every push to `main` deploys automatically. Pull requests get preview URLs.

### Old WordPress URLs

`next.config.js` already 301-redirects the old Elementor paths so nothing that
Google indexed will 404:

| Old | New |
|---|---|
| `/index.php/elementor-37` | `/journey` |
| `/index.php/sample-page` | `/` |
| `/index.php/*` | `/` |

Once the new site is live, submit `https://samanealofts.com/sitemap.xml` in
Google Search Console.

---

## Before you launch

- [ ] Real email address in `content/site.md`
- [ ] Real WhatsApp number in `content/site.md`
- [ ] Correct lot statuses in `content/lots.md` — I guessed 09/10 available, 08 reserved
- [ ] Rewrite the family story on `/journey` in your own words
- [ ] Delete every terracotta editor note in `content/journey/*.md`
- [ ] Add the earlier construction photos (jungle, clearing, foundations)
- [ ] Decide short-stay vs long-stay rates and add them to `app/stay/page.tsx`
- [ ] Replace `/images/construction-01.jpg` as the social preview once you have
      finished photography (set in `app/layout.tsx`, `openGraph.images`)
- [ ] Point DNS away from the WordPress host

---

## Structure

```
app/
  layout.tsx        fonts, metadata, LodgingBusiness schema
  page.tsx          home
  lofts/  stay/  invest/  journey/  samana/  contact/
  sitemap.ts  robots.ts  not-found.tsx
components/
  Nav.tsx           scroll-aware header + mobile menu
  Footer.tsx
  PageHeader.tsx
  SitePlan.tsx      interactive lot plan (client component)
content/            ← everything you edit
lib/content.ts      markdown loader
public/images/
```

### Design tokens

Defined in `tailwind.config.ts`.

| Token | Hex | Used for |
|---|---|---|
| `jungle` | `#16281F` | Dominant dark surface |
| `canopy` | `#243A2C` | Panels on dark |
| `flor` | `#C4685A` | Accent — from the samanea flower in the logo |
| `arena` | `#EDE4D6` | Warm sand sections |
| `papel` | `#FAF7F2` | Light surface |
| `mar` | `#7DA49E` | Labels, reserved lots |

Type: **Instrument Serif** (display), **Karla** (body), **IBM Plex Mono**
(survey figures, eyebrows, buttons). Loaded from Google Fonts in
`app/layout.tsx`.
