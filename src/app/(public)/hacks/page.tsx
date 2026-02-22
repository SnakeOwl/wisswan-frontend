import HacksBlock from "./_components/HacksBlock";


export default async function Page({
    searchParams,
}: PageProps<'/hacks'>) {
    const sparams = await searchParams;
    const soptions = new URLSearchParams(sparams as { [key: string]: string });


    return (
        <main>
            <HacksBlock filters={soptions} />
        </main>
    )
}