/* ============================================================
   Ryan Potter — animation engine
   A small, dependency-free animation core used by every other
   script on the site. It provides:
     - CubicBezierEasing : an exact cubic-bezier curve solver,
       used to reproduce the site's signature reveal easing.
     - Easing            : the named easing curves the site uses.
     - Tween             : a requestAnimationFrame-driven tween
       that eases a 0 → 1 progress value over a duration and
       reports it through a callback on every frame.
   Plain ES2022. No libraries. No arrow functions.
   ============================================================ */

'use strict';

/**
 * Solves a CSS-style cubic-bezier timing curve so that JavaScript
 * animations can use the exact same easing as a CSS transition.
 * The curve always starts at (0,0) and ends at (1,1); the two
 * control points are supplied to the constructor.
 */
class CubicBezierEasing {
  constructor(controlX1, controlY1, controlX2, controlY2) {
    this.controlX1 = controlX1;
    this.controlY1 = controlY1;
    this.controlX2 = controlX2;
    this.controlY2 = controlY2;
  }

  /* Bezier polynomial for one axis, given its two control values. */
  static computeAxis(parameter, controlA, controlB) {
    const oneMinus = 1 - parameter;
    return (3 * oneMinus * oneMinus * parameter * controlA) +
           (3 * oneMinus * parameter * parameter * controlB) +
           (parameter * parameter * parameter);
  }

  /**
   * Maps linear time (0..1) to eased progress (0..1).
   * Uses binary subdivision to invert the x-axis polynomial,
   * which is plenty accurate for UI animation.
   */
  solve(linearTime) {
    if (linearTime <= 0) { return 0; }
    if (linearTime >= 1) { return 1; }

    let lowerBound = 0;
    let upperBound = 1;
    let parameter = linearTime;

    for (let iteration = 0; iteration < 24; iteration += 1) {
      const xAtParameter = CubicBezierEasing.computeAxis(parameter, this.controlX1, this.controlX2);
      if (Math.abs(xAtParameter - linearTime) < 0.0005) { break; }
      if (xAtParameter < linearTime) { lowerBound = parameter; } else { upperBound = parameter; }
      parameter = (lowerBound + upperBound) / 2;
    }

    return CubicBezierEasing.computeAxis(parameter, this.controlY1, this.controlY2);
  }
}

/**
 * The named easing curves used across the site. Each is exposed as
 * a plain function that maps linear time (0..1) to eased progress.
 */
class Easing {
  /* The signature "reveal" ease — a long, soft deceleration.
     Identical to CSS cubic-bezier(0.16, 1, 0.3, 1). */
  static revealCurve = new CubicBezierEasing(0.16, 1, 0.3, 1);

  static reveal(linearTime) {
    return Easing.revealCurve.solve(linearTime);
  }

  /* Accelerating ease used when elements leave the page. */
  static accelerateIn(linearTime) {
    return linearTime * linearTime * linearTime;
  }

  /* Decelerating ease used for small entrances (menus, glow). */
  static decelerateOut(linearTime) {
    const inverted = 1 - linearTime;
    return 1 - (inverted * inverted * inverted);
  }

  /* Circular ease-out — starts fast, settles very gently. */
  static circOut(linearTime) {
    return Math.sqrt(1 - Math.pow(linearTime - 1, 2));
  }

  static linear(linearTime) {
    return linearTime;
  }
}

/**
 * A single requestAnimationFrame-driven tween.
 *
 * The tween does not know about DOM properties: it simply eases a
 * progress value from 0 to 1 and hands it to `onUpdate` each frame.
 * Callers translate that progress into styles (opacity, transforms,
 * colors, custom properties …), which keeps this class tiny and
 * keeps every animation explicit and readable at the call site.
 *
 * Options:
 *   durationMilliseconds  — how long the tween runs (default 300)
 *   delayMilliseconds     — wait before starting (default 0)
 *   easingFunction        — one of the Easing statics (default linear)
 *   onUpdate(progress)    — called every frame with eased progress
 *   onComplete()          — called once when the tween finishes
 */
class Tween {
  constructor(options) {
    this.durationMilliseconds = options.durationMilliseconds || 300;
    this.delayMilliseconds = options.delayMilliseconds || 0;
    this.easingFunction = options.easingFunction || Easing.linear;
    this.onUpdate = options.onUpdate || null;
    this.onComplete = options.onComplete || null;

    this.startTimestamp = null;
    this.animationFrameId = null;
    this.hasFinished = false;

    /* Bind the frame handler once so it can be passed to
       requestAnimationFrame without creating arrow functions. */
    this.boundHandleFrame = this.handleFrame.bind(this);
  }

  /* Begins the tween. Returns `this` so callers can keep a handle. */
  start() {
    this.startTimestamp = performance.now() + this.delayMilliseconds;
    this.animationFrameId = window.requestAnimationFrame(this.boundHandleFrame);
    return this;
  }

  /* Stops the tween immediately without firing onComplete. */
  cancel() {
    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.hasFinished = true;
  }

  /* Jumps straight to the end state and fires the callbacks once. */
  finishImmediately() {
    if (this.hasFinished) { return; }
    this.cancel();
    this.hasFinished = true;
    if (this.onUpdate) { this.onUpdate(1); }
    if (this.onComplete) { this.onComplete(); }
  }

  /* One animation frame: compute eased progress and report it. */
  handleFrame(frameTimestamp) {
    if (this.hasFinished) { return; }

    const elapsed = frameTimestamp - this.startTimestamp;

    if (elapsed < 0) {
      /* Still inside the start delay — wait for the next frame. */
      this.animationFrameId = window.requestAnimationFrame(this.boundHandleFrame);
      return;
    }

    const linearProgress = Math.min(elapsed / this.durationMilliseconds, 1);
    const easedProgress = this.easingFunction(linearProgress);

    if (this.onUpdate) { this.onUpdate(easedProgress); }

    if (linearProgress >= 1) {
      this.hasFinished = true;
      this.animationFrameId = null;
      if (this.onComplete) { this.onComplete(); }
      return;
    }

    this.animationFrameId = window.requestAnimationFrame(this.boundHandleFrame);
  }
}

/**
 * Site-wide motion preferences. Every animated component asks this
 * class before moving anything, so reduced-motion users get the
 * finished layout instantly.
 */
class MotionPreferences {
  static prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
