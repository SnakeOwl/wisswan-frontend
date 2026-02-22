import HacksBlock from "../_components/HacksBlock";


export const metadata = {
    title: "Хаки по областям",
    describe: "Хаки с фильтрами по областям",
}


export default async function BlogPostPage({
    params,
    searchParams
}: PageProps<'/hacks/[...filters]'>
) {
    const filters = (await params).filters;

    const sparams = new URLSearchParams();

    filters.forEach(filter => {
        sparams.append('domains[]', filter);
    });
    

    return (
        <main>
            <HacksBlock filters={sparams} />
        </main>
    )
}