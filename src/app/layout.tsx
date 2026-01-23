
import ParticlesWrapper from "./_components/ParticlesWrapper"
import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header/Header";
import { PT_Sans, /* PT_Serif */ } from "next/font/google";
import UserProvider from "./_components/UserProvider";

// fonts: PT Sans / PT Serif

// const pt_serif = PT_Serif({
//     subsets: ["latin", "cyrillic"],
//     weight: ["400", "700"]
// });

const pt_sans = PT_Sans({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "700"]
});

export default function RootLayout({
    children,
    modal
}: {
    children: React.ReactNode
    modal: React.ReactNode;
}) {
    return (
        <html lang="ru" className="bg-white dark:bg-black text-black dark:text-stone-100 ">
            <UserProvider>
                <body className={`${pt_sans.className} antialiased`}>
                    <ParticlesWrapper>
                        <Header />

                        {children}

                        {modal}
                    </ParticlesWrapper>
                </body>
            </UserProvider>
        </html>
    )
}



export const metadata: Metadata = {
    // for images and icons
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "/"),

    title: {
        template: `%s / ${process.env.NEXT_PUBLIC_APP_NAME}`,
        default: `${process.env.NEXT_PUBLIC_APP_NAME}`
    },
    description: "",


    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};