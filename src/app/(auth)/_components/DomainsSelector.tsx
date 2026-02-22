"use client"

import Button from "@/app/_components/buttons/Button"
import Input from "@/app/_components/inputs/Input"
import { Domain } from "@/types/Domain"
import { Check, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"


export default function DomainsSelector({
    selectedDomains,
    DomainsForMatches,
    unboundDomain,
    boundDomain,
    initialMatches,
    disabled = false
}: {
    selectedDomains: Domain[],
    DomainsForMatches: Domain[],
    unboundDomain: (id: number) => void,
    boundDomain: (newNameOrId: string | Domain) => void
    initialMatches: Domain[]
    disabled?: boolean
}) {
    const [inputText, setInputText] = useState<string>('');
    const [showCheck, setShowCheck] = useState<boolean>(false);
    const [matches, setMatches] = useState<Domain[]>(initialMatches);
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (inputText.length > 0) {
            setShowCheck(true);
        } else {
            setShowCheck(false);
        }
    }, [inputText]);


    useEffect(() => {
        let matches = [...initialMatches];

        // remove selected Domains from pull
        const selectedDomainsIds = selectedDomains.map(el => el.id);
        matches = matches.filter(el => !selectedDomainsIds.includes(el.id))

        setMatches(matches);
    }, [initialMatches, selectedDomains]);


    const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value || '';

        setInputText(val);

        if (val.length > 0) {
            const matchedDomains = DomainsForMatches.filter(domain => domain.name.toLowerCase().includes(val));
            setMatches(matchedDomains);
        } else {
            setMatches(initialMatches);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            boundDomain(inputText);
            setInputText('');
        }
    };



    return (
        <div>
            <h3>Область использования</h3>

            <div className="flex flex-wrap items-center gap-2 border border-neutral-200 dark:border-neutral-800 cursor-pointer relative px-1"
                onClick={() => inputRef.current?.focus()}
            >
                {selectedDomains.map((domain: Domain) => (
                    <Button key={domain.id}
                        className="flex gap-1 text-sm items-center pl-2 py-1 rounded-lg group hover:!border-red-600 hover:text-red-600"
                        onClick={() => unboundDomain(domain.id)}
                        disabled={disabled}
                        type="button"
                    >
                        <span>{domain.name}</span>
                        <X className=" h-4 group-hover:text-red-600 " />
                    </Button>
                ))
                }


                <div className="flex gap-2 items-center px-1">
                    <Input
                        type="text"
                        value={inputText}
                        onChange={onChangeInputText}
                        onKeyDown={handleKeyDown}
                        className="p-2 border-x-0 border-t-0 border-b "
                        ref={inputRef}
                        disabled={disabled}
                    />

                    {showCheck &&
                        <Check className="cursor-pointer hover:text-emerald-500"
                            onClick={() => {
                                boundDomain(inputText);
                                setInputText('');
                            }}
                        />
                    }
                </div>
            </div>


            {matches.length > 0 &&
                <div className="min-h-[100px]">
                    <h4>Используемые области:</h4>

                    <div className="flex flex-wrap gap-2">
                        {matches.map((match: Domain, index) => (
                            <Button key={match.id}
                                className="px-2 py-1 text-sm rounded-lg hover:!border-emerald-600 hover:text-emerald-600"
                                onClick={() => boundDomain(match)}
                                disabled={disabled}
                                type="button"
                            >
                                {match.name}
                            </Button>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}