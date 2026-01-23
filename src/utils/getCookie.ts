"use server"

import { cookies } from 'next/headers';


export default async function getCookie(name: string) {
    const cookieStore = await cookies();

    if (cookieStore.has(name))
        return cookieStore.get(name)?.value;


    return undefined;
}