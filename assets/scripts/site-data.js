/* ============================================================
   Ryan Potter — site data (the Model layer)
   Holds every project and article shown on the site, plus the
   helpers that derive presentation values from them (formatted
   dates, generated article prose, slugs). No DOM access here —
   views and controllers read from these repositories.
   Plain ES2022. No libraries. No arrow functions.
   ============================================================ */

'use strict';

/**
 * A tiny seeded linear-congruential random generator. The article
 * bodies are generated prose; seeding the generator with a stable
 * number per article keeps every page render identical.
 */
class DeterministicRandom {
  constructor(seed) {
    let normalizedSeed = seed % 2147483647;
    if (normalizedSeed <= 0) { normalizedSeed += 2147483646; }
    this.state = normalizedSeed;
  }

  /* Returns the next pseudo-random number in the range [0, 1). */
  next() {
    this.state = (this.state * 16807) % 2147483647;
    return (this.state - 1) / 2147483646;
  }
}

/**
 * Repository of portfolio projects. Each record is a lean list-index
 * entry — the summary fields the work list and its filters need, plus
 * the `url` of the project's own standalone case-study page. The full
 * case-study copy now lives in those pages (e.g. avaya.html), not here.
 */
class ProjectRepository {
  static projects = [
    { id:'avaya', n:'01', title:'Avaya Cloud Portal', kind:'WEB APP', year:'2019', url:'projects/avaya.html',
      desc:'Five separate backend portals worked into one self-service cloud-communications platform.' },
    { id:'ledger', n:'02', title:'Ledger', kind:'WEB APP', year:'2024', url:'projects/ledger.html',
      desc:'A personal-finance dashboard that answers one question before it offers you twelve others.' },
    { id:'cardinal', n:'03', title:'Cardinal', kind:'MOBILE', year:'2024', url:'projects/cardinal.html',
      desc:'A field-service app for technicians who work with gloves on and no signal.' },
    { id:'atlas', n:'04', title:'Atlas', kind:'SYSTEM', year:'2023', url:'projects/atlas.html',
      desc:'A 240-component design system for four products that had drifted apart.' },
    { id:'verge', n:'05', title:'Verge', kind:'WEB APP', year:'2023', url:'projects/verge.html',
      desc:'A monitoring console built to stay readable when everything is going wrong at once.' },
    { id:'pocket-reef', n:'06', title:'Pocket Reef', kind:'MOBILE', year:'2022', url:'projects/pocket-reef.html',
      desc:'A quiet habit app for iOS that keeps track of streaks without leaning on guilt.' },
    { id:'northwind', n:'07', title:'Northwind', kind:'BRAND + WEB', year:'2022', url:'projects/northwind.html',
      desc:'Brand and marketing site for a climate company that had not launched yet.' },
    { id:'commerce', n:'08', title:'Commerce', kind:'BRAND + WEB'/* TODO */, year:'2026'/* TODO */, url:'projects/commerce.html',
      desc:'A brand and marketing site built as a kit of parts, held together by one type-and-color system.' },
    { id:'feedonomics', n:'09', title:'Feedonomics', kind:'BRAND + WEB'/* TODO */, year:'2026'/* TODO */, url:'projects/feedonomics.html',
      desc:'A forty-page marketing site moved onto a new design system a page at a time.' },
    { id:'adobe-ultimate', n:'10', title:'Adobe Ultimate Support', kind:'MOBILE'/* TODO */, year:'2024'/* TODO */, url:'projects/adobe-ultimate.html',
      desc:'A mobile support app that puts Adobe\'s enterprise clients within reach of their account team, handed over as a working coded prototype.' },
  ];

  static getAllProjects() {
    return ProjectRepository.projects;
  }
}

/**
 * Repository of writing/blog articles. Article bodies are built
 * deterministically from each article's section list so every
 * page has realistic prose length and structure.
 */
class ArticleRepository {
  static articles = [
  { id:'empty-state-is-the-product', cat:'Design', date:'2025-05-19', read:7,
    title:'The empty state is the product',
    excerpt:'The first screen a new user sees has none of their data in it. It is strange that we leave it until the end.',
    sections:['The first run is the only first impression','What an empty state must answer','Designing the zero-data moment','When emptiness is the goal','Shipping it'] },

  { id:'offline-first-reality', cat:'Engineering', date:'2025-04-28', read:9,
    title:'Designing for the offline-first reality',
    excerpt:'For a technician in a basement, a signal is the exception. It took me a while to stop designing as though it were the rule.',
    sections:['Connectivity is a lie we design around','Modeling pending and synced','The conflict problem','Telling the truth in the UI','What I would do differently'] },

  { id:'own-component-library', cat:'Engineering', date:'2025-04-09', read:8,
    title:'Why I usually end up building the component library',
    excerpt:'A kit off the shelf gets you to the demo quickly, and then asks for a little back every month after that.',
    sections:['The drift problem','Owning the primitives','Where third-party stops helping','The maintenance tax','Worth it?'] },

  { id:'density-without-anxiety', cat:'Design', date:'2025-03-22', read:6,
    title:'Density without anxiety',
    excerpt:'People who use a tool all day want it all on one screen. The work is putting it there without setting anyone on edge.',
    sections:['More data, less panic','The rhythm of a dense screen','Color as a scarce resource','Zones that never move','Testing under load'] },

  { id:'the-handoff-is-a-lie', cat:'Process', date:'2025-03-04', read:7,
    title:'There is no clean handoff',
    excerpt:'No line exists where design stops and engineering starts. Drawing one anyway tends to cost you the work.',
    sections:['The myth of the clean handoff','Designing in the medium','Pairing over throwing it over the wall','Specs that stay alive','Closing the loop'] },

  { id:'tokens-are-a-contract', cat:'Engineering', date:'2025-02-17', read:10,
    title:'Tokens are a contract, not a palette',
    excerpt:'A token is a promise between design and code. Treat it as a list of hex values and it will not hold the first time you lean on it.',
    sections:['Beyond a list of colors','Naming things that last','One source, many targets','Versioning the contract','Migrations without freezes'] },

  { id:'motion-that-explains', cat:'Craft', date:'2025-01-30', read:6,
    title:'Motion that explains something',
    excerpt:'An animation ought to answer a question the person is already asking. The rest is just movement.',
    sections:['Animation with a job','Continuity and causality','Timing is meaning','When to hold still','Tuning by feel'] },

  { id:'research-without-a-lab', cat:'Process', date:'2025-01-12', read:8,
    title:'Reading the room: research without a lab',
    excerpt:'You do not need a recruiter or a budget or a room with a mirror in it. You need to sit and watch five people use the thing.',
    sections:['You already have the data','Watching beats asking','Five sessions is plenty','Synthesis in the open','Acting on it fast'] },

  { id:'case-for-boring-interfaces', cat:'Design', date:'2024-12-15', read:5,
    title:'The case for boring interfaces',
    excerpt:'Novelty is a cost, and the user is the one who pays it. Most days the kindest thing an interface can do is behave the way it did yesterday.',
    sections:['Novelty is a cost','Familiar patterns earn trust','Where to spend your weirdness','Boring is not lazy','The payoff'] },

  { id:'shipping-behind-a-flag', cat:'Process', date:'2024-11-27', read:7,
    title:'Shipping a redesign in increments behind a flag',
    excerpt:'A relaunch all at once is a bet you only get to place the one time. I would rather send it out in pieces nobody notices.',
    sections:['Big bangs break things','Slicing the redesign','Flags as a design tool','Measuring each slice','Removing the old path'] },

  { id:'type-at-small-sizes', cat:'Craft', date:'2024-11-08', read:9,
    title:'Type at small sizes is a design-system problem',
    excerpt:'A typeface that looks fine at 48px can come apart at 12. What happens at the bottom of the scale is everyone’s business.',
    sections:['The 12px problem','Optical sizes and weights','Spacing carries legibility','A scale that holds up','Auditing the edges'] },

  { id:'eight-years-of-side-projects', cat:'Career', date:'2024-10-21', read:11,
    title:'What eight years of side projects taught me',
    excerpt:'Most of them never went anywhere. The few that did taught me more than the jobs did.',
    sections:['Why I keep building','Side projects as a studio','Finishing is the skill','What shipped, what didn’t','Advice to my younger self'] },

  { id:'cost-of-an-extra-tap', cat:'Design', date:'2024-10-02', read:5,
    title:'The cost of a single extra tap',
    excerpt:'One more tap costs nothing on paper. Multiply it out across every session and it is the most expensive thing on the screen.',
    sections:['Counting the taps','Where friction hides','The myth of the back button','Defaults that remove steps','Measuring the win'] },

  { id:'prototyping-in-code', cat:'Process', date:'2024-09-14', read:8,
    title:'What a coded prototype tells you that a mock will not',
    excerpt:'A still mock is polite about the awkward parts. Real input, real data, and a real wait are not.',
    sections:['The fidelity gap','What code reveals','Speed is relative','When Figma still wins','My current workflow'] },

  { id:'accessibility-is-a-deadline', cat:'Engineering', date:'2024-08-26', read:9,
    title:'Accessibility is a deadline, not a phase',
    excerpt:'You can no more add access at the end than you can add speed at the end. It is a condition you work inside of.',
    sections:['Not a final polish','Designing with constraints','The keyboard test','Color and contrast math','Baking it into the system'] },

  { id:'designing-the-loading-moment', cat:'Craft', date:'2024-08-05', read:6,
    title:'Designing the loading moment',
    excerpt:'Nobody puts the spinner in a portfolio. But the waiting is part of the thing, and it can be designed like anything else.',
    sections:['Nobody designs the wait','Skeletons versus spinners','Perceived performance','Optimistic by default','The details that matter'] },

  { id:'saying-no-to-the-dashboard', cat:'Design', date:'2024-07-18', read:7,
    title:'Saying no to the dashboard',
    excerpt:'When a team is unsure, it builds a dashboard. Usually the answer was one number, and the nerve to stop there.',
    sections:['The reflexive dashboard','One question first','Progressive detail','Killing the chart graveyard','What replaced it'] },

  { id:'the-interview-question', cat:'Career', date:'2024-06-29', read:5,
    title:'The interview question I always ask',
    excerpt:'One open question tells me more about how someone works than an hour of walking through their portfolio.',
    sections:['The question','What the answers reveal','Craft versus speed','Listening for ownership','Why it works'] },

  { id:'color-is-last', cat:'Craft', date:'2024-06-10', read:8,
    title:'Color is the last thing you should decide',
    excerpt:'If it only works in color, it does not work. Structure first, and the surface a good while after that.',
    sections:['Structure before surface','Grayscale first','Color as signal','Building the palette late','Holding the line'] },

  { id:'keep-a-system-from-rotting', cat:'Engineering', date:'2024-05-20', read:10,
    title:'Keeping a design system from going quietly to seed',
    excerpt:'A system starts to go the moment keeping it up becomes a nuisance. The work is making the right path the easy one.',
    sections:['Systems rot quietly','Office hours over mandates','Deprecation with dignity','Metrics that matter','Keeping it alive'] },
];

  /* Sentence pool the prose generator draws from. */
  static sentencePool = [
  'The temptation is always to add one more option, one more panel, one more small thing that somebody, somewhere, asked for.',
  'But everything you put on a screen asks a little of the person looking at it, and those small debts add up faster than you would think.',
  'The best work usually comes from taking things away, until what is left has room enough to be seen.',
  'People seldom say this outright. They say the screen feels like a lot, or that they were not sure where to look first.',
  'Watch a real session and you can see the hesitation plainly: a cursor drifting, a scroll gone too far, a tab quietly closed.',
  'The answer is almost never a bigger feature. It is a clearer order to things and an honest default in the one place that counts.',
  'A good default does a great deal of quiet work, making the right choice on behalf of the ninety in a hundred who will never open a setting.',
  'I try to lay the plain path down first, and make every exception earn whatever it costs to have it.',
  'Code and design are not separate seasons of the work. What one of them cannot do keeps changing what the other one hoped for.',
  'Build the thing for real and it will tell you the awkward truths a still mock is too polite to mention.',
  'A system lasts exactly as long as the care that goes into it, and care goes first the moment it turns into a nuisance.',
  'So I put up guardrails, so that the right decision is also the easy one for whoever comes along next.',
  'Speed is a design matter well before it is an engineering one. How fast a thing feels is something you put together on purpose.',
  'The details nobody notices when they are right are the ones that quietly earn or lose trust over the course of a year.',
  'Accessibility, density, motion, and color are not decoration. Each one holds part of the weight of how the thing feels to use.',
  'It helps to write down the one question the screen has to answer, and then hold that answer against everything that wants in.',
  'I have shipped enough wrong versions to know that taste is mostly the scars left from having been wrong before.',
  'The true version is messier than the case study, and the mess is generally where the learning was.',
];

  static monthNamesShort = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  static monthNamesLong = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  static getAllArticles() {
    return ArticleRepository.articles;
  }

  /* Finds an article by its URL id; falls back to the first one. */
  static findArticleById(articleId) {
    const allArticles = ArticleRepository.articles;
    for (let index = 0; index < allArticles.length; index += 1) {
      if (allArticles[index].id === articleId) { return allArticles[index]; }
    }
    return allArticles[0];
  }

  /* The article that follows the given one (wraps around). */
  static findNextArticle(currentArticle) {
    const allArticles = ArticleRepository.articles;
    const currentIndex = allArticles.indexOf(currentArticle);
    return allArticles[(currentIndex + 1) % allArticles.length];
  }

  /* "MAY 2025" — used in the writing-index rows. */
  static formatDateShort(isoDate) {
    const dateParts = isoDate.split('-');
    return ArticleRepository.monthNamesShort[Number(dateParts[1]) - 1] + ' ' + dateParts[0];
  }

  /* "May 19, 2025" — used in the article header. */
  static formatDateLong(isoDate) {
    const dateParts = isoDate.split('-');
    return ArticleRepository.monthNamesLong[Number(dateParts[1]) - 1] + ' ' +
      Number(dateParts[2]) + ', ' + dateParts[0];
  }

  /* Turns a heading into a URL-safe anchor id. */
  static slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  /* Builds a 2–3 sentence paragraph from the pool, seeded. */
  static buildParagraph(seed) {
    const random = new DeterministicRandom(seed);
    const pool = ArticleRepository.sentencePool;
    const sentenceCount = 2 + Math.floor(random.next() * 2);
    const startIndex = Math.floor(random.next() * pool.length);
    const stride = 1 + Math.floor(random.next() * 5);
    const usedIndexes = {};
    const sentences = [];
    let poolIndex = startIndex;
    while (sentences.length < sentenceCount) {
      if (!usedIndexes[poolIndex]) {
        usedIndexes[poolIndex] = true;
        sentences.push(pool[poolIndex]);
      }
      poolIndex = (poolIndex + stride) % pool.length;
      if (Object.keys(usedIndexes).length >= pool.length) { break; }
    }
    return sentences.join(' ');
  }

  /* Builds the full HTML body for an article: intro, sections with
     headings, two figures, a pull quote and a bullet list. */
  static buildArticleBodyHtml(article) {
    const pool = ArticleRepository.sentencePool;
    const articleIndex = ArticleRepository.articles.indexOf(article);
    let bodyHtml = '<p class="lead-paragraph">' + article.excerpt + '</p>';
    bodyHtml += '<p>' + ArticleRepository.buildParagraph(articleIndex * 1000 + 7) + '</p>';

    article.sections.forEach(function (sectionHeading, sectionIndex) {
      const anchorId = ArticleRepository.slugify(sectionHeading) + '-' + sectionIndex;
      bodyHtml += '<h2 id="' + anchorId + '">' + sectionHeading + '</h2>';
      bodyHtml += '<p>' + ArticleRepository.buildParagraph(articleIndex * 1000 + sectionIndex * 30 + 11) + '</p>';

      if (sectionIndex === 1) {
        bodyHtml += '<figure><div class="placeholder-image"><span>' + article.cat + ' · Figure 16:9</span></div>' +
          '<figcaption>Fig. 1 — A view from the work this piece came out of.</figcaption></figure>';
      }

      bodyHtml += '<p>' + ArticleRepository.buildParagraph(articleIndex * 1000 + sectionIndex * 30 + 19) + '</p>';

      if (sectionIndex === 2) {
        bodyHtml += '<blockquote>' + pool[(articleIndex * 3 + 2) % pool.length] + '</blockquote>';
      }

      if (sectionIndex === 3) {
        bodyHtml += '<ul class="bullet-list">' +
          '<li>' + pool[(articleIndex + 5) % pool.length] + '</li>' +
          '<li>' + pool[(articleIndex + 9) % pool.length] + '</li>' +
          '<li>' + pool[(articleIndex + 13) % pool.length] + '</li>' +
        '</ul>';
        bodyHtml += '<figure><div class="placeholder-image"><span>Detail · Figure 16:9</span></div>' +
          '<figcaption>Fig. 2 — A detail worth stopping on for a moment.</figcaption></figure>';
      }
    });

    return bodyHtml;
  }
}
