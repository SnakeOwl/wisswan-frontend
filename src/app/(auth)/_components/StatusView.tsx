import { BadgeQuestionMark } from "lucide-react";

export default function StatusView({ 
    status,
    className = ""
}: { 
    status: number 
    className?: string
}) {
    /**
     * Backend has file where these statuses described: app/Models/Traits/UsesStatuses.php
     */
    let text = "Статус";
    let baseClasses = "";
    let hint = null;

    switch(status){
        case 0:
        case 100: 
            text = "Приватный";
            baseClasses = "text-emerald-500"
            break;

        case 110: 
            baseClasses = "text-sky-500"
            text = "На проверке";
            break;

        case 200: 
            baseClasses = "text-emerald-500"
            text = "Проверен";
            break;

        case 201: // checked but private
            text = "Скрыт";
            baseClasses = "text-emerald-500"
            break;

        case 250:
            text = "Ограничен";
            baseClasses = "text-amber-500"
            break;

        case 400:
            text = "Ограничен";
            baseClasses = "text-fuchsia-500"
            hint = (
                <div>
                    Ограничен из-за нарушения правил пользования платформой
                </div>
            )
            break;

        case 410:
            text = "Ограничен";
            baseClasses = "text-fuchsia-500"
            hint = (
                <div>
                    Ограничен по указу правоохранительных органов
                </div>
            )
            break;
    }


    return (
        <div className={`flex text-sm gap-2 ${baseClasses} ${className}`}>
            {text} 

            {hint && 
                <div className="group relative">
                    <BadgeQuestionMark />

                    <div className="hidden group-hover:block
                        absolute bottom-full left-1/2 transform -translate-x-1/2 w-[250px]
                        mb-2 px-3 py-1 text-sm
                        bg-white dark:bg-neutral-800 dark:text-neutral-300 rounded 
                        border border-neutral-300 dark:border-neutral-800
                        ">
                        {hint}
                    </div>
                </div>
            }
        </div>
    )
}