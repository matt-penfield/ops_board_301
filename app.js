// ── NAV SWITCHING ──
document.querySelectorAll('.nav-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('view-' + btn.dataset.view).classList.add('active');
  });
});

// ── ATTENTION BANNER DISMISS ──
document.getElementById('attention-dismiss').addEventListener('click', () => {
  document.getElementById('attention-banner').classList.add('hidden');
});

// ── DOMAIN HEALTH ──
const domainHealth = [
  { domain: 'Project Pipeline', status: 'yellow', metric: '3', metricLabel: 'past SLA', trend: [1, 0, 2, 1, 2, 3, 3], statusText: 'Warning — trending up this week' },
  { domain: 'Team Capacity', status: 'green', metric: '78%', metricLabel: 'utilized', trend: [82, 80, 76, 79, 75, 77, 78], statusText: 'Healthy — no overloaded designers' },
  { domain: 'Design System', status: 'green', metric: '87%', metricLabel: 'adoption', trend: [79, 81, 82, 84, 85, 86, 87], statusText: 'Healthy — adoption trending up' },
  { domain: 'Available Resources', status: 'green', metric: '3', metricLabel: 'designers free', trend: [1, 1, 2, 2, 1, 2, 3], statusText: 'Healthy — capacity opening up' },
];

function renderSparkline(data, color, width = 120, height = 28) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;
  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="${points}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`;
}

const domainHealthEl = document.getElementById('domain-health');
domainHealth.forEach(d => {
  const dotColor = d.status === 'yellow' ? 'var(--yellow)' : d.status === 'red' ? 'var(--red)' : 'var(--green)';
  const sparkColor = d.status === 'yellow' ? '#fbbf24' : d.status === 'red' ? '#f87171' : '#34d399';
  domainHealthEl.innerHTML += `
    <div class="health-card">
      <div class="health-card-header">
        <span class="status-dot" style="background:${dotColor}"></span>
        <span class="hc-domain">${d.domain}</span>
      </div>
      <div class="health-card-body">
        <div class="health-card-metric">
          <span class="hc-value">${d.metric}</span>
          <span class="hc-label">${d.metricLabel}</span>
        </div>
        <div class="health-card-sparkline">${renderSparkline(d.trend, sparkColor)}</div>
      </div>
      <div class="health-card-status">${d.statusText}</div>
    </div>`;
});

// ── TEAM DATA ──
const teamData = [
  { name: 'Alex Chen',     projects: 'Checkout redesign, Mobile nav',  util: 92, status: 'high', nextAvailable: '2026-07-14' },
  { name: 'Priya Sharma',  projects: 'Onboarding flow',               util: 74, status: 'ok',   nextAvailable: '2026-07-07' },
  { name: 'James Okafor',  projects: 'Dashboard v2, Settings',        util: 85, status: 'ok',   nextAvailable: '2026-07-10' },
  { name: 'Mei Lin',       projects: 'Design system — icons',         util: 68, status: 'ok',   nextAvailable: '2026-07-03' },
  { name: 'Sara Müller',   projects: 'Search experience',             util: 80, status: 'ok',   nextAvailable: '2026-07-08' },
  { name: 'Dan Reeves',    projects: 'Notifications, Alerts',         util: 88, status: 'high', nextAvailable: '2026-07-15' },
  { name: 'Kim Tanaka',    projects: 'Profile settings',              util: 55, status: 'low',  nextAvailable: '2026-07-02' },
  { name: 'Luca Bianchi',  projects: 'Data export flow',              util: 72, status: 'ok',   nextAvailable: '2026-07-05' },
];

const teamTbody = document.getElementById('team-table');
teamData.forEach(d => {
  const color = d.util > 85 ? 'var(--yellow)' : d.util < 60 ? 'var(--text-muted)' : 'var(--accent)';
  const label = d.util > 85 ? 'Over-allocated' : d.util < 60 ? 'Available' : 'On track';
  const labelColor = d.util > 85 ? 'var(--yellow)' : d.util < 60 ? 'var(--green)' : 'var(--text-muted)';
  const projectLinks = d.projects.split(', ').map(p => `<a class="project-link" data-project="${p}">${p}</a>`).join(', ');
  const availDate = new Date(d.nextAvailable).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  teamTbody.innerHTML += `
    <tr>
      <td style="font-weight:500">${d.name}</td>
      <td>${projectLinks}</td>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="bar-container" style="flex:1">
            <div class="bar-fill" style="width:${d.util}%;background:${color}"></div>
          </div>
          <span style="font-size:12px;min-width:32px">${d.util}%</span>
        </div>
      </td>
      <td style="font-size:12px;color:${labelColor}">${label}</td>
      <td style="font-size:12px;white-space:nowrap">${availDate}</td>
    </tr>`;
});

// ── TEAM TABLE SORTING ──
let teamSortKey = null;
let teamSortDir = 'asc';

function renderTeamTable(data) {
  teamTbody.innerHTML = '';
  data.forEach(d => {
    const color = d.util > 85 ? 'var(--yellow)' : d.util < 60 ? 'var(--text-muted)' : 'var(--accent)';
    const label = d.util > 85 ? 'Over-allocated' : d.util < 60 ? 'Available' : 'On track';
    const labelColor = d.util > 85 ? 'var(--yellow)' : d.util < 60 ? 'var(--green)' : 'var(--text-muted)';
    const projectLinks = d.projects.split(', ').map(p => `<a class="project-link" data-project="${p}">${p}</a>`).join(', ');
    const availDate = new Date(d.nextAvailable).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    teamTbody.innerHTML += `
      <tr>
        <td style="font-weight:500">${d.name}</td>
        <td>${projectLinks}</td>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="bar-container" style="flex:1">
              <div class="bar-fill" style="width:${d.util}%;background:${color}"></div>
            </div>
            <span style="font-size:12px;min-width:32px">${d.util}%</span>
          </div>
        </td>
        <td style="font-size:12px;color:${labelColor}">${label}</td>
        <td style="font-size:12px;white-space:nowrap">${availDate}</td>
      </tr>`;
  });
}

function sortTeamTable(key) {
  const headers = document.querySelectorAll('#team-allocation-table th.sortable');
  if (teamSortKey === key) {
    teamSortDir = teamSortDir === 'asc' ? 'desc' : 'asc';
  } else {
    teamSortKey = key;
    teamSortDir = 'asc';
  }
  headers.forEach(th => { th.classList.remove('asc', 'desc'); });
  const activeHeader = document.querySelector(`#team-allocation-table th[data-sort="${key}"]`);
  if (activeHeader) activeHeader.classList.add(teamSortDir);

  const sorted = [...teamData].sort((a, b) => {
    let av, bv;
    if (key === 'name') { av = a.name.toLowerCase(); bv = b.name.toLowerCase(); }
    else if (key === 'projects') { av = a.projects.toLowerCase(); bv = b.projects.toLowerCase(); }
    else if (key === 'util') { av = a.util; bv = b.util; }
    else if (key === 'status') {
      const order = { high: 0, ok: 1, low: 2 };
      av = order[a.status]; bv = order[b.status];
    }
    else if (key === 'nextAvailable') { av = a.nextAvailable; bv = b.nextAvailable; }
    if (av < bv) return teamSortDir === 'asc' ? -1 : 1;
    if (av > bv) return teamSortDir === 'asc' ? 1 : -1;
    return 0;
  });
  renderTeamTable(sorted);
}

document.querySelectorAll('#team-allocation-table th.sortable').forEach(th => {
  th.addEventListener('click', () => sortTeamTable(th.dataset.sort));
});

// ── ALLOCATION VS REQUESTS AREA CHART ──
const allocationChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  allocation: [68, 70, 72, 74, 76, 78, 80, 82, 79, 77, 75, 73, 74, 76, 78, 79, 78, 78],
  requests:   [6,  7,  8,  9,  10, 12, 11, 14, 13, 12, 10, 9,  11, 12, 13, 14, 13, 14],
};

(function renderAllocationChart() {
  const el = document.getElementById('allocation-chart');
  const { labels, allocation, requests } = allocationChartData;
  const W = 800, H = 120, pad = { top: 12, right: 28, bottom: 22, left: 32 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const n = labels.length;

  // Scales
  const allocMin = 0, allocMax = 100;
  const reqMax = Math.max(...requests) + 2;

  function xPos(i) { return pad.left + (i / (n - 1)) * plotW; }
  function yAlloc(v) { return pad.top + (1 - (v - allocMin) / (allocMax - allocMin)) * plotH; }
  function yReq(v) { return pad.top + (1 - v / reqMax) * plotH; }

  // Build paths
  const allocPoints = allocation.map((v, i) => `${xPos(i)},${yAlloc(v)}`);
  const reqPoints = requests.map((v, i) => `${xPos(i)},${yReq(v)}`);
  const allocArea = `M${allocPoints[0]} ${allocPoints.join(' L')} L${xPos(n-1)},${pad.top + plotH} L${xPos(0)},${pad.top + plotH} Z`;
  const reqArea = `M${reqPoints[0]} ${reqPoints.join(' L')} L${xPos(n-1)},${pad.top + plotH} L${xPos(0)},${pad.top + plotH} Z`;
  const allocLine = `M${allocPoints.join(' L')}`;
  const reqLine = `M${reqPoints.join(' L')}`;

  // Grid lines & labels
  let grid = '';
  for (let t = 0; t <= 4; t++) {
    const y = pad.top + (t / 4) * plotH;
    const allocVal = Math.round(allocMax - (t / 4) * (allocMax - allocMin));
    grid += `<line x1="${pad.left}" x2="${W - pad.right}" y1="${y}" y2="${y}" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="2,4"/>`;
    grid += `<text x="${pad.left - 6}" y="${y + 3}" text-anchor="end" fill="var(--text-muted)" font-size="9" opacity="0.6">${allocVal}%</text>`;
  }
  // X labels (every 3rd)
  labels.forEach((l, i) => {
    if (i % 3 === 0 || i === n - 1) grid += `<text x="${xPos(i)}" y="${H - 4}" text-anchor="middle" fill="var(--text-muted)" font-size="9" opacity="0.6">${l}</text>`;
  });
  // Right-side axis labels for requests
  for (let t = 0; t <= 4; t++) {
    const y = pad.top + (t / 4) * plotH;
    const reqVal = Math.round(reqMax - (t / 4) * reqMax);
    grid += `<text x="${W - pad.right + 6}" y="${y + 3}" text-anchor="start" fill="var(--text-muted)" font-size="9" opacity="0.6">${reqVal}</text>`;
  }

  el.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      ${grid}
      <path d="${allocArea}" fill="rgba(124,138,255,0.08)"/>
      <path d="${allocLine}" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
      <path d="${reqArea}" fill="rgba(251,191,36,0.06)"/>
      <path d="${reqLine}" fill="none" stroke="var(--yellow)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
    </svg>
    <div class="chart-legend">
      <span class="legend-alloc">Avg Allocation %</span>
      <span class="legend-requests">Open Requests</span>
    </div>`;
})();

// ── PIPELINE / KANBAN DATA ──
const pipelineData = {
  queued: [
    { title: 'Billing page update', meta: 'Req: PM — Taylor', days: 2, risk: 'low' },
    { title: 'Empty states audit', meta: 'Req: Design — Mei', days: 1, risk: 'low' },
    { title: 'Error message review', meta: 'Req: Eng — Navid', days: 4, risk: 'medium' },
    { title: 'FAQ page refresh', meta: 'Req: Marketing', days: 1, risk: 'low' },
    { title: 'Tooltip standardization', meta: 'Req: Design — Sara', days: 3, risk: 'low' },
  ],
  progress: [
    { title: 'Checkout redesign', meta: 'Alex Chen — Sprint 14', days: 5, risk: 'high', riskReason: 'Revenue-critical flow, tight launch deadline' },
    { title: 'Onboarding flow v2', meta: 'Priya Sharma — Sprint 14', days: 3, risk: 'medium' },
    { title: 'Mobile nav patterns', meta: 'Alex Chen — Sprint 14', days: 4, risk: 'medium' },
    { title: 'Dashboard v2 layouts', meta: 'James Okafor — Sprint 14', days: 6, risk: 'high', riskReason: 'Scope creep — 3 new panels added mid-sprint' },
    { title: 'Search results page', meta: 'Sara Müller — Sprint 14', days: 2, risk: 'low' },
    { title: 'Notification center', meta: 'Dan Reeves — Sprint 14', days: 3, risk: 'low' },
    { title: 'Data export wizard', meta: 'Luca Bianchi — Sprint 14', days: 4, risk: 'medium' },
    { title: 'Profile edit flow', meta: 'Kim Tanaka — Sprint 14', days: 1, risk: 'low' },
    { title: 'Settings page cleanup', meta: 'James Okafor — Sprint 14', days: 7, risk: 'high', blocked: 'Waiting on API spec' },
    { title: 'Alert system design', meta: 'Dan Reeves — Sprint 14', days: 2, risk: 'low' },
  ],
  review: [
    { title: 'Icon library expansion', meta: 'Mei Lin — Review by leads', days: 3, risk: 'low' },
    { title: 'Color token update', meta: 'Mei Lin — Review by leads', days: 2, risk: 'medium' },
    { title: 'Card component variants', meta: 'Priya Sharma — Eng review', days: 1, risk: 'low' },
    { title: 'Loading skeleton specs', meta: 'Kim Tanaka — PM review', days: 4, risk: 'medium' },
    { title: 'Table pagination', meta: 'Luca Bianchi — Eng review', days: 2, risk: 'low' },
    { title: 'Filter panel redesign', meta: 'Sara Müller — PM review', days: 5, risk: 'high', blocked: 'PM unavailable' },
  ],
  blocked: [
    { title: 'Settings page cleanup', meta: 'James Okafor', days: 7, risk: 'high', blocked: 'Waiting on API spec' },
    { title: 'Filter panel redesign', meta: 'Sara Müller', days: 5, risk: 'high', blocked: 'PM unavailable for review' },
    { title: 'Permissions matrix', meta: 'Dan Reeves', days: 9, risk: 'high', blocked: 'Dependency on IAM team' },
  ],
};

const kanbanEl = document.getElementById('kanban');
const cols = [
  { key: 'queued', label: 'Queued' },
  { key: 'progress', label: 'In Progress' },
  { key: 'review', label: 'In Review' },
  { key: 'blocked', label: 'Blocked' },
];

function riskColor(risk) {
  if (risk === 'high') return 'var(--red)';
  if (risk === 'medium') return 'var(--yellow)';
  return 'var(--green)';
}

const kanbanSortState = {};

function renderKanban() {
  kanbanEl.innerHTML = '';
  cols.forEach(col => {
    let items = [...pipelineData[col.key]];
    const sort = kanbanSortState[col.key];
    if (sort) {
      items.sort((a, b) => {
        let av, bv;
        if (sort.key === 'risk') {
          const order = { high: 0, medium: 1, low: 2 };
          av = order[a.risk]; bv = order[b.risk];
        } else {
          av = a.days; bv = b.days;
        }
        return sort.dir === 'asc' ? av - bv : bv - av;
      });
    }
    let html = `<div class="kanban-col" data-col="${col.key}">`;
    html += `<h3>${col.label} <span class="count">${items.length}</span></h3>`;
    html += `<div class="kanban-sort-bar">`;
    html += `<button class="kanban-sort-btn${sort && sort.key === 'risk' ? ' active' : ''}" data-col="${col.key}" data-sort="risk">Risk${sort && sort.key === 'risk' ? (sort.dir === 'asc' ? ' ↑' : ' ↓') : ''}</button>`;
    html += `<button class="kanban-sort-btn${sort && sort.key === 'days' ? ' active' : ''}" data-col="${col.key}" data-sort="days">Days${sort && sort.key === 'days' ? (sort.dir === 'asc' ? ' ↑' : ' ↓') : ''}</button>`;
    html += `</div>`;
    items.forEach(item => {
      let alert = '';
      if (item.blocked) {
        alert = `<div class="kc-blocked"><span class="material-symbols-outlined">error</span>${item.blocked}</div>`;
      } else if (item.risk === 'high') {
        alert = `<div class="kc-blocked"><span class="material-symbols-outlined">error</span>${item.riskReason || 'High risk'}</div>`;
      }
      html += `<div class="kanban-card risk-${item.risk}" data-project="${item.title}">
        <div class="kc-title">${item.title}</div>
        <div class="kc-meta">${item.meta} · ${item.days}d</div>
        ${alert}
      </div>`;
    });
    html += '</div>';
    kanbanEl.innerHTML += html;
  });
}
renderKanban();

// Delegated sort button handler
kanbanEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.kanban-sort-btn');
  if (!btn) return;
  const col = btn.dataset.col;
  const key = btn.dataset.sort;
  const current = kanbanSortState[col];
  if (current && current.key === key) {
    current.dir = current.dir === 'asc' ? 'desc' : 'asc';
  } else {
    kanbanSortState[col] = { key, dir: 'asc' };
  }
  renderKanban();
});

// ── DEBT TABLE ──
const debtData = [
  { issue: 'Legacy button styles on 3 flows', severity: 'High', age: '34d', screens: 8, caughtBy: 'Maria Lopez', caughtDate: '2026-05-27', description: 'Three checkout and onboarding flows still use the deprecated filled-button variant with old elevation and color tokens. They fall outside the design system and create visual inconsistency.', impact: 'Users experience a jarring shift between new and old UI during critical conversion flows. If left unresolved, it undermines trust in the refresh and may slow down future system-wide token migrations.' },
  { issue: 'Deprecated color tokens in settings', severity: 'Medium', age: '21d', screens: 4, caughtBy: 'James Okafor', caughtDate: '2026-06-09', description: 'Settings pages reference 14 deprecated color tokens that were removed from the design system in v3.2. Hard-coded hex fallbacks currently prevent breakage.', impact: 'The fallback colors will diverge further from the live palette with each theme update. Eventually causes a11y contrast issues and blocks dark-mode rollout to settings.' },
  { issue: 'Non-standard spacing in modals', severity: 'Medium', age: '18d', screens: 6, caughtBy: 'Priya Sharma', caughtDate: '2026-06-12', description: 'Six modal dialogs use custom 20px/28px padding instead of the system 16px/24px spacing scale. They were built before the spacing ramp was documented.', impact: 'Creates visual inconsistency when modals appear beside system-compliant components. Increases design debt surface area and complicates future responsive adjustments.' },
  { issue: 'Old icon set in sidebar nav', severity: 'High', age: '42d', screens: 12, caughtBy: 'Alex Chen', caughtDate: '2026-05-19', description: 'The main sidebar still renders the legacy icon font (v1 Material icons) rather than the current outlined symbol set. Twelve screens rely on it.', impact: 'Icon weight and optical size mismatch is visible on every page load. Blocks full migration to variable-weight symbols and doubles icon font payload.' },
  { issue: 'Inconsistent border radius on cards', severity: 'Low', age: '15d', screens: 3, caughtBy: 'Sam Rivera', caughtDate: '2026-06-15', description: 'Three dashboard cards use 8px radius instead of the standard 12px token. They were duplicated from an older template.', impact: 'Low visual severity but contributes to an inconsistent feel on the overview dashboard. Easy fix but creates confusion for new contributors.' },
  { issue: 'Hardcoded colors in email templates', severity: 'Medium', age: '28d', screens: 5, caughtBy: 'James Okafor', caughtDate: '2026-06-02', description: 'Five transactional email templates use hardcoded hex values instead of referencing the shared email token stylesheet.', impact: 'Brand color updates require manual edits to each template. Risk of missed templates creates off-brand customer communications.' },
  { issue: 'Missing dark-mode tokens for badges', severity: 'Low', age: '10d', screens: 2, caughtBy: 'Priya Sharma', caughtDate: '2026-06-20', description: 'Badge components on the notifications and activity pages have no dark-mode token mappings. They currently render light-mode colors on dark backgrounds.', impact: 'Low contrast makes badges hard to read in dark mode. Affects accessibility scores on those two screens.' },
  { issue: 'Legacy form input styling', severity: 'High', age: '55d', screens: 9, caughtBy: 'Maria Lopez', caughtDate: '2026-05-06', description: 'Nine forms across account settings and admin panels use the legacy input component with outdated focus rings, label positioning, and no error-state tokens.', impact: 'Inconsistent form UX confuses users and fails WCAG 2.2 focus-visible requirements. Blocks accessibility certification for the admin panel.' },
  { issue: 'Outdated loading spinner', severity: 'Low', age: '12d', screens: 3, caughtBy: 'Sam Rivera', caughtDate: '2026-06-18', description: 'Three pages still display the old CSS-only spinner instead of the branded Lottie animation adopted in the latest design refresh.', impact: 'Minor brand inconsistency. Low user impact but noticeable during slow network conditions.' },
  { issue: 'Detached header component on marketing', severity: 'Medium', age: '30d', screens: 4, caughtBy: 'Alex Chen', caughtDate: '2026-05-31', description: 'The marketing site header is a forked copy of the system header component, now 2 versions behind. Navigation link updates require manual syncing.', impact: 'Navigation changes ship to the product but not marketing, causing broken links and brand mismatch. Increases maintenance burden for every nav update.' },
  { issue: 'Non-system tooltip on data tables', severity: 'Low', age: '8d', screens: 2, caughtBy: 'James Okafor', caughtDate: '2026-06-22', description: 'Data table tooltips on the analytics dashboard use a custom implementation instead of the system Tooltip component. Different animation and positioning logic.', impact: 'Minimal user-facing impact but adds an extra dependency and diverges from the accessibility-tested system tooltip.' },
  { issue: 'Deprecated shadow tokens', severity: 'Medium', age: '25d', screens: 6, caughtBy: 'Priya Sharma', caughtDate: '2026-06-05', description: 'Six card surfaces use elevation-1/elevation-2 tokens that were renamed to shadow-sm/shadow-md in the v3.0 token migration.', impact: 'Old tokens will be removed in v4.0 causing build failures. Until then, shadow values may drift as only new tokens receive updates.' },
];

const debtTbody = document.getElementById('debt-table');
debtData.forEach(d => {
  const sevColor = d.severity === 'High' ? 'var(--red)' : d.severity === 'Medium' ? 'var(--yellow)' : 'var(--text-muted)';
  debtTbody.innerHTML += `
    <tr>
      <td><a class="issue-link" data-issue="${d.issue}">${d.issue}</a></td>
      <td style="color:${sevColor};font-weight:500">${d.severity}</td>
      <td>${d.age}</td>
      <td>${d.screens}</td>
    </tr>`;
});

// ── DEBT TABLE SORTING ──
let debtSortKey = null;
let debtSortDir = 'asc';

function renderDebtTable(data) {
  debtTbody.innerHTML = '';
  data.forEach(d => {
    const sevColor = d.severity === 'High' ? 'var(--red)' : d.severity === 'Medium' ? 'var(--yellow)' : 'var(--text-muted)';
    debtTbody.innerHTML += `
      <tr>
        <td><a class="issue-link" data-issue="${d.issue}">${d.issue}</a></td>
        <td style="color:${sevColor};font-weight:500">${d.severity}</td>
        <td>${d.age}</td>
        <td>${d.screens}</td>
      </tr>`;
  });
}

function sortDebtTable(key) {
  const headers = document.querySelectorAll('#debt-backlog-table th.sortable');
  if (debtSortKey === key) {
    debtSortDir = debtSortDir === 'asc' ? 'desc' : 'asc';
  } else {
    debtSortKey = key;
    debtSortDir = 'asc';
  }
  headers.forEach(th => { th.classList.remove('asc', 'desc'); });
  const activeHeader = document.querySelector(`#debt-backlog-table th[data-sort="${key}"]`);
  if (activeHeader) activeHeader.classList.add(debtSortDir);

  const sorted = [...debtData].sort((a, b) => {
    let av, bv;
    if (key === 'issue') { av = a.issue.toLowerCase(); bv = b.issue.toLowerCase(); }
    else if (key === 'severity') {
      const order = { High: 0, Medium: 1, Low: 2 };
      av = order[a.severity]; bv = order[b.severity];
    }
    else if (key === 'age') { av = parseInt(a.age); bv = parseInt(b.age); }
    else if (key === 'screens') { av = a.screens; bv = b.screens; }
    if (av < bv) return debtSortDir === 'asc' ? -1 : 1;
    if (av > bv) return debtSortDir === 'asc' ? 1 : -1;
    return 0;
  });
  renderDebtTable(sorted);
}

document.querySelectorAll('#debt-backlog-table th.sortable').forEach(th => {
  th.addEventListener('click', () => sortDebtTable(th.dataset.sort));
});

// ── ADOPTION CHART (simple CSS bar chart) ──
const adoptionData = [
  { month: 'Jan', value: 72 },
  { month: 'Feb', value: 75 },
  { month: 'Mar', value: 79 },
  { month: 'Apr', value: 82 },
  { month: 'May', value: 85 },
  { month: 'Jun', value: 87 },
];

const chartEl = document.getElementById('adoption-chart');
chartEl.style.cssText = 'display:flex;align-items:flex-end;gap:16px;height:140px;padding:16px 0;';
adoptionData.forEach(d => {
  const barH = (d.value / 100) * 110;
  chartEl.innerHTML += `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;">
      <span style="font-size:12px;font-weight:500">${d.value}%</span>
      <div style="width:100%;height:${barH}px;background:var(--accent);border-radius:6px 6px 0 0;opacity:${0.4 + (d.value - 70) * 0.035}"></div>
      <span style="font-size:11px;color:var(--text-muted)">${d.month}</span>
    </div>`;
});

// ── PROJECT DETAIL DATA ──
const projectDetails = {
  'Checkout redesign': {
    overview: 'Redesign the end-to-end checkout experience to reduce cart abandonment and improve conversion. The project focuses on streamlining the multi-step flow into a single-page layout with progressive disclosure.',
    goal: 'Reduce checkout drop-off rate by 20% and decrease average time-to-purchase by 30 seconds.',
    metrics: ['Cart abandonment rate', 'Time to complete purchase', 'Error rate on payment step', 'Mobile conversion lift'],
    raid: [
      { issue: 'Payment API migration', desc: 'Backend team migrating to new payment processor mid-sprint. May affect field validation specs.', severity: 'High', mitigation: 'Coordinate with eng lead weekly. Design flexible validation patterns that work with both APIs. Fallback to current flow if migration delayed.', logged: '2026-06-10', needed: '2026-06-20', resolved: '2026-06-22', owner: 'Alex Chen' },
      { issue: 'Address autocomplete latency', desc: 'Third-party address service has 800ms+ response times on mobile networks.', severity: 'Medium', mitigation: 'Design skeleton loading state for address fields. Provide manual entry fallback that doesn\'t block progression.', logged: '2026-06-15', needed: '2026-07-01', resolved: '', owner: 'Alex Chen' },
    ],
    decisions: [
      { name: 'Single-page checkout approved', desc: 'Moved from 4-step wizard to single scrollable page with sticky order summary.', artifacts: 'FigJam: Checkout Flow Map v3, Figma: Checkout Single-Page Comp', needed: '2026-06-08', resolved: '2026-06-09', owner: 'Taylor Kim (PM)' },
      { name: 'Guest checkout prioritized over account creation', desc: 'Account creation moved to post-purchase confirmation screen to reduce friction.', artifacts: 'PRD: Checkout Requirements v2.1, FigJam: User Journey Decision Tree', needed: '2026-06-12', resolved: '2026-06-14', owner: 'VP Product' },
    ],
    platforms: { design: 'Figma (design), FigJam (workshops & flows)', research: 'Maze (unmoderated testing), Dovetail (insights repository)', engineering: 'React, Next.js, Stripe Elements SDK' },
    contacts: {
      ux: [{ name: 'Alex Chen', role: 'Lead Designer' }, { name: 'Priya Sharma', role: 'UX Support' }],
      engineering: [{ name: 'Navid Rahimi', role: 'Frontend Lead' }, { name: 'Jordan Lee', role: 'Backend — Payments' }],
      pm: [{ name: 'Taylor Kim', role: 'Product Manager' }],
      decisionMakers: [{ name: 'VP Product', role: 'Final approver' }, { name: 'Taylor Kim', role: 'Day-to-day decisions' }],
    },
  },
  'Onboarding flow v2': {
    overview: 'Revamp the new-user onboarding to improve activation rates. Introduce progressive profiling and contextual feature tours instead of the current static walkthrough.',
    goal: 'Increase 7-day activation rate from 34% to 50% and reduce support tickets from new users by 25%.',
    metrics: ['7-day activation rate', 'Onboarding completion rate', 'Time to first key action', 'New user support ticket volume'],
    raid: [
      { issue: 'Feature flag dependency', desc: 'New onboarding requires feature flag system that eng is still building.', severity: 'Medium', mitigation: 'Design both flagged and unflagged states. Work with eng to confirm flag system timeline. Prepare phased rollout plan.', logged: '2026-06-12', needed: '2026-07-05', resolved: '', owner: 'Priya Sharma' },
      { issue: 'Content not finalized', desc: 'Marketing copy for tour steps still pending brand review.', severity: 'Low', mitigation: 'Use placeholder copy for design reviews. Flag to marketing lead for priority.', logged: '2026-06-18', needed: '2026-06-28', resolved: '2026-06-26', owner: 'Priya Sharma' },
    ],
    decisions: [
      { name: 'Progressive profiling over single form', desc: 'Collect user info across first 3 sessions rather than upfront.', artifacts: 'FigJam: Onboarding Strategy Board, Figma: Progressive Profiling Flows', needed: '2026-06-05', resolved: '2026-06-06', owner: 'Taylor Kim (PM)' },
    ],
    platforms: { design: 'Figma (design), FigJam (journey mapping)', research: 'UserTesting (moderated sessions), Hotjar (heatmaps)', engineering: 'React, LaunchDarkly (feature flags)' },
    contacts: {
      ux: [{ name: 'Priya Sharma', role: 'Lead Designer' }],
      engineering: [{ name: 'Sam Torres', role: 'Frontend' }, { name: 'Lin Wei', role: 'Backend' }],
      pm: [{ name: 'Taylor Kim', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Dir. of Growth', role: 'Approver' }],
    },
  },
  'Mobile nav patterns': {
    overview: 'Establish a unified mobile navigation pattern to replace inconsistent tab bars and hamburger menus across the app. Define a scalable system that accommodates 5–8 top-level sections.',
    goal: 'Unify mobile navigation into a single pattern adopted across all app sections, reducing navigation-related user errors by 40%.',
    metrics: ['Navigation error rate', 'Task completion rate on mobile', 'Cross-section discoverability score', 'System Usability Scale improvement'],
    raid: [
      { issue: 'iOS and Android divergence', desc: 'Platform conventions differ for bottom nav behavior (iOS) vs drawer (Android).', severity: 'Medium', mitigation: 'Design platform-adaptive variants. Document decision criteria for when to diverge. Review with eng leads for feasibility.', logged: '2026-06-14', needed: '2026-06-28', resolved: '', owner: 'Alex Chen' },
    ],
    decisions: [
      { name: 'Bottom tab bar as primary pattern', desc: 'Adopted bottom tabs for top 5 destinations with overflow "More" tab for secondary items.', artifacts: 'Figma: Mobile Nav Explorations v4, FigJam: Nav Audit & Decision', needed: '2026-06-16', resolved: '2026-06-18', owner: 'Alex Chen' },
    ],
    platforms: { design: 'Figma (components & specs)', research: 'Maze (tree testing), Lookback (usability sessions)', engineering: 'React Native, iOS UIKit, Android Jetpack Compose' },
    contacts: {
      ux: [{ name: 'Alex Chen', role: 'Lead Designer' }],
      engineering: [{ name: 'Chris Park', role: 'Mobile Lead' }, { name: 'Aisha Patel', role: 'iOS' }],
      pm: [{ name: 'Marco Silva', role: 'Mobile PM' }],
      decisionMakers: [{ name: 'Head of Mobile', role: 'Final approver' }],
    },
  },
  'Dashboard v2 layouts': {
    overview: 'Redesign the main analytics dashboard to support customizable widget layouts, improved data density, and better scan-ability for power users.',
    goal: 'Increase daily active usage of the dashboard by 35% and reduce time-to-insight for key metrics by 50%.',
    metrics: ['Dashboard DAU', 'Avg. session duration', 'Widget interaction rate', 'Time to first insight'],
    raid: [
      { issue: 'Data API performance', desc: 'Current API cannot support real-time widget updates at proposed refresh rate.', severity: 'High', mitigation: 'Design graceful loading states. Propose tiered refresh rates by widget priority. Coordinate with backend on caching strategy.', logged: '2026-06-08', needed: '2026-06-25', resolved: '', owner: 'James Okafor' },
      { issue: 'Accessibility for drag-and-drop', desc: 'Widget rearrangement via drag-drop needs keyboard-accessible alternative.', severity: 'Medium', mitigation: 'Design an "Edit layout" mode with arrow-key reordering. Test with screen reader users in next research sprint.', logged: '2026-06-16', needed: '2026-07-10', resolved: '', owner: 'James Okafor' },
    ],
    decisions: [
      { name: 'Grid-based layout system', desc: 'Adopted 12-column responsive grid with predefined widget size presets (1x1, 2x1, 2x2).', artifacts: 'Figma: Dashboard Grid System, PRD: Dashboard v2 Requirements', needed: '2026-06-10', resolved: '2026-06-12', owner: 'James Okafor' },
    ],
    platforms: { design: 'Figma (design system + prototypes)', research: 'Maze (prototype testing), FullStory (session replay)', engineering: 'React, D3.js, GraphQL' },
    contacts: {
      ux: [{ name: 'James Okafor', role: 'Lead Designer' }],
      engineering: [{ name: 'Navid Rahimi', role: 'Frontend Lead' }, { name: 'Dana Kim', role: 'Data Viz' }],
      pm: [{ name: 'Rachel Hong', role: 'Analytics PM' }],
      decisionMakers: [{ name: 'CPO', role: 'Executive sponsor' }, { name: 'Rachel Hong', role: 'Day-to-day' }],
    },
  },
  'Settings page cleanup': {
    overview: 'Restructure the settings page from a single long-scroll layout to categorized sections with improved information architecture and clearer labeling.',
    goal: 'Reduce settings-related support tickets by 30% and improve findability score to above 80% in tree testing.',
    metrics: ['Support tickets (settings category)', 'Tree test findability', 'Task success rate', 'Time on page'],
    raid: [
      { issue: 'Waiting on API spec', desc: 'New notification preferences require a backend API that has not been specified yet.', severity: 'High', mitigation: 'Design with assumed data model. Flag to eng lead weekly. Scope notification prefs as Phase 2 if API delayed beyond sprint 15.', logged: '2026-06-10', needed: '2026-06-24', resolved: '', owner: 'James Okafor' },
    ],
    decisions: [
      { name: 'Tab-based categorization', desc: 'Settings divided into Profile, Notifications, Security, and Integrations tabs.', artifacts: 'FigJam: IA Card Sort Results, Figma: Settings Tabs Exploration', needed: '2026-06-08', resolved: '2026-06-10', owner: 'James Okafor' },
    ],
    platforms: { design: 'Figma (specs & prototypes)', research: 'Optimal Workshop (tree testing & card sort)', engineering: 'React, REST API' },
    contacts: {
      ux: [{ name: 'James Okafor', role: 'Lead Designer' }],
      engineering: [{ name: 'Jordan Lee', role: 'Backend' }, { name: 'Sam Torres', role: 'Frontend' }],
      pm: [{ name: 'Taylor Kim', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Taylor Kim', role: 'Approver' }],
    },
  },
  'Search results page': {
    overview: 'Redesign search results to support faceted filtering, better result previews, and relevance tuning controls for users.',
    goal: 'Improve search-to-click-through rate by 25% and reduce "no results" dead-ends by 40%.',
    metrics: ['Search CTR', 'No-results rate', 'Filter usage rate', 'Avg. results position clicked'],
    raid: [
      { issue: 'Elasticsearch index limitations', desc: 'Current index doesn\'t support some proposed facets without reindexing.', severity: 'Medium', mitigation: 'Prioritize facets that work with current index. Queue advanced facets for Phase 2 after reindex scheduled Q3.', logged: '2026-06-20', needed: '2026-07-05', resolved: '', owner: 'Sara Müller' },
    ],
    decisions: [
      { name: 'Left-rail filter panel', desc: 'Filters shown in persistent left rail on desktop, bottom sheet on mobile.', artifacts: 'Figma: Search Results Desktop + Mobile, FigJam: Filter Taxonomy', needed: '2026-06-18', resolved: '2026-06-19', owner: 'Sara Müller' },
    ],
    platforms: { design: 'Figma (comps & interaction specs)', research: 'Maze (A/B prototype test), FullStory (search behavior analysis)', engineering: 'React, Elasticsearch, Algolia (under evaluation)' },
    contacts: {
      ux: [{ name: 'Sara Müller', role: 'Lead Designer' }],
      engineering: [{ name: 'Lin Wei', role: 'Search Backend' }, { name: 'Chris Park', role: 'Frontend' }],
      pm: [{ name: 'Marco Silva', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Marco Silva', role: 'Approver' }],
    },
  },
  'Notification center': {
    overview: 'Build a centralized notification center to unify in-app alerts, system messages, and activity updates into a single accessible panel.',
    goal: 'Consolidate 4 separate notification surfaces into 1, and achieve 60%+ weekly engagement with the notification panel.',
    metrics: ['Panel open rate', 'Notification click-through', 'Notification dismissal rate', 'Time to action from notification'],
    raid: [
      { issue: 'Notification fatigue risk', desc: 'Consolidating all channels may overwhelm users with volume.', severity: 'Medium', mitigation: 'Design smart grouping and priority tiers. Include "quiet hours" controls. Run preference survey before launch.', logged: '2026-06-14', needed: '2026-07-01', resolved: '', owner: 'Dan Reeves' },
    ],
    decisions: [
      { name: 'Slide-over panel (not full page)', desc: 'Notifications appear in a slide-over panel from the right to maintain context of current page.', artifacts: 'Figma: Notification Panel Concepts, FigJam: Notification Architecture', needed: '2026-06-12', resolved: '2026-06-13', owner: 'Dan Reeves' },
    ],
    platforms: { design: 'Figma (component library + specs)', research: 'Surveys (Typeform), Dovetail (synthesis)', engineering: 'React, WebSocket, Firebase Cloud Messaging' },
    contacts: {
      ux: [{ name: 'Dan Reeves', role: 'Lead Designer' }],
      engineering: [{ name: 'Aisha Patel', role: 'Frontend' }, { name: 'Jordan Lee', role: 'Backend — Events' }],
      pm: [{ name: 'Rachel Hong', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Rachel Hong', role: 'Approver' }],
    },
  },
  'Data export wizard': {
    overview: 'Design a guided export wizard allowing users to select data sets, configure formats, schedule recurring exports, and preview results before downloading.',
    goal: 'Enable self-service data export for 80% of use cases currently handled by support tickets.',
    metrics: ['Self-service export completion rate', 'Export-related support tickets', 'Wizard abandonment rate', 'Scheduled export adoption'],
    raid: [
      { issue: 'Large dataset timeout', desc: 'Exports over 100k rows timeout in the current architecture.', severity: 'High', mitigation: 'Design async export with email notification when ready. Add progress indicator and estimated time. Coordinate with eng on background job queue.', logged: '2026-06-11', needed: '2026-06-28', resolved: '', owner: 'Luca Bianchi' },
    ],
    decisions: [
      { name: 'Step-by-step wizard over single form', desc: 'Adopted 4-step wizard: Select Data → Configure Format → Schedule → Preview & Export.', artifacts: 'Figma: Export Wizard Flow, PRD: Data Export Requirements v1.2', needed: '2026-06-09', resolved: '2026-06-11', owner: 'Luca Bianchi' },
    ],
    platforms: { design: 'Figma (flow + interaction specs)', research: 'UserTesting (task-based sessions)', engineering: 'React, Node.js, AWS S3 (export storage)' },
    contacts: {
      ux: [{ name: 'Luca Bianchi', role: 'Lead Designer' }],
      engineering: [{ name: 'Dana Kim', role: 'Full-stack' }, { name: 'Lin Wei', role: 'Backend' }],
      pm: [{ name: 'Rachel Hong', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Dir. of Engineering', role: 'Technical approver' }],
    },
  },
  'Profile edit flow': {
    overview: 'Improve the profile editing experience with inline editing, better avatar upload, and real-time validation feedback.',
    goal: 'Increase profile completion rate from 45% to 70% and reduce save-error occurrences by 50%.',
    metrics: ['Profile completion rate', 'Save error rate', 'Avg. fields completed', 'Avatar upload rate'],
    raid: [
      { issue: 'Image processing pipeline', desc: 'Avatar crops and resizes need server-side processing with size limits.', severity: 'Low', mitigation: 'Design client-side crop tool with clear size guidance. Show processing state during upload.', logged: '2026-06-22', needed: '2026-07-08', resolved: '', owner: 'Kim Tanaka' },
    ],
    decisions: [
      { name: 'Inline edit mode', desc: 'Users edit fields directly on the profile page rather than navigating to a separate form.', artifacts: 'Figma: Profile Inline Edit States', needed: '2026-06-20', resolved: '2026-06-21', owner: 'Kim Tanaka' },
    ],
    platforms: { design: 'Figma (interaction specs)', research: 'Hotjar (session recordings)', engineering: 'React, Cloudinary (image processing)' },
    contacts: {
      ux: [{ name: 'Kim Tanaka', role: 'Lead Designer' }],
      engineering: [{ name: 'Sam Torres', role: 'Frontend' }],
      pm: [{ name: 'Taylor Kim', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Taylor Kim', role: 'Approver' }],
    },
  },
  'Alert system design': {
    overview: 'Design a flexible alert system for system-wide announcements, maintenance windows, and urgent user-facing warnings with dismissal and escalation patterns.',
    goal: 'Provide a consistent alert framework that reduces ad-hoc banner implementations and ensures critical messages reach 95%+ of active users.',
    metrics: ['Alert visibility rate', 'Dismissal rate by type', 'Time to action on critical alerts', 'Dev implementation time for new alert types'],
    raid: [
      { issue: 'Alert hierarchy conflicts', desc: 'Multiple simultaneous alerts may compete for attention in the same viewport region.', severity: 'Medium', mitigation: 'Design stacking/priority rules. Maximum 2 visible alerts; queue lower-priority. Document hierarchy in design system.', logged: '2026-06-18', needed: '2026-07-02', resolved: '', owner: 'Dan Reeves' },
    ],
    decisions: [
      { name: 'Three-tier severity model', desc: 'Alerts categorized as Info, Warning, and Critical with distinct visual treatments and dismissal rules.', artifacts: 'Figma: Alert Component Library, FigJam: Alert Taxonomy Workshop', needed: '2026-06-15', resolved: '2026-06-17', owner: 'Dan Reeves' },
    ],
    platforms: { design: 'Figma (design system components)', research: 'Heuristic review, competitive audit', engineering: 'React, Design System (Storybook)' },
    contacts: {
      ux: [{ name: 'Dan Reeves', role: 'Lead Designer' }],
      engineering: [{ name: 'Navid Rahimi', role: 'Frontend Lead' }],
      pm: [{ name: 'Rachel Hong', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Dir. of Engineering', role: 'Approver' }],
    },
  },
  'Permissions matrix': {
    overview: 'Design a role-based permissions management interface allowing admins to configure granular access controls across workspace features.',
    goal: 'Replace the current binary admin/member model with flexible role-based access, reducing permission-related escalations by 60%.',
    metrics: ['Permission escalation tickets', 'Role configuration time', 'Admin self-service rate', 'Incorrect permission incidents'],
    raid: [
      { issue: 'Dependency on IAM team', desc: 'The identity and access management team hasn\'t finalized the role schema that this UI depends on.', severity: 'High', mitigation: 'Design against proposed schema with flexibility for changes. Attend IAM weekly syncs. Identify minimum viable role set to unblock design.', logged: '2026-06-08', needed: '2026-06-20', resolved: '', owner: 'Dan Reeves' },
    ],
    decisions: [
      { name: 'Matrix view for permissions', desc: 'Adopted a role × feature matrix view with toggle controls, replacing a list-based approach.', artifacts: 'Figma: Permissions Matrix Explorations, FigJam: Admin Needs Workshop', needed: '2026-06-06', resolved: '2026-06-08', owner: 'Dan Reeves' },
    ],
    platforms: { design: 'Figma (complex table interactions)', research: 'Admin user interviews (Dovetail)', engineering: 'React, Custom IAM API (in development)' },
    contacts: {
      ux: [{ name: 'Dan Reeves', role: 'Lead Designer' }],
      engineering: [{ name: 'Jordan Lee', role: 'IAM Backend' }, { name: 'Navid Rahimi', role: 'Frontend' }],
      pm: [{ name: 'Marco Silva', role: 'Platform PM' }],
      decisionMakers: [{ name: 'CISO', role: 'Security approver' }, { name: 'Marco Silva', role: 'Product approver' }],
    },
  },
  'Filter panel redesign': {
    overview: 'Redesign the global filter panel to support saved filter presets, better multi-select interactions, and clear active-filter visibility.',
    goal: 'Increase filter usage by 40% and reduce time to apply complex filter combinations by 50%.',
    metrics: ['Filter usage rate', 'Time to apply filters', 'Saved preset adoption', 'Filter reset rate'],
    raid: [
      { issue: 'PM unavailable for review', desc: 'Product manager on leave until next week, blocking approval of filter taxonomy.', severity: 'Medium', mitigation: 'Proceed with design based on existing requirements. Schedule review for first day PM returns. Identify backup approver for urgent decisions.', logged: '2026-06-20', needed: '2026-06-27', resolved: '', owner: 'Sara Müller' },
    ],
    decisions: [
      { name: 'Persistent filter bar with expandable panel', desc: 'Active filters shown as chips in a persistent bar; full panel expands on interaction.', artifacts: 'Figma: Filter Panel v3, FigJam: Filter Interaction Patterns', needed: '2026-06-14', resolved: '2026-06-16', owner: 'Sara Müller' },
    ],
    platforms: { design: 'Figma (interaction prototypes)', research: 'Maze (A/B concept test), FullStory (current filter behavior)', engineering: 'React, URL state management' },
    contacts: {
      ux: [{ name: 'Sara Müller', role: 'Lead Designer' }],
      engineering: [{ name: 'Chris Park', role: 'Frontend' }],
      pm: [{ name: 'Marco Silva', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Marco Silva', role: 'Approver' }],
    },
  },
};

// Fallback for projects without detailed data
function getProjectDetail(title) {
  if (projectDetails[title]) return projectDetails[title];
  return {
    overview: 'Project details are being compiled. Check back soon for full overview and tracking information.',
    goal: 'Goal documentation in progress.',
    metrics: ['To be defined'],
    raid: [],
    decisions: [],
    platforms: { design: 'Figma', research: 'TBD', engineering: 'TBD' },
    contacts: {
      ux: [{ name: 'Unassigned', role: '' }],
      engineering: [{ name: 'Unassigned', role: '' }],
      pm: [{ name: 'Unassigned', role: '' }],
      decisionMakers: [{ name: 'TBD', role: '' }],
    },
  };
}

// ── MODAL LOGIC ──
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

function openProjectModal(title) {
  const d = getProjectDetail(title);
  let html = `<h2>${title}</h2><p class="modal-subtitle">Project Overview</p>`;

  // Overview & Goal
  html += `<h3>Overview & Primary Goal</h3>`;
  html += `<p>${d.overview}</p>`;
  html += `<p><strong>Primary Goal:</strong> ${d.goal}</p>`;

  // Success Metrics
  html += `<h3>Success Metrics</h3>`;
  html += `<ul class="metrics-list">${d.metrics.map(m => `<li>${m}</li>`).join('')}</ul>`;

  // RAID Log
  html += `<h3>RAID Log</h3>`;
  if (d.raid.length > 0) {
    html += `<table><thead><tr>
      <th>Issue</th><th>Description</th><th>Severity</th><th>Mitigation Plan</th><th>Logged</th><th>Needed</th><th>Resolved</th><th>Owner</th>
    </tr></thead><tbody>`;
    d.raid.forEach(r => {
      html += `<tr>
        <td>${r.issue}</td><td>${r.desc}</td><td>${r.severity}</td><td>${r.mitigation}</td>
        <td>${r.logged}</td><td>${r.needed}</td><td>${r.resolved || '—'}</td><td>${r.owner}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  } else {
    html += `<p>No RAID items logged.</p>`;
  }

  // Key Decision Log
  html += `<h3>Key Decision Log</h3>`;
  if (d.decisions.length > 0) {
    html += `<table><thead><tr>
      <th>Decision</th><th>Description</th><th>Key Artifact Links</th><th>Date Needed</th><th>Date Resolved</th><th>Owner</th>
    </tr></thead><tbody>`;
    d.decisions.forEach(dec => {
      html += `<tr>
        <td>${dec.name}</td><td>${dec.desc}</td><td>${dec.artifacts}</td>
        <td>${dec.needed}</td><td>${dec.resolved || '—'}</td><td>${dec.owner}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  } else {
    html += `<p>No decisions logged yet.</p>`;
  }

  // Platforms
  html += `<h3>Platforms</h3>`;
  html += `<div class="platform-grid">
    <div class="platform-item"><strong>Design</strong><span>${d.platforms.design}</span></div>
    <div class="platform-item"><strong>UX Research</strong><span>${d.platforms.research}</span></div>
    <div class="platform-item"><strong>Engineering</strong><span>${d.platforms.engineering}</span></div>
  </div>`;

  // Team Contacts
  html += `<h3>Team Contacts</h3>`;
  html += `<div class="contacts-grid">`;
  html += `<div class="contact-group"><strong>UX</strong><ul>${d.contacts.ux.map(c => `<li>${c.name}${c.role ? `<span class="contact-role">— ${c.role}</span>` : ''}</li>`).join('')}</ul></div>`;
  html += `<div class="contact-group"><strong>Engineering</strong><ul>${d.contacts.engineering.map(c => `<li>${c.name}${c.role ? `<span class="contact-role">— ${c.role}</span>` : ''}</li>`).join('')}</ul></div>`;
  html += `<div class="contact-group"><strong>Product Management</strong><ul>${d.contacts.pm.map(c => `<li>${c.name}${c.role ? `<span class="contact-role">— ${c.role}</span>` : ''}</li>`).join('')}</ul></div>`;
  html += `<div class="contact-group"><strong>Key Decision Makers</strong><ul>${d.contacts.decisionMakers.map(c => `<li>${c.name}${c.role ? `<span class="contact-role">— ${c.role}</span>` : ''}</li>`).join('')}</ul></div>`;
  html += `</div>`;

  modalContent.innerHTML = html;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProjectModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeProjectModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeProjectModal();
});

// Attach click handlers to kanban cards (delegated for sort re-renders)
kanbanEl.addEventListener('click', (e) => {
  const card = e.target.closest('.kanban-card[data-project]');
  if (card && !e.target.closest('.kanban-sort-btn')) {
    openProjectModal(card.dataset.project);
  }
});

// Attach click handlers to project links (delegated for sorting re-renders)
document.addEventListener('click', (e) => {
  const link = e.target.closest('.project-link[data-project]');
  if (link) {
    e.preventDefault();
    openProjectModal(link.dataset.project);
  }
});

// ── ISSUE MODAL ──
function openIssueModal(issueName) {
  const d = debtData.find(item => item.issue === issueName);
  if (!d) return;
  const sevColor = d.severity === 'High' ? 'var(--red)' : d.severity === 'Medium' ? 'var(--yellow)' : 'var(--green)';
  let html = `<h2>${d.issue}</h2>`;
  html += `<p class="modal-subtitle" style="color:${sevColor}">${d.severity} Severity · ${d.age} old · ${d.screens} screens affected</p>`;
  html += `<h3>Description</h3><p>${d.description}</p>`;
  html += `<h3>Discovered</h3>`;
  html += `<p><strong>${d.caughtBy}</strong> on ${d.caughtDate}</p>`;
  html += `<h3>Impact if Unresolved</h3><p>${d.impact}</p>`;
  modalContent.innerHTML = html;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Delegated click handler for issue links (survives sort re-renders)
document.addEventListener('click', (e) => {
  const link = e.target.closest('.issue-link[data-issue]');
  if (link) {
    e.preventDefault();
    openIssueModal(link.dataset.issue);
  }
});
