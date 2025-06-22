import Link from "next/link";

export default async function Page(){
    return (
        <main>
            <h1>Notes</h1>
            <Link href={"/dashboard/notes/new"}>create</Link>
        </main>
    )
}