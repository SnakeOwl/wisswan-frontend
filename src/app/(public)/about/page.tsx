import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
    title: "О проекте",
    description: "Краткая информация о проекте"
}


export default async function Page() {
    return (
        <main>
            <h1>О проекте</h1>
            <h2>Используемые технологии</h2>
            <h3>Frontend</h3>
            <ul>
                <li><Link href={'https://nextjs.org/'}
                    rel="nofollow noindex"
                    target="_blank"
                >
                    Next.js
                </Link></li>
            </ul>

            <h3>Backend</h3>
            <ul>
                <li><Link href={'https://laravel.com/'}
                    rel="nofollow noindex"
                    target="_blank"
                >
                    Laravel
                </Link></li>
            </ul>
        </main>
    )
}