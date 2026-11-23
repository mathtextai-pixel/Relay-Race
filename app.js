(function () {
  "use strict";

  var lessons = window.RELAY_LESSONS || [];
  var $ = function (id) { return document.getElementById(id); };

  // ---------- math shorthand -> HTML ----------
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function math(s) {
    return esc(s)
      .replace(/[a-zA-Z]/g, "<i>$&</i>")
      .replace(/\{([^{}\/]+)\/([^{}\/]+)\}/g, '<span class="frac"><span>$1</span><span>$2</span></span>')
      .replace(/\^(\d+)/g, "<sup>$1</sup>");
  }

  // ---------- state ----------
  var lesson = null;
  var items = [];          // examples first, then the timed rounds
  var round = 0;
  var revealed = 0;        // reveal taps so far: each step takes two (the work, then its name)
  var phase = "ready";     // ready | running | stopped
  var startedAt = 0;
  var elapsed = 0;
  var ticker = null;
  var times = {};          // round index -> ms

  function storeKey() { return "relay-times-" + lesson.id; }
  function loadTimes() {
    try { times = JSON.parse(localStorage.getItem(storeKey())) || {}; } catch (e) { times = {}; }
  }
  function saveTimes() {
    try { localStorage.setItem(storeKey(), JSON.stringify(times)); } catch (e) { /* ignore */ }
  }

  function fmt(ms) {
    var tenths = Math.floor(ms / 100);
    var m = Math.floor(tenths / 600);
    var s = Math.floor((tenths % 600) / 10);
    return m + ":" + (s < 10 ? "0" : "") + s + "." + (tenths % 10);
  }

  // ---------- rendering ----------
  function renderRound() {
    var r = items[round];
    $("lessonName").textContent = "Grade " + lesson.grade + "  ·  Lesson " + lesson.lesson + "  ·  " + lesson.title;
    var tag = r.example ? "Example" : r.level || "";
    $("levelTag").textContent = tag;
    $("levelTag").hidden = !tag;
    $("app").classList.toggle("is-example", !!r.example);
    $("roundLabel").textContent = r.example
      ? "Example " + (r.num + 1) + " of " + (lesson.examples || []).length
      : "Round " + (r.num + 1) + " of " + lesson.rounds.length;

    $("story").textContent = r.story || "";
    $("problemBody").classList.toggle("has-story", !!r.story);
    $("expression").innerHTML = math(r.expression);
    $("values").innerHTML = (r.values || []).map(function (v) {
      return '<span class="value-chip">' + math(v) + "</span>";
    }).join("");

    $("runners").innerHTML = r.steps.map(function (st, i) {
      return '<div class="runner"><div class="runner-num">Runner ' + (i + 1) + "</div>" +
        '<div class="runner-job">' + esc(st.job) + "</div>" +
        '<div class="work"><span>' + math(st.work) + "</span></div></div>";
    }).join("");
    $("answer").innerHTML = math(r.answer);

    renderState();
    renderTimes();
  }

  function renderState() {
    var r = items[round];
    var showProblem = phase !== "ready";
    $("getSet").hidden = showProblem;
    $("problemBody").hidden = !showProblem;

    var cards = $("runners").children;
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.toggle("shown", revealed > 2 * i);
      cards[i].classList.toggle("named", revealed > 2 * i + 1);
    }
    var total = r.steps.length * 2;
    $("answerRow").hidden = revealed < total;

    var main = $("mainBtn");
    main.classList.toggle("stop", phase === "running");
    var last = round === items.length - 1;
    main.textContent = phase === "ready" ? "Start" : phase === "running" ? "Stop" :
      last ? "Last round done" : !r.example ? "Next round" : items[round + 1].example ? "Next example" : "Go to Round 1";
    main.disabled = phase !== "ready" && phase !== "running" && last;

    var rb = $("revealBtn");
    rb.disabled = phase === "ready" || revealed >= total;
    rb.textContent = revealed >= total ? "All steps shown" :
      (revealed % 2 === 0 ? "Show step " : "Name step ") + (Math.floor(revealed / 2) + 1);

    $("prevBtn").disabled = round === 0;
    $("nextBtn").disabled = round === items.length - 1;
    $("clock").classList.toggle("running", phase === "running");
    $("clock").textContent = fmt(elapsed);
  }

  function renderTimes() {
    var best = null;
    Object.keys(times).forEach(function (k) {
      if (best === null || times[k] < times[best]) best = k;
    });
    var curNum = items[round].example ? -1 : items[round].num;
    $("times").innerHTML = lesson.rounds.map(function (_, i) {
      var has = times[i] != null;
      var cls = (i === curNum ? "current " : "") + (String(i) === best ? "best" : "");
      return '<li class="' + cls + '"><span>Round ' + (i + 1) + "</span>" +
        '<span class="t' + (has ? "" : " none") + '">' + (has ? fmt(times[i]) + (String(i) === best ? " ★" : "") : "–") + "</span></li>";
    }).join("");
    var cur = $("times").querySelector(".current");
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest" });
  }

  // ---------- actions ----------
  function stopTicker() { if (ticker) { clearInterval(ticker); ticker = null; } }

  function start() {
    phase = "running";
    startedAt = performance.now();
    elapsed = 0;
    stopTicker();
    ticker = setInterval(function () {
      elapsed = performance.now() - startedAt;
      $("clock").textContent = fmt(elapsed);
    }, 50);
    renderState();
  }

  function stop() {
    elapsed = performance.now() - startedAt;
    stopTicker();
    phase = "stopped";
    times[items[round].num] = elapsed;
    saveTimes();
    renderState();
    renderTimes();
  }

  function goTo(i) {
    if (i < 0 || i >= items.length) return;
    stopTicker();
    round = i;
    phase = items[i].example ? "example" : "ready";
    revealed = 0;
    elapsed = 0;
    renderRound();
  }

  function mainAction() {
    if (phase === "ready") start();
    else if (phase === "running") stop();
    else goTo(round + 1);
  }

  function reveal() {
    if (phase === "ready") return;
    if (revealed < items[round].steps.length * 2) { revealed++; renderState(); }
  }

  function redo() {
    stopTicker();
    phase = items[round].example ? "example" : "ready";
    revealed = 0;
    elapsed = 0;
    renderState();
  }

  // ---------- lesson picker ----------
  function openLesson(l) {
    lesson = l;
    items = (l.examples || []).map(function (r, i) { return Object.assign({}, r, { example: true, num: i }); })
      .concat(l.rounds.map(function (r, i) { return Object.assign({}, r, { num: i }); }));
    loadTimes();
    $("picker").hidden = true;
    $("app").hidden = false;
    document.title = "Relay Race " + l.lesson + " – " + l.title;
    goTo(0);
  }

  // The teacher page: every relay race, grouped by grade, each a real link.
  function showPicker() {
    stopTicker();
    lesson = null;
    document.title = "Relay Races";
    $("app").hidden = true;
    $("picker").hidden = false;
    var list = $("lessonList");
    list.innerHTML = "";
    if (!lessons.length) { list.textContent = "No relay races yet."; return; }

    var sorted = lessons.slice().sort(function (a, b) {
      return a.grade - b.grade || String(a.lesson).localeCompare(String(b.lesson), undefined, { numeric: true });
    });
    var lastGrade = null;
    sorted.forEach(function (l) {
      if (l.grade !== lastGrade) {
        var h = document.createElement("h2");
        h.textContent = "Grade " + l.grade;
        list.appendChild(h);
        lastGrade = l.grade;
      }
      var n = (l.examples || []).length;
      var a = document.createElement("a");
      a.className = "lesson-link";
      a.href = "?lesson=" + encodeURIComponent(l.id);
      a.innerHTML = '<span class="lesson-num">' + esc(l.lesson) + "</span>" +
        '<span class="lesson-text">' + esc(l.title) +
        "<small>" + (n ? n + (n === 1 ? " example, " : " examples, ") : "") + l.rounds.length + " rounds</small></span>" +
        '<span class="lesson-go">Open</span>';
      a.onclick = function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;   // let "open in new tab" work
        e.preventDefault();
        navigate(a.getAttribute("href"));
      };
      list.appendChild(a);
    });
  }

  function route() {
    var wanted = new URLSearchParams(location.search).get("lesson");
    var match = lessons.filter(function (l) { return l.id === wanted; })[0];
    if (match) openLesson(match); else showPicker();
  }

  // Change the address without reloading; where that is not allowed, just switch views.
  function navigate(url) {
    try { history.pushState(null, "", url); route(); }
    catch (e) {
      var id = new URLSearchParams(url.split("?")[1] || "").get("lesson");
      var match = lessons.filter(function (l) { return l.id === id; })[0];
      if (match) openLesson(match); else showPicker();
    }
  }
  window.addEventListener("popstate", route);

  // ---------- wiring ----------
  $("mainBtn").onclick = mainAction;
  $("revealBtn").onclick = reveal;
  $("resetBtn").onclick = redo;
  $("prevBtn").onclick = function () { goTo(round - 1); };
  $("nextBtn").onclick = function () { goTo(round + 1); };
  $("homeBtn").onclick = function () { navigate(location.pathname); };
  // Two taps to clear, so a stray touch on the board cannot wipe the times.
  var clearArmed = null;
  $("clearBtn").onclick = function () {
    var btn = $("clearBtn");
    if (clearArmed) {
      clearTimeout(clearArmed); clearArmed = null;
      btn.textContent = "Clear";
      times = {}; saveTimes(); renderTimes();
    } else {
      btn.textContent = "Tap again to clear";
      clearArmed = setTimeout(function () { clearArmed = null; btn.textContent = "Clear"; }, 3000);
    }
  };
  $("fullBtn").onclick = function () {
    try {
      var p = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
      if (p && p.catch) p.catch(function () {});
    } catch (e) { /* full screen not available here */ }
  };

  document.addEventListener("keydown", function (e) {
    if (!lesson || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === "Space") { e.preventDefault(); mainAction(); }
    else if (e.key === "s" || e.key === "S") reveal();
    else if (e.key === "ArrowRight") goTo(round + 1);
    else if (e.key === "ArrowLeft") goTo(round - 1);
  });
  // Keep Space from also "clicking" whichever button was touched last.
  document.addEventListener("keyup", function (e) { if (e.code === "Space") e.preventDefault(); });

  route();
})();
