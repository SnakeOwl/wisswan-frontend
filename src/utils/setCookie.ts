"use server"

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers';


export default async function setCookie(...args: [key: string, value: string, cookie?: Partial<ResponseCookie> | undefined] | [options: ResponseCookie]) {
    const cookieStore = await cookies();

    cookieStore.set(...args);
}