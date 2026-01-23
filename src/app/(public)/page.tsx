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

            
            

            </div>

        </main>
    );
}
