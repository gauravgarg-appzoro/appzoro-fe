import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { RxArrowDown, RxArrowUp } from '../OptimizedIcons';

// SSR-safe layout effect (avoid React warning when rendering on the server).
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Approximate how many text lines fit before the Read More cut.
// 9 lines × measured line-height = a clean, line-aligned maxHeight so no
// partially-clipped line is visible at the bottom edge.
const COLLAPSED_LINES = 9;

// CMS-pasted HTML often arrives polluted with SEO-harmful attributes like
// `style="display:none"` and `aria-hidden="true"` (from rich-text editors
// or copy-paste from old HTML). Strip these before rendering so Googlebot,
// AI crawlers, and screen readers see all content.
const cleanCmsHtml = (raw) => {
  if (!raw || typeof raw !== 'string') return raw;
  return raw
    .replace(/\s*style\s*=\s*"[^"]*display\s*:\s*none[^"]*"/gi, '')
    .replace(/\s*style\s*=\s*'[^']*display\s*:\s*none[^']*'/gi, '')
    .replace(/\s*aria-hidden\s*=\s*"true"/gi, '')
    .replace(/\s*aria-hidden\s*=\s*'true'/gi, '');
};

// Strip HTML tags + collapse whitespace to count visible text length.
const visibleTextLength = (s) => {
  if (!s || typeof s !== 'string') return 0;
  return s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim().length;
};

// Threshold above which content is considered "long" → enable Read More
// (matches roughly 260px visual height — same clip target used in CSS).
const LONG_CONTENT_CHARS = 500;

const DEFAULT_ABOUT = {
  title: 'About AppZoro',
  paragraphs: [
    'Appzoro is an award-winning mobile app development agency that works to convert your dreams into destinations. We leverage the proficiency of our expert mobile app developers to craft your digital desires in reality. With cutting-edge technologies, our team offers the best digital solution in the industry to meet your business requirements via the needed app.',
    'Appzoro Technologies is a leading mobile app development agency in the state of Atlanta. Our team of seasoned app developers in Atlanta emphasizes inculcating feasibility into your visions and ideas. We are obsessed with your app approach as much as you do and hence, we even strive to boost the potential of underperforming apps. By partnering with the adept team of Appzoro Technologies, you will avail end-to-end iOS and Android app development and designing services. Together with the best-in-class web development, you will also get access to a comprehensive range of services from prototyping and testing to third-party integrations, version updates, and additional support. We integrate responsive UI/UX designs to drive a higher rate of user engagement and streamline deployments by employing a CI/CD approach.',
    'Whether you want a native app, a database-driven application, or a web-based digital solution, we have got you covered. AppZoro delivers high-end mobile app development services for all the needs of your enterprise. We make highly customizable desktop and mobile apps to help your business meet the ever-changing market demands of your customers.',
    'We at AppZoro work with well-defined development processes compiled by thoughtful strategies. In addition, you get access to the deployment of cloud-based integrations and customized tools across all devices of the Android ecosystem. Our seasoned Android App developers in Atlanta are known for providing top-notch results with their skills and experience. Besides facilitating Android app development services in the city of Atlanta, Georgia, we also serve complete QA and testing of mobile applications.',
  ],
};

function parseAboutContent(about = {}, homeContent = {}) {
  const title =
    about?.title ||
    about?.Title ||
    homeContent?.content_title ||
    DEFAULT_ABOUT.title;

  const raw =
    about?.details ||
    about?.Details ||
    homeContent?.content_details ||
    '';

  if (raw && String(raw).trim()) {
    const isHtml = /<[a-z][\s\S]*>/i.test(String(raw));
    if (isHtml) {
      // Sanitize before passing to dangerouslySetInnerHTML
      return { title, html: cleanCmsHtml(String(raw)), paragraphs: null };
    }
    const paragraphs = String(raw)
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (paragraphs.length) {
      return { title, html: null, paragraphs };
    }
  }

  return { title, html: null, paragraphs: DEFAULT_ABOUT.paragraphs };
}

const HomeContent = ({ about = {}, homeContent = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, html, paragraphs } = parseAboutContent(about, homeContent);

  // Unified "is content long enough to need Read More" check that works
  // for BOTH branches (HTML from CMS rich text + plain paragraphs).
  // Counts visible character length, ignoring HTML tags.
  const contentChars = html
    ? visibleTextLength(html)
    : (paragraphs || []).join(' ').length;
  const hasMore = contentChars > LONG_CONTENT_CHARS;

  // Measure the rendered line-height of the content container so the
  // collapsed maxHeight aligns exactly with a line boundary — guarantees
  // no partially-clipped line is visible when collapsed.
  const contentRef = useRef(null);
  const [collapsedMaxHeight, setCollapsedMaxHeight] = useState(null);

  useIsoLayoutEffect(() => {
    const computeMaxHeight = () => {
      const node = contentRef.current;
      if (!node) return;
      const style = window.getComputedStyle(node);
      const fontSize = parseFloat(style.fontSize) || 16;
      let lineHeight = parseFloat(style.lineHeight);
      if (Number.isNaN(lineHeight)) lineHeight = fontSize * 1.5;
      setCollapsedMaxHeight(Math.floor(lineHeight * COLLAPSED_LINES));
    };
    computeMaxHeight();
    window.addEventListener('resize', computeMaxHeight);
    return () => window.removeEventListener('resize', computeMaxHeight);
  }, [html, paragraphs]);

  // SEO: ALL content lives in initial HTML — no display:none, no aria-hidden.
  // Read More toggle ONLY clips visually via CSS max-height. Crawlers, AI
  // bots, and screen readers always see the full content.
  const collapsedStyle =
    hasMore && !isExpanded
      ? { maxHeight: collapsedMaxHeight ?? 260, overflow: 'hidden' }
      : undefined;
  const collapsedClass = hasMore && !isExpanded ? 'collapsed' : '';

  return (
    <section className="content-about-view">
      <Container>
        <div className="c-about-block">
          <div className="section-title text-start">
            <h3>{title}</h3>
          </div>
          {html ? (
            <div
              ref={contentRef}
              className={`home-about-cms ${collapsedClass}`.trim()}
              style={collapsedStyle}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <div
              ref={contentRef}
              className={`home-about-paragraphs ${collapsedClass}`.trim()}
              style={collapsedStyle}
            >
              {paragraphs?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          )}
          {hasMore && (
            <div className="btn-animated-height text-center">
              <button
                type="button"
                title={isExpanded ? 'Show Less' : 'Read More'}
                aria-label={isExpanded ? 'Show less content' : 'Read more content'}
                onClick={() => setIsExpanded(!isExpanded)}
                className="read-more-btn down-arrow"
              >
                {isExpanded ? <RxArrowUp /> : <RxArrowDown />}
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default HomeContent;
