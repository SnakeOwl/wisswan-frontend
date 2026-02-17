import Button from "../buttons/Button"

type MultiSwitcherElement = {
    title: string,
    code: string | number // must be unique
}


export default function MultiSwitcher({
    classnameElement = '',
    classnameWrapper = '',
    elements,
    activeElementCode,
    onChange
}: {
    classnameElement?: string,
    classnameWrapper?: string,
    elements: MultiSwitcherElement[],
    activeElementCode: string | number
    onChange: (newActiveCode: string | number) => void
}) {
    return (
        <div className={`flex ${classnameWrapper}`}>
            {elements.map((el) => (
                <Button key={el.code}
                    onClick={() => onChange(el.code)}
                    className={`first:rounded-l-lg px-2 py-1 last:rounded-r-lg ${classnameElement}`}
                    disabled={activeElementCode == el.code}
                >
                    {el.title}
                </Button>
            ))
            }
        </div>
    )
}