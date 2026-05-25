import { resolveCmsMediaUrl } from './cmsMedia';
import { STRAPI_IMAGE_BASE_URL } from './constants';
import { pressSlug } from './contentSlug';
import {
  DEFAULT_HERO_TITLE,
  DEFAULT_HERO_SUBTITLES,
  DEFAULT_HERO_LINKS,
  DEFAULT_ABOUT_TITLE,
  DEFAULT_ABOUT_DETAILS,
  DEFAULT_AWARDS_TITLE,
  DEFAULT_AWARDS_LIST,
  DEFAULT_TESTIMONIALS_TITLE,
  DEFAULT_TESTIMONIALS_LIST,
  DEFAULT_HOMEPAGE_VIDEO,
} from './homepageDefaults';

function pickImageId(image) {
  if (!image) return null;
  if (typeof image === 'string') return image;
  return image._id || image.id || null;
}

function mapSubtitle(s) {
  if (typeof s === 'string') return s;
  return s?.text || s?.item || s?.subtitle || s?.Subtitle || '';
}

function mapLink(l) {
  if (!l || typeof l !== 'object') return { title: '', url: '' };
  return {
    title: l.title || l.Title || '',
    url: l.url || l.URL || '',
  };
}

function mapAwardItem(item) {
  if (!item || typeof item !== 'object') return { image: null, url: '', seo_text: '' };
  return {
    image: pickImageId(item.image),
    url: item.url || item.URL || item.link || item.Link || '',
    seo_text:
      item.seo_text ||
      item.seoText ||
      item.SeoText ||
      item.seo_text ||
      item.label ||
      item.ratingText ||
      '',
    previewPath: item.previewPath || null,
  };
}

function mapTestimonialItem(item) {
  if (!item || typeof item !== 'object') {
    return { image: null, name: '', designation: '', testimonial: '', link: '', previewPath: null };
  }
  return {
    image: pickImageId(item.image || item.clientProfilePic),
    name: item.name || item.Name || '',
    designation: item.designation || item.Designation || '',
    testimonial:
      item.testimonial ||
      item.Testimonial ||
      item.clientreview ||
      item.review ||
      '',
    link: item.link || item.url || item.URL || '',
    previewPath: item.previewPath || null,
  };
}

/** Map `presses` API rows to homepage press carousel admin rows. */
export function mapPressApiToCarouselItem(press) {
  if (!press || typeof press !== 'object') {
    return { image: null, url: '', seo_text: '', previewPath: null };
  }
  const slug = pressSlug(press);
  const images = press.PressImage || press.pressImage || press.image;
  const firstImage = Array.isArray(images) ? images[0] : images;
  const picUrl =
    typeof firstImage === 'string'
      ? firstImage
      : firstImage?.url
        ? firstImage.url.startsWith('http')
          ? firstImage.url
          : `${STRAPI_IMAGE_BASE_URL}${firstImage.url}`
        : null;
  const externalUrl = press.PressUrl && /^https?:\/\//i.test(press.PressUrl) ? press.PressUrl : '';
  return {
    image: pickImageId(firstImage),
    url: externalUrl || (slug ? `/press-release/${slug}` : '/press-release'),
    seo_text: press.PressTitle || press.title || 'Press Release',
    previewPath: picUrl,
  };
}

/** Map `client-reviews` API rows to admin testimonial form rows. */
export function mapClientReviewToTestimonial(review) {
  const pic = review?.clientProfilePic;
  const picUrl =
    typeof pic === 'string'
      ? pic
      : pic?.url
        ? pic.url.startsWith('http')
          ? pic.url
          : `${STRAPI_IMAGE_BASE_URL}${pic.url}`
        : null;
  return {
    image: pickImageId(pic),
    name: review?.name || '',
    designation: review?.designation || '',
    testimonial: review?.clientreview || '',
    link: '',
    previewPath: picUrl,
  };
}

function hasHeroContent(hero) {
  if (!hero || typeof hero !== 'object') return false;
  return Boolean(
    String(hero.title || hero.Title || '').trim() ||
      (Array.isArray(hero.subtitles) && hero.subtitles.length) ||
      (Array.isArray(hero.links) && hero.links.length) ||
      (Array.isArray(hero.Link) && hero.Link.length),
  );
}

function stripPreviewFields(list) {
  return list.map(({ previewPath, ...rest }) => rest);
}

function buildListPreviews(list, prefix) {
  const previews = {};
  list.forEach((item, idx) => {
    if (item.previewPath) {
      previews[`${prefix}-${idx}`] = item.previewPath;
      return;
    }
    const cmsUrl = resolveCmsMediaUrl(item.image);
    if (cmsUrl) previews[`${prefix}-${idx}`] = cmsUrl;
  });
  return previews;
}

/**
 * Map GET /homepage (+ optional client-reviews) to admin form state.
 * Fills the same content the public homepage shows when CMS blocks are empty.
 */
export function mapHomepageToAdminForm(data, { clientReviews = [], presses = [] } = {}) {
  const hero = data?.hero && typeof data.hero === 'object' ? data.hero : {};
  const about = data?.AboutAppzoro && typeof data.AboutAppzoro === 'object' ? data.AboutAppzoro : {};
  const awards = data?.awards && typeof data.awards === 'object' ? data.awards : {};
  const press = data?.pressCarousel && typeof data.pressCarousel === 'object' ? data.pressCarousel : {};
  const testimonials =
    data?.testimonials && typeof data.testimonials === 'object' ? data.testimonials : {};
  const seo = data?.seo && typeof data.seo === 'object' ? data.seo : {};

  const heroTitle = String(hero.title || hero.Title || '').trim() || DEFAULT_HERO_TITLE;
  const rawSubtitles = Array.isArray(hero.subtitles) ? hero.subtitles.map(mapSubtitle).filter(Boolean) : [];
  const heroSubtitles = rawSubtitles.length ? rawSubtitles : [...DEFAULT_HERO_SUBTITLES];

  const rawLinks = Array.isArray(hero.links)
    ? hero.links.map(mapLink)
    : Array.isArray(hero.Link)
      ? hero.Link.map(mapLink)
      : [];
  const heroLinks = rawLinks.length > 0 ? rawLinks : DEFAULT_HERO_LINKS.map((l) => ({ ...l }));

  let awardsList = Array.isArray(awards.list)
    ? awards.list.map(mapAwardItem)
    : Array.isArray(awards.award)
      ? awards.award.map(mapAwardItem)
      : [];

  if (awardsList.length === 0) {
    awardsList = DEFAULT_AWARDS_LIST.map((item) => mapAwardItem(item));
  }

  let pressList = Array.isArray(press.list)
    ? press.list.map(mapAwardItem)
    : Array.isArray(press.pressLinks)
      ? press.pressLinks.map(mapAwardItem)
      : [];

  if (pressList.length === 0 && Array.isArray(presses) && presses.length > 0) {
    pressList = presses.slice(0, 12).map(mapPressApiToCarouselItem);
  }

  let testimonialsList = Array.isArray(testimonials.list)
    ? testimonials.list.map(mapTestimonialItem)
    : Array.isArray(testimonials.testimonalsList)
      ? testimonials.testimonalsList.map(mapTestimonialItem)
      : [];

  if (testimonialsList.length === 0 && Array.isArray(clientReviews) && clientReviews.length > 0) {
    testimonialsList = clientReviews.map(mapClientReviewToTestimonial);
  }

  if (testimonialsList.length === 0) {
    testimonialsList = DEFAULT_TESTIMONIALS_LIST.map((item) => mapTestimonialItem(item));
  }

  const previews = {
    ...buildListPreviews(awardsList, 'award'),
    ...buildListPreviews(pressList, 'press'),
    ...buildListPreviews(testimonialsList, 'testimonial'),
  };

  const og = resolveCmsMediaUrl(seo?.ogImage);
  if (og) previews.og_image = og;
  const tw = resolveCmsMediaUrl(seo?.twitterImage);
  if (tw) previews.twitter_image = tw;

  return {
    form: {
      hero_title: heroTitle,
      hero_subtitles: heroSubtitles,
      hero_links: heroLinks,
      about_title: String(about.title || about.Title || '').trim() || DEFAULT_ABOUT_TITLE,
      about_details: String(about.details || about.Details || '').trim() || DEFAULT_ABOUT_DETAILS,
      awards_title: String(awards.title || awards.Title || '').trim() || DEFAULT_AWARDS_TITLE,
      awards_list: stripPreviewFields(awardsList),
      press_title: String(press.title || press.Title || '').trim() || 'Press',
      press_list: stripPreviewFields(pressList),
      testimonials_title:
        String(testimonials.title || testimonials.Title || '').trim() || DEFAULT_TESTIMONIALS_TITLE,
      testimonials_list: stripPreviewFields(testimonialsList),
      home_content_title: String(hero.content_title || hero.contentTitle || '').trim(),
      home_content_details: String(hero.content_details || hero.contentDetails || '').trim(),
      homepage_video_link:
        String(hero.video_link || hero.videoLink || '').trim() || DEFAULT_HOMEPAGE_VIDEO,
      slug: seo.slug || '/',
      seo_title: seo.seoTitle || '',
      seo_description: seo.seoDescription || '',
      seo_keywords: seo.keywords || '',
      seo_robots: seo.robots || 'index, follow',
      og_title: seo.ogTitle || '',
      og_description: seo.ogDescription || '',
      og_image: pickImageId(seo.ogImage),
      twitter_title: seo.twitterTitle || '',
      twitter_description: seo.twitterDescription || '',
      twitter_image: pickImageId(seo.twitterImage),
      schema_code: seo.schemaCode || seo.schema_code || '',
    },
    previews,
    usedDefaults: !hasHeroContent(hero) || awardsList.length > 0,
  };
}
