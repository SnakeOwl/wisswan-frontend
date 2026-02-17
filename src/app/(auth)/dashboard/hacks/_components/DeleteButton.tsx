"use client"

import ButtonStyled from "@/app/_components/buttons/ButtonStyled";
import { Delete } from "@/libs/Fetch";
import { useRouter } from "next/navigation";

export default function DeleteButton({
    hackId
}: {
    hackId: number
}) {
    const router = useRouter();

    const click = async () => {
        if (!confirm("Удалить?"))
            return null;


        const response = await Delete(`user/hacks/${hackId}`);
        if (response) {
            router.push('/dashboard/hacks');
        } else {
            alert("Что-то пошло не так.")
        }
    }


    return (
        <ButtonStyled onClick={click}
            className="px-2 py-1 rounded"
            theme="red-reversed">
            Удалить
        </ButtonStyled>
    )
}