export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/admin/portfolios',
            permanent: false,
        },
    };
}

export default function CaseStudyListRedirect() {
    return null;
}
