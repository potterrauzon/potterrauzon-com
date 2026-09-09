/* ============================================================
   Ryan Potter — views (the View layer)
   Renders model data into the page: the work list rows, the
   project detail template, the writing index (with pagination)
   and the article template (with its table of contents).
   Views only build and place markup; behaviour such as scroll
   spying lives in the controllers (scripts/main.js).
   Plain ES2022. No libraries. No arrow functions.
   ============================================================ */

'use strict';

/* Shared inline SVG fragments used inside generated rows. */
class IconLibrary {
  static diagonalArrow =
    '<svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M6 4h6v6"/></svg>';

  static leftArrow =
    '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8H3M7 4L3 8l4 4"/></svg>';

  static rightArrow =
    '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
}

/**
 * Renders the editorial work-list rows (used on the home page and
 * the work index). Each row links to the project detail page.
 */
class WorkListView {
  /* Builds the markup for one work-list row. */
  static buildRowMarkup(project) {
    return '<a class="work-row scroll-reveal" href="' + project.url + '">' +
      '<span class="row-number">' + project.n + '</span>' +
      '<div><div class="row-title">' + project.title + '</div>' +
      '<div class="row-description">' + project.desc + '</div></div>' +
      '<div class="row-tags">' + project.kind + '<br>' + project.year + '</div>' +
      '<span class="row-arrow">' + IconLibrary.diagonalArrow + '</span></a>';
  }

  /* Renders a list of projects into the given container element. */
  static renderInto(containerElement, projects) {
    if (!containerElement) { return; }
    const rowMarkupList = [];
    for (let index = 0; index < projects.length; index += 1) {
      rowMarkupList.push(WorkListView.buildRowMarkup(projects[index]));
    }
    containerElement.innerHTML = rowMarkupList.join('');
  }
}

/**
 * Renders the writing index (writing.html): the paginated article
 * rows, the pagination controls and the "1–16 of 20" counter.
 */
class WritingIndexView {
  static articlesPerPage = 16;

  /* Builds the markup for one article row in the index. */
  static buildRowMarkup(article) {
    return '<a class="article-row scroll-reveal" href="article.html?id=' + article.id + '">' +
      '<span class="article-date">' + ArticleRepository.formatDateShort(article.date) + '</span>' +
      '<div class="article-main">' +
        '<span class="article-category"><span class="accent-slash">//</span>' + article.cat + '</span>' +
        '<div class="article-row-title">' + article.title + '</div>' +
        '<p class="article-excerpt">' + article.excerpt + '</p>' +
      '</div>' +
      '<span class="article-read-time">' + article.read + ' min</span>' +
    '</a>';
  }

  /* Builds one numbered pagination link. */
  static buildPageLink(pageNumber) {
    return '<a href="writing.html?page=' + pageNumber + '">' + pageNumber + '</a>';
  }

  /* Builds the whole pagination strip (prev · numbers · next). */
  static buildPaginationMarkup(currentPage, totalPages) {
    if (totalPages <= 1) { return ''; }
    const pieces = [];

    if (currentPage > 1) {
      pieces.push('<a class="pagination-edge" href="writing.html?page=' + (currentPage - 1) + '">' +
        IconLibrary.leftArrow + 'Prev</a>');
    } else {
      pieces.push('<span class="pagination-edge is-disabled">' + IconLibrary.leftArrow + 'Prev</span>');
    }

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      if (pageNumber === currentPage) {
        pieces.push('<span class="is-current">' + pageNumber + '</span>');
      } else {
        pieces.push(WritingIndexView.buildPageLink(pageNumber));
      }
    }

    if (currentPage < totalPages) {
      pieces.push('<a class="pagination-edge" href="writing.html?page=' + (currentPage + 1) + '">Next' +
        IconLibrary.rightArrow + '</a>');
    } else {
      pieces.push('<span class="pagination-edge is-disabled">Next' + IconLibrary.rightArrow + '</span>');
    }

    return pieces.join('');
  }

  /* Renders the requested page of articles plus its pagination. */
  static render(listElement, requestedPage) {
    const allArticles = ArticleRepository.getAllArticles();
    const totalPages = Math.ceil(allArticles.length / WritingIndexView.articlesPerPage);

    let currentPage = requestedPage;
    if (!currentPage || currentPage < 1) { currentPage = 1; }
    if (currentPage > totalPages) { currentPage = totalPages; }

    const startIndex = (currentPage - 1) * WritingIndexView.articlesPerPage;
    const pageOfArticles = allArticles.slice(startIndex, startIndex + WritingIndexView.articlesPerPage);

    listElement.innerHTML = pageOfArticles.map(WritingIndexView.buildRowMarkup).join('');

    const paginationElement = document.querySelector('#write-pagination');
    if (paginationElement) {
      paginationElement.innerHTML = WritingIndexView.buildPaginationMarkup(currentPage, totalPages);
    }

    const countElement = document.querySelector('#write-count');
    if (countElement) {
      countElement.textContent = (startIndex + 1) + '–' + (startIndex + pageOfArticles.length) +
        ' of ' + allArticles.length + ' articles';
    }
  }
}

/**
 * Hydrates the article template (article.html) with one article:
 * header fields, generated body prose, the table of contents and
 * the "next article" link.
 */
class ArticleDetailView {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  setText(fieldSelector, textValue) {
    const fieldElement = this.rootElement.querySelector(fieldSelector);
    if (fieldElement) { fieldElement.textContent = textValue; }
  }

  setHtml(fieldSelector, htmlValue) {
    const fieldElement = this.rootElement.querySelector(fieldSelector);
    if (fieldElement) { fieldElement.innerHTML = htmlValue; }
  }

  render(article, nextArticle) {
    document.title = article.title + ' — Ryan Potter';

    this.setText('[data-a=category]', article.cat);
    /* The title is wrapped in a reveal-line so the intro animation
       can wipe it up exactly like the other page titles. */
    this.setHtml('[data-a=title]', '<span class="reveal-line"><span>' + article.title + '</span></span>');
    this.setText('[data-a=date]', ArticleRepository.formatDateLong(article.date));
    this.setText('[data-a=read]', article.read + ' min read');
    this.setText('[data-a=cover-label]', article.cat + ' · ' + article.title);

    const bodyElement = this.rootElement.querySelector('[data-a=body]');
    bodyElement.innerHTML = ArticleRepository.buildArticleBodyHtml(article);

    /* Build the table of contents from the body's h2 headings. */
    const tocListElement = this.rootElement.querySelector('[data-a=toc]');
    const headingElements = Array.prototype.slice.call(bodyElement.querySelectorAll('h2'));
    if (tocListElement) {
      tocListElement.innerHTML = headingElements.map(function (headingElement) {
        return '<li><a href="#' + headingElement.id + '" data-toc="' + headingElement.id + '">' +
          headingElement.textContent + '</a></li>';
      }).join('');
    }

    const nextLinkElement = this.rootElement.querySelector('[data-a=next]');
    if (nextLinkElement) {
      nextLinkElement.setAttribute('href', 'article.html?id=' + nextArticle.id);
      const nextTitleElement = nextLinkElement.querySelector('[data-a=next-title]');
      if (nextTitleElement) { nextTitleElement.textContent = nextArticle.title; }
      const nextMetaElement = nextLinkElement.querySelector('[data-a=next-meta]');
      if (nextMetaElement) { nextMetaElement.textContent = nextArticle.cat + ' · ' + nextArticle.read + ' min'; }
    }

    /* Hand back what the scroll-spy controller needs. */
    return { headingElements: headingElements, tocListElement: tocListElement };
  }
}
