# DesignOps Portfolio Dashboard — Project Brief

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
- **Utilization rate** — % of available hours allocated to active work (target: 75–85%)
- **Overallocated designers** — count of designers above 85% utilization
- **Available resources** — designers with capacity to take on new work
- **Allocation vs. open requests** — 18-month trend comparing team allocation against incoming demand

### Project Tracking
- **Active requests** — total open design requests by status
- **Status breakdown** — count by stage (queued, in-progress, in-review, blocked)
- **Past deadline** — requests exceeding target turnaround time
- **Blockers** — items flagged as blocked with reason and duration
- **Risk level** — high/medium/low risk classification per project

### Design System Health
- **Component adoption %** — ratio of system components vs. detached/custom instances
- **Coverage gaps** — screens or flows with no system component mapping
- **Contribution rate** — new components added to the library per period
- **Design debt** — known inconsistencies or deprecated patterns still in use

### Available Resources
- **Free designers** — number of team members with capacity below 73%
- **Capacity trend** — weekly sparkline of available resources over time

## Primary Views

### 1. Overview
High-level health indicators across all domains. Immediate attention banner for top priority item. Traffic-light status for capacity, pipeline, system health, and resource availability. KPI cards for utilization, active requests, component adoption, and available resources. Designed for a quick daily glance.

### 2. Team View
Capacity and allocation detail. Per-designer workload bars with utilization percentage, status labels (over-allocated / on track / available), project assignments (clickable to project modals), and next-available dates. Sortable by any column. Dual-axis area chart showing allocation vs. open requests over 18 months. KPI cards for overallocated count, avg utilization, and active projects per designer.

### 3. Project Pipeline
Filterable kanban of active design work. Columns by status (Queued, In Progress, In Review, Blocked), sortable by risk level. Cards are color-coded by risk (red/yellow/green left border) with descriptive risk/blocker alerts on high-risk items. Filterable by risk level, designer, and blocked status. Each project card is clickable to surface detailed modal with RAID log, decision log, platforms, and team contacts.

### 4. System Health
Design system metrics: adoption trend bar chart, debt backlog table (sortable, with clickable issue modals showing description, who caught it, when, and impact if unresolved), coverage gaps, and recent contributions.

## Data Sources

| Source | Provides |
|--------|----------|
| **Jira / Asana** | Project status, blockers, cycle times, request metadata |
| **Figma** | Component usage analytics, file activity, library stats |
| **Time tracking** (Harvest, Clockify, etc.) | Utilization, allocation hours |
| **HR / Resource system** | Headcount, team roster |
| **Design system analytics** | Adoption %, contribution log, debt items |

## Scope

### In Scope (v1)
- Read-only dashboard with the four views above
- Data pulled from existing tool APIs (no new data entry workflows)
- Role-based access (managers see team detail; stakeholders see pipeline summary)
- Weekly auto-refresh cadence with manual refresh option
- Project detail modals with RAID logs, decision logs, platforms, and contacts
- Issue detail modals with description, discoverer, date, and impact
- Dismissable priority alerts
- Pipeline filters (risk, designer, blocked status)
- Sortable tables and kanban columns

### Out of Scope (future)
- Workflow automation (auto-assignment, triage bots)
- Individual designer performance scoring
- Client-facing or executive reporting views
- Real-time streaming updates
- Native mobile app

## Team Scale

- **25 designers** across the design org
- **~75 active requests** at any given time (3.0 projects per designer avg)
- **7 overallocated**, **9 available**, **9 on-track** typical distribution

## Success Criteria

- Design managers spend **<15 min/week** on status reporting (down from ~1-2 hrs)
- Cross-functional stakeholders resolve **>80% of status questions** without scheduling a meeting
- Blockers are identified **within 24 hours** of being flagged (vs. surfacing at next standup)
- Design system adoption metric is reviewed **at least biweekly** to inform roadmap
