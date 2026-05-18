import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
    return (
        <Html lang="en-US">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                {/* Preconnect to API/image origin to reduce critical path latency */}
                <link rel="preconnect" href="https://admin.appzoro.com" />
                <link rel="dns-prefetch" href="https://admin.appzoro.com" />
            </Head>
            <body>
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MJVGVMJK" height="0" width="0" style={{ "display": "none", "visibility": "hidden" }}></iframe></noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default MyDocument;
