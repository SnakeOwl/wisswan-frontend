"use client"


import { isAdmin, User } from "@/types/User";
import { Save } from "lucide-react";
import { useContext, useRef, useState } from "react"
import updateUserRequest from "../_requests/updateUserRequest";
import InputV2Styled from "@/app/_components/inputs/InputV2Styled";
import ContextUser from "@/context/ContextUser";
import TextareaV2Styled from "@/app/_components/inputs/TextareaV2Styled";
import Select from "@/app/_components/inputs/Select";


const userAccessOptions = [
    {
        title: "Админ",
        value: 255
    },
    {
        title: "Управляющий",
        value: 64
    },
    {
        title: "Обычный",
        value: 0
    },
]


export default function UserForm({
    initialUser,
}: {
    initialUser: User
}) {
    const formRef = useRef<HTMLFormElement>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isPending, setIsPending] = useState<boolean>(false);
    const [data, setData] = useState<Record<string, string | number>>({
        id: initialUser.id,
        email: initialUser.email,
        name: initialUser.name || '',
        deleted_message: initialUser.deleted_message || '',
        access: initialUser.access || 0
    });

    const { stateUser } = useContext(ContextUser);


    const upload = async (updata: any = data) => {
        setIsPending(true);

        const saveResponse = await updateUserRequest(updata);

        if (saveResponse.errors) {
            setErrors(saveResponse.errors);
        } else {
            setErrors({});
        }

        setIsPending(false);
    }


    return (
        <div>
            <form
                className="lg:w-1/2 flex flex-col gap-3"
                ref={formRef}
            >
                <div>
                    <label htmlFor="email"
                        className="mb-1"
                    >
                        Email
                    </label>

                    <InputV2Styled id="email"
                        disabled
                        defaultValue={data.email}
                        error={errors?.email}
                    />
                </div>

                <div>
                    <label htmlFor="name"
                        className="mb-1"
                    >
                        Имя
                    </label>

                    <InputV2Styled id="name"
                        error={errors?.name}
                        onBlur={() => upload()}

                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </div>

                {isAdmin(stateUser.user) &&
                    <>
                        <div>
                            <label htmlFor="deleted_message"
                                className="mb-1"
                            >
                                Причина удаления
                            </label>

                            <TextareaV2Styled id="deleted_message"
                                className="w-full" rows={4}
                                value={data.deleted_message}
                                onChange={(e) => setData({ ...data, deleted_message: e.target.value })}
                                onBlur={() => upload()}
                            />
                        </div>


                        <div>
                            <label htmlFor="access"
                                className="mb-1">
                                Доступ
                            </label>

                            <Select id="access"
                                options={userAccessOptions}
                                value={data.access}
                                onChange={(e) => {
                                    const newData = { ...data, access: Number(e.target.value) };
                                    setData(newData);
                                    upload(newData);
                                }
                                }
                            />
                        </div>
                    </>
                }
            </form>

            {/** saving icon */}
            {isPending &&
                <div className="fixed right-4 bottom-4 animate-pulse">
                    <Save className="dark:stroke-neutral-700 stroke-neutral-300" />
                </div>
            }
        </div>
    )
}