import {
  DEFAULT_HERO_TITLE,
  DEFAULT_HERO_SUBTITLES,
  DEFAULT_HERO_LINKS,
  DEFAULT_ABOUT_TITLE,
  DEFAULT_ABOUT_DETAILS,
  DEFAULT_AWARDS_TITLE,
  DEFAULT_AWARDS_SUBTITLE,
  DEFAULT_AWARDS_LIST,
  DEFAULT_TESTIMONIALS_TITLE,
  DEFAULT_TESTIMONIALS_LIST,
  DEFAULT_HOMEPAGE_VIDEO,
} from './homepageDefaults';

function hasText(value) {
  return Boolean(value != null && String(value).trim());
}

function hasList(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

/**
 * When production homepage document only has `seo` (or partial CMS),
 * merge the same fallbacks the React components use so SSR/ISR props match the live UI.
 */
export function mergeHomepageWithDefaults(homepage) {
  const base = homepage && typeof homepage === 'object' ? { ...homepage } : {};
  const seo = base.seo && typeof base.seo === 'object' ? { ...base.seo } : {};

  const hero = base.hero && typeof base.hero === 'object' ? { ...base.hero } : {};
  if (!hasText(hero.title) && !hasText(hero.Title)) {
    hero.title = DEFAULT_HERO_TITLE;
  }
  if (!hasList(hero.subtitles) && !hasList(hero.Link)) {
    hero.subtitles = [...DEFAULT_HERO_SUBTITLES];
  }
  if (!hasList(hero.links) && !hasList(hero.Link)) {
    hero.links = DEFAULT_HERO_LINKS.map((l) => ({ ...l }));
  }
  if (!hasText(hero.video_link) && !hasText(hero.videoLink)) {
    hero.video_link = DEFAULT_HOMEPAGE_VIDEO;
  }

  const about = base.AboutAppzoro && typeof base.AboutAppzoro === 'object' ? { ...base.AboutAppzoro } : {};
  if (!hasText(about.title) && !hasText(about.Title)) about.title = DEFAULT_ABOUT_TITLE;
  if (!hasText(about.details) && !hasText(about.Details)) about.details = DEFAULT_ABOUT_DETAILS;

  const awards = base.awards && typeof base.awards === 'object' ? { ...base.awards } : {};
  if (!hasText(awards.title) && !hasText(awards.Title)) awards.title = DEFAULT_AWARDS_TITLE;
  if (!hasText(awards.subtitle) && !hasText(awards.Subtitle)) awards.subtitle = DEFAULT_AWARDS_SUBTITLE;
  const awardList = awards.list || awards.award;
  if (!hasList(awardList)) {
    awards.list = DEFAULT_AWARDS_LIST.map((item) => ({ ...item }));
  }

  const testimonials =
    base.testimonials && typeof base.testimonials === 'object' ? { ...base.testimonials } : {};
  if (!hasText(testimonials.title) && !hasText(testimonials.Title)) {
    testimonials.title = DEFAULT_TESTIMONIALS_TITLE;
  }
  const testimonialList = testimonials.list || testimonials.testimonalsList;
  if (!hasList(testimonialList)) {
    testimonials.list = DEFAULT_TESTIMONIALS_LIST.map((item) => ({ ...item }));
  }

  const pressCarousel =
    base.pressCarousel && typeof base.pressCarousel === 'object' ? { ...base.pressCarousel } : {};
  if (!hasText(pressCarousel.title) && !hasText(pressCarousel.Title)) {
    pressCarousel.title = 'Press';
  }

  return {
    ...base,
    seo,
    hero,
    AboutAppzoro: about,
    awards,
    testimonials,
    pressCarousel,
  };
}
