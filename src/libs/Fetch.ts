"use server"

import { cookies } from "next/headers";
import { log } from "./Logging";


/**
 * Cached GET request on back. UNAuthorised
 * 
 * @param url path to backend
 * @param revalidate cache control: false == infinity. 0 == no cache. number == (in seconds) Specify the resource should have a cache lifetime of at most n seconds.
 * @param revalidationTags cache tag to reset via revalidateTag()
 * @param cache 
 * @param appendHeadrs 
 * @returns 
 */
export async function Fetch(
    url: string,
    revalidate: false | 0 | number = 0,
    revalidationTags: string[] = [],
    cache: 'force-cache' | 'no-store' | 'default' = "default",
    appendHeadrs: Record<string, string> = {},
): Promise<false | number | any> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token");

        const headers = {
            "accept": "application/json", // without this laravel returns 302
            ...appendHeadrs,
        }


        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL_API + url,
            {
                headers: headers,
                cache: cache,
                next: {
                    revalidate: revalidate,
                    tags: revalidationTags,
                }

            }

        );


        if (response.status == 200
            || response.status == 422 // laravel validation
        )
            return await response.json();


        return response.status;
    } catch (e) {
        await log("Request GET error: " + String(e) + "\n url: " + process.env.NEXT_PUBLIC_BASE_URL_API + url);

    }
    return false;
};


/**
 * Authorised GET request. No cache.
 * @param url 
 * @param appendHeadrs 
 * @returns 
 * JSON data or JSON with errors
 */
export async function Get(
    url: string,
    appendHeadrs: Record<string, string> = {}
): Promise<false | number | any> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token");

        const headers = {
            ...(token != undefined ? { "Authorization": `Bearer ${token.value}` } : {}),
            "accept": "application/json", // without this laravel returns 302
            ...appendHeadrs,
        }


        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL_API + url,
            {
                headers: headers,
            }
        );


        if (response.status == 200
            || response.status == 422 // laravel validation
        )
            return await response.json();


        return response.status;
    } catch (e) {
        await log("Request GET error: " + String(e) + "\n url: " + process.env.NEXT_PUBLIC_BASE_URL_API + url);

    }
    return false;
};


/**
 * @param url path on backend
 * @param body data
 * @param appendHeders
 * @returns 
   any - some data
   false - request was broken
   number - http status
 */
export async function Post(
    url: string,
    body: any = null,
    appendHeders: Record<string, string> = {}
): Promise<false | number | any> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token");

        const headers = {
            // 'Content-Type': 'multipart/form-data', // TODO: check with files
            "accept": "application/json", // without this laravel returns 302
            ...(token != undefined ? { "Authorization": `Bearer ${token.value}` } : {}), // laravel auth
            ...appendHeders,
        }
        console.log('body:', body)
        let postBody: any = null;
        if (!!body) {
            if (body instanceof FormData) {
                postBody = body;
            } else {
                // сформировать formData
                postBody = new FormData();

                appendObjectToFormData(postBody, body);
            }
        }
        console.log('postBody:', postBody)
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL_API + url,
            {
                headers: headers,
                body: postBody,
                method: "post",
            }
        )


        if (response.status == 200
            || response.status == 201 // laravel send 201 after creating by default
            || response.status == 422 // laravel validation
        )
            return (await response.json());


        return response.status;
    } catch (e) {
        await log("Request POST error: " + String(e) + "\n url: " + process.env.NEXT_PUBLIC_BASE_URL_API + url);
    }

    return false
};

/**
 * 
 * @param url 
 * @param appendHeders 
 * @returns 
 *   true - OK
 *   number - status response
 *   Object - parsed JSON
 */
export async function Delete(
    url: string,
    appendHeders: Record<string, string> = {}
): Promise<false | number | any> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token");

        const headers = {
            "accept": "application/json", // without this laravel returns 302
            ...(token != undefined ? { "Authorization": `Bearer ${token.value}` } : {}), // laravel auth
            ...appendHeders,
        }


        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL_API + url,
            {
                headers: headers,
                method: "delete",
            }
        )


        if (response.status == 200
            || response.status == 201
            || response.status == 422 // laravel validation
        )
            return (await response.json());


        return response.status;
    } catch (e) {
        await log("Request POST error: " + String(e) + "\n url: " + process.env.NEXT_PUBLIC_BASE_URL_API + url);
    }

    return false
};




//  Append into formData any object recursively.
const appendObjectToFormData = (formData: FormData, data: any, parentKey = '') => {
    
    if (data instanceof File && parentKey.length > 0) {
        // FILES
        formData.append(parentKey, data);
    } else {
        // OTHER DATA
        if (
            typeof data === 'string' ||
            typeof data === 'number'
        ) {
            formData.append(parentKey, String(data));
            return;
        }

        if (typeof data === 'boolean') {
            formData.append(parentKey, data ? '1' : '0');
            return;
        }


        // PARSE OBJECT
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                const fullKey = parentKey ? `${parentKey}[${key}]` : key;

                if (value instanceof File) {
                    // FILE
                    formData.append(fullKey, value);

                } else if (Array.isArray(value)) {
                    // ARRAY
                    if (value.length == 0) {
                        // NO ELEMENTS
                        formData.append(fullKey, ""); // erase
                    } else {
                        console.log('value: ', value)
                        value.forEach((item, index) => {
                            appendObjectToFormData(formData, item, `${fullKey}[${index}]`);
                        });
                    }

                } else if (typeof value === 'object' && value !== null) {
                    // OBJECT
                    appendObjectToFormData(formData, value, fullKey);
                } else if (typeof value === 'boolean') {
                    formData.append(fullKey, value ? '1' : '0');
                } else if (value === null) {
                    // NULL
                    formData.append(fullKey, "");
                } else {
                    // SIMPLE VALUES
                    formData.append(fullKey, value);
                }
            }
        }
    }
};



