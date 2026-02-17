"use server"

import { Post } from "@/libs/Fetch";
import { log } from "@/libs/Logging";
import { z } from "zod";

export default async function saveHackRequest(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData);


    if (prevState == null || JSON.stringify(rawData) == JSON.stringify(prevState))
        return rawData; // no changes


    const zodSchema = z.object({
        title: z.string()
            .max(65535, "Слишком много символов")
            .nullable().optional(),
        group: z.string()
            .max(255, "Слишком много символов")
            .nullable().optional(),
        domen: z.string()
            .max(255, "Слишком много символов")
            .nullable().optional(),
        subdomen: z.string()
            .max(255, "Слишком много символов")
            .nullable().optional(),
        id: z.string()
            .nullable().optional(),
        value: z.string().min(1, {message: "Без содержимого хаки не сохраняет"})
    });


    try {
        zodSchema.parse(rawData); // will be a throw on validation error

        const urlToSave = rawData.id ? `user/hacks/${rawData.id}` : `user/hacks`;
        
        // request to backend
        const response = await Post(urlToSave, rawData);
        
        return response;
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            const errorBuffer: Record<string, string> = {};

            error.issues.forEach(issue => {
                issue.path.forEach(fieldName => {
                    errorBuffer[fieldName] = issue.message;
                })
            });

            return { errors: errorBuffer };
        }

        await log(JSON.stringify(error)); // undefined error

        return { errors: { general: "Что-то пошло не так, пожалуйста попробуйте позже" } };
    }
}