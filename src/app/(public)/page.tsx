import clsx from 'clsx';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "WriteWrite"
}


export default async function Page() {
    return (
        <main>
            <h1>textbook</h1>
            <div className={clsx("text-green-500", {
                "text-red-400": true
            })}>

            <div className="w-[50px] h-[50px] bg-red-500 hover:bg-yellow-500"></div>
            <h1 className='crimson'>h1</h1>
            <h2>h2</h2>

            </div>

        </main>
    );
}
