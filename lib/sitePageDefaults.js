/** Fallback copy when site-pages API is unavailable; mirrors public page defaults. */

export const ABOUT_US_DEFAULTS = {
  title: 'Meet AppZoro',
  intro:
    'We are more than software programmers - we are critical thinkers, problem-solvers, crafters of change, and innovators of digital transformation. We help businesses; small and big, to bring value to their end customers, beat their competition and exponentially grow as a successful company.',
  mission:
    'AppZoro empowers your business by enhancing overall effectiveness and efficiency using next generation technology. Our focus is to help you envision potential, leverage technology and reach for infinite growth.',
  vision:
    'To consistently lead technology innovation and provide technology software services and solutions to global clientele with exceptional quality, sharp turn around time and cost effectiveness.',
  history: '',
  seo_title: 'About AppZoro | Our Mission, Vision, and Approach',
  seo_description:
    "Explore AppZoro's story, our mission, core values, and notable achievements. Discover how we develop cutting-edge products via innovation and expertise.",
};

export const CONTACT_US_DEFAULTS = {
  headline_primary: 'Connect with Us',
  headline_secondary: 'And Go Digital',
  intro:
    'Book a free consultation with Appzoro to understand your app development requirements. Our experts are ready to bring your ideas to life.',
  seo_title: 'Contact Us - Web and App development Company',
  seo_description:
    'If you want to get in touch? Fill in the form to contact us with your details and requirements.',
};

export function applySitePageDefaults(slug, data = {}) {
  const base = slug === 'about-us' ? ABOUT_US_DEFAULTS : CONTACT_US_DEFAULTS;
  return { ...base, ...(data && typeof data === 'object' ? data : {}) };
}
