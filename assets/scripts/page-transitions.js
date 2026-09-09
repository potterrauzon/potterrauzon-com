/* ============================================================
   Ryan Potter — page transitions
   When the visitor clicks an internal link, the current page
   fades out starting from the top and waterfalls down the
   screen before the browser navigates. Every hairline rule on
   the page (the header underline, list dividers, section
   borders, grid-gap lines) fades with the same wave so nothing
   is left behind. The incoming page's own intro animation then
   continues the same top-down motion — a seamless handoff.
   Plain ES2022. No libraries. No arrow functions.
   ============================================================ */

'use strict';

class PageTransitionController {
  /* Background colours that paint as grid-gap "lines" (the values
     of --line / --line-2 / --line-strong, as computed rgba). */
  static hairlineBackgroundColors = {
    'rgba(21, 23, 28, 0.1)': true,
    'rgba(21, 23, 28, 0.16)': true,
    'rgba(21, 23, 28, 0.28)': true
  };

  static waveSpreadMilliseconds = 420;  /* top-to-bottom delay spread */
  static fadeDurationMilliseconds = 500; /* each element's own fade   */

  constructor() {
    this.isLeaving = false;
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    window.addEventListener('pageshow', this.handlePageShow.bind(this));
  }

  /* ---------- link interception ---------- */

  /* Returns the destination URL when a clicked anchor should get a
     transition, or null for everything else (new tabs, downloads,
     hash jumps, external sites, modified clicks …). */
  getTransitionDestination(anchorElement) {
    if (!anchorElement) { return null; }
    if (anchorElement.target && anchorElement.target !== '' && anchorElement.target !== '_self') { return null; }
    if (anchorElement.hasAttribute('download')) { return null; }

    const rawHref = anchorElement.getAttribute('href');
    if (!rawHref) { return null; }
    if (/^(?:#|mailto:|tel:|javascript:)/i.test(rawHref)) { return null; }

    let destination;
    try { destination = new URL(anchorElement.href, location.href); } catch (parseError) { return null; }

    if (destination.origin !== location.origin) { return null; }
    /* In-page anchors on the current document never transition. */
    if (destination.pathname === location.pathname && destination.hash) { return null; }
    if (destination.href === location.href) { return null; }

    return destination.href;
  }

  handleDocumentClick(clickEvent) {
    if (clickEvent.defaultPrevented) { return; }
    if (clickEvent.button !== 0) { return; }
    if (clickEvent.metaKey || clickEvent.ctrlKey || clickEvent.shiftKey || clickEvent.altKey) { return; }

    const anchorElement = clickEvent.target.closest ? clickEvent.target.closest('a') : null;
    const destination = this.getTransitionDestination(anchorElement);
    if (!destination) { return; }

    clickEvent.preventDefault();
    this.leaveTo(destination);
  }

  /* ---------- what fades out ---------- */

  /* The content blocks that fade out, at the finest granularity
     that still animates cleanly (never a block and its own child). */
  collectContentBlocks() {
    const selector = [
      'header.site-header',
      'main .content-wrapper > *',
      '.logo-ribbon-section > *',
      '.table-of-contents',
      '.work-list > *',
      '.writing-list > *',
      '.article-body > *',
      '.footer-top',
      '.footer-bottom'
    ].join(',');

    let blocks = Array.prototype.slice.call(document.querySelectorAll(selector));

    /* Keep only "leaf" matches so a block and its descendant are
       never both animated (that would compound the fades). */
    blocks = blocks.filter(function (candidate) {
      return !blocks.some(function (other) {
        return other !== candidate && candidate.contains(other);
      });
    });

    if (!blocks.length) {
      blocks = Array.prototype.slice.call(
        document.querySelectorAll('header.site-header, main > section, footer.site-footer')
      );
    }
    return blocks;
  }

  /* Every element actually painting a hairline — a visible border
     on any side, or a grid-gap line background. Each visible side
     is recorded so its own colour can be faded (fading the
     `borderColor` shorthand samples a 0-width side and flashes the
     line opaque for a frame — never do that). */
  collectHairlineElements() {
    const scope = document.querySelectorAll(
      'header.site-header, header.site-header *, main, main *, footer.site-footer, footer.site-footer *'
    );
    const hairlines = [];

    Array.prototype.forEach.call(scope, function (element) {
      const computed = getComputedStyle(element);
      const visibleSides = [];

      ['Top', 'Right', 'Bottom', 'Left'].forEach(function (side) {
        if (parseFloat(computed['border' + side + 'Width']) > 0) {
          const sideColor = computed['border' + side + 'Color'];
          if (sideColor && sideColor !== 'rgba(0, 0, 0, 0)' && sideColor !== 'transparent') {
            visibleSides.push(side);
          }
        }
      });

      const lineBackground =
        PageTransitionController.hairlineBackgroundColors[computed.backgroundColor] === true
          ? computed.backgroundColor
          : null;

      if (visibleSides.length || lineBackground) {
        hairlines.push({ element: element, sides: visibleSides, backgroundColor: lineBackground });
      }
    });

    return hairlines;
  }

  /* ---------- the wave ---------- */

  /* Delay keyed to where an element sits in the viewport: things
     near the top leave first, the wave travels down the screen. */
  computeWaveDelay(element) {
    const viewportHeight = window.innerHeight || 800;
    let viewportFraction = element.getBoundingClientRect().top / viewportHeight;
    viewportFraction = Math.max(0, Math.min(1, viewportFraction));
    return viewportFraction * PageTransitionController.waveSpreadMilliseconds;
  }

  /* Parses "rgb(a)" and rebuilds it with the alpha interpolated
     toward zero — same hue and lightness, only opacity changes. */
  static fadeColorAlpha(colorString, easedProgress) {
    const numbers = (colorString || '').match(/-?\d+\.?\d*/g);
    if (!numbers || numbers.length < 3) { return 'rgba(0,0,0,0)'; }
    const startingAlpha = numbers.length >= 4 ? parseFloat(numbers[3]) : 1;
    const fadedAlpha = startingAlpha * (1 - easedProgress);
    return 'rgba(' + numbers[0] + ',' + numbers[1] + ',' + numbers[2] + ',' + fadedAlpha.toFixed(4) + ')';
  }

  /* Plays the leave waterfall, then navigates. */
  leaveTo(destinationUrl) {
    if (this.isLeaving) { return; }
    this.isLeaving = true;

    if (MotionPreferences.prefersReducedMotion()) {
      location.href = destinationUrl;
      return;
    }

    const fadeDuration = PageTransitionController.fadeDurationMilliseconds;
    const self = this;
    let hasNavigated = false;

    function navigate() {
      if (hasNavigated) { return; }
      hasNavigated = true;
      location.href = destinationUrl;
    }

    /* Content fades out (opacity only — translating an element
       fattens any 1px border it carries). */
    const contentBlocks = this.collectContentBlocks();
    let longestDelay = 0;
    for (let index = 0; index < contentBlocks.length; index += 1) {
      const block = contentBlocks[index];
      const delay = this.computeWaveDelay(block);
      if (delay > longestDelay) { longestDelay = delay; }
      new Tween({
        durationMilliseconds: fadeDuration,
        delayMilliseconds: delay,
        easingFunction: Easing.accelerateIn,
        onUpdate: function (easedProgress) {
          block.style.opacity = String(1 - easedProgress);
        }
      }).start();
    }

    /* Every hairline fades with the same downward wave: each
       visible border side keeps its own colour while its alpha
       drops to zero; grid-gap line backgrounds do the same. */
    const hairlines = this.collectHairlineElements();
    for (let index = 0; index < hairlines.length; index += 1) {
      const hairline = hairlines[index];
      const computed = getComputedStyle(hairline.element);
      const delay = this.computeWaveDelay(hairline.element);

      const startingSideColors = {};
      for (let sideIndex = 0; sideIndex < hairline.sides.length; sideIndex += 1) {
        const side = hairline.sides[sideIndex];
        startingSideColors[side] = computed['border' + side + 'Color'];
      }
      const startingBackground = hairline.backgroundColor;

      new Tween({
        durationMilliseconds: fadeDuration,
        delayMilliseconds: delay,
        easingFunction: Easing.accelerateIn,
        onUpdate: function (easedProgress) {
          for (let sideIndex = 0; sideIndex < hairline.sides.length; sideIndex += 1) {
            const side = hairline.sides[sideIndex];
            hairline.element.style['border' + side + 'Color'] =
              PageTransitionController.fadeColorAlpha(startingSideColors[side], easedProgress);
          }
          if (startingBackground) {
            hairline.element.style.backgroundColor =
              PageTransitionController.fadeColorAlpha(startingBackground, easedProgress);
          }
        }
      }).start();
    }

    /* Navigate when the slowest fade has finished — plus a hard
       fallback so navigation always happens. */
    window.setTimeout(navigate, longestDelay + fadeDuration + 30);
    window.setTimeout(navigate, PageTransitionController.waveSpreadMilliseconds + fadeDuration + 350);
  }

  /* If the page is restored from the back/forward cache after a
     leave animation, wipe any inline mid-fade styles so the page
     is fully visible again. */
  handlePageShow(pageShowEvent) {
    if (!pageShowEvent.persisted) { return; }
    this.isLeaving = false;

    const everything = document.querySelectorAll(
      'header.site-header, header.site-header *, main, main *, footer.site-footer, footer.site-footer *'
    );
    Array.prototype.forEach.call(everything, function (element) {
      element.style.opacity = '';
      element.style.transform = '';
      element.style.borderTopColor = '';
      element.style.borderRightColor = '';
      element.style.borderBottomColor = '';
      element.style.borderLeftColor = '';
      element.style.backgroundColor = '';
    });
  }
}
