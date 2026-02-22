import { Metadata } from 'next';
import HacksBlock from './_components/HacksBlock';


export const metadata: Metadata = {
    title: "WriteWrite"
}


export default async function Page() {
    return (
        <main>
            <section>
                <HacksBlock />
            </section>


        </main>
    );
}
