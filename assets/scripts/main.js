/* ============================================================
   Ryan Potter — main controller
   The Controller layer: reads the URL, asks the repositories
   (Model) for data, hands it to the views (View), and wires up
   the page behaviours — work-list filtering, the article scroll
   spy, scroll reveals, the mobile menu, the hero canvases, the
   intro animation and the page transitions.
   Load order: this file runs last, after the engine, data,
   views and animation scripts.
   Plain ES2022. No libraries. No arrow functions.
   ============================================================ */

'use strict';

/**
 * Filtering behaviour for the work index: the chip row narrows
 * the list to one kind of project and re-renders the rows.
 */
class WorkFilterController {
  constructor(filterBarElement, listElement, scrollRevealObserver) {
    this.filterBarElement = filterBarElement;
    this.listElement = listElement;
    this.scrollRevealObserver = scrollRevealObserver;
    this.filterBarElement.addEventListener('click', this.handleFilterClick.bind(this));
  }

  handleFilterClick(clickEvent) {
    const chipElement = clickEvent.target.closest('.filter-chip');
    if (!chipElement) { return; }

    const chipElements = this.filterBarElement.querySelectorAll('.filter-chip');
    for (let index = 0; index < chipElements.length; index += 1) {
      chipElements[index].classList.remove('is-active');
    }
    chipElement.classList.add('is-active');

    const filterValue = chipElement.getAttribute('data-filter');
    const allProjects = ProjectRepository.getAllProjects();
    const filteredProjects = filterValue === 'all'
      ? allProjects
      : allProjects.filter(function (project) { return project.kind.indexOf(filterValue) >= 0; });

    WorkListView.renderInto(this.listElement, filteredProjects);
    this.scrollRevealObserver.observeAll();
  }
}

/**
 * Article-page behaviour: smooth-scrolls to a section when its
 * table-of-contents link is clicked, and highlights the section
 * currently being read as the visitor scrolls (a scroll spy).
 */
class ArticleScrollSpyController {
  constructor(headingElements, tocListElement) {
    this.headingElements = headingElements;
    this.tocLinkElements = tocListElement
      ? Array.prototype.slice.call(tocListElement.querySelectorAll('a'))
      : [];
    this.isUpdateQueued = false;

    this.wireTocLinks();

    const boundQueueUpdate = this.queueSpyUpdate.bind(this);
    window.addEventListener('scroll', boundQueueUpdate, { passive: true });
    window.addEventListener('resize', boundQueueUpdate);
    this.updateActiveSection();
  }

  /* Smooth-scroll on TOC click (leaves room for the sticky header). */
  wireTocLinks() {
    const self = this;
    this.tocLinkElements.forEach(function (linkElement) {
      linkElement.addEventListener('click', function (clickEvent) {
        const targetElement = document.getElementById(linkElement.getAttribute('data-toc'));
        if (!targetElement) { return; }
        clickEvent.preventDefault();
        const destinationY = targetElement.getBoundingClientRect().top + window.scrollY - 92;
        window.scrollTo({ top: destinationY, behavior: 'smooth' });
        history.replaceState(null, '', '#' + targetElement.id);
      });
    });
  }

  queueSpyUpdate() {
    if (this.isUpdateQueued) { return; }
    this.isUpdateQueued = true;
    window.requestAnimationFrame(this.updateActiveSection.bind(this));
  }

  /* Marks the TOC link of the section closest above the read line. */
  updateActiveSection() {
    this.isUpdateQueued = false;
    const readLine = 140;
    let currentSectionId = this.headingElements.length ? this.headingElements[0].id : null;

    for (let index = 0; index < this.headingElements.length; index += 1) {
      if (this.headingElements[index].getBoundingClientRect().top <= readLine) {
        currentSectionId = this.headingElements[index].id;
      }
    }

    /* Near the very bottom, force-activate the last section. */
    if (this.headingElements.length &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      currentSectionId = this.headingElements[this.headingElements.length - 1].id;
    }

    this.tocLinkElements.forEach(function (linkElement) {
      linkElement.classList.toggle('is-active', linkElement.getAttribute('data-toc') === currentSectionId);
    });
  }
}

/**
 * Boots the whole site for whichever page is loaded. Each setup
 * step is independent and guarded, so one failure can never take
 * the rest of the page down with it.
 */
/**
 * Project-page scroll windows (long screenshots inside a fixed
 * 16:9 box) start locked so the mouse wheel keeps scrolling the
 * page itself. A round toggle button in the bottom-right corner
 * of the box switches inner scrolling on; pressing it again
 * freezes the image wherever it sits.
 */
class ScrollWindowToggleController {
  constructor(scrollWindowElement) {
    this.scrollWindowElement = scrollWindowElement;
    this.hintElement = this.findHintElement();
    this.toggleButton = this.buildToggleButton();
    this.wrapInFrame();
    this.setLocked(true);
    this.toggleButton.addEventListener('click', this.handleToggleClick.bind(this));
  }

  /* The mono caption line under the box, updated to match state. */
  findHintElement() {
    const figureElement = this.scrollWindowElement.closest('figure');
    return figureElement ? figureElement.querySelector('.scroll-hint') : null;
  }

  buildToggleButton() {
    const buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.className = 'scroll-toggle';
    buttonElement.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
      '<path d="M10 3.5v13M6.5 7 10 3.5 13.5 7M6.5 13l3.5 3.5 3.5-3.5" ' +
      'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return buttonElement;
  }

  /* The box is the scroller itself, so an absolutely positioned
     button inside it would ride along with the image. A relative
     wrapper keeps the button pinned to the box's corner instead. */
  wrapInFrame() {
    const frameElement = document.createElement('div');
    frameElement.className = 'scroll-frame';
    this.scrollWindowElement.parentNode.insertBefore(frameElement, this.scrollWindowElement);
    frameElement.appendChild(this.scrollWindowElement);
    frameElement.appendChild(this.toggleButton);
  }

  setLocked(isLocked) {
    this.isLocked = isLocked;
    this.scrollWindowElement.classList.toggle('is-locked', isLocked);
    this.toggleButton.classList.toggle('is-active', !isLocked);
    this.toggleButton.setAttribute('aria-pressed', String(!isLocked));
    this.toggleButton.setAttribute('aria-label', isLocked
      ? 'Enable scrolling inside this image'
      : 'Freeze scrolling inside this image');
    if (this.hintElement) {
      this.hintElement.textContent = isLocked
        ? 'Click the arrow to scroll ↕ inside'
        : 'Scroll ↕ inside · click again to freeze';
    }
  }

  handleToggleClick() {
    this.setLocked(!this.isLocked);
  }
}

class SiteController {
  constructor() {
    this.scrollRevealObserver = new ScrollRevealObserver();
    this.introAnimation = new IntroAnimation();
  }

  /* Runs a setup step, logging rather than throwing on failure. */
  runSafely(setupStep) {
    try { setupStep(); } catch (setupError) { console.error('[site]', setupError); }
  }

  start() {
    const self = this;

    /* Hero / page-header ASCII canvases. */
    this.runSafely(function () {
      const canvasElements = document.querySelectorAll('.hero-canvas');
      for (let index = 0; index < canvasElements.length; index += 1) {
        new HeroCanvas(canvasElements[index]);
      }
    });

    /* Work lists: the home page shows the first five projects,
       the work index shows all of them with filters. */
    this.runSafely(function () {
      WorkListView.renderInto(document.querySelector('#work-home'), ProjectRepository.getAllProjects().slice(0, 5));
      const workIndexList = document.querySelector('#work-all');
      if (workIndexList) {
        WorkListView.renderInto(workIndexList, ProjectRepository.getAllProjects());
        const filterBar = document.querySelector('.filter-bar');
        if (filterBar) {
          new WorkFilterController(filterBar, workIndexList, self.scrollRevealObserver);
        }
      }
    });

    /* Writing index page. */
    this.runSafely(function () {
      const writingList = document.querySelector('#write-all');
      if (!writingList) { return; }
      const requestedPage = parseInt(new URLSearchParams(location.search).get('page'), 10) || 1;
      WritingIndexView.render(writingList, requestedPage);
    });

    /* Article detail page. */
    this.runSafely(function () {
      const articleRoot = document.querySelector('[data-article-page]');
      if (!articleRoot) { return; }
      const requestedId = new URLSearchParams(location.search).get('id');
      const article = ArticleRepository.findArticleById(requestedId);
      const rendered = new ArticleDetailView(articleRoot).render(article, ArticleRepository.findNextArticle(article));
      new ArticleScrollSpyController(rendered.headingElements, rendered.tocListElement);
    });

    /* Project pages: long screenshots in scroll windows start
       locked so the page itself always scrolls freely. */
    this.runSafely(function () {
      const scrollWindowElements = document.querySelectorAll('.scroll-window');
      for (let index = 0; index < scrollWindowElements.length; index += 1) {
        new ScrollWindowToggleController(scrollWindowElements[index]);
      }
    });

    /* Behaviours shared by every page. */
    this.runSafely(function () { new MobileNavigation(); });
    this.runSafely(function () { new PageTransitionController(); });

    /* Scroll reveals are wired after every list above has rendered,
       so the observer measures the real page. */
    this.runSafely(function () { self.scrollRevealObserver.observeAll(); });

    /* The intro plays after two animation frames — the browser has
       painted the hidden first state by then — and is also armed on
       window load plus a timeout so it can never be skipped. */
    this.introAnimation.arm();
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        self.introAnimation.play();
      });
    });
  }
}

/* ---------- boot ---------- */
(function () {
  const siteController = new SiteController();
  const boundStart = siteController.start.bind(siteController);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boundStart);
  } else {
    boundStart();
  }
})();
