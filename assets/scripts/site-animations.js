/* ============================================================
   Ryan Potter — page animations
   The three animated behaviours that run on every page:
     - IntroAnimation       : the on-load reveal (header fades in,
       its text slides up, headline lines wipe up, lede fades in).
     - ScrollRevealObserver  : fades content in as it scrolls into
       view, driven by an IntersectionObserver.
     - MobileNavigation      : the hamburger menu open/close
       sequence on small screens.
   All motion is opacity-only on hairline-bearing elements so the
   site's 1px rules never thicken or shift colour.
   Plain ES2022. No libraries. No arrow functions.
   ============================================================ */

'use strict';

/**
 * The on-load intro. Mirrors the markup contract used across the
 * pages: `.reveal-line > span` headline lines wipe up, `.fade-up`
 * elements fade in, and the site header fades while its text
 * slides up. The `page-loaded` body class is the freeze-safe end
 * state — CSS shows everything even if a tween never runs.
 */
class IntroAnimation {
  constructor() {
    this.hasPlayed = false;
    this.boundPlay = this.play.bind(this);
  }

  /* Arms the standard triggers: window load plus a hard timeout so
     the page can never stay hidden if `load` is slow. */
  arm() {
    window.addEventListener('load', this.boundPlay);
    window.setTimeout(this.boundPlay, 1500);
  }

  play() {
    if (this.hasPlayed) { return; }
    this.hasPlayed = true;

    if (document.body) { document.body.classList.add('page-loaded'); }
    if (MotionPreferences.prefersReducedMotion()) { return; }

    this.animateHeader();
    this.animateHeadlineLines();
    this.animateFadeUpElements();
  }

  /* Clears the given inline styles after the animation's time has
     passed, regardless of whether its frames actually ran — the
     class-driven CSS end state then shows the element. This makes
     the intro immune to paused animation frames. */
  static scheduleStyleCleanup(element, propertyNames, totalMilliseconds) {
    window.setTimeout(function () {
      for (let index = 0; index < propertyNames.length; index += 1) {
        if (propertyNames[index].indexOf('--') === 0) {
          element.style.removeProperty(propertyNames[index]);
        } else {
          element.style[propertyNames[index]] = '';
        }
      }
    }, totalMilliseconds + 150);
  }

  /* Header: the bar fades in (opacity only, so its 1px underline
     stays crisp) while the wordmark and links slide up. The orange
     active-page underline rides inside the sliding links, so we
     counter that exact motion with a custom property — the line
     only fades, never moves.
     Every start state is applied inline and synchronously, BEFORE
     the browser can paint the `page-loaded` end state — otherwise
     the content would blink in for a frame and then animate. */
  animateHeader() {
    const headerElement = document.querySelector('header.site-header');
    const slidingElements = document.querySelectorAll('.site-header .wordmark, .site-header .navigation-links');
    const activeLinkElement = document.querySelector('.site-header .navigation-links a.is-active');
    const slideDistance = 18;

    if (headerElement) {
      headerElement.style.opacity = '0';
      IntroAnimation.scheduleStyleCleanup(headerElement, ['opacity'], 700);
      new Tween({
        durationMilliseconds: 700,
        easingFunction: Easing.reveal,
        onUpdate: function (easedProgress) {
          headerElement.style.opacity = String(easedProgress);
        },
        onComplete: function () {
          headerElement.style.opacity = '';
        }
      }).start();
    }

    if (slidingElements.length) {
      for (let index = 0; index < slidingElements.length; index += 1) {
        slidingElements[index].style.transform = 'translateY(' + slideDistance + 'px)';
        IntroAnimation.scheduleStyleCleanup(slidingElements[index], ['transform'], 700);
      }
      if (activeLinkElement) {
        activeLinkElement.style.setProperty('--underline-shift', String(-slideDistance));
        IntroAnimation.scheduleStyleCleanup(activeLinkElement, ['--underline-shift'], 700);
      }
      new Tween({
        durationMilliseconds: 700,
        easingFunction: Easing.reveal,
        onUpdate: function (easedProgress) {
          const offset = slideDistance * (1 - easedProgress);
          for (let index = 0; index < slidingElements.length; index += 1) {
            slidingElements[index].style.transform = 'translateY(' + offset + 'px)';
          }
          /* Counter-shift the active underline so it stays put. */
          if (activeLinkElement) {
            activeLinkElement.style.setProperty('--underline-shift', String(-offset));
          }
        },
        onComplete: function () {
          for (let index = 0; index < slidingElements.length; index += 1) {
            slidingElements[index].style.transform = '';
          }
          if (activeLinkElement) {
            activeLinkElement.style.removeProperty('--underline-shift');
          }
        }
      }).start();
    }
  }

  /* Headline lines: each `.reveal-line > span` wipes up out of its
     clipping parent while fading in, staggered top to bottom. The
     hidden start state is applied inline immediately so the text
     can never paint before its turn in the sequence. */
  animateHeadlineLines() {
    const lineElements = document.querySelectorAll('.reveal-line > span');
    for (let index = 0; index < lineElements.length; index += 1) {
      const lineElement = lineElements[index];
      const delayMilliseconds = 80 + (index * 80);

      lineElement.style.transform = 'translateY(110%)';
      lineElement.style.opacity = '0';
      IntroAnimation.scheduleStyleCleanup(lineElement, ['transform', 'opacity'], delayMilliseconds + 900);

      new Tween({
        durationMilliseconds: 900,
        delayMilliseconds: delayMilliseconds,
        easingFunction: Easing.reveal,
        onUpdate: function (easedProgress) {
          lineElement.style.transform = 'translateY(' + (110 * (1 - easedProgress)) + '%)';
          lineElement.style.opacity = String(easedProgress);
        },
        onComplete: function () {
          lineElement.style.transform = '';
          lineElement.style.opacity = '';
        }
      }).start();
    }
  }

  /* Supporting content (`.fade-up`) fades in with a stagger.
     Opacity only — no translate — so bordered elements such as
     the hero metadata strip keep crisp hairlines. The hidden
     start state is applied inline immediately (see above). */
  animateFadeUpElements() {
    const fadeUpElements = document.querySelectorAll('.fade-up');
    for (let index = 0; index < fadeUpElements.length; index += 1) {
      const fadeUpElement = fadeUpElements[index];
      const delayMilliseconds = 140 + (index * 110);

      fadeUpElement.style.opacity = '0';
      IntroAnimation.scheduleStyleCleanup(fadeUpElement, ['opacity'], delayMilliseconds + 700);

      new Tween({
        durationMilliseconds: 700,
        delayMilliseconds: delayMilliseconds,
        easingFunction: Easing.reveal,
        onUpdate: function (easedProgress) {
          fadeUpElement.style.opacity = String(easedProgress);
        },
        onComplete: function () {
          fadeUpElement.style.opacity = '';
        }
      }).start();
    }
  }
}

/**
 * Reveals `.scroll-reveal` elements as they enter the viewport.
 * The check is plain geometry — an element reveals once its top
 * crosses roughly 86% of the viewport height, evaluated on
 * scroll/resize/load (throttled to animation frames). A manual
 * check is used instead of IntersectionObserver because some
 * embedded contexts never deliver observer records, which would
 * strand content invisible. Elements fade in once (opacity only)
 * and are then left alone.
 */
class ScrollRevealObserver {
  /* An element reveals when its top is above this fraction of the
     viewport height — the same trigger line the site has always used. */
  static revealLineFraction = 0.86;

  constructor() {
    this.pendingElements = [];
    this.lastCheckTimestamp = 0;

    this.boundQueueCheck = this.queueCheck.bind(this);

    window.addEventListener('scroll', this.boundQueueCheck, { passive: true });
    window.addEventListener('resize', this.boundQueueCheck);
    window.addEventListener('load', this.boundQueueCheck);
  }

  /* Registers every not-yet-revealed `.scroll-reveal` on the page
     and immediately checks which are already in view. Safe to call
     again after lists re-render — elements are marked so nothing
     is registered twice. */
  observeAll() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    /* With reduced motion just show everything immediately. */
    if (MotionPreferences.prefersReducedMotion()) {
      for (let index = 0; index < revealElements.length; index += 1) {
        revealElements[index].classList.add('is-revealed');
      }
      return;
    }

    for (let index = 0; index < revealElements.length; index += 1) {
      const revealElement = revealElements[index];
      if (revealElement.dataset.scrollRevealBound) { continue; }
      revealElement.dataset.scrollRevealBound = 'true';
      this.pendingElements.push(revealElement);
    }

    this.queueCheck();
  }

  /* Runs the check synchronously (it is cheap — one rectangle read
     per still-hidden element), lightly throttled against event
     bursts. Deliberately NOT deferred to an animation frame:
     frames can be paused in background/embedded contexts, and the
     reveal must never depend on one firing. */
  queueCheck() {
    if (!this.pendingElements.length) { return; }
    const now = performance.now();
    if (now - this.lastCheckTimestamp < 16) { return; }
    this.lastCheckTimestamp = now;
    this.checkPendingElements();
  }

  /* Reveals every pending element whose top has crossed the reveal
     line, with a small stagger inside each batch. */
  checkPendingElements() {
    const revealLine = (window.innerHeight || 800) * ScrollRevealObserver.revealLineFraction;
    const stillPending = [];
    let batchIndex = 0;

    for (let index = 0; index < this.pendingElements.length; index += 1) {
      const revealElement = this.pendingElements[index];
      if (revealElement.getBoundingClientRect().top < revealLine) {
        this.revealElement(revealElement, batchIndex * 80);
        batchIndex += 1;
      } else {
        stillPending.push(revealElement);
      }
    }

    this.pendingElements = stillPending;
  }

  revealElement(revealElement, delayMilliseconds) {
    /* The class is the guaranteed end state (CSS shows the element);
       the tween below only decorates the change with a fade. The
       inline opacity keeps it hidden through the stagger delay. */
    revealElement.classList.add('is-revealed');
    revealElement.style.opacity = '0';

    new Tween({
      durationMilliseconds: 700,
      delayMilliseconds: delayMilliseconds,
      easingFunction: Easing.reveal,
      onUpdate: function (easedProgress) {
        revealElement.style.opacity = String(easedProgress);
      },
      onComplete: function () {
        revealElement.style.opacity = '';
      }
    }).start();

    /* Hard guarantee: even if animation frames are paused in this
       context and the tween never runs, clear the inline opacity
       once its time has passed so the element is shown. */
    window.setTimeout(function () {
      revealElement.style.opacity = '';
    }, delayMilliseconds + 800);
  }
}

/**
 * The hamburger menu on small screens. Opening plays a sequence —
 * the panel drops in, then the links cascade down into place.
 * Closing retracts the links bottom-up and fades the panel away.
 */
class MobileNavigation {
  constructor() {
    this.toggleButton = document.querySelector('.menu-toggle');
    this.linksPanel = document.querySelector('.navigation-links');
    this.isOpen = false;
    this.activeTweens = [];

    if (!this.toggleButton || !this.linksPanel) { return; }

    this.linkElements = this.linksPanel.querySelectorAll('a');
    this.toggleButton.setAttribute('aria-expanded', 'false');
    this.toggleButton.addEventListener('click', this.handleToggleClick.bind(this));
  }

  cancelActiveTweens() {
    for (let index = 0; index < this.activeTweens.length; index += 1) {
      this.activeTweens[index].cancel();
    }
    this.activeTweens = [];
  }

  clearInlineStyles() {
    this.linksPanel.style.opacity = '';
    this.linksPanel.style.transform = '';
    for (let index = 0; index < this.linkElements.length; index += 1) {
      this.linkElements[index].style.opacity = '';
      this.linkElements[index].style.transform = '';
    }
  }

  handleToggleClick() {
    this.isOpen = !this.isOpen;
    this.toggleButton.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
    this.cancelActiveTweens();

    if (this.isOpen) {
      this.playOpenSequence();
    } else {
      this.playCloseSequence();
    }
  }

  playOpenSequence() {
    const panel = this.linksPanel;
    panel.classList.add('is-open');

    if (MotionPreferences.prefersReducedMotion()) { return; }

    /* The panel drops in… */
    this.activeTweens.push(new Tween({
      durationMilliseconds: 300,
      easingFunction: Easing.decelerateOut,
      onUpdate: function (easedProgress) {
        panel.style.opacity = String(easedProgress);
        panel.style.transform = 'translateY(' + (-10 * (1 - easedProgress)) + 'px)';
      },
      onComplete: function () {
        panel.style.opacity = '';
        panel.style.transform = '';
      }
    }).start());

    /* …then the links cascade down into place. */
    for (let index = 0; index < this.linkElements.length; index += 1) {
      const linkElement = this.linkElements[index];
      linkElement.style.opacity = '0';
      this.activeTweens.push(new Tween({
        durationMilliseconds: 420,
        delayMilliseconds: 60 + (index * 70),
        easingFunction: Easing.reveal,
        onUpdate: function (easedProgress) {
          linkElement.style.opacity = String(easedProgress);
          linkElement.style.transform = 'translateY(' + (12 * (1 - easedProgress)) + 'px)';
        },
        onComplete: function () {
          linkElement.style.opacity = '';
          linkElement.style.transform = '';
        }
      }).start());
    }
  }

  playCloseSequence() {
    const panel = this.linksPanel;
    const self = this;

    if (MotionPreferences.prefersReducedMotion()) {
      panel.classList.remove('is-open');
      return;
    }

    /* Links retract bottom-up… */
    const linkCount = this.linkElements.length;
    for (let index = 0; index < linkCount; index += 1) {
      const linkElement = this.linkElements[index];
      const reversedPosition = (linkCount - 1) - index;
      this.activeTweens.push(new Tween({
        durationMilliseconds: 160,
        delayMilliseconds: reversedPosition * 40,
        easingFunction: Easing.accelerateIn,
        onUpdate: function (easedProgress) {
          linkElement.style.opacity = String(1 - easedProgress);
          linkElement.style.transform = 'translateY(' + (8 * easedProgress) + 'px)';
        }
      }).start());
    }

    /* …then the panel fades away and is removed from layout. */
    this.activeTweens.push(new Tween({
      durationMilliseconds: 180,
      delayMilliseconds: 80,
      easingFunction: Easing.accelerateIn,
      onUpdate: function (easedProgress) {
        panel.style.opacity = String(1 - easedProgress);
      },
      onComplete: function () {
        panel.classList.remove('is-open');
        self.clearInlineStyles();
      }
    }).start());
  }
}
