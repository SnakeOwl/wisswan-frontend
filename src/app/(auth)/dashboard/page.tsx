import Link from "next/link";

export default function Page(){
    return (
        <main>
            <Link href={"/dashboard/notes"}>
                notes
            </Link>
        </main>
    )
}