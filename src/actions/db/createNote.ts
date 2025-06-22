"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";


export type State = {
    errors?: {
        name?: string[];
        name2?: string[];
    };
    message?: string | null;
};


const FormSchema = z.object({
    id: z.string(),
    name: z.string({ invalid_type_error: 'Please select a strign.' }),
    name2: z.coerce.number({ invalid_type_error: 'NAN' })
        .gt(0, { message: 'Please enter an amount greater than 0.' })

})

const CreateNote = FormSchema.omit({ id: true })


export async function createNote(prevState: State, formData: FormData) {
    const formRaw = Object.fromEntries(formData.entries())
    const validated = CreateNote.safeParse(formRaw);
    // const { name, name2 } = validated;

    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }


    try {
        // here make sending to the server

    } catch (e) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }



    // revalidatePath('/dashboard/notes');


    redirect("/dashboard/notes");
}