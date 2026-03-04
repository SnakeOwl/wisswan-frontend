"use server"

import { Post } from "@/libs/Fetch";
import { log } from "@/libs/Logging";
import { z } from "zod";

export default async function updateUserRequest(formData: any) {
    const rawData = formData;

    const zodSchema = z.object({
        email: z.string()
            .email("Введите корректный email")
            .min(5, "Email слишком короткий")
            .max(100, "Email слишком длинный"),
    });


    try {
        zodSchema.parse(rawData); // will be a throw on validation error

        // request to backend
        const codeResponse = await Post(`user/update/${rawData.id}`, rawData);

        return codeResponse;
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