import Head from 'next/head'
import { useRouter } from 'next/router';

const MetaData = (props) => {
    const router = useRouter();
    const pathname = (router?.asPath || '/').split('?')[0] || '/';
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title key="title">{props?.title}</title>
                <meta name="title" content={props?.title} />
                <meta name="description" content={props?.description} />
                <meta property="og:title" content={props?.title} />
                <meta property="og:description" content={props?.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${process.env.REACT_APP_API_URL}${props?.url}`} />
                <meta property="og:image" content={props?.image} />
                <meta property="twitter:url" content={`${process.env.REACT_APP_API_URL}${props?.url}`} />
                <meta name="twitter:title" content={props?.title} />
                <meta name="twitter:description" content={props?.description} />
                <meta name="twitter:image" content={props?.image} />
                <meta property="twitter:card" content="summary_large_image - @AppZoroT" />
                {router?.asPath === '/locations/atlanta-app-developers' ?
                    <link rel="canonical" href="https://appzoro.com" />
                    :
                    <link rel="canonical" href={`https://appzoro.com${pathname === '/' ? '' : pathname}${router?.query?.page ? `?page=${router.query.page}` : ''}`} />
                }
            </Head>
        </>
    )
}



export default MetaData