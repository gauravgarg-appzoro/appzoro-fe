import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
    return (
        <Html lang="en-US">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
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
