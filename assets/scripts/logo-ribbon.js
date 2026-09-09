/* ===========================================================
   Logo ribbon — infinite marquee with drag/throw physics
   - Auto-scrolls right-to-left slowly
   - Hover: slows (never stops)
   - Drag/throw: continues in thrown direction, easing (circ)
     back down to base speed, and keeps that direction
   =========================================================== */
(function () {
  const ribbon = document.querySelector('[data-logo-ribbon]');
  if (!ribbon) return;
  const track = ribbon.querySelector('.ribbon-track');
  if (!track) return;

  /* ---- tuning ---- */
  const BASE_SPEED   = 32;    // px/s cruising speed
  const HOVER_FACTOR = 0.35;  // hover slows to 35% (never 0)
  const MAX_THROW    = 2600;  // px/s cap on flick velocity
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- state ---- */
  let setWidth  = 0;          // width of one full logo set (loop period)
  let offset    = 0;          // current translateX
  let velocity  = -BASE_SPEED;// px/s, negative = leftward
  let direction = -1;         // persists after throws
  let hovering  = false;
  let dragging  = false;
  let visible   = true;

  // throw-settle animation (circ ease from release velocity -> cruise)
  let settle = null;          // { from, to, start, dur }

  const originals = Array.from(track.children);

  function cruiseSpeed() {
    if (reducedMotion) return 0;
    return BASE_SPEED * (hovering ? HOVER_FACTOR : 1) * direction;
  }

  /* ---- build the loop: clone the set until it covers 2x viewport ---- */
  function buildLoop() {
    track.querySelectorAll('[data-clone]').forEach((n) => n.remove());
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
    setWidth = 0;
    originals.forEach((el) => { setWidth += el.getBoundingClientRect().width + gap; });
    if (setWidth <= 0) return;
    const needed = Math.ceil((ribbon.clientWidth * 2) / setWidth) + 1;
    for (let i = 0; i < needed; i++) {
      originals.forEach((el) => {
        const c = el.cloneNode(true);
        c.setAttribute('data-clone', '');
        c.setAttribute('aria-hidden', 'true');
        track.appendChild(c);
      });
    }
    apply();
  }

  function wrap() {
    if (setWidth <= 0) return;
    // keep offset within (-setWidth, 0] so the loop is seamless either direction
    offset = ((offset % setWidth) - setWidth) % setWidth;
  }

  function apply() {
    wrap();
    track.style.transform = 'translate3d(' + offset.toFixed(2) + 'px,0,0)';
  }

  /* ---- easing ---- */
  function easeOutCirc(p) { return Math.sqrt(1 - Math.pow(1 - p, 2)); }

  function startSettle(fromVelocity) {
    const to = cruiseSpeed();
    const gapV = Math.abs(fromVelocity - to);
    // bigger throws take longer to bleed off
    const dur = Math.min(3.2, Math.max(0.7, gapV / 700));
    settle = { from: fromVelocity, to: to, start: performance.now(), dur: dur * 1000 };
  }

  /* ---- main loop ---- */
  let lastT = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;

    if (!dragging && visible) {
      if (settle) {
        const p = Math.min(1, (now - settle.start) / settle.dur);
        velocity = settle.from + (settle.to - settle.from) * easeOutCirc(p);
        if (p >= 1) settle = null;
      } else {
        // gentle approach toward cruise (handles hover in/out)
        const target = cruiseSpeed();
        velocity += (target - velocity) * Math.min(1, dt * 5);
      }
      offset += velocity * dt;
      apply();
    }
    requestAnimationFrame(frame);
  }

  /* ---- hover: slow down, don't stop ---- */
  ribbon.addEventListener('mouseenter', () => {
    hovering = true;
    if (settle) settle.to = cruiseSpeed();
  });
  ribbon.addEventListener('mouseleave', () => {
    hovering = false;
    if (settle) settle.to = cruiseSpeed();
  });

  /* ---- drag / throw ---- */
  let lastX = 0, lastMoveT = 0, flickV = 0, moved = 0;

  ribbon.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragging = true;
    moved = 0;
    settle = null;
    lastX = e.clientX;
    lastMoveT = performance.now();
    flickV = 0;
    ribbon.classList.add('is-dragging');
    ribbon.setPointerCapture(e.pointerId);
  });

  ribbon.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    const dtm = Math.max(1, now - lastMoveT);
    moved += Math.abs(dx);
    offset += dx;
    apply();
    // smoothed instantaneous velocity (px/s)
    const inst = (dx / dtm) * 1000;
    flickV = flickV * 0.25 + inst * 0.75;
    lastX = e.clientX;
    lastMoveT = now;
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    ribbon.classList.remove('is-dragging');
    lastT = performance.now();
    // stale flick (user held still before releasing) -> no throw
    if (performance.now() - lastMoveT > 90) flickV = 0;
    const thrown = Math.abs(flickV) > 60 && moved > 6;
    if (thrown) {
      direction = flickV > 0 ? 1 : -1;        // ribbon keeps this direction
      const v0 = Math.max(-MAX_THROW, Math.min(MAX_THROW, flickV));
      startSettle(v0);
    } else {
      startSettle(velocity * 0.3);            // soft resume, same direction
    }
  }
  ribbon.addEventListener('pointerup', endDrag);
  ribbon.addEventListener('pointercancel', endDrag);

  ribbon.addEventListener('dragstart', (e) => e.preventDefault());
  ribbon.addEventListener('click', (e) => { if (moved > 6) e.preventDefault(); }, true);

  /* ---- housekeeping ---- */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      lastT = performance.now();
    }).observe(ribbon);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildLoop, 150);
  });

  const imgs = Array.from(track.querySelectorAll('img'));
  Promise.all(imgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())))
    .then(buildLoop)
    .then(() => requestAnimationFrame((t) => { lastT = t; requestAnimationFrame(frame); }));
})();
