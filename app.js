// ── NAV SWITCHING ──
document.querySelectorAll('.nav-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('view-' + btn.dataset.view).classList.add('active');
  });
});

// ── TEAM DATA ──
const teamData = [
  { name: 'Alex Chen',     projects: 'Checkout redesign, Mobile nav',  util: 92, status: 'high' },
  { name: 'Priya Sharma',  projects: 'Onboarding flow',               util: 74, status: 'ok' },
  { name: 'James Okafor',  projects: 'Dashboard v2, Settings',        util: 85, status: 'ok' },
  { name: 'Mei Lin',       projects: 'Design system — icons',         util: 68, status: 'ok' },
  { name: 'Sara Müller',   projects: 'Search experience',             util: 80, status: 'ok' },
  { name: 'Dan Reeves',    projects: 'Notifications, Alerts',         util: 88, status: 'high' },
  { name: 'Kim Tanaka',    projects: 'Profile settings',              util: 55, status: 'low' },
  { name: 'Luca Bianchi',  projects: 'Data export flow',              util: 72, status: 'ok' },
];

const teamTbody = document.getElementById('team-table');
teamData.forEach(d => {
  const color = d.util > 85 ? 'var(--yellow)' : d.util < 60 ? 'var(--text-muted)' : 'var(--accent)';
  const label = d.util > 85 ? 'Over-allocated' : d.util < 60 ? 'Available' : 'On track';
  const labelColor = d.util > 85 ? 'var(--yellow)' : d.util < 60 ? 'var(--green)' : 'var(--text-muted)';
  teamTbody.innerHTML += `
    <tr>
      <td style="font-weight:500">${d.name}</td>
      <td style="color:var(--text-muted)">${d.projects}</td>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="bar-container" style="flex:1">
            <div class="bar-fill" style="width:${d.util}%;background:${color}"></div>
          </div>
          <span style="font-size:12px;min-width:32px">${d.util}%</span>
        </div>
      </td>
      <td style="font-size:12px;color:${labelColor}">${label}</td>
    </tr>`;
});

// ── PIPELINE / KANBAN DATA ──
const pipelineData = {
  queued: [
    { title: 'Billing page update', meta: 'Req: PM — Taylor', days: 2 },
    { title: 'Empty states audit', meta: 'Req: Design — Mei', days: 1 },
    { title: 'Error message review', meta: 'Req: Eng — Navid', days: 4 },
    { title: 'FAQ page refresh', meta: 'Req: Marketing', days: 1 },
    { title: 'Tooltip standardization', meta: 'Req: Design — Sara', days: 3 },
  ],
  progress: [
    { title: 'Checkout redesign', meta: 'Alex Chen — Sprint 14', days: 5 },
    { title: 'Onboarding flow v2', meta: 'Priya Sharma — Sprint 14', days: 3 },
    { title: 'Mobile nav patterns', meta: 'Alex Chen — Sprint 14', days: 4 },
    { title: 'Dashboard v2 layouts', meta: 'James Okafor — Sprint 14', days: 6 },
    { title: 'Search results page', meta: 'Sara Müller — Sprint 14', days: 2 },
    { title: 'Notification center', meta: 'Dan Reeves — Sprint 14', days: 3 },
    { title: 'Data export wizard', meta: 'Luca Bianchi — Sprint 14', days: 4 },
    { title: 'Profile edit flow', meta: 'Kim Tanaka — Sprint 14', days: 1 },
    { title: 'Settings page cleanup', meta: 'James Okafor — Sprint 14', days: 7, blocked: 'Waiting on API spec' },
    { title: 'Alert system design', meta: 'Dan Reeves — Sprint 14', days: 2 },
  ],
  review: [
    { title: 'Icon library expansion', meta: 'Mei Lin — Review by leads', days: 3 },
    { title: 'Color token update', meta: 'Mei Lin — Review by leads', days: 2 },
    { title: 'Card component variants', meta: 'Priya Sharma — Eng review', days: 1 },
    { title: 'Loading skeleton specs', meta: 'Kim Tanaka — PM review', days: 4 },
    { title: 'Table pagination', meta: 'Luca Bianchi — Eng review', days: 2 },
    { title: 'Filter panel redesign', meta: 'Sara Müller — PM review', days: 5, blocked: 'PM unavailable' },
  ],
  blocked: [
    { title: 'Settings page cleanup', meta: 'James Okafor', days: 7, blocked: 'Waiting on API spec' },
    { title: 'Filter panel redesign', meta: 'Sara Müller', days: 5, blocked: 'PM unavailable for review' },
    { title: 'Permissions matrix', meta: 'Dan Reeves', days: 9, blocked: 'Dependency on IAM team' },
  ],
};

const kanbanEl = document.getElementById('kanban');
const cols = [
  { key: 'queued', label: 'Queued' },
  { key: 'progress', label: 'In Progress' },
  { key: 'review', label: 'In Review' },
  { key: 'blocked', label: 'Blocked' },
];
cols.forEach(col => {
  const items = pipelineData[col.key];
  let html = `<div class="kanban-col"><h3>${col.label} <span class="count">${items.length}</span></h3>`;
  items.forEach(item => {
    html += `<div class="kanban-card">
      <div class="kc-title">${item.title}</div>
      <div class="kc-meta">${item.meta} · ${item.days}d</div>
      ${item.blocked ? `<div class="kc-blocked"><span class="material-symbols-outlined">error</span>${item.blocked}</div>` : ''}
    </div>`;
  });
  html += '</div>';
  kanbanEl.innerHTML += html;
});

// ── DEBT TABLE ──
const debtData = [
  { issue: 'Legacy button styles on 3 flows', severity: 'High', age: '34d', screens: 8 },
  { issue: 'Deprecated color tokens in settings', severity: 'Medium', age: '21d', screens: 4 },
  { issue: 'Non-standard spacing in modals', severity: 'Medium', age: '18d', screens: 6 },
  { issue: 'Old icon set in sidebar nav', severity: 'High', age: '42d', screens: 12 },
  { issue: 'Inconsistent border radius on cards', severity: 'Low', age: '15d', screens: 3 },
  { issue: 'Hardcoded colors in email templates', severity: 'Medium', age: '28d', screens: 5 },
  { issue: 'Missing dark-mode tokens for badges', severity: 'Low', age: '10d', screens: 2 },
  { issue: 'Legacy form input styling', severity: 'High', age: '55d', screens: 9 },
  { issue: 'Outdated loading spinner', severity: 'Low', age: '12d', screens: 3 },
  { issue: 'Detached header component on marketing', severity: 'Medium', age: '30d', screens: 4 },
  { issue: 'Non-system tooltip on data tables', severity: 'Low', age: '8d', screens: 2 },
  { issue: 'Deprecated shadow tokens', severity: 'Medium', age: '25d', screens: 6 },
];

const debtTbody = document.getElementById('debt-table');
debtData.forEach(d => {
  const sevColor = d.severity === 'High' ? 'var(--red)' : d.severity === 'Medium' ? 'var(--yellow)' : 'var(--text-muted)';
  debtTbody.innerHTML += `
    <tr>
      <td>${d.issue}</td>
      <td style="color:${sevColor};font-weight:500">${d.severity}</td>
      <td>${d.age}</td>
      <td>${d.screens}</td>
    </tr>`;
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
