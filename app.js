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
  { name: 'Alex Chen',     projects: 'Checkout redesign, Mobile nav',  util: 92 },
  { name: 'Dan Reeves',    projects: 'Notifications, Alerts',         util: 88 },
  { name: 'James Okafor',  projects: 'Dashboard v2, Settings',        util: 85 },
  { name: 'Sara Müller',   projects: 'Search experience',             util: 80 },
  { name: 'Priya Sharma',  projects: 'Onboarding flow',               util: 74 },
  { name: 'Luca Bianchi',  projects: 'Data export flow',              util: 72 },
  { name: 'Mei Lin',       projects: 'Design system — icons',         util: 68 },
  { name: 'Kim Tanaka',    projects: 'Profile settings',              util: 55 },
];

const teamTbody = document.getElementById('team-table');
teamData.forEach(d => {
  const bold = d.util > 85 ? ' style="font-weight:bold"' : '';
  teamTbody.innerHTML += `
    <tr>
      <td>${d.name}</td>
      <td>${d.projects}</td>
      <td${bold}>${d.util}%</td>
    </tr>`;
});

// ── PIPELINE DATA ──
const pipelineData = [
  { title: 'Permissions matrix',    meta: 'Dan Reeves',           days: 9, status: 'blocked', note: 'Dependency on IAM team' },
  { title: 'Settings page cleanup', meta: 'James Okafor',         days: 7, status: 'blocked', note: 'Waiting on API spec' },
  { title: 'Filter panel redesign', meta: 'Sara Müller',          days: 5, status: 'blocked', note: 'PM unavailable for review' },
  { title: 'Dashboard v2 layouts',  meta: 'James Okafor',         days: 6, status: 'in progress' },
  { title: 'Checkout redesign',     meta: 'Alex Chen',            days: 5, status: 'in progress' },
  { title: 'Mobile nav patterns',   meta: 'Alex Chen',            days: 4, status: 'in progress' },
  { title: 'Data export wizard',    meta: 'Luca Bianchi',         days: 4, status: 'in progress' },
  { title: 'Onboarding flow v2',    meta: 'Priya Sharma',         days: 3, status: 'in progress' },
  { title: 'Notification center',   meta: 'Dan Reeves',           days: 3, status: 'in progress' },
  { title: 'Search results page',   meta: 'Sara Müller',          days: 2, status: 'in progress' },
  { title: 'Alert system design',   meta: 'Dan Reeves',           days: 2, status: 'in progress' },
  { title: 'Profile edit flow',     meta: 'Kim Tanaka',           days: 1, status: 'in progress' },
  { title: 'Loading skeleton specs',meta: 'Kim Tanaka — PM review',days: 4, status: 'review' },
  { title: 'Filter panel redesign', meta: 'Sara Müller — PM review',days: 5, status: 'review' },
  { title: 'Icon library expansion',meta: 'Mei Lin — leads',      days: 3, status: 'review' },
  { title: 'Table pagination',      meta: 'Luca Bianchi — eng',   days: 2, status: 'review' },
  { title: 'Color token update',    meta: 'Mei Lin — leads',      days: 2, status: 'review' },
  { title: 'Card component variants',meta:'Priya Sharma — eng',   days: 1, status: 'review' },
  { title: 'Error message review',  meta: 'Req: Eng — Navid',     days: 4, status: 'queued' },
  { title: 'Tooltip standardization',meta:'Req: Design — Sara',   days: 3, status: 'queued' },
  { title: 'Billing page update',   meta: 'Req: PM — Taylor',     days: 2, status: 'queued' },
  { title: 'Empty states audit',    meta: 'Req: Design — Mei',    days: 1, status: 'queued' },
  { title: 'FAQ page refresh',      meta: 'Req: Marketing',       days: 1, status: 'queued' },
];

const pipelineBody = document.getElementById('pipeline-body');
let currentStatus = '';
pipelineData.forEach(d => {
  if (d.status !== currentStatus) {
    currentStatus = d.status;
    pipelineBody.innerHTML += `<tr><td colspan="4" class="pipeline-group-header">${currentStatus}</td></tr>`;
  }
  const blockedHtml = d.note ? `<br><span class="blocked-note">${d.note}</span>` : '';
  pipelineBody.innerHTML += `
    <tr>
      <td>${d.title}${blockedHtml}</td>
      <td>${d.meta}</td>
      <td>${d.days}</td>
      <td>${d.status}</td>
    </tr>`;
});

// ── DEBT TABLE ──
const debtData = [
  { issue: 'Legacy form input styling',             severity: 'High',   age: '55d', screens: 9 },
  { issue: 'Old icon set in sidebar nav',           severity: 'High',   age: '42d', screens: 12 },
  { issue: 'Legacy button styles on 3 flows',       severity: 'High',   age: '34d', screens: 8 },
  { issue: 'Detached header component on marketing',severity: 'Medium', age: '30d', screens: 4 },
  { issue: 'Hardcoded colors in email templates',   severity: 'Medium', age: '28d', screens: 5 },
  { issue: 'Deprecated shadow tokens',             severity: 'Medium', age: '25d', screens: 6 },
  { issue: 'Deprecated color tokens in settings',   severity: 'Medium', age: '21d', screens: 4 },
  { issue: 'Non-standard spacing in modals',        severity: 'Medium', age: '18d', screens: 6 },
  { issue: 'Inconsistent border radius on cards',   severity: 'Low',    age: '15d', screens: 3 },
  { issue: 'Outdated loading spinner',             severity: 'Low',    age: '12d', screens: 3 },
  { issue: 'Missing dark-mode tokens for badges',   severity: 'Low',    age: '10d', screens: 2 },
  { issue: 'Non-system tooltip on data tables',     severity: 'Low',    age: '8d',  screens: 2 },
];

const debtTbody = document.getElementById('debt-table');
debtData.forEach(d => {
  const cls = d.severity === 'High' ? 'sev-high' : d.severity === 'Medium' ? 'sev-med' : 'sev-low';
  debtTbody.innerHTML += `
    <tr>
      <td>${d.issue}</td>
      <td class="${cls}">${d.severity}</td>
      <td>${d.age}</td>
      <td>${d.screens}</td>
    </tr>`;
});

// ── SPARKLINE (inline SVG) ──
const adoptionData = [
  { month: 'Jan', value: 72 },
  { month: 'Feb', value: 75 },
  { month: 'Mar', value: 79 },
  { month: 'Apr', value: 82 },
  { month: 'May', value: 85 },
  { month: 'Jun', value: 87 },
];

const chartEl = document.getElementById('adoption-chart');
const svgW = 260, svgH = 40;
const minV = 70, maxV = 90;
const points = adoptionData.map((d, i) => {
  const x = (i / (adoptionData.length - 1)) * svgW;
  const y = svgH - ((d.value - minV) / (maxV - minV)) * svgH;
  return `${x},${y}`;
}).join(' ');

const first = adoptionData[0];
const last = adoptionData[adoptionData.length - 1];

chartEl.innerHTML = `
  <span class="sparkline-label">${first.month} ${first.value}%</span>
  <svg width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="${points}" stroke="#111" stroke-width="1.5" fill="none" />
  </svg>
  <span class="sparkline-label">${last.month} ${last.value}%</span>
`;
