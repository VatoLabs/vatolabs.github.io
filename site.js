// Vato Labs: theme toggle, servo trace (simulated), corrected command, work preview.
(function () {
  const root = document.documentElement;

  // theme: follows the system until the visitor picks; the pick is remembered
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const current = () => root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
  const syncToggle = () => {
    const dark = current() === 'dark';
    document.querySelectorAll('.theme-toggle').forEach((b) => {
      b.setAttribute('aria-pressed', String(dark));
      b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
  };
  document.querySelectorAll('.theme-toggle').forEach((b) => b.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncToggle();
  }));
  if (mq.addEventListener) mq.addEventListener('change', syncToggle);
  syncToggle();

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, at) => { const e = document.createElementNS(NS, n); for (const k in at) e.setAttribute(k, at[k]); return e; };

  // A simple STS3215-like position servo: PD on error, speed limit 299 deg/s (5.22 rad/s), 10 ms delay, +-0.5 deg backlash.
  // An illustration with published limits, not a measurement.
  function sim(T, amp) {
    const dt = 0.001, N = 1200, d = 10, vmax = 298.8, kp = 900, kd = 55, umax = 3e4, bl = 0.5;
    let m = 0, v = 0, o = 0; const r = [], a = [];
    for (let i = 0; i < N; i++) { const s = Math.min(Math.max((i * dt - 0.1) / T, 0), 1); r.push(amp * (10 * s ** 3 - 15 * s ** 4 + 6 * s ** 5)); }
    let peak = 0;
    for (let i = 0; i < N; i++) {
      const e = r[Math.max(0, i - d)] - o; const u = Math.max(-umax, Math.min(umax, kp * e - kd * v));
      v = Math.max(-vmax, Math.min(vmax, v + u * dt)); m += v * dt;
      if (m - o > bl) o = m - bl; else if (m - o < -bl) o = m + bl;
      a.push(o); peak = Math.max(peak, Math.abs(r[i] - o));
    }
    return { r, a, peak };
  }

  function frame(svg, W, H, L, R, T, B, max, ticks) {
    const X = (i, n) => L + (W - L - R) * i / (n - 1);
    const Y = (v) => H - B - (H - T - B) * v / max;
    for (const g of ticks) {
      const y = Y(g);
      svg.append(el('line', { x1: L, x2: W - R, y1: y, y2: y, class: 'axis' }));
      const t = el('text', { x: L - 10, y: y + 4, class: 'axl', 'text-anchor': 'end' }); t.textContent = g + '°'; svg.append(t);
    }
    for (const s of [0, 0.4, 0.8, 1.2]) {
      const t = el('text', { x: L + (W - L - R) * s / 1.2, y: H - 6, class: 'axl', 'text-anchor': s === 0 ? 'start' : (s === 1.2 ? 'end' : 'middle') }); t.textContent = s + ' s'; svg.append(t);
    }
    const path = (arr) => { let p = ''; const n = arr.length; for (let i = 0; i < n; i += 4) p += (i ? 'L' : 'M') + X(i, n).toFixed(1) + ' ' + Y(arr[i]).toFixed(1); return p; };
    return { X, Y, path };
  }

  function draw(svg, T) {
    const W = 640, H = 300, R = sim(T, 60); svg.textContent = '';
    const f = frame(svg, W, H, 44, 8, 12, 28, 66, [0, 30, 60]);
    const n = R.r.length; let band = '';
    for (let i = 0; i < n; i += 4) band += (i ? 'L' : 'M') + f.X(i, n).toFixed(1) + ' ' + f.Y(R.r[i]).toFixed(1);
    for (let i = n - 1 - ((n - 1) % 4); i >= 0; i -= 4) band += 'L' + f.X(i, n).toFixed(1) + ' ' + f.Y(R.a[i]).toFixed(1);
    svg.append(el('path', { d: band + 'Z', class: 'err' }), el('path', { d: f.path(R.r), class: 'ln-ref' }), el('path', { d: f.path(R.a), class: 'ln-act' }));
    const lag = document.getElementById('lag'); if (lag) lag.textContent = R.peak.toFixed(1) + '°';
  }

  const plot = document.getElementById('plot');
  if (plot) {
    let T = 0.25; draw(plot, T);
    const btns = document.querySelectorAll('.seg button');
    btns.forEach((b) => b.addEventListener('click', () => { btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b))); T = +b.dataset.t; draw(plot, T); }));
  }

  // corrected command: it leads the target by the modelled delay and pre-loads the backlash
  const p2 = document.getElementById('plot2');
  if (p2) {
    const W = 640, H = 260, N = 1200, r = [], c = [];
    for (let i = 0; i < N; i++) { const s = Math.min(Math.max((i * 0.001 - 0.15) / 0.4, 0), 1); r.push(60 * (10 * s ** 3 - 15 * s ** 4 + 6 * s ** 5)); }
    for (let i = 0; i < N; i++) { const j = Math.min(N - 1, i + 10); c.push(r[j] + 0.5 * Math.sign(r[j] - r[Math.max(0, j - 1)])); }
    const f = frame(p2, W, H, 44, 8, 12, 28, 64, [0, 30, 60]);
    p2.append(el('path', { d: f.path(r), class: 'ln-ref' }), el('path', { d: f.path(c), class: 'ln-act' }));
  }

  // work: the preview follows the row under the pointer or the focus
  const peek = document.getElementById('peek');
  if (peek) {
    const rows = document.querySelectorAll('.index a');
    rows.forEach((a) => {
      const show = () => {
        rows.forEach((x) => x.classList.toggle('is-on', x === a));
        const src = a.dataset.img; if (!src || peek.getAttribute('src') === src) return;
        peek.style.opacity = '0';
        const im = new Image(); im.onload = () => { peek.src = src; peek.style.opacity = '1'; }; im.src = src;
      };
      a.addEventListener('mouseenter', show); a.addEventListener('focus', show);
    });
    if (rows[0]) rows[0].classList.add('is-on');
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('video[autoplay]').forEach((v) => { v.pause(); v.removeAttribute('autoplay'); v.controls = true; });
})();
