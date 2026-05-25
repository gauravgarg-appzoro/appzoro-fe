export async function getServerSideProps({ params }) {
    const id = params?.id || '';
    return {
        redirect: {
            destination: `/admin/portfolios/technologies/${id}`,
            permanent: false,
        },
    };
}

export default function TechnologyEditRedirect() {
    return null;
}
