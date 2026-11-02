import {
  about,
  career,
  credentials,
  footer,
  hero,
  impact,
  media,
  nav,
  patent,
  roles,
  site,
  vehicles,
  work,
  type ImageKey,
  type Role,
} from './content'

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const esc = (value: string | number) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

type Dims = { width: number; height: number }

const dims: Record<ImageKey, Dims> = {
  portrait: { width: 699, height: 932 },
  maxx: { width: 800, height: 600 },
  bolero: { width: 1024, height: 768 },
  xylo: { width: 1024, height: 768 },
  maxximo: { width: 1024, height: 768 },
  jeeto: { width: 1024, height: 768 },
  signa: { width: 1045, height: 784 },
  patent: { width: 1408, height: 768 },
  'mahindra-hq': { width: 1920, height: 1080 },
  'mahindra-chennai': { width: 2048, height: 1274 },
  'tata-gate': { width: 1200, height: 630 },
}

type PictureOptions = {
  alt: string
  sizes: string
  className?: string
  eager?: boolean
  hidden?: boolean
}

function srcset(key: ImageKey, ext: 'avif' | 'webp') {
  const { base, widths } = media[key]
  return widths.map((width) => `media/${base}-${width}.${ext} ${width}w`).join(', ')
}

function picture(key: ImageKey, options: PictureOptions) {
  const { base, widths } = media[key]
  const largest = widths[widths.length - 1]
  const { width, height } = dims[key]
  const loading = options.eager ? ' fetchpriority="high"' : ' loading="lazy"'
  const cls = options.className ? ` class="${options.className}"` : ''
  return `<picture${cls}>
        <source type="image/avif" srcset="${srcset(key, 'avif')}" sizes="${esc(options.sizes)}">
        <source type="image/webp" srcset="${srcset(key, 'webp')}" sizes="${esc(options.sizes)}">
        <img src="media/${base}-${largest}.webp" srcset="${srcset(key, 'webp')}" sizes="${esc(options.sizes)}" width="${width}" height="${height}" alt="${esc(options.alt)}"${loading} decoding="async"${options.hidden ? ' aria-hidden="true"' : ''}>
      </picture>`
}

function vehicleAlt(vehicleId: string) {
  const vehicle = vehicles.find((item) => item.id === vehicleId)
  if (!vehicle) return ''
  return `${vehicle.name}, ${vehicle.type.replace(/ · /g, ', ')}, designed at ${vehicle.oem}`
}

function roleCaption(role: Role) {
  return role.location ? `${role.location} · ${role.dates}` : role.dates
}

function plate(role: Role, index: number) {
  return `<div class="plate">
          <span class="plate__index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
          <span class="plate__org">${esc(role.org)}</span>
          <span class="plate__meta">${esc(roleCaption(role))}</span>
        </div>`
}

function roleMedia(role: Role, index: number) {
  if (role.image) {
    return picture(role.image as ImageKey, {
      alt: role.imageCaption ?? roleCaption(role),
      sizes: '(min-width: 768px) 45vw, 100vw',
      className: 'media__img',
    })
  }
  return plate(role, index)
}

/* ------------------------------------------------------------------ */
/* head                                                                */
/* ------------------------------------------------------------------ */

export function renderHead() {
  const ogImage = `${site.url}og.png`
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: 'General Manager (Body & Trims Engg.), Tata Motors',
    description: site.description,
    url: site.url,
    image: ogImage,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Tata Motors',
      url: site.company,
    },
    alumniOf: credentials.education.map((entry) => ({
      '@type': 'CollegeOrUniversity',
      name: entry.institution,
    })),
    sameAs: [site.linkedin],
    knowsAbout: [
      'Automotive body engineering',
      'Product development',
      'Program management',
      'Body-in-white',
      'Vehicle closures',
      'Interior and cockpit systems',
      'Commercial vehicles',
    ],
  }

  return `<title>${esc(site.title)}</title>
    <meta name="description" content="${esc(site.description)}">
    <link rel="canonical" href="${esc(site.url)}">
    <meta name="theme-color" content="#FFFFFF">
    <meta name="author" content="${esc(site.name)}">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">

    <meta property="og:type" content="profile">
    <meta property="og:site_name" content="${esc(site.name)}">
    <meta property="og:title" content="${esc(site.title)}">
    <meta property="og:description" content="${esc(site.description)}">
    <meta property="og:url" content="${esc(site.url)}">
    <meta property="og:image" content="${esc(ogImage)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Portrait of ${esc(site.name)} on a white field, with his name set in Instrument Serif.">
    <meta property="og:locale" content="en_IN">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(site.title)}">
    <meta name="twitter:description" content="${esc(site.description)}">
    <meta name="twitter:image" content="${esc(ogImage)}">

    <link rel="preload" as="image" type="image/avif" imagesrcset="${srcset(site.portrait, 'avif')}" imagesizes="(min-width: 768px) 42vw, 78vw" fetchpriority="high">

    <script type="application/ld+json">${JSON.stringify(person)}</script>`
}

/* ------------------------------------------------------------------ */
/* header                                                              */
/* ------------------------------------------------------------------ */

function renderHeader() {
  const primary = nav.links
    .map((link) => `<a class="nav__link" href="${link.href}">${esc(link.label)}</a>`)
    .join('')
  const mobile = nav.links
    .map((link) => `<a class="menu__link" href="${link.href}">${esc(link.label)}</a>`)
    .join('')

  return `<header class="nav" data-nav>
      <div class="nav__inner">
        <a class="nav__mark" href="#top">
          <span class="nav__glyph" aria-hidden="true">PN</span>
          <span class="nav__name">${esc(site.name)}</span>
        </a>

        <nav class="nav__links" aria-label="Primary">
          ${primary}
          <a class="nav__link nav__link--external" href="${site.linkedin}" target="_blank" rel="me noopener">${esc(nav.linkedinLabel)} <span aria-hidden="true">↗</span></a>
        </nav>

        <details class="nav__menu">
          <summary class="nav__toggle">
            <span class="nav__toggle-label">Menu</span>
            <span class="nav__toggle-bar" aria-hidden="true"></span>
          </summary>
          <div class="menu">
            <nav class="menu__nav" aria-label="Mobile">
              ${mobile}
            </nav>
            <div class="menu__foot">
              <a class="menu__linkedin" href="${site.linkedin}" target="_blank" rel="me noopener">${esc(footer.linkLabel)} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </details>
      </div>
    </header>
    <div class="nav-sentinel" aria-hidden="true"></div>`
}

/* ------------------------------------------------------------------ */
/* hero                                                                */
/* ------------------------------------------------------------------ */

function renderHero() {
  return `<section class="hero" id="top" aria-labelledby="hero-name">
      <div class="hero__inner">
        <h1 class="sr-only" id="hero-name">${esc(hero.name)}</h1>

        <div class="hero__stage">
          <span class="hero__word" aria-hidden="true"><span class="hero__word-part" data-word-part="lead">${esc(hero.display.slice(0, hero.displaySplit))}</span><span class="hero__word-part" data-word-part="trail">${esc(hero.display.slice(hero.displaySplit))}</span></span>
          <figure class="hero__portrait">
            ${picture(site.portrait, {
              alt: `Portrait of ${site.name}`,
              sizes: '(min-width: 768px) 42vw, 78vw',
              eager: true,
            })}
          </figure>
        </div>

        <div class="hero__caption">
          <p class="hero__role">${esc(hero.roleLine)}</p>
          <ul class="hero__meta">
            ${hero.meta.map((item) => `<li>${esc(item)}</li>`).join('')}
          </ul>
          <div class="hero__actions">
            <a class="btn btn--glass btn--glass-dark" href="${hero.actions.primary.href}">${hero.actions.primary.label}</a>
          </div>
        </div>
      </div>
    </section>`
}

/* ------------------------------------------------------------------ */
/* about + impact                                                      */
/* ------------------------------------------------------------------ */

function renderAbout() {
  return `<section class="section about" id="about" aria-labelledby="about-title">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <p class="eyebrow">${esc(about.eyebrow)}</p>
          <h2 class="about__heading" id="about-title">${esc(about.heading)}</h2>
        </div>

        <div class="about__grid">
          <div class="about__body" data-reveal>
            <p class="about__lede">${esc(about.lede)}</p>
            <ul class="about__skills" aria-label="Top skills">
              ${about.skills.map((skill) => `<li>${esc(skill)}</li>`).join('')}
            </ul>
          </div>

          <dl class="disciplines" data-reveal>
            ${about.disciplines
              .map(
                (item) => `<div class="discipline">
              <dt><span class="discipline__value">${esc(item.value)}</span> <span class="discipline__unit">${esc(item.unit)}</span></dt>
              <dd>${esc(item.label)}</dd>
            </div>`,
              )
              .join('')}
          </dl>
        </div>
      </div>
    </section>`
}

function renderImpact() {
  return `<section class="impact" id="impact" aria-labelledby="impact-title">
      <div class="wrap">
        <h2 class="sr-only" id="impact-title">${esc(impact.heading)}</h2>
        <ul class="impact__grid" data-reveal-group>
          ${impact.items
            .map(
              (item, index) => `<li class="impact__item" style="--i:${index}">
            <p class="impact__figure"><span aria-hidden="true" data-count="${item.value}">${item.value}</span><span class="sr-only">${item.value}</span><span class="impact__suffix" aria-hidden="true">${item.suffix}</span></p>
            <p class="impact__caption">${esc(item.caption)}</p>
          </li>`,
            )
            .join('')}
        </ul>
      </div>
    </section>`
}

/* ------------------------------------------------------------------ */
/* selected work                                                       */
/* ------------------------------------------------------------------ */

function renderSpec(vehicleIndex: number) {
  const vehicle = vehicles[vehicleIndex]
  return `<div class="spec" id="work-panel" tabindex="-1" aria-live="polite" aria-atomic="true" data-panel>
        <p class="spec__index"><span class="eyebrow">Vehicle</span> <span class="spec__count" data-spec-count>${String(vehicleIndex + 1).padStart(2, '0')}</span> <span class="spec__of">/ ${String(vehicles.length).padStart(2, '0')}</span></p>
        <h3 class="spec__name" data-spec-name>${esc(vehicle.name)}</h3>
        <p class="spec__type eyebrow" data-spec-type>${esc(vehicle.type)}</p>
        <p class="spec__year"><span class="spec__label">Launched</span> <span class="spec__value" data-spec-year>${vehicle.launchYear}</span></p>
        <span class="spec__rule" aria-hidden="true"></span>
        <p class="spec__review" data-spec-review>${esc(vehicle.review)}</p>
      </div>`
}

function renderStage() {
  return `<div class="stage" data-stage aria-hidden="true">
        <div class="stage__frame">
          <div class="stage__shadow" aria-hidden="true"></div>
          <div class="stage__media" data-stage-media>
            ${vehicles
              .map(
                (vehicle, index) => `<div class="stage__slide${index === 0 ? ' is-active' : ''}" data-stage-img="${vehicle.id}">
              ${picture(vehicle.image, {
                alt: vehicleAlt(vehicle.id),
                sizes: '(min-width: 1024px) 720px, 92vw',
                className: 'stage__picture',
              })}
            </div>`,
              )
              .join('')}
          </div>
          <canvas class="stage__canvas" data-stage-canvas aria-hidden="true"></canvas>
          <p class="stage__hint" data-stage-hint hidden>Drag to turn</p>
        </div>
      </div>`
}

function renderStrip() {
  return `<div class="work__strip">
        <div class="strip">
          ${vehicles
            .map(
              (vehicle, index) => `<button class="strip__item${index === 0 ? ' is-active' : ''}" type="button" data-vehicle="${vehicle.id}" aria-pressed="${index === 0}" aria-controls="work-panel" tabindex="${index === 0 ? '0' : '-1'}" style="--mass:${vehicle.mass}">
            <img src="media/${media[vehicle.image].base}-420.webp" srcset="${srcset(vehicle.image, 'webp')}" sizes="(min-width: 768px) 150px, 88px" width="${dims[vehicle.image].width}" height="${dims[vehicle.image].height}" alt="" loading="lazy" decoding="async">
            <span class="sr-only">${esc(vehicle.name)}, ${esc(vehicle.type)}, launched ${vehicle.launchYear}</span>
          </button>`,
            )
            .join('')}
        </div>
      </div>`
}

function renderWork() {
  return `<section class="work" id="work" aria-labelledby="work-title">
      <div class="wrap work__head" data-reveal>
        <div class="work__intro">
          <p class="eyebrow">${esc(work.eyebrow)}</p>
          <h2 id="work-title">${esc(work.heading)}</h2>
          <p class="work__note">${esc(work.note)}</p>
        </div>
        <p class="work__counter" aria-hidden="true"><span data-index>01</span><span class="work__counter-sep">/</span><span>${String(vehicles.length).padStart(2, '0')}</span></p>
      </div>

      <div class="wrap work__body">
        ${renderStage()}
        ${renderSpec(0)}
      </div>

      ${renderStrip()}
    </section>`
}

/* ------------------------------------------------------------------ */
/* career                                                              */
/* ------------------------------------------------------------------ */

function renderSubroles(role: Role) {
  if (!role.children?.length) return ''
  return `<div class="role__subroles">
          <p class="role__subroles-label">Roles within this tenure</p>
          <ol class="subroles">
            ${role.children
              .map(
                (child) => `<li class="subrole">
              <p class="subrole__dates">${esc(child.dates)}${child.tenure ? ` <span class="role__tenure">${esc(child.tenure)}</span>` : ''}</p>
              <h4 class="subrole__title">${esc(child.title)}</h4>
              ${child.location ? `<p class="subrole__location">${esc(child.location)}</p>` : ''}
              <p class="subrole__summary">${esc(child.summary)}</p>
            </li>`,
              )
              .join('')}
          </ol>
        </div>`
}

function renderCareer() {
  const mediaItems = roles
    .map(
      (role, index) => `<div class="media__item${index === 0 ? ' is-active' : ''}" data-role-media="${role.id}">
          ${roleMedia(role, index)}
        </div>`,
    )
    .join('')

  const cards = roles
    .map(
      (role, index) => `<li class="role" data-role="${role.id}" data-reveal>
        <div class="role__media"${role.image ? '' : ' aria-hidden="true"'}>${roleMedia(role, index)}</div>
        <p class="role__dates">${esc(role.dates)}${role.tenure ? ` <span class="role__tenure">${esc(role.tenure)}</span>` : ''}</p>
        <h3 class="role__title">${esc(role.title)}</h3>
        <p class="role__org">${esc(role.org)}${role.location ? ` <span class="role__location">· ${esc(role.location)}</span>` : ''}</p>
        <p class="role__summary">${esc(role.summary)}</p>
        ${renderSubroles(role)}
      </li>`,
    )
    .join('')

  return `<section class="section career" id="career" aria-labelledby="career-title">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <p class="eyebrow">${esc(career.eyebrow)}</p>
          <h2 id="career-title">${esc(career.heading)}</h2>
          <p class="section-head__lede">${esc(career.lede)}</p>
        </div>

        <div class="career__grid">
          <div class="career__media" data-career-media aria-hidden="true">
            <div class="media__frame">
              ${mediaItems}
            </div>
            <p class="media__caption" data-career-caption>${esc(roleCaption(roles[0]))}</p>
          </div>

          <div class="career__timeline">
            <span class="spine-rule" aria-hidden="true"></span>
            <svg class="spine" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 2 100">
              <path d="M1 0V100" pathLength="1" vector-effect="non-scaling-stroke"></path>
            </svg>
            <ol class="roles">
              ${cards}
            </ol>
          </div>
        </div>
      </div>
    </section>`
}

/* ------------------------------------------------------------------ */
/* patent, credentials, footer                                         */
/* ------------------------------------------------------------------ */

function renderPatent() {
  return `<section class="section patent" id="patent" aria-labelledby="patent-title">
      <div class="wrap patent__inner">
        <figure class="patent__figure" data-magnet aria-hidden="true">
          ${picture('patent', {
            alt: '',
            sizes: '(min-width: 900px) 38vw, 1px',
            className: 'patent__picture',
          })}
        </figure>

        <div class="patent__text">
          <p class="eyebrow" data-reveal>${esc(patent.eyebrow)}</p>
          <h2 class="patent__title" id="patent-title" data-reveal>${esc(patent.title)}</h2>
          <p class="patent__meta" data-reveal>
            <span class="patent__number">${esc(patent.number)}</span>
            <span class="patent__dot" aria-hidden="true">·</span>
            <time datetime="${patent.datetime}">${esc(patent.date)}</time>
          </p>
          <p class="patent__note" data-reveal>${esc(patent.note)}</p>
        </div>
      </div>
    </section>`
}

function renderCredentials() {
  return `<section class="section credentials" id="credentials" aria-labelledby="credentials-title">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <p class="eyebrow">${esc(credentials.eyebrow)}</p>
          <h2 id="credentials-title">${esc(credentials.heading)}</h2>
        </div>

        <div class="cred__grid">
          <div class="cred__block" data-reveal>
            <h3 class="cred__label">Certifications</h3>
            <ul class="cert-list">
              ${credentials.certifications.map((item) => `<li>${esc(item)}</li>`).join('')}
            </ul>
          </div>

          <div class="cred__block" data-reveal>
            <h3 class="cred__label">Education</h3>
            <ul class="edu-list">
              ${credentials.education
                .map(
                  (entry) => `<li class="edu">
                <p class="edu__qual">${esc(entry.qualification)}</p>
                <p class="edu__inst">${esc(entry.institution)}</p>
                <p class="edu__years">${esc(entry.years)}</p>
              </li>`,
                )
                .join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>`
}

function renderFooter() {
  return `<footer class="footer">
      <div class="wrap footer__inner">
        <p class="footer__name">${esc(site.name)}</p>
        <a class="footer__link" href="${site.linkedin}" target="_blank" rel="me noopener">${esc(footer.linkLabel)} <span aria-hidden="true">↗</span></a>
        <p class="footer__copy">© ${footer.year}</p>
      </div>
    </footer>`
}

/* ------------------------------------------------------------------ */
/* document                                                            */
/* ------------------------------------------------------------------ */

export function renderBody() {
  return `${renderHeader()}
    <main id="main" tabindex="-1">
      ${renderHero()}
      ${renderAbout()}
      ${renderImpact()}
      ${renderWork()}
      ${renderCareer()}
      ${renderPatent()}
      ${renderCredentials()}
    </main>
    ${renderFooter()}`
}
