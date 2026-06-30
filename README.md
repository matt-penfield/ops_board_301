# DesignOps Portfolio Dashboard

A single-page operational dashboard for design teams. Gives managers and cross-functional stakeholders real-time visibility into team capacity, project pipeline, and design system health — no meetings required.

## Quick Start

Open `index.html` in any modern browser. No build step, no dependencies, no server required.

## Views

| Tab | What it shows |
|-----|---------------|
| **Overview** | Top-priority alert, KPI cards (utilization, active requests, adoption, available resources), domain health sparkline cards |
| **Team** | Per-designer allocation table (sortable), utilization bars, project links, next-available dates, allocation vs. requests area chart |
| **Pipeline** | Kanban board (Queued → In Progress → In Review → Blocked), filterable by risk/designer/blocked, sortable by risk, color-coded cards |
| **System** | Design system adoption trend, sortable debt backlog table with clickable issue modals |

## Interactivity

- **Project modals** — Click any project name (team table, kanban card, attention banner) to open a detail modal with RAID log, decision log, platforms, and team contacts
- **Issue modals** — Click any issue in the debt backlog table to see description, who found it, when, and impact if unresolved
- **Sorting** — Team table and debt table headers are sortable (click to toggle asc/desc). Kanban columns have a "Sort by Risk" button
- **Filters** — Pipeline page has dropdowns for Risk level, Designer, and Blocked status
- **Dismissable alerts** — The attention banner can be closed for the session

## File Structure

```
index.html   — Page structure, nav, all 4 view sections, modal overlay
styles.css   — All styling (variables, layout, components, responsive)
app.js       — Data, rendering logic, sorting, filtering, modals, charts
BRIEF.md     — Project brief and requirements document
```

## Tech Stack

- Vanilla HTML / CSS / JavaScript — no frameworks, no build tools
- Google Fonts: Inter (400/500/600/700), Material Symbols Outlined
- SVG sparklines and area charts rendered inline via JS
- CSS Grid layout with responsive breakpoints at 900px and 600px

## Data

All data is hardcoded in `app.js` for prototyping. The dashboard simulates a 25-designer team with ~75 active projects. To customize:

- **Team roster** — Edit the `teamData` array (name, projects, utilization, status, nextAvailable)
- **Pipeline** — Edit the `pipelineData` object (queued/progress/review/blocked arrays)
- **Project details** — Edit the `projectDetails` object for modal content (RAID, decisions, platforms, contacts)
- **Debt backlog** — Edit the `debtData` array (issue, severity, age, screens, description, impact)
- **Domain health** — Edit the `domainHealth` array (domain, status, metric, trend, statusText)
- **KPI cards** — Edit the static HTML in `index.html` (grid-4 cards on each view)

## Design

Light theme with generous whitespace, inspired by Linear/Figma/Notion aesthetics:

- Off-white background (`#f8f9fb`) with white card surfaces
- Bold blue accent (`#2563eb`), saturated status colors (green/amber/red)
- Inter typeface, 700-weight headings, 32px card values
- Subtle card shadows, 8px radius, airy 24px grid gaps

## License

See LICENSE file.
