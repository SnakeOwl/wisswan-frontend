import { Hack } from "@/types/Hack";
import StatusView from "../../../_components/StatusView";
import DeleteButton from "./DeleteButton";

export default function HackAdvancedForm({
    initialHack = null
}: {
    initialHack?: Hack | null
}) {
    if (initialHack == null)
        return null;


    return (
        <div className="flex flex-col gap-4">
            <div>
                <h4>Информация</h4>
                {initialHack.created_at && 
                    <div>Создан: { new Date(initialHack.created_at).toLocaleDateString('ru-RU')}</div>
                }
                {initialHack.updated_at && 
                    <div>Изменён: { new Date(initialHack.updated_at).toLocaleDateString('ru-RU')}</div>
                }
                <div>Видимость: {initialHack.is_global ? "Опубликован" : "Личный"} </div>
                <div>Рейтинг: {initialHack.rating}</div>
                <div>Айпи последнего обновлявшего: {initialHack.ip_last_updated}</div>
                <div>Привязан к пользователю: {initialHack.user_id}</div>
                <div className="flex gap-1 items-center">
                    <span>Статус:</span>
                    <StatusView status={initialHack.status} />
                </div>
            </div>

            <div>
                <h4>Управление</h4>

                <div>
                    <DeleteButton hackId={initialHack.id} />
                </div>
            </div>
        </div>
    )
}