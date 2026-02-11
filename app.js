function $(sel){ return document.querySelector(sel); }
function $all(sel){ return document.querySelectorAll(sel); }

function getParams(){
  const p = new URLSearchParams(location.search);
  return Object.fromEntries(p.entries());
}

window.toggleMenu = function(){
  const nav = $("#nav");
  if(nav) nav.classList.toggle("show");
};

function setActiveNav(){
  const file = location.pathname.split("/").pop() || "index.html";
  $all("#nav a").forEach(a=>{
    if(a.getAttribute("href") === file) a.classList.add("active");
  });
}

/* 3D tilt */
function enableTilt(){
  $all(".card3d").forEach(card=>{
    card.addEventListener("mousemove",(e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `rotateY(${x*14}deg) rotateX(${y*-14}deg) translateZ(10px)`;
    });
    card.addEventListener("mouseleave",()=> card.style.transform="translateZ(0)");
  });
}

/* Progress */
const LS = "bytebond_progress_v1";
function loadProgress(){ try{return JSON.parse(localStorage.getItem(LS))||{};}catch{return {};} }
function saveProgress(p){ localStorage.setItem(LS, JSON.stringify(p)); }
function markDone(key, idx){
  const p = loadProgress();
  if(!p[key]) p[key] = {};
  p[key][idx] = true;
  saveProgress(p);
}
function isDone(key, idx){
  const p = loadProgress();
  return !!(p[key] && p[key][idx]);
}

/* Render: semesters */
function renderSemesters(){
  const box = $("#semGrid");
  if(!box) return;
  box.innerHTML = BYTEBOND.semesters.map(s=>`
    <a class="card3d" href="subject.html?sem=${s.sem}">
      <h3>Semester ${s.sem}</h3>
      <p>Open subjects & units</p>
      <div class="row" style="margin-top:10px">
        <span class="badge">${s.subjects.length} Papers</span>
      </div>
    </a>
  `).join("");
  enableTilt();
}

/* Render: subjects by sem */
function renderSubjects(){
  const params = getParams();
  const sem = Number(params.sem || 1);
  const semObj = BYTEBOND.semesters.find(x=>x.sem===sem);

  const title = $("#pageTitle");
  const box = $("#subjectsGrid");
  if(!title || !box) return;

  title.textContent = `Semester ${sem} Subjects`;
  if(!semObj){
    box.innerHTML = `<div class="panel">Invalid semester.</div>`;
    return;
  }

  box.innerHTML = semObj.subjects.map(sub=>{
    const key = `${sem}|${sub.code}`;
    const topicCount = (BYTEBOND.topics[key]||[]).length;
    return `
      <a class="card3d" href="topic.html?sem=${sem}&code=${encodeURIComponent(sub.code)}">
        <h3>${sub.name}</h3>
        <p class="small">${sub.code}</p>
        <div class="row" style="margin-top:10px">
          <span class="badge">${topicCount ? `${topicCount} Units Added` : "Units: view outline"}</span>
          <span class="badge">Open</span>
        </div>
      </a>
    `;
  }).join("");
  enableTilt();
}

/* Render: topic page */
function renderTopic(){
  const params = getParams();
  const sem = Number(params.sem || 1);
  const code = params.code || "";
  const key = `${sem}|${code}`;

  const semObj = BYTEBOND.semesters.find(x=>x.sem===sem);
  const subject = semObj?.subjects?.find(s=>s.code===code);

  const title = $("#topicTitle");
  const list = $("#topicList");
  if(!title || !list) return;

  if(!subject){
    title.textContent = "Subject not found";
    list.innerHTML = `<div class="panel">Invalid subject.</div>`;
    return;
  }

  title.textContent = `${subject.name} (${subject.code})`;

  const units = BYTEBOND.topics[key] || [];
  if(!units.length){
    list.innerHTML = `
      <div class="panel">
        <b>Units outline not filled yet for this paper.</b><br/>
        Go to <span class="kbd">data.js</span> → add topics under key <span class="kbd">${key}</span>.
      </div>`;
    return;
  }

  list.innerHTML = units.map((u, idx)=>{
    const done = isDone(key, idx);
    return `
      <div class="panel" style="margin:12px 0">
        <div class="row" style="justify-content:space-between">
          <div>
            <span class="badge">${u.unit}</span>
            <h3 style="margin:10px 0 6px">${u.title}</h3>
            <div class="small">${done ? "✅ Completed" : "Not completed yet"}</div>
          </div>
          <button class="btn" data-done="${idx}">${done ? "Completed" : "Mark as Done"}</button>
        </div>

        <div class="sep"></div>
        <p class="p">${(u.explain||"").replace(/\n/g,"<br/>")}</p>

        ${u.exampleTitle ? `<div class="badge" style="margin:10px 0 8px">${u.exampleTitle}</div>` : ""}
        ${u.exampleCode ? `<pre><code>${escapeHtml(u.exampleCode)}</code></pre>` : ""}
      </div>
    `;
  }).join("");

  $all("[data-done]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const idx = Number(btn.getAttribute("data-done"));
      markDone(key, idx);
      renderTopic();
    });
  });
}

function escapeHtml(str){
  return (str||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

/* Home search */
function setupSearch(){
  const input = $("#searchInput");
  const btn = $("#searchBtn");
  const out = $("#searchResults");
  if(!input || !btn || !out) return;

  function allSubjects(){
    const list = [];
    BYTEBOND.semesters.forEach(s=>{
      s.subjects.forEach(sub=>{
        list.push({ sem:s.sem, ...sub });
      });
    });
    return list;
  }

  function search(){
    const q = input.value.trim().toLowerCase();
    if(!q){ out.innerHTML=""; return; }

    const subs = allSubjects();
    const hits = [];

    subs.forEach(sub=>{
      if(sub.name.toLowerCase().includes(q) || sub.code.toLowerCase().includes(q)){
        hits.push({type:"Subject", title:`${sub.name} (${sub.code})`, link:`topic.html?sem=${sub.sem}&code=${encodeURIComponent(sub.code)}`});
      }
      const key = `${sub.sem}|${sub.code}`;
      (BYTEBOND.topics[key]||[]).forEach(u=>{
        if((u.title||"").toLowerCase().includes(q)){
          hits.push({type:"Unit", title:`${u.title} — ${sub.code}`, link:`topic.html?sem=${sub.sem}&code=${encodeURIComponent(sub.code)}`});
        }
      });
    });

    out.innerHTML = hits.length ? hits.slice(0,12).map(h=>`
      <div class="listItem">
        <b>${h.title}</b>
        <div class="small">${h.type}</div>
        <div class="small"><a href="${h.link}">Open</a></div>
      </div>
    `).join("") : `<div class="listItem"><b>No results.</b><div class="small">Try: C, DBMS, OS, Network</div></div>`;
  }

  btn.addEventListener("click", search);
  input.addEventListener("keydown",(e)=>{ if(e.key==="Enter") search(); });
}

/* Quiz */
function renderQuiz(){
  const box = $("#quizBox");
  if(!box) return;

  const set = BYTEBOND.quizSets[0];
  if(!set){
    box.innerHTML = `<div class="panel">No quiz added yet.</div>`;
    return;
  }

  box.innerHTML = `
    <div class="panel">
      <h2>${set.title}</h2>
      <p class="p">Semester ${set.sem} • ${set.code}</p>
    </div>

    <form id="quizForm" class="panel" style="margin-top:12px">
      ${set.questions.map((qq,i)=>`
        <div style="margin: 10px 0 18px">
          <div><b>Q${i+1}.</b> ${qq.q}</div>
          <div style="margin-top:10px; display:grid; gap:8px">
            ${qq.options.map((op,j)=>`
              <label class="listItem" style="margin:0">
                <input type="radio" name="q${i}" value="${j}" style="width:auto;margin-right:10px">
                ${op}
              </label>
            `).join("")}
          </div>
        </div>
      `).join("")}
      <button class="btn" type="submit">Submit Quiz</button>
      <div id="quizResult" style="margin-top:12px"></div>
    </form>
  `;

  $("#quizForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    let score=0;
    set.questions.forEach((qq,i)=>{
      const pick = document.querySelector(`input[name="q${i}"]:checked`);
      if(pick && Number(pick.value)===qq.answer) score++;
    });
    $("#quizResult").innerHTML = `<div class="listItem">✅ Score: <b>${score}</b> / ${set.questions.length}</div>`;
  });
}

/* INIT */
document.addEventListener("DOMContentLoaded", ()=>{
  setActiveNav();
  enableTilt();
  setupSearch();
  renderSemesters();
  renderSubjects();
  renderTopic();
  renderQuiz();
});
