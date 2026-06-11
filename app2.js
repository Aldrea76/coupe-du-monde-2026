// ═══════════════════════════════════════════════════════════
// MEILLEURS BUTEURS — via Claude API + web search
// ═══════════════════════════════════════════════════════════

  document.getElementById('view-scorers').classList.add('active');
}

    <div class="day-header"><h2>MEILLEURS BUTEURS</h2></div>
    <div id="scorersBody">
      <div style="text-align:center;padding:3rem;color:var(--muted)">
        <div style="font-size:2rem;margin-bottom:1rem;animation:spin 1s linear infinite;display:inline-block">⚽</div>
        <div style="font-size:0.8rem;letter-spacing:2px">CHARGEMENT EN COURS…</div>
      </div>
    </div>`;
}

try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: `Search for "FIFA World Cup 2026 top scorers goals" and return ONLY a valid JSON array, no markdown, no explanation:
[{"rank":1,"name":"Player Name","country":"Country","flag":"🏳️","goals":3,"assists":1},...]
List the top 10 scorers. If the tournament hasn't started or no goals yet, return players expected to be top scorers with goals:0.`
        }]
      })
    });
    const data = await resp.json();
    const text = data.content?.map(b => b.text || '').join('') || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const start = clean.indexOf('[');
    const end = clean.lastIndexOf(']');
    if (start !== -1 && end !== -1) {
    } else {
    }
  } catch(e) {
  }
}

  return [
    {rank:1,name:'Kylian Mbappé',country:'France',flag:'🇫🇷',goals:0,assists:0},
    {rank:2,name:'Erling Haaland',country:'Norvège',flag:'🇳🇴',goals:0,assists:0},
    {rank:3,name:'Lionel Messi',country:'Argentine',flag:'🇦🇷',goals:0,assists:0},
    {rank:4,name:'Harry Kane',country:'Angleterre',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',goals:0,assists:0},
    {rank:5,name:'Cristiano Ronaldo',country:'Portugal',flag:'🇵🇹',goals:0,assists:0},
    {rank:6,name:'Vinicius Jr',country:'Brésil',flag:'🇧🇷',goals:0,assists:0},
    {rank:7,name:'Lamine Yamal',country:'Espagne',flag:'🇪🇸',goals:0,assists:0},
    {rank:8,name:'Bukayo Saka',country:'Angleterre',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',goals:0,assists:0},
    {rank:9,name:'Antoine Griezmann',country:'France',flag:'🇫🇷',goals:0,assists:0},
    {rank:10,name:'Robert Lewandowski',country:'Pologne',flag:'🇵🇱',goals:0,assists:0},
  ];
}

    const barW = s.goals > 0 ? Math.round((s.goals / maxGoals) * 100) : 0;
    const medals = ['🥇','🥈','🥉'];
    const rankDisplay = i < 3 ? medals[i] : `<span style="font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:var(--muted)">${i+1}</span>`;
    return `
      <div class="scorer-row">
        <div class="scorer-rank">${rankDisplay}</div>
        <div class="scorer-flag">${s.flag}</div>
        <div class="scorer-info">
          <div class="scorer-name">${s.name}</div>
          <div class="scorer-country">${s.country}</div>
          ${s.goals > 0 ? `
          <div class="scorer-bar-wrap">
            <div class="scorer-bar" style="width:${barW}%"></div>
          </div>` : ''}
        </div>
        <div class="scorer-stats">
          <div class="scorer-goals">${s.goals} <span style="font-size:0.6rem;color:var(--muted)">BUT${s.goals>1?'S':''}</span></div>
          ${s.assists > 0 ? `<div class="scorer-assists">${s.assists} <span style="font-size:0.55rem;color:var(--muted)">PASSE${s.assists>1?'S':''}</span></div>` : ''}
        </div>
      </div>`;
  }).join('');

  const lastUpdate = new Date().toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'});

  document.getElementById('scorersBody').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
      <span class="pill">TOP 10</span>
    </div>
    ${!hasGoals ? `<div style="background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.25);border-radius:12px;padding:0.75rem 1rem;margin-bottom:1rem;font-size:0.75rem;color:#a99fff">
    </div>` : ''}
}

}

// ═══════════════════════════════════════════════════════════
// BUILD STANDINGS (group tabs + tables)
// ═══════════════════════════════════════════════════════════
let currentStandingsGroup = 'A';

function buildStandingsNav() {
  const tabsEl=document.getElementById('secondaryTabs');
  tabsEl.innerHTML='';
  Object.keys(GROUPS).forEach(gid=>{
    const btn=document.createElement('div');
    btn.className='group-tab'+(gid===currentStandingsGroup?' active':'');
    btn.dataset.group=gid;
    btn.textContent='Groupe '+gid;
    btn.onclick=()=>switchStandingsGroup(gid);
    tabsEl.appendChild(btn);
  });
}

function switchStandingsGroup(gid) {
  currentStandingsGroup=gid;
  document.querySelectorAll('.group-tab').forEach(t=>t.classList.remove('active'));
  document.querySelector(`.group-tab[data-group="${gid}"]`).classList.add('active');
  renderStandingsGroup(gid);
}

function renderStandingsGroup(gid) {
  const g=GROUPS[gid];
  const standings=computeStandings(gid);

  // Also list group matches
  const groupMatches=MATCHES_GROUP.map((m,i)=>({m,i})).filter(({m})=>m.group===gid);

  let matchesHtml='';
  groupMatches.forEach(({m,i})=>{ matchesHtml+=buildMatchCard(m,i,false,true); });

  const tableRows=standings.map((s,rank)=>{
    const team=g.teams[s.idx];
    const flag=g.flags[s.idx];
    const diff=s.diff;
    const diffStr=diff>0?`+${diff}`:String(diff);
    const diffCls=diff>0?'diff-pos':diff<0?'diff-neg':'diff-zero';
    const posCls=rank<2?'qualified':rank===2?'playoff':'';
    return `<tr>
      <td><div class="team-cell">
        <span class="pos ${posCls}">${rank+1}</span>
        <span class="mini-flag">${flag}</span>
        <span class="tname">${team}</span>
      </div></td>
      <td>${s.played}</td>
      <td>${s.w}</td>
      <td>${s.d}</td>
      <td>${s.l}</td>
      <td>${s.gf}</td>
      <td>${s.ga}</td>
      <td class="${diffCls}">${diffStr}</td>
      <td class="pts-cell">${s.pts}</td>
    </tr>`;
  }).join('');

  document.getElementById('standingsContent').innerHTML=`
    <div class="standings-wrap">
      <div class="standings-header">
        <h2>Groupe ${gid}</h2>
        <span class="pill">${g.name}</span>
      </div>

      <div style="background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:1.5rem;">
        <div style="display:flex;align-items:center;gap:0.6rem;padding:0.85rem 1.1rem;border-bottom:1px solid var(--border);">
          <div class="group-color-dot gc-${gid}"></div>
          <span style="font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:2px">Classement</span>
        </div>
        <table class="standings-table">
          <thead><tr>
            <th>Équipe</th><th>J</th><th>V</th><th>N</th><th>D</th>
            <th>BP</th><th>BC</th><th>DB</th><th>PTS</th>
          </tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
        <div class="qual-legend">
          <span><span class="qual-dot" style="background:#00D4AA"></span>Qualifié (1er/2e)</span>
          <span><span class="qual-dot" style="background:#FFB347"></span>Possible 3e qualifié</span>
        </div>
      </div>

      <div style="font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:2px;margin-bottom:0.75rem;color:var(--muted)">
        MATCHS DU GROUPE
      </div>
      <div class="matches-grid">${matchesHtml}</div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════
// BUILD KNOCKOUT
// ═══════════════════════════════════════════════════════════
function buildKnockout(phaseId) {
  const phase=KNOCKOUT_PHASES.find(p=>p.id===phaseId);
  if(!phase) return;
  let html=`<div class="section-title">${phase.label}</div><div class="knockout-grid">`;
  phase.matches.forEach((m,i)=>{ html+=buildMatchCard(m,i,true,true); });
  html+=`</div>`;
  document.getElementById('knockoutContent').innerHTML=html;
}

// ═══════════════════════════════════════════════════════════
// MAIN NAV SWITCH
// ═══════════════════════════════════════════════════════════
let currentMain='calendar';

function switchMain(view, btn) {
  currentMain=view;
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');

  ['calendar','standings','knockout'].forEach(v=>{
    document.getElementById('view-'+v).classList.remove('active');
  });

  const tabsEl=document.getElementById('secondaryTabs');
  const secondaryWrap=document.getElementById('secondaryNavWrap');

  if(view==='calendar'){
    document.getElementById('view-calendar').classList.add('active');
    secondaryWrap.style.display='';
    buildCalendar();
  } else if(view==='standings'){
    document.getElementById('view-standings').classList.add('active');
    secondaryWrap.style.display='';
    buildStandingsNav();
    renderStandingsGroup(currentStandingsGroup);
  } else {
    document.getElementById('view-knockout').classList.add('active');
    secondaryWrap.style.display='none';
    buildKnockout(view);
  }
}

// ═══════════════════════════════════════════════════════════
// SCORE MODAL
// ═══════════════════════════════════════════════════════════
function openScore(key, homeName, awayName) {
  const res=results[key]||{};
  const existing=res.hasOwnProperty('h');

  const modal=document.createElement('div');
  modal.id='scoreModal';
  modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;';
  modal.innerHTML=`
    <div style="background:#1A1D2E;border:1.5px solid rgba(255,255,255,0.12);border-radius:20px;padding:2rem;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,0.6);">
      <h3 style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:2px;margin-bottom:0.4rem;color:#00D4AA">
        ${existing?'✏️ Modifier':'⚽ Saisir'} le Score
      </h3>
      <p style="font-size:0.75rem;color:#7B82A8;margin-bottom:1.5rem;">${homeName} · vs · ${awayName}</p>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.75rem;">
        <div style="flex:1;text-align:center">
          <div style="font-size:0.65rem;color:#7B82A8;margin-bottom:0.5rem;letter-spacing:1px;text-transform:uppercase">${homeName}</div>
          <input id="scoreH" type="number" min="0" max="20" value="${existing?res.h:''}" placeholder="0"
            style="width:72px;height:56px;background:#0F1117;border:2px solid #6C63FF;border-radius:12px;color:#fff;font-family:'Bebas Neue',sans-serif;font-size:2.2rem;text-align:center;outline:none;">
        </div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:#7B82A8">—</div>
        <div style="flex:1;text-align:center">
          <div style="font-size:0.65rem;color:#7B82A8;margin-bottom:0.5rem;letter-spacing:1px;text-transform:uppercase">${awayName}</div>
          <input id="scoreA" type="number" min="0" max="20" value="${existing?res.a:''}" placeholder="0"
            style="width:72px;height:56px;background:#0F1117;border:2px solid #6C63FF;border-radius:12px;color:#fff;font-family:'Bebas Neue',sans-serif;font-size:2.2rem;text-align:center;outline:none;">
        </div>
      </div>
      <div style="display:flex;gap:0.65rem;">
        <button onclick="saveScore('${key}')" style="flex:1;background:linear-gradient(135deg,#6C63FF,#00D4AA);color:#fff;border:none;padding:0.8rem;border-radius:12px;font-weight:700;font-size:0.8rem;cursor:pointer;letter-spacing:1px">ENREGISTRER</button>
        ${existing?`<button onclick="clearScore('${key}')" style="background:rgba(255,107,107,0.12);color:#FF6B6B;border:1.5px solid #FF6B6B;padding:0.8rem 1rem;border-radius:12px;font-weight:600;font-size:0.75rem;cursor:pointer">EFFACER</button>`:''}
        <button onclick="closeModal()" style="background:rgba(255,255,255,0.06);color:#7B82A8;border:none;padding:0.8rem 1rem;border-radius:12px;font-weight:600;font-size:0.75rem;cursor:pointer">ANNULER</button>
      </div>
    </div>`;
  modal.onclick=e=>{ if(e.target===modal) closeModal(); };
  document.body.appendChild(modal);
  setTimeout(()=>document.getElementById('scoreH')?.focus(),80);
}

function closeModal(){ document.getElementById('scoreModal')?.remove(); }

async function saveScore(key){
  const h=parseInt(document.getElementById('scoreH').value);
  const a=parseInt(document.getElementById('scoreA').value);
  if(isNaN(h)||isNaN(a)) return;
  results[key]={h,a};
  await saveResults();
  closeModal();
  refreshView();
}
async function clearScore(key){
  delete results[key];
  await saveResults();
  closeModal();
  refreshView();
}

function refreshView(){
  if(currentMain==='calendar') buildCalendar();
  else if(currentMain==='standings'){ buildStandingsNav(); renderStandingsGroup(currentStandingsGroup); }
  else buildKnockout(currentMain);
}

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
async function init(){
  await loadResults();
  buildCalendar();
}
init();
