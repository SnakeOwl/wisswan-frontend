import clsx from 'clsx';

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
