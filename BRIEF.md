# DesignOps Dashboard — Project Brief

## Problem Statement

Design teams lack a centralized, real-time view of operational health. Today, managers piece together capacity, project status, and system metrics from multiple tools — leading to:

- **Manual reporting overhead** — hours spent compiling weekly updates from Figma, Jira, and spreadsheets
- **Visibility gaps** — cross-functional partners (PMs, eng leads) can't self-serve on design status and approvals, triggering ad-hoc check-ins, and wasted time
- **Reactive bottleneck discovery** — blockers surface in standups instead of being caught early through data


## Audience


| **Design Managers** | Day-to-day ops view: who's overloaded, what's stuck, where to rebalance |
| **Cross-functional Stakeholders** (PMs, Eng Leads) | Self-service visibility into design pipeline without scheduling a meeting |

## Goals

1. Reduce status-reporting prep time by consolidating metrics into a single view
2. Surface capacity risks and project blockers before they escalate
3. Give cross-functional partners on-demand pipeline visibility
4. Track design system adoption to prioritize contribution and debt work
5. Improve sprint planning accuracy with historical throughput data

## Key Metrics

### Team Capacity & Workload
- **Utilization rate** — % of available hours allocated to active work
- **Sprint allocation** — designer-to-project mapping per sprint
- **Availability forecast** — upcoming PTO, ramp-ups, open headcount

### Project Tracking
- **Active requests** — total open design requests by team/requester
- **Status breakdown** — count by stage (queued, in-progress, in-review, done)
- **Aging / SLA** — requests exceeding target turnaround time
- **Blockers** — items flagged as blocked with reason and duration

### Design System Health
- **Component adoption %** — ratio of system components vs. detached/custom instances
- **Coverage gaps** — screens or flows with no system component mapping
- **Contribution rate** — new components added to the library per period
- **Design debt** — known inconsistencies or deprecated patterns still in use

### Handoff & Delivery
- **Handoff cycle time** — days from design-complete to dev-ready spec delivered
- **Iteration count** — average revision rounds before handoff
- **Dev-ready turnaround** — time from request to shippable design artifact
- **Approval tracking** — logged approval of completed design artifacts

## Primary Views

### 1. Overview
High-level health indicators across all domains. Traffic-light status for capacity, pipeline, system health, and delivery. Designed for a quick daily glance.

### 2. Team View
Capacity and allocation detail. Per-designer workload bars, sprint commitments, and availability calendar. Enables rebalancing decisions.

### 3. Project Pipeline
Filterable list or kanban of active design work. Columns by status, sortable by age/priority/requester. Surfaces blockers and SLA breaches.

### 4. System Health
Design system metrics: adoption trends, debt backlog, recent contributions. Helps prioritize system investment.

## Data Sources

| Source | Provides |
|--------|----------|
| **Jira / Asana** | Project status, blockers, cycle times, request metadata |
| **Figma** | Component usage analytics, file activity, library stats |
| **Time tracking** (Harvest, Clockify, etc.) | Utilization, allocation hours |
| **HR / Resource system** | PTO, headcount, team roster |
| **Design system analytics** | Adoption %, contribution log, debt items |

## Scope

### In Scope (v1)
- Read-only dashboard with the four views above
- Data pulled from existing tool APIs (no new data entry workflows)
- Role-based access (managers see team detail; stakeholders see pipeline summary)
- Weekly auto-refresh cadence with manual refresh option

### Out of Scope (future)
- Workflow automation (auto-assignment, triage bots)
- Individual designer performance scoring
- Client-facing or executive reporting views
- Real-time streaming updates
- Native mobile app

## Success Criteria

- Design managers spend **<15 min/week** on status reporting (down from ~1-2 hrs)
- Cross-functional stakeholders resolve **>80% of status questions** without scheduling a meeting
- Blockers are identified **within 24 hours** of being flagged (vs. surfacing at next standup)
- Design system adoption metric is reviewed **at least biweekly** to inform roadmap
