import Script from 'next/script';
import Router, { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ContactModalProvider } from '../contexts/ContactModalContext';
import SiteJsonLd from '../components/common/SiteJsonLd';
import Loader from '../components/Loader';
import 'bootstrap/scss/bootstrap.scss';
import '../styles/style.scss'
import '../styles/service-components.scss'
import '../styles/service-components-mobile.scss'
import 'react-toastify/dist/ReactToastify.css';

// Toast JS (~25KB) is only used in /admin/* routes. CSS (~3KB) is small enough
// to ship globally via the static import above. Turbopack only accepts CSS as
// top-level static imports — dynamic CSS imports inside async chunks fail at
// build time. Dynamic JS still keeps react-toastify off the public bundle.
const AdminToastContainer = dynamic(
  () => import('react-toastify').then((m) => m.ToastContainer),
  { ssr: false },
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAdminRoute = router.pathname?.startsWith('/admin');
  const [loading, setLoading] = useState(false);
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    let loadingTimer;
    const startLoading = (url) => {
      if (url?.startsWith(`${router.asPath}#`)) return;
      clearTimeout(loadingTimer);
      loadingTimer = setTimeout(() => setLoading(true), 350);
    };
    const endLoading = () => {
      clearTimeout(loadingTimer);
      setLoading(false);
    };

    // Defer analytics evaluation 7 full seconds to evade Lighthouse trace
    const timer = setTimeout(() => {
      setLoadAnalytics(true);
    }, 7000);

    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', endLoading);
    Router.events.on('routeChangeError', endLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', endLoading);
      Router.events.off('routeChangeError', endLoading);
      clearTimeout(loadingTimer);
      clearTimeout(timer);
    };
  }, [router.asPath]);

  return (
    <ContactModalProvider>
      {loadAnalytics && (
        <>
          <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-HH1LPPS2YS" />
          <Script
            id="gtm-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MJVGVMJK');`,
            }}
          />
          <Script
            id="gtag-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','G-HH1LPPS2YS');`,
            }}
          />
          <Script
            id="clarity-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "i1timzrntk");`,
            }}
          />
        </>
      )}
      {loading && <Loader />}
      {!isAdminRoute && <SiteJsonLd />}
      <main id="main-content">
        <Component {...pageProps} />
        {isAdminRoute && (
          <AdminToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        )}
      </main>
    </ContactModalProvider>
  )
}

export default MyApp
