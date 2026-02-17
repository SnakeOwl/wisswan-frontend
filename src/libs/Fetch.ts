"use server"

import { cookies } from "next/headers";
import { log } from "./Logging";

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
        // если рекурсивно передали массив файлов
        formData.append(parentKey, data);
    } else {
        let hasKey = false; // если передавать массив с числами, то for не срабатывает

        for (const key in data) {
            hasKey = true;
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                const fullKey = parentKey ? `${parentKey}[${key}]` : key;

                if (value instanceof File) {
                    // Если значение — файл
                    formData.append(fullKey, value);

                } else if (Array.isArray(value)) {
                    // Если значение — массив
                    if (value.length == 0) {
                        // если массив нулевой
                        formData.append(fullKey, ""); // erase
                    } else {
                        value.forEach((item, index) => {
                            appendObjectToFormData(formData, item, `${fullKey}[${index}]`);
                        });
                    }

                } else if (typeof value === 'object' && value !== null) {
                    // Если значение — объект
                    appendObjectToFormData(formData, value, fullKey);
                } else if (typeof value === 'boolean') {
                    formData.append(fullKey, value ? '1' : '0');
                } else if (value === null) {
                    // null затереть
                    formData.append(fullKey, "");
                } else {
                    // Обычные значения (строки, числа и т.д.)
                    formData.append(fullKey, value);
                }
            }
        }


        if (hasKey === false) {
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
        }
    }
};



