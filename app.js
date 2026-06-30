// ── NAV SWITCHING ──
document.querySelectorAll('.nav-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('view-' + btn.dataset.view).classList.add('active');
  });
});

document.querySelector('.logo').addEventListener('click', () => {
  document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelector('.nav-tabs button[data-view="overview"]').classList.add('active');
  document.getElementById('view-overview').classList.add('active');
});

// ── ATTENTION BANNER DISMISS ──
document.getElementById('attention-dismiss').addEventListener('click', () => {
  document.getElementById('attention-banner').classList.add('hidden');
});

// ── DOMAIN HEALTH ──
const domainHealth = [
  { domain: 'Project Pipeline', status: 'yellow', metric: '9', metricLabel: 'past deadline', trend: [3, 2, 5, 4, 6, 8, 9], statusText: 'Warning — trending up this week' },
  { domain: 'Team Capacity', status: 'yellow', metric: '77%', metricLabel: 'utilized', trend: [80, 78, 75, 77, 74, 76, 77], statusText: 'Warning — 7 designers overallocated' },
  { domain: 'Design System', status: 'green', metric: '87%', metricLabel: 'adoption', trend: [79, 81, 82, 84, 85, 86, 87], statusText: 'Healthy — adoption trending up' },
  { domain: 'Available Resources', status: 'green', metric: '9', metricLabel: 'designers free', trend: [4, 4, 6, 5, 6, 7, 9], statusText: 'Healthy — capacity opening up' },
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
  const sparkColor = d.status === 'yellow' ? '#ca8a04' : d.status === 'red' ? '#dc2626' : '#16a34a';
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
  { name: 'Alex Chen',       projects: 'Checkout redesign, Mobile nav patterns',                    util: 92, status: 'high', nextAvailable: '2026-07-14' },
  { name: 'Priya Sharma',    projects: 'Onboarding flow v2, Card component variants',              util: 74, status: 'ok',   nextAvailable: '2026-07-07' },
  { name: 'James Okafor',    projects: 'Dashboard v2 layouts, Settings page cleanup',              util: 85, status: 'ok',   nextAvailable: '2026-07-10' },
  { name: 'Mei Lin',         projects: 'Icon library expansion, Color token update',               util: 68, status: 'ok',   nextAvailable: '2026-07-03' },
  { name: 'Sara Müller',     projects: 'Search results page, Filter panel redesign, Data visualization', util: 80, status: 'ok', nextAvailable: '2026-07-08' },
  { name: 'Dan Reeves',      projects: 'Notification center, Alert system design, Permissions matrix', util: 88, status: 'high', nextAvailable: '2026-07-15' },
  { name: 'Kim Tanaka',      projects: 'Profile edit flow, Loading skeleton specs',                util: 55, status: 'low',  nextAvailable: '2026-07-02' },
  { name: 'Luca Bianchi',    projects: 'Data export wizard, Table pagination',                     util: 72, status: 'ok',   nextAvailable: '2026-07-05' },
  { name: 'Maria Lopez',     projects: 'Brand refresh, Marketing landing pages, Campaign templates', util: 91, status: 'high', nextAvailable: '2026-07-18' },
  { name: 'Sam Rivera',      projects: 'Empty states audit, Illustration library',                 util: 67, status: 'ok',   nextAvailable: '2026-07-04' },
  { name: 'Taylor Nguyen',   projects: 'Admin portal, User management console',                    util: 86, status: 'high', nextAvailable: '2026-07-16' },
  { name: 'Jordan Williams', projects: 'Billing page update, Payment history, Subscription management', util: 78, status: 'ok', nextAvailable: '2026-07-09' },
  { name: 'Chris Park',      projects: 'Mobile gestures, Pull-to-refresh',                         util: 70, status: 'ok',   nextAvailable: '2026-07-04' },
  { name: 'Aisha Patel',     projects: 'Design system v4, Component audit, Accessibility toolkit', util: 94, status: 'high', nextAvailable: '2026-07-21' },
  { name: 'Lin Wei',         projects: 'Error message review, Form validation patterns',           util: 76, status: 'ok',   nextAvailable: '2026-07-08' },
  { name: 'Marco Silva',     projects: 'FAQ page refresh',                                         util: 64, status: 'ok',   nextAvailable: '2026-07-03' },
  { name: 'Dana Kim',        projects: 'Reporting dashboard, Export templates, Chart components',   util: 82, status: 'ok',   nextAvailable: '2026-07-11' },
  { name: 'Rachel Hong',     projects: 'Collaboration tools, Comments system, Activity feed',      util: 77, status: 'ok',   nextAvailable: '2026-07-09' },
  { name: 'Navid Rahimi',    projects: 'API documentation portal, Developer onboarding, SDK playground', util: 87, status: 'high', nextAvailable: '2026-07-17' },
  { name: 'Sophie Chen',     projects: 'Tooltip standardization, Badge system',                    util: 69, status: 'ok',   nextAvailable: '2026-07-04' },
  { name: 'Ben Kowalski',    projects: 'Inventory management, Product catalog, Bulk actions',      util: 79, status: 'ok',   nextAvailable: '2026-07-10' },
  { name: 'Yuki Sato',       projects: 'Loading states',                                           util: 62, status: 'low',  nextAvailable: '2026-07-02' },
  { name: 'Emma Torres',     projects: 'Customer portal redesign, Support ticket flow, Knowledge base', util: 90, status: 'high', nextAvailable: '2026-07-19' },
  { name: 'Ryan O\'Brien',   projects: 'Help center redesign, Contextual tooltips',               util: 75, status: 'ok',   nextAvailable: '2026-07-07' },
  { name: 'Nadia Hassan',    projects: 'Accessibility audit',                                      util: 56, status: 'low',  nextAvailable: '2026-07-01' },
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
  allocation: [68, 70, 72, 74, 76, 78, 80, 82, 79, 77, 75, 73, 74, 76, 78, 79, 78, 77],
  requests:   [18, 22, 25, 28, 32, 38, 35, 44, 41, 38, 32, 28, 34, 38, 42, 44, 40, 44],
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
      <path d="${allocArea}" fill="rgba(37,99,235,0.08)"/>
      <path d="${allocLine}" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
      <path d="${reqArea}" fill="rgba(202,138,4,0.08)"/>
      <path d="${reqLine}" fill="none" stroke="var(--yellow)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
    </svg>
    <div class="chart-legend">
      <span class="legend-alloc">Avg Allocation %</span>
      <span class="legend-requests">Open Requests</span>
    </div>`;
})();

// ── PIPELINE / KANBAN DATA ──
const pipelineData = {
  queued: [
    { title: 'Responsive email templates', meta: 'Requester: Marketing — Lisa', days: 2, risk: 'low' },
    { title: 'Campaign templates', meta: 'Requester: Marketing — Lisa', days: 1, risk: 'low' },
    { title: 'Role configuration', meta: 'Requester: Security — Ops', days: 3, risk: 'medium' },
    { title: 'Token migration', meta: 'Requester: Design System — Aisha', days: 2, risk: 'medium' },
    { title: 'SDK playground', meta: 'Requester: Eng — DevRel', days: 1, risk: 'low' },
    { title: 'Knowledge base', meta: 'Requester: Support — Ops', days: 4, risk: 'medium' },
    { title: 'Analytics widgets', meta: 'Requester: PM — Rachel', days: 2, risk: 'low' },
    { title: 'Subscription management', meta: 'Requester: PM — Jordan', days: 3, risk: 'low' },
    { title: 'Form validation patterns', meta: 'Requester: Design — Lin', days: 1, risk: 'low' },
    { title: 'Chart components', meta: 'Requester: PM — Dana', days: 2, risk: 'low' },
    { title: 'Bulk actions', meta: 'Requester: PM — Ben', days: 4, risk: 'medium' },
    { title: 'Activity feed', meta: 'Requester: PM — Rachel', days: 3, risk: 'low' },
    { title: 'Contextual tooltips', meta: 'Requester: Design — Ryan', days: 1, risk: 'low' },
    { title: 'Illustration library', meta: 'Requester: Brand — Sam', days: 2, risk: 'low' },
    { title: 'Badge system', meta: 'Requester: Design — Sophie', days: 3, risk: 'low' },
    { title: 'Pull-to-refresh', meta: 'Requester: Mobile — Chris', days: 2, risk: 'low' },
  ],
  progress: [
    { title: 'Checkout redesign', meta: 'Alex Chen — Sprint 14', days: 5, risk: 'high', riskReason: 'Revenue-critical flow, tight launch deadline' },
    { title: 'Mobile nav patterns', meta: 'Alex Chen — Sprint 14', days: 4, risk: 'medium' },
    { title: 'Onboarding flow v2', meta: 'Priya Sharma — Sprint 14', days: 3, risk: 'medium' },
    { title: 'Dashboard v2 layouts', meta: 'James Okafor — Sprint 14', days: 6, risk: 'high', riskReason: 'Scope creep — 3 new panels added mid-sprint' },
    { title: 'Search results page', meta: 'Sara Müller — Sprint 14', days: 2, risk: 'low' },
    { title: 'Notification center', meta: 'Dan Reeves — Sprint 14', days: 3, risk: 'low' },
    { title: 'Data export wizard', meta: 'Luca Bianchi — Sprint 14', days: 4, risk: 'medium' },
    { title: 'Profile edit flow', meta: 'Kim Tanaka — Sprint 14', days: 1, risk: 'low' },
    { title: 'Settings page cleanup', meta: 'James Okafor — Sprint 14', days: 7, risk: 'high', blocked: 'Waiting on API spec' },
    { title: 'Alert system design', meta: 'Dan Reeves — Sprint 14', days: 2, risk: 'low' },
    { title: 'Brand refresh', meta: 'Maria Lopez — Sprint 14', days: 8, risk: 'high', blocked: 'Executive feedback pending since Jun 24' },
    { title: 'Marketing landing pages', meta: 'Maria Lopez — Sprint 14', days: 4, risk: 'medium' },
    { title: 'Admin portal', meta: 'Taylor Nguyen — Sprint 14', days: 5, risk: 'high', blocked: 'Dependent on IAM role schema' },
    { title: 'User management console', meta: 'Taylor Nguyen — Sprint 14', days: 3, risk: 'medium' },
    { title: 'Design system v4', meta: 'Aisha Patel — Sprint 14', days: 9, risk: 'high', blocked: 'Waiting on breaking change approval from platform team' },
    { title: 'Component audit', meta: 'Aisha Patel — Sprint 14', days: 2, risk: 'low' },
    { title: 'API documentation portal', meta: 'Navid Rahimi — Sprint 14', days: 4, risk: 'low' },
    { title: 'Developer onboarding', meta: 'Navid Rahimi — Sprint 14', days: 3, risk: 'medium' },
    { title: 'Customer portal redesign', meta: 'Emma Torres — Sprint 14', days: 6, risk: 'high', blocked: 'Client API migration in progress' },
    { title: 'Support ticket flow', meta: 'Emma Torres — Sprint 14', days: 3, risk: 'medium' },
    { title: 'Billing page update', meta: 'Jordan Williams — Sprint 14', days: 2, risk: 'low' },
    { title: 'Payment history', meta: 'Jordan Williams — Sprint 14', days: 3, risk: 'low' },
    { title: 'Error message review', meta: 'Lin Wei — Sprint 14', days: 2, risk: 'low' },
    { title: 'Reporting dashboard', meta: 'Dana Kim — Sprint 14', days: 5, risk: 'medium', blocked: 'Data pipeline migration pending' },
    { title: 'Export templates', meta: 'Dana Kim — Sprint 14', days: 2, risk: 'low' },
    { title: 'Inventory management', meta: 'Ben Kowalski — Sprint 14', days: 4, risk: 'medium' },
    { title: 'Product catalog', meta: 'Ben Kowalski — Sprint 14', days: 3, risk: 'low' },
    { title: 'Collaboration tools', meta: 'Rachel Hong — Sprint 14', days: 4, risk: 'medium', blocked: 'Eng team reassigned to incident' },
    { title: 'Help center redesign', meta: 'Ryan O\'Brien — Sprint 14', days: 3, risk: 'low' },
    { title: 'Data visualization', meta: 'Sara Müller — Sprint 14', days: 4, risk: 'medium' },
  ],
  review: [
    { title: 'Icon library expansion', meta: 'Mei Lin — Review by leads', days: 3, risk: 'low' },
    { title: 'Color token update', meta: 'Mei Lin — Review by leads', days: 2, risk: 'medium' },
    { title: 'Card component variants', meta: 'Priya Sharma — Eng review', days: 1, risk: 'low' },
    { title: 'Loading skeleton specs', meta: 'Kim Tanaka — PM review', days: 4, risk: 'medium' },
    { title: 'Table pagination', meta: 'Luca Bianchi — Eng review', days: 2, risk: 'low' },
    { title: 'Filter panel redesign', meta: 'Sara Müller — PM review', days: 5, risk: 'high', blocked: 'PM unavailable' },
    { title: 'Empty states audit', meta: 'Sam Rivera — Design review', days: 2, risk: 'low' },
    { title: 'FAQ page refresh', meta: 'Marco Silva — PM review', days: 3, risk: 'low' },
    { title: 'Tooltip standardization', meta: 'Sophie Chen — Design review', days: 2, risk: 'low' },
    { title: 'Loading states', meta: 'Yuki Sato — Eng review', days: 1, risk: 'low' },
    { title: 'Mobile gestures', meta: 'Chris Park — Eng review', days: 3, risk: 'medium' },
    { title: 'Accessibility audit', meta: 'Nadia Hassan — Lead review', days: 4, risk: 'medium' },
    { title: 'Comments system', meta: 'Rachel Hong — Eng review', days: 2, risk: 'low' },
    { title: 'Accessibility toolkit', meta: 'Aisha Patel — Lead review', days: 3, risk: 'medium' },
    { title: 'Permissions matrix', meta: 'Dan Reeves — Security review', days: 5, risk: 'high', blocked: 'Dependency on IAM team' },
    { title: 'Inventory pricing', meta: 'Ben Kowalski — PM review', days: 2, risk: 'low' },
    { title: 'Onboarding metrics', meta: 'Priya Sharma — PM review', days: 1, risk: 'low' },
    { title: 'Notification preferences', meta: 'Dan Reeves — PM review', days: 2, risk: 'low' },
    { title: 'Admin analytics', meta: 'Taylor Nguyen — PM review', days: 3, risk: 'medium' },
    { title: 'Portal navigation', meta: 'Emma Torres — UX review', days: 2, risk: 'low' },
  ],
  blocked: [
    { title: 'Settings page cleanup', meta: 'James Okafor', days: 7, risk: 'high', blocked: 'Waiting on API spec' },
    { title: 'Filter panel redesign', meta: 'Sara Müller', days: 5, risk: 'high', blocked: 'PM unavailable for review' },
    { title: 'Permissions matrix', meta: 'Dan Reeves', days: 9, risk: 'high', blocked: 'Dependency on IAM team' },
    { title: 'Design system v4', meta: 'Aisha Patel', days: 9, risk: 'high', blocked: 'Waiting on breaking change approval from platform team' },
    { title: 'Customer portal redesign', meta: 'Emma Torres', days: 6, risk: 'high', blocked: 'Client API migration in progress' },
    { title: 'Brand refresh', meta: 'Maria Lopez', days: 8, risk: 'high', blocked: 'Executive feedback pending since Jun 24' },
    { title: 'Admin portal', meta: 'Taylor Nguyen', days: 5, risk: 'high', blocked: 'Dependent on IAM role schema' },
    { title: 'Collaboration tools', meta: 'Rachel Hong', days: 4, risk: 'medium', blocked: 'Eng team reassigned to incident' },
    { title: 'Reporting dashboard', meta: 'Dana Kim', days: 5, risk: 'medium', blocked: 'Data pipeline migration pending' },
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

// Populate designer filter dropdown
const designerSelect = document.getElementById('filter-designer');
const allDesigners = new Set();
Object.values(pipelineData).forEach(items => {
  items.forEach(item => {
    if (item.meta.startsWith('Requester:')) return;
    const name = item.meta.split(' — ')[0];
    allDesigners.add(name);
  });
});
[...allDesigners].sort().forEach(name => {
  designerSelect.innerHTML += `<option value="${name}">${name}</option>`;
});

function getActiveFilters() {
  return {
    risk: document.getElementById('filter-risk').value,
    designer: document.getElementById('filter-designer').value,
    blocked: document.getElementById('filter-blocked').value,
  };
}

function applyFilters(items) {
  const f = getActiveFilters();
  return items.filter(item => {
    if (f.risk !== 'all' && item.risk !== f.risk) return false;
    if (f.designer !== 'all' && !item.meta.includes(f.designer)) return false;
    if (f.blocked === 'yes' && !item.blocked) return false;
    if (f.blocked === 'no' && item.blocked) return false;
    return true;
  });
}

function renderKanban() {
  kanbanEl.innerHTML = '';
  cols.forEach(col => {
    let items = applyFilters([...pipelineData[col.key]]);
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
    html += `<button class="kanban-sort-btn${sort && sort.key === 'risk' ? ' active' : ''}" data-col="${col.key}" data-sort="risk"><span class="material-symbols-outlined" style="font-size:12px">sort</span> Sort by Risk${sort && sort.key === 'risk' ? (sort.dir === 'asc' ? ' ↑' : ' ↓') : ''}</button>`;
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

// Filter change handlers
document.getElementById('filter-risk').addEventListener('change', renderKanban);
document.getElementById('filter-designer').addEventListener('change', renderKanban);
document.getElementById('filter-blocked').addEventListener('change', renderKanban);

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
  'Brand refresh': {
    overview: 'Comprehensive visual identity update across all digital touchpoints — color palette evolution, typography refresh, and updated illustration style to reflect the company\'s new positioning.',
    goal: 'Roll out refreshed brand across all product surfaces within Q3, achieving 100% asset replacement with zero regressions in accessibility scores.',
    metrics: ['Asset replacement coverage', 'Brand consistency audit score', 'Accessibility compliance rate', 'Stakeholder approval cycle time'],
    raid: [
      { issue: 'Executive feedback pending', desc: 'VP Marketing and CEO have not provided final sign-off on the updated color palette since Jun 24. Blocking production asset generation.', severity: 'High', mitigation: 'Escalate through design director. Prepare two finalist options for rapid decision meeting. Identify interim palette that can ship without full sign-off.', logged: '2026-06-24', needed: '2026-06-30', resolved: '', owner: 'Maria Lopez' },
      { issue: 'Dark mode contrast ratios', desc: 'New brand blue fails WCAG AA on dark backgrounds at proposed weight.', severity: 'Medium', mitigation: 'Test adjusted tint values. Prepare light-mode-only launch option if dark mode adjustments delay timeline.', logged: '2026-06-20', needed: '2026-07-05', resolved: '', owner: 'Maria Lopez' },
    ],
    decisions: [
      { name: 'Evolutionary (not revolutionary) rebrand', desc: 'Preserve brand recognition — refine, don\'t replace. Focus on modernization within existing brand architecture.', artifacts: 'FigJam: Brand Evolution Moodboard, Figma: Color Palette Candidates', needed: '2026-06-10', resolved: '2026-06-12', owner: 'CMO' },
    ],
    platforms: { design: 'Figma (brand library & token definitions)', research: 'Brand perception survey (Typeform), A/B landing page tests', engineering: 'Design tokens (Style Dictionary), CSS custom properties' },
    contacts: {
      ux: [{ name: 'Maria Lopez', role: 'Lead Designer' }],
      engineering: [{ name: 'Sam Torres', role: 'Frontend — Token integration' }],
      pm: [{ name: 'Rachel Hong', role: 'Brand PM' }],
      decisionMakers: [{ name: 'CMO', role: 'Final approver' }, { name: 'VP Marketing', role: 'Brand direction' }],
    },
  },
  'Marketing landing pages': {
    overview: 'Design a set of modular, conversion-optimized landing page templates for marketing campaigns. Templates should support multiple layouts and be easily customizable by the marketing team.',
    goal: 'Deliver 5 reusable landing page templates that increase campaign conversion rates by 15% and reduce marketing design requests by 40%.',
    metrics: ['Campaign conversion rate', 'Template reuse rate', 'Time to launch new campaign', 'Marketing design request volume'],
    raid: [
      { issue: 'Brand refresh dependency', desc: 'Landing pages should use new brand assets, but brand refresh approval is delayed.', severity: 'Medium', mitigation: 'Build templates with token-based theming so brand swap is a config change. Proceed with current brand as fallback.', logged: '2026-06-22', needed: '2026-07-05', resolved: '', owner: 'Maria Lopez' },
    ],
    decisions: [
      { name: 'Modular section-based templates', desc: 'Templates composed of stackable sections (hero, features, testimonials, CTA) rather than fixed layouts.', artifacts: 'Figma: Landing Page Section Library, FigJam: Template Architecture', needed: '2026-06-16', resolved: '2026-06-18', owner: 'Maria Lopez' },
    ],
    platforms: { design: 'Figma (template library)', research: 'Hotjar (heatmaps on existing pages), Google Optimize (A/B)', engineering: 'Next.js, Contentful CMS, Tailwind' },
    contacts: {
      ux: [{ name: 'Maria Lopez', role: 'Lead Designer' }],
      engineering: [{ name: 'Lin Wei', role: 'Frontend' }],
      pm: [{ name: 'Rachel Hong', role: 'Marketing PM' }],
      decisionMakers: [{ name: 'VP Marketing', role: 'Approver' }],
    },
  },
  'Admin portal': {
    overview: 'Design a comprehensive admin portal for workspace management — user provisioning, billing administration, audit logs, and integration management in a unified console.',
    goal: 'Consolidate 6 separate admin tools into a single portal, reducing admin task time by 50% and eliminating context-switching between systems.',
    metrics: ['Admin task completion time', 'Tool consolidation (6→1)', 'Admin satisfaction score', 'Support escalations from admins'],
    raid: [
      { issue: 'IAM role schema dependency', desc: 'Portal requires the new identity and access management role schema which is still being finalized by the platform team.', severity: 'High', mitigation: 'Design against proposed schema v2 draft. Maintain flexibility for field additions. Attend weekly IAM syncs and flag blockers to engineering director.', logged: '2026-06-12', needed: '2026-06-25', resolved: '', owner: 'Taylor Nguyen' },
      { issue: 'Audit log data model', desc: 'Audit events are inconsistently structured across services, complicating the unified log view.', severity: 'Medium', mitigation: 'Design filterable log with graceful handling of missing fields. Propose minimum event schema to eng.', logged: '2026-06-18', needed: '2026-07-08', resolved: '', owner: 'Taylor Nguyen' },
    ],
    decisions: [
      { name: 'Left-nav console layout', desc: 'Adopted a persistent left navigation with collapsible sections for each admin domain (Users, Billing, Logs, Integrations).', artifacts: 'Figma: Admin Portal IA, FigJam: Admin Workflow Maps', needed: '2026-06-10', resolved: '2026-06-12', owner: 'Taylor Nguyen' },
    ],
    platforms: { design: 'Figma (enterprise patterns)', research: 'Admin interviews (5 participants), card sort (Optimal Workshop)', engineering: 'React, GraphQL, Custom IAM API' },
    contacts: {
      ux: [{ name: 'Taylor Nguyen', role: 'Lead Designer' }],
      engineering: [{ name: 'Jordan Lee', role: 'IAM Backend' }, { name: 'Navid Rahimi', role: 'Frontend' }],
      pm: [{ name: 'Marco Silva', role: 'Platform PM' }],
      decisionMakers: [{ name: 'Dir. of Engineering', role: 'Technical approver' }, { name: 'CISO', role: 'Security approver' }],
    },
  },
  'User management console': {
    overview: 'Design the user management section of the admin portal — bulk user operations, role assignment interface, invitation flows, and user status management.',
    goal: 'Enable admins to manage users 3x faster than current workflow and support bulk operations for teams of 500+ users.',
    metrics: ['Bulk operation completion rate', 'Time to provision new user', 'Role assignment accuracy', 'Admin efficiency score'],
    raid: [
      { issue: 'Bulk operation performance', desc: 'Applying role changes to 500+ users simultaneously may exceed API rate limits.', severity: 'Medium', mitigation: 'Design progress indicator for bulk ops with queued processing. Add confirmation step showing affected user count. Coordinate with eng on batch endpoints.', logged: '2026-06-20', needed: '2026-07-05', resolved: '', owner: 'Taylor Nguyen' },
    ],
    decisions: [
      { name: 'Table-based management with inline actions', desc: 'Users displayed in a sortable/filterable table with inline role editing and bulk selection checkboxes.', artifacts: 'Figma: User Table Interactions, FigJam: Admin User Flows', needed: '2026-06-14', resolved: '2026-06-16', owner: 'Taylor Nguyen' },
    ],
    platforms: { design: 'Figma (table components & bulk action patterns)', research: 'Competitive audit (Okta, Auth0, WorkOS dashboards)', engineering: 'React, REST API, WebSocket (real-time status)' },
    contacts: {
      ux: [{ name: 'Taylor Nguyen', role: 'Lead Designer' }],
      engineering: [{ name: 'Jordan Lee', role: 'Backend' }, { name: 'Sam Torres', role: 'Frontend' }],
      pm: [{ name: 'Marco Silva', role: 'Platform PM' }],
      decisionMakers: [{ name: 'Marco Silva', role: 'Approver' }],
    },
  },
  'Design system v4': {
    overview: 'Major version update to the design system — introduce semantic token layers, component API redesign, improved theming architecture, and comprehensive documentation overhaul.',
    goal: 'Ship v4 with zero breaking changes unaccounted for, achieve 90% team adoption within 4 weeks of release, and reduce component customization overrides by 60%.',
    metrics: ['Team adoption rate (4-week)', 'Breaking change incidents', 'Component override frequency', 'Documentation coverage score'],
    raid: [
      { issue: 'Breaking change approval pending', desc: 'Platform team has not approved the proposed breaking changes to token naming and component prop APIs. Blocks migration guide authoring.', severity: 'High', mitigation: 'Present impact analysis at next platform review. Prepare backward-compatible shim layer as fallback. Document all breaks with automated codemods.', logged: '2026-06-10', needed: '2026-06-22', resolved: '', owner: 'Aisha Patel' },
      { issue: 'Token migration complexity', desc: '340+ tokens need remapping from flat to semantic hierarchy. Risk of visual regressions in consuming products.', severity: 'High', mitigation: 'Build automated token migration script. Create visual regression test suite. Phase rollout by product area.', logged: '2026-06-14', needed: '2026-07-01', resolved: '', owner: 'Aisha Patel' },
    ],
    decisions: [
      { name: 'Three-tier token architecture', desc: 'Adopted Global → Alias → Component token layers for maximum flexibility and themability.', artifacts: 'Figma: Token Architecture Diagram, FigJam: Token Naming Workshop Output', needed: '2026-06-05', resolved: '2026-06-07', owner: 'Aisha Patel' },
    ],
    platforms: { design: 'Figma (token plugin + component library)', research: 'Internal team survey, system usability testing', engineering: 'Style Dictionary, Storybook, React, Web Components' },
    contacts: {
      ux: [{ name: 'Aisha Patel', role: 'Design System Lead' }],
      engineering: [{ name: 'Navid Rahimi', role: 'Frontend Architect' }, { name: 'Lin Wei', role: 'Token Tooling' }],
      pm: [{ name: 'Rachel Hong', role: 'Platform PM' }],
      decisionMakers: [{ name: 'Head of Design', role: 'System governance' }, { name: 'Dir. of Engineering', role: 'Technical approver' }],
    },
  },
  'Component audit': {
    overview: 'Systematic audit of all existing design system components — identify inconsistencies, deprecated patterns, undocumented variants, and accessibility gaps across the library.',
    goal: 'Produce a prioritized remediation backlog and achieve 100% documentation coverage for all actively used components.',
    metrics: ['Components audited', 'Issues identified', 'Documentation coverage', 'Accessibility compliance rate'],
    raid: [
      { issue: 'Audit scope larger than estimated', desc: 'Library contains 180+ components vs. estimated 120. Timeline may need extension.', severity: 'Low', mitigation: 'Prioritize top-50 most-used components first. Batch remaining into Phase 2. Use automated tooling where possible.', logged: '2026-06-22', needed: '2026-07-10', resolved: '', owner: 'Aisha Patel' },
    ],
    decisions: [
      { name: 'Usage-based audit priority', desc: 'Audit order determined by Figma analytics — most-inserted components reviewed first.', artifacts: 'Figma: Component Usage Report, Spreadsheet: Audit Tracker', needed: '2026-06-20', resolved: '2026-06-21', owner: 'Aisha Patel' },
    ],
    platforms: { design: 'Figma (library analytics + audit annotations)', research: 'Internal design team feedback survey', engineering: 'Storybook (component catalog), axe-core (a11y testing)' },
    contacts: {
      ux: [{ name: 'Aisha Patel', role: 'Design System Lead' }],
      engineering: [{ name: 'Lin Wei', role: 'Component Dev' }],
      pm: [{ name: 'Rachel Hong', role: 'Platform PM' }],
      decisionMakers: [{ name: 'Head of Design', role: 'Governance' }],
    },
  },
  'API documentation portal': {
    overview: 'Design a developer-facing documentation portal with interactive API references, code examples, authentication guides, and sandbox environments.',
    goal: 'Reduce developer onboarding time by 40% and decrease API-related support tickets by 50% within 3 months of launch.',
    metrics: ['Developer onboarding time', 'API support tickets', 'Documentation page views', 'Sandbox usage rate'],
    raid: [
      { issue: 'OpenAPI spec coverage gaps', desc: 'Several endpoints lack complete OpenAPI specifications, limiting auto-generated docs.', severity: 'Low', mitigation: 'Identify gaps and flag to backend teams. Design manual documentation fallback for undocumented endpoints.', logged: '2026-06-18', needed: '2026-07-10', resolved: '', owner: 'Navid Rahimi' },
    ],
    decisions: [
      { name: 'Three-panel layout', desc: 'Adopted navigation/content/code-example three-panel layout following industry standard (Stripe, Twilio).', artifacts: 'Figma: API Docs Layout, FigJam: Developer Portal Competitive Audit', needed: '2026-06-12', resolved: '2026-06-14', owner: 'Navid Rahimi' },
    ],
    platforms: { design: 'Figma (portal design + code snippet styling)', research: 'Developer interviews (6 participants), competitive analysis', engineering: 'Next.js, MDX, Swagger/OpenAPI, Sandpack (live code)' },
    contacts: {
      ux: [{ name: 'Navid Rahimi', role: 'Lead Designer' }],
      engineering: [{ name: 'Lin Wei', role: 'Backend' }, { name: 'Chris Park', role: 'Frontend' }],
      pm: [{ name: 'Marco Silva', role: 'Developer Experience PM' }],
      decisionMakers: [{ name: 'Dir. of Engineering', role: 'Approver' }],
    },
  },
  'Developer onboarding': {
    overview: 'Design the getting-started experience for new developers integrating with the platform — interactive setup wizard, quickstart guides, and environment configuration flows.',
    goal: 'Get developers from signup to first successful API call in under 10 minutes, with 80%+ completion rate on the quickstart flow.',
    metrics: ['Time to first API call', 'Quickstart completion rate', 'Setup wizard abandonment', 'Developer activation (7-day)'],
    raid: [
      { issue: 'SDK version fragmentation', desc: 'Three SDK versions in production create confusion about which quickstart to show new developers.', severity: 'Medium', mitigation: 'Design version selector at start of flow. Default to latest stable. Add clear deprecation notices for older versions.', logged: '2026-06-16', needed: '2026-07-01', resolved: '', owner: 'Navid Rahimi' },
    ],
    decisions: [
      { name: 'Interactive tutorial over static docs', desc: 'Adopted step-by-step interactive tutorial with real API responses rather than copy-paste documentation.', artifacts: 'Figma: Onboarding Wizard Flow, FigJam: Developer Journey Map', needed: '2026-06-10', resolved: '2026-06-12', owner: 'Navid Rahimi' },
    ],
    platforms: { design: 'Figma (wizard flow + code editor styling)', research: 'Developer usability testing (5 sessions), Maze prototype test', engineering: 'Next.js, Sandpack, Node.js SDK' },
    contacts: {
      ux: [{ name: 'Navid Rahimi', role: 'Lead Designer' }],
      engineering: [{ name: 'Sam Torres', role: 'Frontend' }, { name: 'Jordan Lee', role: 'SDK team' }],
      pm: [{ name: 'Marco Silva', role: 'Developer Experience PM' }],
      decisionMakers: [{ name: 'Marco Silva', role: 'Approver' }],
    },
  },
  'Customer portal redesign': {
    overview: 'Redesign the customer-facing self-service portal — account management, support access, subscription controls, and usage analytics presented in a unified, modern interface.',
    goal: 'Increase portal self-service resolution rate to 75% (from 52%) and reduce live support contacts by 30%.',
    metrics: ['Self-service resolution rate', 'Live support contact reduction', 'Portal NPS', 'Feature discoverability score'],
    raid: [
      { issue: 'Client API migration in progress', desc: 'Backend team is migrating the customer data API to a new service. Schema changes are ongoing and may affect portal data display.', severity: 'High', mitigation: 'Design with data abstraction layer — use placeholder patterns for fields that may change. Get weekly schema update from migration lead. Build fallback for missing data fields.', logged: '2026-06-14', needed: '2026-06-28', resolved: '', owner: 'Emma Torres' },
      { issue: 'SSO integration timeline', desc: 'Enterprise SSO for portal access depends on identity team\'s Q3 roadmap.', severity: 'Medium', mitigation: 'Design email/password auth as baseline. Add SSO as progressive enhancement. Confirm identity team timeline.', logged: '2026-06-20', needed: '2026-07-15', resolved: '', owner: 'Emma Torres' },
    ],
    decisions: [
      { name: 'Dashboard-first information architecture', desc: 'Portal opens to a personalized dashboard with key metrics and action items rather than a navigation menu.', artifacts: 'Figma: Portal Dashboard Concept, FigJam: Customer Journey Map', needed: '2026-06-08', resolved: '2026-06-10', owner: 'Emma Torres' },
    ],
    platforms: { design: 'Figma (responsive portal design)', research: 'Customer interviews (8 participants), Hotjar (current portal analytics)', engineering: 'React, GraphQL, Customer Data Platform' },
    contacts: {
      ux: [{ name: 'Emma Torres', role: 'Lead Designer' }],
      engineering: [{ name: 'Navid Rahimi', role: 'Frontend' }, { name: 'Jordan Lee', role: 'API migration' }],
      pm: [{ name: 'Taylor Kim', role: 'Customer Experience PM' }],
      decisionMakers: [{ name: 'VP Customer Success', role: 'Business approver' }, { name: 'Taylor Kim', role: 'Day-to-day' }],
    },
  },
  'Support ticket flow': {
    overview: 'Redesign the support ticket creation and tracking experience — smart categorization, guided troubleshooting before submission, and real-time status updates.',
    goal: 'Deflect 25% of tickets through guided self-help and reduce average ticket resolution time by 20%.',
    metrics: ['Ticket deflection rate', 'Avg. resolution time', 'Customer satisfaction (CSAT)', 'First-response time'],
    raid: [
      { issue: 'AI categorization accuracy', desc: 'Proposed smart categorization model has 72% accuracy — below the 85% threshold for auto-routing.', severity: 'Medium', mitigation: 'Design human-confirmation step for low-confidence categorizations. Show top-3 suggested categories for user selection. Plan accuracy improvement roadmap.', logged: '2026-06-18', needed: '2026-07-05', resolved: '', owner: 'Emma Torres' },
    ],
    decisions: [
      { name: 'Guided flow before ticket creation', desc: 'Users go through 2–3 troubleshooting steps with relevant help articles before reaching the ticket form.', artifacts: 'Figma: Support Flow Decision Tree, FigJam: Deflection Strategy', needed: '2026-06-12', resolved: '2026-06-14', owner: 'Emma Torres' },
    ],
    platforms: { design: 'Figma (flow + interaction specs)', research: 'Support ticket analysis (Zendesk data), customer interviews', engineering: 'React, Zendesk API, ML categorization service' },
    contacts: {
      ux: [{ name: 'Emma Torres', role: 'Lead Designer' }],
      engineering: [{ name: 'Lin Wei', role: 'Backend' }, { name: 'Sam Torres', role: 'Frontend' }],
      pm: [{ name: 'Taylor Kim', role: 'Customer Experience PM' }],
      decisionMakers: [{ name: 'Head of Support', role: 'Approver' }],
    },
  },
  'Billing page update': {
    overview: 'Refresh the billing and subscription management page with clearer plan comparisons, usage visualization, and self-service upgrade/downgrade flows.',
    goal: 'Reduce billing-related support tickets by 35% and increase self-service plan changes by 50%.',
    metrics: ['Billing support tickets', 'Self-service plan change rate', 'Upgrade conversion', 'Page comprehension score'],
    raid: [
      { issue: 'Pricing model complexity', desc: 'Upcoming usage-based pricing adds complexity to the billing display.', severity: 'Low', mitigation: 'Design flexible billing display that supports both flat and usage-based models. Use progressive disclosure for complex details.', logged: '2026-06-24', needed: '2026-07-12', resolved: '', owner: 'Jordan Williams' },
    ],
    decisions: [
      { name: 'Visual usage meter + invoice history', desc: 'Billing page leads with a visual usage meter and current period cost, with invoice history below.', artifacts: 'Figma: Billing Page Redesign, FigJam: Billing UX Audit', needed: '2026-06-18', resolved: '2026-06-20', owner: 'Jordan Williams' },
    ],
    platforms: { design: 'Figma (billing components)', research: 'Support ticket analysis, competitive audit (Stripe, Paddle)', engineering: 'React, Stripe Billing API' },
    contacts: {
      ux: [{ name: 'Jordan Williams', role: 'Lead Designer' }],
      engineering: [{ name: 'Jordan Lee', role: 'Backend — Payments' }, { name: 'Sam Torres', role: 'Frontend' }],
      pm: [{ name: 'Taylor Kim', role: 'Product Manager' }],
      decisionMakers: [{ name: 'VP Finance', role: 'Pricing approver' }, { name: 'Taylor Kim', role: 'UX approver' }],
    },
  },
  'Payment history': {
    overview: 'Design a comprehensive payment history view with transaction details, receipt downloads, filtering, and export capabilities for accounting teams.',
    goal: 'Enable users to self-serve 90% of payment history inquiries and reduce finance team manual lookups by 60%.',
    metrics: ['Self-service lookup rate', 'Finance team manual requests', 'Receipt download rate', 'Export usage'],
    raid: [
      { issue: 'Historical data migration', desc: 'Transactions older than 18 months are in legacy format and may display inconsistently.', severity: 'Low', mitigation: 'Design graceful fallback for legacy records with "limited detail" indicator. Document data gaps transparently.', logged: '2026-06-22', needed: '2026-07-08', resolved: '', owner: 'Jordan Williams' },
    ],
    decisions: [
      { name: 'Searchable table with expandable rows', desc: 'Transactions in a filterable table; click to expand inline detail panel with receipt and line items.', artifacts: 'Figma: Payment History Table, FigJam: Transaction Detail Requirements', needed: '2026-06-16', resolved: '2026-06-18', owner: 'Jordan Williams' },
    ],
    platforms: { design: 'Figma (table + detail patterns)', research: 'User interviews (finance personas)', engineering: 'React, Stripe API, PDF generation service' },
    contacts: {
      ux: [{ name: 'Jordan Williams', role: 'Lead Designer' }],
      engineering: [{ name: 'Jordan Lee', role: 'Backend — Payments' }],
      pm: [{ name: 'Taylor Kim', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Taylor Kim', role: 'Approver' }],
    },
  },
  'Error message review': {
    overview: 'Comprehensive audit and rewrite of all user-facing error messages across the product — replacing technical jargon with actionable guidance and consistent tone.',
    goal: 'Rewrite 100% of high-frequency error messages to be actionable, achieving a 90%+ comprehension score in user testing.',
    metrics: ['Error comprehension score', 'Error-related support tickets', 'User recovery rate (from error)', 'Message consistency audit score'],
    raid: [
      { issue: 'Error catalog incomplete', desc: 'Engineering has not provided a complete list of error codes and their trigger conditions.', severity: 'Low', mitigation: 'Start with top-50 most frequent errors from analytics. Request full catalog from eng lead by Sprint 15.', logged: '2026-06-24', needed: '2026-07-10', resolved: '', owner: 'Lin Wei' },
    ],
    decisions: [
      { name: 'Three-part error message structure', desc: 'Every error follows: What happened → Why → What to do next. No error codes shown to users by default.', artifacts: 'Figma: Error Message Component, Content guide: Error Writing Standards', needed: '2026-06-20', resolved: '2026-06-22', owner: 'Lin Wei' },
    ],
    platforms: { design: 'Figma (error state components)', research: 'Comprehension testing (UserTesting), analytics (error frequency data)', engineering: 'React (component library), i18n system' },
    contacts: {
      ux: [{ name: 'Lin Wei', role: 'Lead Designer — Content' }],
      engineering: [{ name: 'Navid Rahimi', role: 'Frontend Lead' }],
      pm: [{ name: 'Taylor Kim', role: 'Product Manager' }],
      decisionMakers: [{ name: 'Taylor Kim', role: 'Approver' }],
    },
  },
  'Reporting dashboard': {
    overview: 'Design an analytics reporting dashboard for business stakeholders — configurable reports, scheduled email digests, and exportable visualizations.',
    goal: 'Replace 80% of manual report generation with self-service dashboards and reduce reporting prep time from 4 hours to 30 minutes.',
    metrics: ['Self-service report generation rate', 'Reporting prep time', 'Scheduled report adoption', 'Export/share usage'],
    raid: [
      { issue: 'Data pipeline migration pending', desc: 'The data warehouse is migrating from Redshift to Snowflake. Report queries may need adaptation and some data may be temporarily unavailable.', severity: 'Medium', mitigation: 'Design data-unavailable states gracefully. Coordinate with data eng on migration timeline. Identify which reports are affected and prepare fallback data sources.', logged: '2026-06-16', needed: '2026-07-01', resolved: '', owner: 'Dana Kim' },
      { issue: 'Chart rendering performance', desc: 'Complex multi-series charts with 12-month data may lag on lower-end machines.', severity: 'Low', mitigation: 'Design data aggregation controls (daily/weekly/monthly). Limit visible series to 5 with "show more" option.', logged: '2026-06-22', needed: '2026-07-10', resolved: '', owner: 'Dana Kim' },
    ],
    decisions: [
      { name: 'Template-based report builder', desc: 'Users select from report templates and customize metrics/filters, rather than building from scratch.', artifacts: 'Figma: Report Builder Flow, FigJam: Reporting Needs Workshop', needed: '2026-06-10', resolved: '2026-06-12', owner: 'Dana Kim' },
    ],
    platforms: { design: 'Figma (chart components + report layouts)', research: 'Stakeholder interviews (8 sessions), current report usage analytics', engineering: 'React, D3.js, Snowflake, Scheduled jobs (Temporal)' },
    contacts: {
      ux: [{ name: 'Dana Kim', role: 'Lead Designer' }],
      engineering: [{ name: 'Navid Rahimi', role: 'Frontend' }, { name: 'Lin Wei', role: 'Data Backend' }],
      pm: [{ name: 'Rachel Hong', role: 'Analytics PM' }],
      decisionMakers: [{ name: 'VP Operations', role: 'Business approver' }],
    },
  },
  'Export templates': {
    overview: 'Design reusable export templates for generating branded PDF reports, CSV data extracts, and formatted Excel workbooks from dashboard data.',
    goal: 'Provide 8 pre-built export templates covering 90% of common export use cases, reducing custom export requests by 70%.',
    metrics: ['Template usage rate', 'Custom export requests', 'Export completion rate', 'Template satisfaction score'],
    raid: [
      { issue: 'PDF rendering fidelity', desc: 'Chart visualizations render differently in PDF vs. web — color and font discrepancies.', severity: 'Low', mitigation: 'Design PDF-optimized chart variants. Test across PDF generators. Accept minor cosmetic differences with documentation.', logged: '2026-06-24', needed: '2026-07-12', resolved: '', owner: 'Dana Kim' },
    ],
    decisions: [
      { name: 'Branded templates with customizable sections', desc: 'Each template includes company branding with user-selectable data sections and date ranges.', artifacts: 'Figma: Export Template Gallery, FigJam: Export Requirements Matrix', needed: '2026-06-18', resolved: '2026-06-20', owner: 'Dana Kim' },
    ],
    platforms: { design: 'Figma (print layouts + web preview)', research: 'User interviews (export power users)', engineering: 'Puppeteer (PDF), SheetJS (Excel), Node.js' },
    contacts: {
      ux: [{ name: 'Dana Kim', role: 'Lead Designer' }],
      engineering: [{ name: 'Lin Wei', role: 'Backend' }],
      pm: [{ name: 'Rachel Hong', role: 'Analytics PM' }],
      decisionMakers: [{ name: 'Rachel Hong', role: 'Approver' }],
    },
  },
  'Inventory management': {
    overview: 'Design the inventory management interface for the e-commerce platform — real-time stock levels, low-stock alerts, bulk updates, and supplier integration views.',
    goal: 'Reduce stockout incidents by 40% through better visibility and reduce manual inventory updates by 60% via bulk tooling.',
    metrics: ['Stockout incidents', 'Manual update frequency', 'Inventory accuracy rate', 'Time to restock (from alert)'],
    raid: [
      { issue: 'Multi-warehouse complexity', desc: 'System supports 3 warehouses with different inventory schemas. Unified view requires data normalization.', severity: 'Medium', mitigation: 'Design warehouse selector with aggregated default view. Handle schema differences in display layer. Coordinate unified data model with eng.', logged: '2026-06-18', needed: '2026-07-05', resolved: '', owner: 'Ben Kowalski' },
    ],
    decisions: [
      { name: 'Card grid with table toggle', desc: 'Inventory items shown as visual cards (with stock level bars) by default, with option to switch to dense table view.', artifacts: 'Figma: Inventory Views (Card + Table), FigJam: Inventory Workflow Audit', needed: '2026-06-14', resolved: '2026-06-16', owner: 'Ben Kowalski' },
    ],
    platforms: { design: 'Figma (responsive layouts + data-heavy patterns)', research: 'Warehouse manager interviews, contextual inquiry', engineering: 'React, WebSocket (real-time stock), ERP integration' },
    contacts: {
      ux: [{ name: 'Ben Kowalski', role: 'Lead Designer' }],
      engineering: [{ name: 'Jordan Lee', role: 'Backend' }, { name: 'Sam Torres', role: 'Frontend' }],
      pm: [{ name: 'Taylor Kim', role: 'E-commerce PM' }],
      decisionMakers: [{ name: 'VP Operations', role: 'Business approver' }],
    },
  },
  'Product catalog': {
    overview: 'Design the product catalog management interface — product creation flows, variant management, media uploads, and SEO metadata editing for merchandising teams.',
    goal: 'Reduce time to publish a new product from 45 minutes to 10 minutes and achieve 95% metadata completeness at launch.',
    metrics: ['Time to publish', 'Metadata completeness', 'Publishing error rate', 'Catalog team satisfaction'],
    raid: [
      { issue: 'Image CDN integration', desc: 'New image processing CDN has different format requirements than current system.', severity: 'Low', mitigation: 'Design upload flow with format validation and auto-conversion messaging. Coordinate supported formats list with eng.', logged: '2026-06-22', needed: '2026-07-08', resolved: '', owner: 'Ben Kowalski' },
    ],
    decisions: [
      { name: 'Guided creation wizard + quick-add mode', desc: 'Full wizard for new products (ensures completeness), quick-add form for experienced users adding similar items.', artifacts: 'Figma: Product Creation Flows, FigJam: Catalog Team Workflow Map', needed: '2026-06-16', resolved: '2026-06-18', owner: 'Ben Kowalski' },
    ],
    platforms: { design: 'Figma (form patterns + media management)', research: 'Merchandising team shadowing (3 sessions)', engineering: 'React, Cloudinary (media), PIM system integration' },
    contacts: {
      ux: [{ name: 'Ben Kowalski', role: 'Lead Designer' }],
      engineering: [{ name: 'Chris Park', role: 'Frontend' }, { name: 'Lin Wei', role: 'Backend' }],
      pm: [{ name: 'Taylor Kim', role: 'E-commerce PM' }],
      decisionMakers: [{ name: 'Head of Merchandising', role: 'Business approver' }],
    },
  },
  'Collaboration tools': {
    overview: 'Design real-time collaboration features — shared workspaces, commenting, @mentions, presence indicators, and activity feeds for team coordination.',
    goal: 'Increase in-app collaboration by 50% (reduce reliance on external tools like Slack for work-related discussions) and improve decision traceability.',
    metrics: ['In-app comment volume', 'External tool message reduction', 'Decision traceability (linked comments)', 'Feature adoption rate'],
    raid: [
      { issue: 'Engineering team reassigned to incident', desc: 'The primary frontend engineer supporting this project was reassigned to a P0 production incident. Unclear when they will return.', severity: 'Medium', mitigation: 'Continue design work independently. Prepare detailed specs for async handoff. Request backup engineer allocation from eng manager. Identify non-blocked deliverables.', logged: '2026-06-22', needed: '2026-07-01', resolved: '', owner: 'Rachel Hong' },
      { issue: 'Real-time sync conflicts', desc: 'Simultaneous edits to shared content may cause merge conflicts in the collaboration model.', severity: 'Medium', mitigation: 'Design optimistic UI with conflict resolution patterns. Show presence cursors to reduce collision. Implement last-write-wins with undo for simple cases.', logged: '2026-06-18', needed: '2026-07-08', resolved: '', owner: 'Rachel Hong' },
    ],
    decisions: [
      { name: 'Contextual comments over separate discussion tab', desc: 'Comments attached to specific elements/sections rather than in a separate discussion panel.', artifacts: 'Figma: Comment Interaction Patterns, FigJam: Collaboration Feature Map', needed: '2026-06-12', resolved: '2026-06-14', owner: 'Rachel Hong' },
    ],
    platforms: { design: 'Figma (real-time interaction patterns)', research: 'Team workflow interviews, collaboration tool audit', engineering: 'React, WebSocket, CRDT (Yjs), PostgreSQL' },
    contacts: {
      ux: [{ name: 'Rachel Hong', role: 'Lead Designer' }],
      engineering: [{ name: 'Navid Rahimi', role: 'Frontend Lead' }, { name: 'Jordan Lee', role: 'Real-time Backend' }],
      pm: [{ name: 'Rachel Hong', role: 'Product Manager' }],
      decisionMakers: [{ name: 'CPO', role: 'Strategic approver' }],
    },
  },
  'Help center redesign': {
    overview: 'Redesign the help center with improved search, contextual help suggestions, video tutorials, and a modern knowledge base layout that reduces support ticket volume.',
    goal: 'Increase help center self-service resolution to 65% and reduce support tickets by 25% within 3 months of launch.',
    metrics: ['Self-service resolution rate', 'Support ticket reduction', 'Search success rate', 'Article helpfulness score'],
    raid: [
      { issue: 'Content migration volume', desc: '400+ help articles need review and migration from legacy CMS to new platform.', severity: 'Low', mitigation: 'Design for progressive migration — new and high-traffic articles first. Old articles accessible via redirect. Budget content review with technical writing team.', logged: '2026-06-20', needed: '2026-07-15', resolved: '', owner: 'Ryan O\'Brien' },
    ],
    decisions: [
      { name: 'AI-suggested articles in context', desc: 'Help center surfaces contextually relevant articles based on user\'s current page and recent actions.', artifacts: 'Figma: Contextual Help Widget, FigJam: Help Center IA Restructure', needed: '2026-06-14', resolved: '2026-06-16', owner: 'Ryan O\'Brien' },
    ],
    platforms: { design: 'Figma (knowledge base templates + search UX)', research: 'Support ticket topic analysis, search query logs', engineering: 'Next.js, Algolia (search), Contentful (CMS)' },
    contacts: {
      ux: [{ name: 'Ryan O\'Brien', role: 'Lead Designer' }],
      engineering: [{ name: 'Chris Park', role: 'Frontend' }],
      pm: [{ name: 'Taylor Kim', role: 'Customer Experience PM' }],
      decisionMakers: [{ name: 'Head of Support', role: 'Approver' }],
    },
  },
  'Data visualization': {
    overview: 'Establish a comprehensive data visualization design language — chart type guidelines, color scales for data, interaction patterns for drill-down, and responsive chart behavior.',
    goal: 'Create a reusable chart component library adopted by all product dashboards within 2 sprints, reducing custom chart implementations by 80%.',
    metrics: ['Chart library adoption', 'Custom chart reduction', 'Data comprehension scores', 'Chart accessibility compliance'],
    raid: [
      { issue: 'Color accessibility for data series', desc: 'Current palette relies on hue alone to differentiate data series — fails for colorblind users.', severity: 'Medium', mitigation: 'Design pattern/texture fills as secondary differentiator. Test with Sim Daltonism. Provide high-contrast mode option.', logged: '2026-06-20', needed: '2026-07-05', resolved: '', owner: 'Sara Müller' },
      { issue: 'Chart library performance at scale', desc: 'Rendering 10,000+ data points causes frame drops on mid-range devices.', severity: 'Low', mitigation: 'Design data aggregation patterns for large datasets. Implement canvas rendering fallback for high-volume charts.', logged: '2026-06-24', needed: '2026-07-12', resolved: '', owner: 'Sara Müller' },
    ],
    decisions: [
      { name: 'D3.js-based component library', desc: 'Standardize on D3.js wrapped in React components for all product charts, replacing mixed Recharts/Chart.js usage.', artifacts: 'Figma: Chart Component Specs, FigJam: Data Viz Audit & Standards', needed: '2026-06-16', resolved: '2026-06-18', owner: 'Sara Müller' },
    ],
    platforms: { design: 'Figma (chart component library + usage guidelines)', research: 'Data comprehension testing, accessibility audit', engineering: 'React, D3.js, Canvas API (fallback), Storybook' },
    contacts: {
      ux: [{ name: 'Sara Müller', role: 'Lead Designer' }],
      engineering: [{ name: 'Dana Kim', role: 'Data Viz Engineer' }, { name: 'Navid Rahimi', role: 'Frontend Architect' }],
      pm: [{ name: 'Rachel Hong', role: 'Analytics PM' }],
      decisionMakers: [{ name: 'Head of Design', role: 'System governance' }],
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
