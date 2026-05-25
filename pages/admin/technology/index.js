export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/admin/portfolios/technologies',
            permanent: false,
        },
    };
}

export default function TechnologyRedirect() {
    return null;
}
