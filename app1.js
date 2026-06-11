// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const GROUPS = {
  A:{name:'Groupe A',teams:['Mexique','Afrique du Sud','Corée du Sud','Rép. Tchèque'],flags:['🇲🇽','🇿🇦','🇰🇷','🇨🇿']},
  B:{name:'Groupe B',teams:['Canada','Bosnie-Herzégovine','Qatar','Suisse'],flags:['🇨🇦','🇧🇦','🇶🇦','🇨🇭']},
  C:{name:'Groupe C',teams:['Brésil','Maroc','Haïti','Écosse'],flags:['🇧🇷','🇲🇦','🇭🇹','🏴󠁧󠁢󠁳󠁣󠁴󠁿']},
  D:{name:'Groupe D',teams:['États-Unis','Paraguay','Australie','Turquie'],flags:['🇺🇸','🇵🇾','🇦🇺','🇹🇷']},
  E:{name:'Groupe E',teams:['Allemagne','Curaçao','Côte d\'Ivoire','Équateur'],flags:['🇩🇪','🇨🇼','🇨🇮','🇪🇨']},
  F:{name:'Groupe F',teams:['Pays-Bas','Japon','Suède','Tunisie'],flags:['🇳🇱','🇯🇵','🇸🇪','🇹🇳']},
  G:{name:'Groupe G',teams:['Belgique','Égypte','Iran','Nouvelle-Zélande'],flags:['🇧🇪','🇪🇬','🇮🇷','🇳🇿']},
  H:{name:'Groupe H',teams:['Espagne','Cap-Vert','Arabie Saoudite','Uruguay'],flags:['🇪🇸','🇨🇻','🇸🇦','🇺🇾']},
  I:{name:'Groupe I',teams:['France','Sénégal','Irak','Norvège'],flags:['🇫🇷','🇸🇳','🇮🇶','🇳🇴']},
  J:{name:'Groupe J',teams:['Argentine','Algérie','Autriche','Jordanie'],flags:['🇦🇷','🇩🇿','🇦🇹','🇯🇴']},
  K:{name:'Groupe K',teams:['Portugal','RD Congo','Ouzbékistan','Colombie'],flags:['🇵🇹','🇨🇩','🇺🇿','🇨🇴']},
  L:{name:'Groupe L',teams:['Angleterre','Croatie','Ghana','Panama'],flags:['🏴󠁧󠁢󠁥󠁮󠁧󠁿','🇭🇷','🇬🇭','🇵🇦']},
};

// Each match: {date, time, home(idx), away(idx), group}
// 6 matches per group, each of 4 teams plays exactly 3 times
// Matchday 1: 0v1, 2v3 | Matchday 2: 0v2, 1v3 | Matchday 3: 0v3, 1v2
const MATCHES_GROUP = [
  // ── GROUPE A : Mexique(0) Afrique du Sud(1) Corée du Sud(2) Rép. Tchèque(3)
  {date:'11 JUIN',  time:'21H',  home:0, away:1, group:'A'}, // Mexique - Afrique du Sud
  {date:'12 JUIN',  time:'4H',   home:2, away:3, group:'A'}, // Corée - Rép. Tchèque
  {date:'19 JUIN',  time:'0H',   home:0, away:2, group:'A'}, // Mexique - Corée
  {date:'19 JUIN',  time:'3H',   home:1, away:3, group:'A'}, // Afrique du Sud - Rép. Tchèque
  {date:'25 JUIN',  time:'3H',   home:0, away:3, group:'A'}, // Mexique - Rép. Tchèque
  {date:'25 JUIN',  time:'3H',   home:1, away:2, group:'A'}, // Afrique du Sud - Corée

  // ── GROUPE B : Canada(0) Bosnie(1) Qatar(2) Suisse(3)
  {date:'12 JUIN',  time:'21H',  home:0, away:1, group:'B'}, // Canada - Bosnie
  {date:'13 JUIN',  time:'21H',  home:2, away:3, group:'B'}, // Qatar - Suisse
  {date:'19 JUIN',  time:'0H',   home:0, away:2, group:'B'}, // Canada - Qatar
  {date:'21 JUIN',  time:'3H',   home:1, away:3, group:'B'}, // Bosnie - Suisse
  {date:'24 JUIN',  time:'21H',  home:0, away:3, group:'B'}, // Canada - Suisse
  {date:'24 JUIN',  time:'21H',  home:1, away:2, group:'B'}, // Bosnie - Qatar

  // ── GROUPE C : Brésil(0) Maroc(1) Haïti(2) Écosse(3)
  {date:'13 JUIN',  time:'0H',   home:0, away:1, group:'C'}, // Brésil - Maroc
  {date:'14 JUIN',  time:'3H',   home:2, away:3, group:'C'}, // Haïti - Écosse
  {date:'20 JUIN',  time:'0H',   home:0, away:2, group:'C'}, // Brésil - Haïti
  {date:'20 JUIN',  time:'6H',   home:1, away:3, group:'C'}, // Maroc - Écosse
  {date:'25 JUIN',  time:'0H',   home:0, away:3, group:'C'}, // Brésil - Écosse
  {date:'25 JUIN',  time:'0H',   home:1, away:2, group:'C'}, // Maroc - Haïti

  // ── GROUPE D : États-Unis(0) Paraguay(1) Australie(2) Turquie(3)
  {date:'15 JUIN',  time:'15H',  home:0, away:1, group:'D'}, // États-Unis - Paraguay
  {date:'17 JUIN',  time:'17H',  home:2, away:3, group:'D'}, // Australie - Turquie
  {date:'20 JUIN',  time:'3H',   home:0, away:2, group:'D'}, // États-Unis - Australie
  {date:'20 JUIN',  time:'6H',   home:1, away:3, group:'D'}, // Paraguay - Turquie
  {date:'25 JUIN',  time:'22H',  home:0, away:3, group:'D'}, // États-Unis - Turquie
  {date:'25 JUIN',  time:'22H',  home:1, away:2, group:'D'}, // Paraguay - Australie

  // ── GROUPE E : Allemagne(0) Curaçao(1) Côte d'Ivoire(2) Équateur(3)
  {date:'15 JUIN',  time:'19H',  home:0, away:1, group:'E'}, // Allemagne - Curaçao
  {date:'15 JUIN',  time:'22H',  home:2, away:3, group:'E'}, // Côte d'Ivoire - Équateur
  {date:'19 JUIN',  time:'22H',  home:1, away:3, group:'E'}, // Curaçao - Équateur
  {date:'21 JUIN',  time:'2H',   home:0, away:2, group:'E'}, // Allemagne - Côte d'Ivoire
  {date:'25 JUIN',  time:'22H',  home:0, away:3, group:'E'}, // Allemagne - Équateur
  {date:'25 JUIN',  time:'22H',  home:1, away:2, group:'E'}, // Curaçao - Côte d'Ivoire

  // ── GROUPE F : Pays-Bas(0) Japon(1) Suède(2) Tunisie(3)
  {date:'14 JUIN',  time:'22H',  home:0, away:1, group:'F'}, // Pays-Bas - Japon
  {date:'15 JUIN',  time:'4H',   home:2, away:3, group:'F'}, // Suède - Tunisie
  {date:'20 JUIN',  time:'19H',  home:0, away:2, group:'F'}, // Pays-Bas - Suède
  {date:'20 JUIN',  time:'22H',  home:1, away:3, group:'F'}, // Japon - Tunisie
  {date:'27 JUIN',  time:'23H',  home:0, away:3, group:'F'}, // Pays-Bas - Tunisie
  {date:'27 JUIN',  time:'23H',  home:1, away:2, group:'F'}, // Japon - Suède

  // ── GROUPE G : Belgique(0) Égypte(1) Iran(2) Nouvelle-Zélande(3)
  {date:'16 JUIN',  time:'3H',   home:0, away:1, group:'G'}, // Belgique - Égypte
  {date:'18 JUIN',  time:'4H',   home:2, away:3, group:'G'}, // Iran - Nouvelle-Zélande
  {date:'21 JUIN',  time:'21H',  home:0, away:2, group:'G'}, // Belgique - Iran
  {date:'22 JUIN',  time:'3H',   home:1, away:3, group:'G'}, // Égypte - Nouvelle-Zélande
  {date:'27 JUIN',  time:'3H',   home:0, away:3, group:'G'}, // Belgique - Nouvelle-Zélande
  {date:'27 JUIN',  time:'3H',   home:1, away:2, group:'G'}, // Égypte - Iran

  // ── GROUPE H : Espagne(0) Cap-Vert(1) Arabie Saoudite(2) Uruguay(3)
  {date:'15 JUIN',  time:'18H',  home:0, away:1, group:'H'}, // Espagne - Cap-Vert
  {date:'16 JUIN',  time:'0H',   home:2, away:3, group:'H'}, // Arabie Saoudite - Uruguay
  {date:'21 JUIN',  time:'6H',   home:0, away:2, group:'H'}, // Espagne - Arabie Saoudite
  {date:'22 JUIN',  time:'0H',   home:1, away:3, group:'H'}, // Cap-Vert - Uruguay
  {date:'27 JUIN',  time:'0H',   home:0, away:3, group:'H'}, // Espagne - Uruguay
  {date:'27 JUIN',  time:'0H',   home:1, away:2, group:'H'}, // Cap-Vert - Arabie Saoudite

  // ── GROUPE I : France(0) Sénégal(1) Irak(2) Norvège(3)
  {date:'16 JUIN',  time:'21H',  home:0, away:1, group:'I'}, // France - Sénégal
  {date:'17 JUIN',  time:'3H',   home:2, away:3, group:'I'}, // Irak - Norvège
  {date:'21 JUIN',  time:'0H',   home:0, away:2, group:'I'}, // France - Irak
  {date:'22 JUIN',  time:'3H',   home:1, away:3, group:'I'}, // Sénégal - Norvège
  {date:'26 JUIN',  time:'2H',   home:0, away:3, group:'I'}, // France - Norvège
  {date:'26 JUIN',  time:'2H',   home:1, away:2, group:'I'}, // Sénégal - Irak

  // ── GROUPE J : Argentine(0) Algérie(1) Autriche(2) Jordanie(3)
  {date:'17 JUIN',  time:'6H',   home:0, away:1, group:'J'}, // Argentine - Algérie
  {date:'18 JUIN',  time:'4H',   home:2, away:3, group:'J'}, // Autriche - Jordanie
  {date:'22 JUIN',  time:'1H',   home:0, away:2, group:'J'}, // Argentine - Autriche
  {date:'22 JUIN',  time:'23H',  home:1, away:3, group:'J'}, // Algérie - Jordanie
  {date:'26 JUIN',  time:'4H',   home:0, away:3, group:'J'}, // Argentine - Jordanie
  {date:'26 JUIN',  time:'4H',   home:1, away:2, group:'J'}, // Algérie - Autriche

  // ── GROUPE K : Portugal(0) RD Congo(1) Ouzbékistan(2) Colombie(3)
  {date:'17 JUIN',  time:'19H',  home:0, away:1, group:'K'}, // Portugal - RD Congo
  {date:'18 JUIN',  time:'4H',   home:2, away:3, group:'K'}, // Ouzbékistan - Colombie
  {date:'22 JUIN',  time:'19H',  home:0, away:2, group:'K'}, // Portugal - Ouzbékistan
  {date:'23 JUIN',  time:'23H',  home:1, away:3, group:'K'}, // RD Congo - Colombie
  {date:'27 JUIN',  time:'23H',  home:0, away:3, group:'K'}, // Portugal - Colombie
  {date:'27 JUIN',  time:'23H',  home:1, away:2, group:'K'}, // RD Congo - Ouzbékistan

  // ── GROUPE L : Angleterre(0) Croatie(1) Ghana(2) Panama(3)
  {date:'17 JUIN',  time:'22H',  home:0, away:1, group:'L'}, // Angleterre - Croatie
  {date:'18 JUIN',  time:'1H',   home:2, away:3, group:'L'}, // Ghana - Panama
  {date:'22 JUIN',  time:'19H',  home:0, away:2, group:'L'}, // Angleterre - Ghana
  {date:'23 JUIN',  time:'22H',  home:1, away:3, group:'L'}, // Croatie - Panama
  {date:'26 JUIN',  time:'1H',   home:0, away:3, group:'L'}, // Angleterre - Panama
  {date:'26 JUIN',  time:'1H',   home:1, away:2, group:'L'}, // Croatie - Ghana
];

const KNOCKOUT_PHASES = [
  {id:'r16',label:'1/16 de Finale',matches:[
    {date:'29 JUIN',time:'22H30',home:'1er Groupe E',away:'A/B/C/D/F'},
    {date:'29 JUIN',time:'19H',home:'1er Groupe C',away:'2e Groupe F'},
    {date:'30 JUIN',time:'23H',home:'3e C/D/F/G/H',away:'2e Groupe E'},
    {date:'30 JUIN',time:'19H',home:'3e E/F/G/H/I',away:'2e Groupe I'},
    {date:'28 JUIN',time:'21H',home:'2e Groupe A',away:'2e Groupe B'},
    {date:'30 JUIN',time:'3H',home:'2e Groupe F',away:'2e Groupe C'},
    {date:'3 JUILLET',time:'1H',home:'2e Groupe K',away:'2e Groupe L'},
    {date:'2 JUILLET',time:'21H',home:'1er Groupe H',away:'2e Groupe J'},
    {date:'2 JUILLET',time:'2H',home:'1er Groupe D',away:'3e B/E/F/I/J'},
    {date:'1er JUILLET',time:'22H',home:'3e A/H/I/J/K',away:'2e Groupe A'},
    {date:'1er JUILLET',time:'22H',home:'3e C/E/F/H/I',away:'2e Groupe B'},
    {date:'3 JUILLET',time:'5H',home:'1er Groupe G',away:'3e A/E/H/I/J'},
    {date:'1er JUILLET',time:'3H',home:'1er Groupe A',away:'3e C/E/F/H/I'},
    {date:'1er JUILLET',time:'3H',home:'1er Groupe L',away:'3e E/H/I/J/K'},
    {date:'3 JUILLET',time:'20H',home:'2e Groupe D',away:'2e Groupe G'},
  ]},
  {id:'r8',label:'1/8 de Finale',matches:[
    {date:'4 JUILLET',time:'23H',home:'Vainqueur 1/16 #1',away:'Vainqueur 1/16 #2'},
    {date:'4 JUILLET',time:'19H',home:'Vainqueur 1/16 #5',away:'Vainqueur 1/16 #6'},
    {date:'6 JUILLET',time:'21H',home:'Vainqueur 1/16 #7',away:'Vainqueur 1/16 #8'},
    {date:'4 JUILLET',time:'3H30',home:'Vainqueur 1/16 #13',away:'Vainqueur 1/16 #14'},
    {date:'4 JUILLET',time:'0H',home:'Vainqueur 1/16 #15',away:'Vainqueur 1/16 #16'},
    {date:'5 JUILLET',time:'22H',home:'Vainqueur 1/16 #3',away:'Vainqueur 1/16 #4'},
    {date:'6 JUILLET',time:'2H',home:'Vainqueur 1/16 #11',away:'Vainqueur 1/16 #12'},
    {date:'7 JUILLET',time:'0H',home:'Vainqueur 1/16 #9',away:'Vainqueur 1/16 #10'},
  ]},
  {id:'qf',label:'Quarts de Finale',matches:[
    {date:'9 JUILLET',time:'22H',home:'Vainqueur 1/8 #1',away:'Vainqueur 1/8 #2'},
    {date:'10 JUILLET',time:'21H',home:'Vainqueur 1/8 #5',away:'Vainqueur 1/8 #6'},
    {date:'11 JUILLET',time:'23H',home:'Vainqueur 1/8 #3',away:'Vainqueur 1/8 #4'},
    {date:'12 JUILLET',time:'2H',home:'Vainqueur 1/8 #7',away:'Vainqueur 1/8 #8'},
  ]},
  {id:'sf',label:'Demi-Finales',matches:[
    {date:'14 JUILLET',time:'21H',home:'Vainqueur QF #1',away:'Vainqueur QF #2'},
    {date:'15 JUILLET',time:'21H',home:'Vainqueur QF #3',away:'Vainqueur QF #4'},
  ]},
  {id:'final',label:'Finale',matches:[
    {date:'18 JUILLET',time:'23H',home:'Perdant SF #1',away:'Perdant SF #2',label:'🥉 Petite Finale'},
    {date:'19 JUILLET',time:'21H',home:'Vainqueur SF #1',away:'Vainqueur SF #2',label:'🏆 Grande Finale'},
  ]},
];

// ═══════════════════════════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════════════════════════
const STORE_KEY = 'wc2026_v2';
let results = {};

async function loadResults() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) results = JSON.parse(raw);
  } catch(e) { results = {}; }
}
async function saveResults() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(results));
  } catch(e) {}
}
function mKey(m,idx){ return `${m.date}_${m.time}_${idx}`; }

// ═══════════════════════════════════════════════════════════
// STANDINGS COMPUTATION
// ═══════════════════════════════════════════════════════════
function computeStandings(groupId) {
  const g = GROUPS[groupId];
  const stats = g.teams.map((_,i)=>({idx:i,played:0,w:0,d:0,l:0,gf:0,ga:0}));

  MATCHES_GROUP.forEach((m,i) => {
    if(m.group !== groupId) return;
    const key = mKey(m,i);
    const res = results[key];
    if(!res || !res.hasOwnProperty('h')) return;
    const hi = m.home, ai = m.away;
    stats[hi].played++; stats[ai].played++;
    stats[hi].gf += res.h; stats[hi].ga += res.a;
    stats[ai].gf += res.a; stats[ai].ga += res.h;
    if(res.h > res.a) { stats[hi].w++; stats[ai].l++; }
    else if(res.h < res.a) { stats[ai].w++; stats[hi].l++; }
    else { stats[hi].d++; stats[ai].d++; }
  });

  return stats.map(s=>({
    ...s,
    pts: s.w*3 + s.d,
    diff: s.gf - s.ga,
  })).sort((a,b)=> b.pts-a.pts || b.diff-a.diff || b.gf-a.gf);
}

// ═══════════════════════════════════════════════════════════
// MATCH CARD HTML
// ═══════════════════════════════════════════════════════════
function buildMatchCard(m, idx, isKnockout=false, showDate=false) {
  const key = mKey(m, idx);
  const res = results[key]||{};
  const played = res.hasOwnProperty('h');
  const isLive = res.live;

  let homeInfo, awayInfo;
  if(isKnockout){
    homeInfo={name:m.home,flag:'⚽'}; awayInfo={name:m.away,flag:'⚽'};
  } else {
    const g=GROUPS[m.group];
    homeInfo={name:g.teams[m.home],flag:g.flags[m.home]};
    awayInfo={name:g.teams[m.away],flag:g.flags[m.away]};
  }

  const cls = isKnockout?'knockout-card':`match-card${played?' played':''}${isLive?' live':''}`;
  const timeCol = isLive?'match-time live-col':'match-time';
  const phaseTag = isKnockout?(m.label||''):(m.group?`Groupe ${m.group}`:'');

  let scoreHtml;
  if(played && !isKnockout){
    scoreHtml=`<div class="score-box">
      <div class="score-num">${res.h}</div>
      <div class="score-sep">—</div>
      <div class="score-num">${res.a}</div>
    </div>`;
  } else {
    scoreHtml=`<div class="score-tbd">VS</div>`;
  }

  return `<div class="${cls}" onclick="openScore('${key}','${homeInfo.name.replace(/'/g,"\\'")}','${awayInfo.name.replace(/'/g,"\\'")}')">
    <div class="match-meta">
      ${showDate && m.date ? `<span class="tag date-tag">📅 ${m.date}</span>` : ''}
      <span class="${timeCol}">${m.time}</span>
      ${phaseTag?`<span class="tag">${phaseTag}</span>`:''}
      ${isLive?'<span class="live-badge">EN DIRECT</span>':''}
    </div>
    <div class="match-teams">
      <div class="team"><span class="team-flag">${homeInfo.flag}</span><span class="team-name">${homeInfo.name}</span></div>
      ${scoreHtml}
      <div class="team away"><span class="team-flag">${awayInfo.flag}</span><span class="team-name">${awayInfo.name}</span></div>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════
// BUILD CALENDAR — all days scrollable, today auto-highlighted
// ═══════════════════════════════════════════════════════════

// Map French date strings to JS Date for comparison
function parseMatchDate(dateStr) {
  // e.g. "16 JUIN" → June 16 2026
  const months = {JANVIER:0,FÉVRIER:1,MARS:2,AVRIL:3,MAI:4,JUIN:5,JUILLET:6,AOÛT:7,SEPTEMBRE:8,OCTOBRE:9,NOVEMBRE:10,DÉCEMBRE:11};
  const parts = dateStr.trim().split(' ');
  const day = parseInt(parts[0]);
  const month = months[parts[1]] ?? 5;
  return new Date(2026, month, day);
}

function getTodayStr() {
  const now = new Date();
  const months = ['JANVIER','FÉVRIER','MARS','AVRIL','MAI','JUIN','JUILLET','AOÛT','SEPTEMBRE','OCTOBRE','NOVEMBRE','DÉCEMBRE'];
  return `${now.getDate()} ${months[now.getMonth()]}`;
}

function buildCalendar() {
  // Collect all unique dates from group matches, sorted chronologically
  const datesMap = {};
  MATCHES_GROUP.forEach((m,i) => {
    if (!datesMap[m.date]) datesMap[m.date] = [];
    datesMap[m.date].push({m, i});
  });

  // Sort dates chronologically
  const dates = Object.keys(datesMap).sort((a,b) => parseMatchDate(a) - parseMatchDate(b));

  const todayStr = getTodayStr();
  // Find today or closest future date
  let activeDate = dates.find(d => d === todayStr);
  if (!activeDate) {
    const today = new Date();
    // Find first upcoming date
    activeDate = dates.find(d => parseMatchDate(d) >= today) || dates[0];
  }

  // Day names in French, June 1 2026 = Monday
  const dayNames = ['DIM','LUN','MAR','MER','JEU','VEN','SAM'];

  const tabsEl = document.getElementById('secondaryTabs');
  tabsEl.innerHTML = '';

  dates.forEach(d => {
    const dt = parseMatchDate(d);
    const dayNum = d.split(' ')[0];
    const monthAbbr = d.split(' ')[1]?.slice(0,4) || '';
    const dn = dayNames[dt.getDay()];
    const count = datesMap[d].length;
    const isToday = d === todayStr;
    const isPast = parseMatchDate(d) < new Date() && !isToday;

    const btn = document.createElement('div');
    btn.className = 'date-tab' + (d === activeDate ? ' active' : '') + (isToday ? ' today' : '') + (isPast ? ' past' : '');
    btn.dataset.date = d;
    btn.innerHTML = `
      <span class="day-name">${dn}</span>
      <span class="day-num">${dayNum}</span>
      <span class="day-month">${monthAbbr}</span>
      ${isToday ? '<span class="today-dot"></span>' : `<span class="match-count">${count}</span>`}
    `;
    btn.onclick = () => switchDay(d);
    tabsEl.appendChild(btn);
  });

  // Build all panels
  const panelsEl = document.getElementById('dayPanels');
  panelsEl.innerHTML = '';

  dates.forEach(d => {
    const panel = document.createElement('div');
    panel.id = 'panel_' + d.replace(/ /g,'_');
    panel.style.display = (d === activeDate) ? 'block' : 'none';

    const matchesOfDay = datesMap[d];
    const dt = parseMatchDate(d);
    const dayNames2 = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const longDay = dayNames2[dt.getDay()];
    const isToday = d === todayStr;

    let html = `
      <div class="day-header">
        <div>
          <div style="font-size:0.7rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:2px">${longDay}</div>
          <h2>${d} 2026 ${isToday ? '<span class="today-badge">AUJOURD\'HUI</span>' : ''}</h2>
        </div>
        <span class="pill">${matchesOfDay.length} match${matchesOfDay.length > 1 ? 's' : ''}</span>
      </div>
      <div class="matches-grid">`;
    matchesOfDay.forEach(({m,i}) => { html += buildMatchCard(m, i); });
    html += `</div>`;
    panel.innerHTML = html;
    panelsEl.appendChild(panel);
  });

  // Auto-scroll active tab into view
  setTimeout(() => {
    const activeTab = tabsEl.querySelector('.date-tab.active');
    if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, 100);
}

function switchDay(date) {
  document.querySelectorAll('.date-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-date="${date}"]`).classList.add('active');
  document.querySelectorAll('#dayPanels > div').forEach(p => p.style.display = 'none');
  document.getElementById('panel_' + date.replace(/ /g,'_')).style.display = 'block';
}
