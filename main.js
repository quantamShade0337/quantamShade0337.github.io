(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (new URLSearchParams(location.search).has("snap")) {
    document.documentElement.classList.add("snap");
  }

  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  };

  $("#copyEmail").addEventListener("click", async (e) => {
    const email = e.currentTarget.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied — " + email);
    } catch {
      location.href = "mailto:" + email;
    }
  });

  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  const forceReveal = () => {
    $$(".reveal:not(.in)").forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
    });
  };
  setTimeout(forceReveal, 2500);
  addEventListener("hashchange", () => setTimeout(forceReveal, 800));

  const counters = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      counters.unobserve(en.target);
      const el = en.target;
      const target = +el.dataset.target;
      if (reduced) { el.textContent = target.toLocaleString(); continue; }
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.6 });

  const FALLBACK_REPOS = [
    { name: "meshlab", description: "Image-to-3D pipeline with real STL/OBJ/GLB export for 3D printing.", html_url: "https://github.com/quantamShade0337/meshlab", homepage: "", language: "TypeScript", pushed_at: "2026-06-09" },
    { name: "CTFSolverWeb", description: "Capture-the-flag solving toolkit on the web.", html_url: "https://github.com/quantamShade0337/CTFSolverWeb", homepage: "https://ctf-solver-web.vercel.app", language: "JavaScript", pushed_at: "2026-06-08" },
    { name: "appstore-intel", description: "Apify Actor: App Store metadata, ASO search, ratings, and public reviews.", html_url: "https://github.com/quantamShade0337/appstore-intel", homepage: "", language: "JavaScript", pushed_at: "2026-06-04" },
    { name: "jobs-radar", description: "Apify Actor: aggregate public job postings from Greenhouse, Ashby & Lever.", html_url: "https://github.com/quantamShade0337/jobs-radar", homepage: "", language: "JavaScript", pushed_at: "2026-06-04" },
    { name: "GitHub-Status", description: "Live status dashboard for GitHub services.", html_url: "https://github.com/quantamShade0337/GitHub-Status", homepage: "https://git-hub-status-three.vercel.app", language: "TypeScript", pushed_at: "2026-05-31" },
    { name: "Sanity", description: "", html_url: "https://github.com/quantamShade0337/Sanity", homepage: "", language: "", pushed_at: "2026-05-30" },
    { name: "SaneShell", description: "A saner shell experience for macOS.", html_url: "https://github.com/quantamShade0337/SaneShell", homepage: "", language: "Swift", pushed_at: "2026-05-27" },
    { name: "CodeType", description: "Typing practice for programmers.", html_url: "https://github.com/quantamShade0337/CodeType", homepage: "", language: "TypeScript", pushed_at: "2026-05-27" },
    { name: "Sanebar", description: "Menu-bar utility for macOS.", html_url: "https://github.com/quantamShade0337/Sanebar", homepage: "", language: "Swift", pushed_at: "2026-05-22" },
    { name: "budget", description: "Personal budgeting, minus the spreadsheet pain.", html_url: "https://github.com/quantamShade0337/budget", homepage: "", language: "TypeScript", pushed_at: "2026-05-13" },
    { name: "Dart-throwing", description: "", html_url: "https://github.com/quantamShade0337/Dart-throwing", homepage: "", language: "", pushed_at: "2026-05-12" },
    { name: "IDEs", description: "Compare and explore developer IDEs.", html_url: "https://github.com/quantamShade0337/IDEs", homepage: "https://id-es.vercel.app", language: "JavaScript", pushed_at: "2026-05-11" },
    { name: "FlowDay", description: "A study website where you can plan, set focus sessions and more.", html_url: "https://github.com/quantamShade0337/FlowDay", homepage: "", language: "JavaScript", pushed_at: "2026-05-04" },
    { name: "esdraw", description: "Drawing playground on the web.", html_url: "https://github.com/quantamShade0337/esdraw", homepage: "", language: "TypeScript", pushed_at: "2026-05-02" },
    { name: "AI-Controller", description: "", html_url: "https://github.com/quantamShade0337/AI-Controller", homepage: "", language: "", pushed_at: "2026-04-30" },
    { name: "Auth", description: "Authentication experiments in Python.", html_url: "https://github.com/quantamShade0337/Auth", homepage: "", language: "Python", pushed_at: "2026-04-30" },
    { name: "quantamShade0337.github.io", description: "This site. Yes, it's open source too.", html_url: "https://github.com/quantamShade0337/quantamShade0337.github.io", homepage: "", language: "HTML", pushed_at: "2026-04-26" },
    { name: "KairoApp", description: "", html_url: "https://github.com/quantamShade0337/KairoApp", homepage: "https://kairo-app-five.vercel.app", language: "TypeScript", pushed_at: "2026-04-22" },
    { name: "Is-my-idea-good-", description: "Sanity-check your next big idea.", html_url: "https://github.com/quantamShade0337/Is-my-idea-good-", homepage: "https://is-my-idea-good-mocha.vercel.app", language: "JavaScript", pushed_at: "2026-04-16" },
    { name: "markdown", description: "Markdown editor on the web.", html_url: "https://github.com/quantamShade0337/markdown", homepage: "https://markdown-one-beta.vercel.app", language: "TypeScript", pushed_at: "2026-04-15" },
    { name: "AIReviews", description: "AI-powered review insights.", html_url: "https://github.com/quantamShade0337/AIReviews", homepage: "https://ai-reviews-quantamshade0337s-projects.vercel.app", language: "TypeScript", pushed_at: "2026-04-15" },
    { name: "Sentinel", description: "", html_url: "https://github.com/quantamShade0337/Sentinel", homepage: "", language: "", pushed_at: "2026-04-13" },
    { name: "AI-detector", description: "Detect AI-generated text.", html_url: "https://github.com/quantamShade0337/AI-detector", homepage: "", language: "CSS", pushed_at: "2026-04-06" },
    { name: "WeakChess", description: "Chess???", html_url: "https://github.com/quantamShade0337/WeakChess", homepage: "", language: "C++", pushed_at: "2026-04-03" },
    { name: "Ghost", description: "A platform Swift developers can use to run Swift all on the web!", html_url: "https://github.com/quantamShade0337/Ghost", homepage: "", language: "JavaScript", pushed_at: "2026-04-01" },
    { name: "deVaultt", description: "A website to sell or lease digital products like domains and more!", html_url: "https://github.com/quantamShade0337/deVaultt", homepage: "", language: "TypeScript", pushed_at: "2026-03-05" },
    { name: "deVault", description: "A website to sell or lease digital products like domains and more!", html_url: "https://github.com/quantamShade0337/deVault", homepage: "", language: "HTML", pushed_at: "2026-03-04" },
    { name: "VentureIQ", description: "Startup intelligence on the web.", html_url: "https://github.com/quantamShade0337/VentureIQ", homepage: "", language: "JavaScript", pushed_at: "2026-03-03" },
    { name: "PawhealthPro.github.io", description: "A website all about dogs.", html_url: "https://github.com/quantamShade0337/PawhealthPro.github.io", homepage: "", language: "HTML", pushed_at: "2026-01-30" },
    { name: "Stick", description: "iOS experiments in Swift.", html_url: "https://github.com/quantamShade0337/Stick", homepage: "", language: "Swift", pushed_at: "2025-08-02" },
    { name: "Jokes-App", description: "Jokes app on iOS — Swift Accelerator AM class.", html_url: "https://github.com/quantamShade0337/Jokes-App", homepage: "", language: "Swift", pushed_at: "2025-07-26" }
  ];

  const LANG_COLORS = {
    TypeScript: "#3178c6", JavaScript: "#f1e05a", Swift: "#f05138",
    HTML: "#e34c26", CSS: "#563d7c", Python: "#3572a5", "C++": "#f34b7d"
  };

  const relTime = (iso) => {
    const days = Math.max(0, Math.round((Date.now() - new Date(iso)) / 864e5));
    if (days < 1) return "today";
    if (days < 30) return days + "d ago";
    if (days < 365) return Math.round(days / 30) + "mo ago";
    return Math.round(days / 365) + "y ago";
  };

  const repoGrid = $("#repoGrid");
  const filterRow = $("#filterRow");
  let reposExpanded = false;
  const repoClipbox = $("#repoClipbox");
  const repoToggle = $("#repoToggle");
  const PEEK = 64; // px of row 3 left peeking under the fade

  const updateRepoClip = () => {
    const visible = $$(".repo-card", repoGrid).filter((c) => !c.classList.contains("hide"));
    const clippable = visible.length > 6;
    repoToggle.hidden = !clippable;
    repoToggle.textContent = reposExpanded ? "Show less" : "Show more";
    if (!reposExpanded && clippable) {
      repoClipbox.style.height = visible[6].offsetTop + PEEK + "px";
      repoClipbox.classList.add("clipped");
      visible.forEach((c) => c.classList.add("in")); // peeking cards shouldn't sit un-revealed
    } else {
      repoClipbox.style.height = "";
      repoClipbox.classList.remove("clipped");
    }
  };

  repoToggle.addEventListener("click", () => {
    const h0 = repoClipbox.offsetHeight;
    reposExpanded = !reposExpanded;
    updateRepoClip();
    if (reposExpanded) $$(".repo-card", repoGrid).forEach((c) => c.classList.add("in"));

    if (!reduced) {
      const h1 = repoClipbox.offsetHeight;
      repoClipbox.animate(
        [{ height: h0 + "px" }, { height: h1 + "px" }],
        { duration: 520, easing: "cubic-bezier(.28,.11,.32,1)" }
      );
    }

    if (!reposExpanded) $("#open-source").scrollIntoView({ behavior: "smooth" });
  });

  addEventListener("resize", () => { if (!reposExpanded) updateRepoClip(); });

  const renderRepos = (repos) => {
    repoGrid.innerHTML = repos.map((r, i) => {
      const lang = r.language || "";
      const dot = lang
        ? `<span><span class="lang-dot" style="background:${LANG_COLORS[lang] || "#86868b"}"></span>${lang}</span>`
        : "";
      const live = r.homepage
        ? `<span class="repo-live" data-href="${r.homepage}" title="Open live site">Live</span>`
        : "";
      return `
      <a class="repo-card reveal" data-lang="${lang}" href="${r.html_url}" target="_blank" rel="noopener" style="--d:${Math.min(i % 9, 6) * 0.04}s">
        <div class="repo-top"><span class="repo-name">${r.name}</span><span class="repo-arrow">↗</span></div>
        <p class="repo-desc">${r.description || "No description — the code speaks for itself."}</p>
        <div class="repo-meta">${dot}<span>Updated ${relTime(r.pushed_at)}</span>${live}</div>
      </a>`;
    }).join("");
    $$(".repo-card", repoGrid).forEach((el) => io.observe(el));
    $$(".repo-live", repoGrid).forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        open(el.dataset.href, "_blank", "noopener");
      });
    });
    const langs = [...new Set(repos.map((r) => r.language).filter(Boolean))];
    filterRow.innerHTML =
      `<button class="filter-pill active" data-lang="">All</button>` +
      langs.map((l) => `<button class="filter-pill" data-lang="${l}">${l}</button>`).join("");
    $$(".filter-pill", filterRow).forEach((pill) => {
      pill.addEventListener("click", () => {
        $$(".filter-pill", filterRow).forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        const lang = pill.dataset.lang;
        $$(".repo-card", repoGrid).forEach((card) => {
          card.classList.toggle("hide", !!lang && card.dataset.lang !== lang);
        });
        updateRepoClip();
      });
    });
    updateRepoClip();
  };

  renderRepos(FALLBACK_REPOS);

  fetch("https://api.github.com/users/quantamShade0337/repos?per_page=100&sort=pushed")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      const repos = data
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
      if (repos.length) {
        renderRepos(repos);
        const counter = $('.count[data-target="31"]');
        if (counter) counter.dataset.target = repos.length;
      }
    })
    .catch(() => {});

  const contrib = $("#contrib");
  const renderContrib = (days, total) => {
      if (!days || !days.length) return;
      const cells = Array(new Date(days[0].date).getDay()).fill(null).concat(days);
      const weeks = [];
      for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

      const monthName = (d) =>
        new Date(d + "T00:00:00").toLocaleString("en-US", { month: "short" });
      let prevMonth = "";
      const monthsHtml = weeks.map((w) => {
        const first = w.find(Boolean);
        if (!first) return "<span></span>";
        const m = monthName(first.date);
        if (m !== prevMonth) { prevMonth = m; return `<span><b>${m}</b></span>`; }
        return "<span></span>";
      }).join("");

      const fmt = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US",
        { month: "short", day: "numeric", year: "numeric" });
      const weeksHtml = weeks.map((w) =>
        `<div class="contrib-week">` +
        w.map((d) => d
          ? `<i class="cl${d.level}" title="${d.count} contribution${d.count === 1 ? "" : "s"} on ${fmt(d.date)}"></i>`
          : `<i class="empty"></i>`
        ).join("") +
        `</div>`
      ).join("");

      contrib.innerHTML = `
        <div class="contrib-head">
          <h3>${total.toLocaleString()} contributions in the last year</h3>
          <a class="link-chevron" href="https://github.com/quantamShade0337" target="_blank" rel="noopener">@quantamShade0337 <span>›</span></a>
        </div>
        <div class="contrib-scroll">
          <div class="contrib-body">
            <div class="contrib-months">${monthsHtml}</div>
            <div class="contrib-rows">
              <div class="contrib-days"><span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span></div>
              <div class="contrib-grid">${weeksHtml}</div>
            </div>
          </div>
        </div>
        <div class="contrib-legend"><span>Less</span><i class="cl0"></i><i class="cl1"></i><i class="cl2"></i><i class="cl3"></i><i class="cl4"></i><span>More</span></div>`;
      contrib.hidden = false;
  };
  const CONTRIB_SNAP = {
    start: "2025-06-08",
    total: 1004,
    counts: "0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,4,0,0,0,0,0,0,3,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2,0,0,11,0,0,11,1,6,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,27,49,9,0,0,8,0,10,1,3,8,0,0,0,0,1,2,0,0,22,53,38,19,13,26,10,1,0,0,0,13,5,6,0,0,44,29,2,124,0,6,0,10,7,15,1,6,11,14,5,6,10,9,0,0,1,0,0,14,9,6,1,0,0,17,0,3,0,0,0,1,27,21,27,17,0,0,1,3,0,21,0,0,1,7,3,0,2,12,0,2,1,10,1,4,3,0,0,0,0,3,13,0,0,0,0,2,2,0,1,3,0,0,1,0,7,0,0,7,3,0,1,2,20,2,0,0,5,3,0",
    levels: "00100000000000000000000000000000000000000000000010000001000000000000010000001000000100000010000000000000000000000000000000000000000000000000000000000000000110010011101000000000000000000000000000000000000000000000000000000000000000000000011210010111100001100122111110001110021140101111111111100100111100101000111110011010011101101111110000110000110110010100110111100110"
  };
  {
    const t0 = new Date(CONTRIB_SNAP.start + "T00:00:00Z").getTime();
    const days = CONTRIB_SNAP.counts.split(",").map((c, i) => ({
      date: new Date(t0 + i * 864e5).toISOString().slice(0, 10),
      count: +c,
      level: +CONTRIB_SNAP.levels[i] || 0
    }));
    renderContrib(days, CONTRIB_SNAP.total);
  }

  fetch("https://github-contributions-api.deno.dev/quantamShade0337.json")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      const LV = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
      const days = data.contributions.flat().map((d) => ({
        date: d.date, count: d.contributionCount, level: LV[d.contributionLevel] || 0
      }));
      renderContrib(days, days.reduce((s, d) => s + d.count, 0));
    })
    .catch(() =>
      fetch("https://github-contributions-api.jogruber.de/v4/quantamShade0337?y=last")
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data) => renderContrib(data.contributions,
          (data.total && data.total.lastYear) ?? data.contributions.reduce((s, d) => s + d.count, 0)))
        .catch(() => {})
    );

  const CERTS = [
    { issuer: "Apple", name: "App Development with Swift — Certified User", meta: "Issued Mar 2026 · Expires Mar 2031", id: "Certiport-verified" },
    { issuer: "Apple", name: "Apple Teacher (Swift)", meta: "Issued Apr 2026 · Swift, Education" },
    { issuer: "Apple", name: "Apple Teacher (Mac)", meta: "Issued Apr 2026 · Education" },
    { issuer: "IMDA", name: "Swift Accelerator Programme", meta: "Issued Jan 2026 · Apple · IMDA · SwiftInSG" },
    { issuer: "Microsoft", name: "Microsoft Azure for AI and Machine Learning", meta: "Issued Apr 2026", id: "XC45A330EW3W" },
    { issuer: "Google", name: "Google AI Essentials", meta: "Issued Apr 2026", id: "6QRMLC6WP507" },
    { issuer: "Google", name: "Discover the Art of Prompting", meta: "Issued Apr 2026", id: "I4SPVPNGZ9EH" },
    { issuer: "Google", name: "Maximise Productivity With AI Tools", meta: "Issued Apr 2026", id: "FKEMMVTULH3W" },
    { issuer: "Google", name: "Stay Ahead of the AI Curve", meta: "Issued Apr 2026", id: "TQ1FE6YJ616S" },
    { issuer: "Google", name: "Introduction to AI", meta: "Issued Mar 2026" }
  ];
  $("#certGrid").innerHTML = CERTS.map((c, i) => `
    <article class="cert-card reveal" style="--d:${(i % 2) * 0.06}s">
      <div class="cert-mono" aria-hidden="true">${c.issuer[0]}</div>
      <div class="cert-body">
        <h3 class="cert-name">${c.name}</h3>
        <p class="cert-meta">${c.issuer} · ${c.meta}${c.id ? ` · ID ${c.id}` : ""}</p>
      </div>
    </article>`).join("");

  const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let ki = 0;
  addEventListener("keydown", (e) => {
    ki = e.key === KONAMI[ki] ? ki + 1 : (e.key === KONAMI[0] ? 1 : 0);
    if (ki < KONAMI.length) return;
    ki = 0;
    showToast("↑↑↓↓←→←→BA — Ethan approves of your moves.");
    for (let n = 0; n < 50; n++) {
      const c = document.createElement("span");
      c.className = "confetti";
      c.textContent = "▲";
      c.style.left = Math.random() * 100 + "vw";
      c.style.color = ["#1d1d1f", "#6e6e73", "#d2d2d7"][n % 3];
      c.style.animationDuration = 2.2 + Math.random() * 2.5 + "s";
      c.style.fontSize = 10 + Math.random() * 14 + "px";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }
  });

  $$(".reveal").forEach((el) => io.observe(el));
  $$(".count").forEach((el) => counters.observe(el));
})();
