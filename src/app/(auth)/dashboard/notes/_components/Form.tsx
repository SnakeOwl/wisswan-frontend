"use client"

import { createNote, State } from "@/actions/db/createNote";
import React, { useActionState } from "react";


const Form = React.memo(({
    defaultData
}: {
    defaultData: any
}) => {
    const initialState: State = { message: null, errors: {} };
    const [state, fromAction] = useActionState(createNote, initialState)
    // const [data, setData] = useState<any>(defaultData);


    return (
        <form action={fromAction} className="flex flex-col gap-4 px-4">
            <input
                id="name"
                type="text"
                name="name"

                // value={data.name || ""}
                // onChange={e => setData({ ...data, name: e.target.value })}

                aria-describedby="name-error"
                required
            />

            <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                    state.errors.name.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>

            <input
                id="name2"
                type="text"
                name="name2"
                placeholder="name2"

                aria-describedby="name2-error"
                required
            />

            <div id="name2-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name2 &&
                    state.errors.name2.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>

            <button type="submit">send</button>
        </form>
    )
});


export default Form