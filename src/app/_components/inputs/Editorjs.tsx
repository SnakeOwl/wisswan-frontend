import dynamic from 'next/dynamic';
import { useEffect, useId, useRef } from 'react';
import type EditorJS from '@editorjs/editorjs';
import { I18nDictionary } from '@editorjs/editorjs';
import clsx from 'clsx';


export interface IEditorjs {
    className?: string
    hideToolbar?: boolean
    onBlur?: (content: string) => void
    savedData?: string // JSON in fact
}

/**
 * @type {I18nDictionary}
 */
export const editorjs_i18n_messages = {
    "ui": {
        "blockTunes": {
            "add": {
                "Click to tune": "Нажмите, чтобы настроить",
                "or drag to move": "или перетащите"
            },
            "toggler": {
                "Click to tune": "Нажмите, чтобы настроить",
                "or drag to move": "или перетащите"
            },
        },
        // ... more translations for core UI
        "toolbar": {
            "toolbox": {
                "Add": "Добавить",
            }
        },
    },

    toolNames: {
        "Text": "Параграф",
        "Heading": "Заголовок",
        "Ordered List": "Нумерованный список",
        "Unordered List": "Маркированный список",
        "Warning": "Примечание",
        "Checklist": "Чеклист",
        "Quote": "Цитата",
        "Code": "Код",
        "Delimiter": "Разделитель",
        "Raw HTML": "HTML-фрагмент",
        "Table": "Таблица",
        "Link": "Ссылка",
        "Marker": "Маркер",
        "Bold": "Полужирный",
        "Italic": "Курсив",
        "InlineCode": "Моноширинный",
        "Image": "Картинка",
    },
    "tools": {
        // "warning": { // Example for the 'Warning' tool
        //     "Title": "Название",
        //     "Message": "Сообщение",
        // },
        "convertTo": {
            "Convert to": "Конвертировать в"
        },
    },
    "blockTunes": {
        "delete": {
            "Delete": "Удалить",
        },
        "moveUp": {
            "Move up": "Переместить вверх"
        },
        "moveDown": {
            "Move down": "Переместить вниз"
        },
    },
} satisfies I18nDictionary;



const Editorjs = ({
    className = "",
    hideToolbar = false,
    onBlur,
    savedData
}: IEditorjs) => {
    const editorRef = useRef<EditorJS | null>(null);
    const holderId = useRef(`editor-${Date.now()}`);
    const containerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (typeof window === 'undefined')
            return;


        const onFocusOut = () => {
            if (!editorRef.current || !onBlur)
                return;


            editorRef.current.save().then((outputData: Object) => {
                onBlur(JSON.stringify(outputData));
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }


        import('@editorjs/editorjs').then(({ default: EditorJS }) => {
            if (!editorRef.current) {
                editorRef.current = new EditorJS({
                    holder: holderId.current,
                    tools: {
                    },
                    i18n: {
                        messages: editorjs_i18n_messages
                    },
                    data: savedData ? JSON.parse(savedData) : undefined,
                });

                if (containerRef.current) {
                    if (onBlur) {
                        containerRef.current.addEventListener("focusout", onFocusOut)
                    }
                }
            }
        });


        return () => {
            if (editorRef.current) {
                if (containerRef.current) {
                    if (onBlur) {
                        containerRef.current.removeEventListener("focusout", onFocusOut)
                    }
                }

                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);


    return (
        <div
            ref={containerRef}
            id={holderId.current}
            className={clsx(className, {
                'hideToolbar': hideToolbar
            })}

        />
    );
};

// dinamical export/import
export default dynamic(() => Promise.resolve(Editorjs), {
    ssr: false,
});