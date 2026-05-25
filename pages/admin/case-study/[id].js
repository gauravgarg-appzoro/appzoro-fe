export async function getServerSideProps({ params }) {
    const id = params?.id || '';
    const dest = id === 'create' ? '/admin/portfolios/create' : `/admin/portfolios/${id}`;
    return {
        redirect: {
            destination: dest,
            permanent: false,
        },
    };
}

export default function CaseStudyEditRedirect() {
    return null;
}
