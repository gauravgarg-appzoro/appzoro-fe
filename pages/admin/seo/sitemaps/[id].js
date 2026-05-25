export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/admin/seo/sitemaps',
            permanent: false,
        },
    };
}

export default function SitemapEditRedirect() {
    return null;
}
