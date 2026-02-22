"use client"
import DomainsSelector from "@/app/(auth)/_components/DomainsSelector";
import { Fetch, Get, Post } from "@/libs/Fetch";
import { Domain } from "@/types/Domain";
import { useEffect, useRef, useState } from "react";

export default function DomainSelectorWrapper({
    hackId,
    initialUsedDomains = []
}: {
    hackId: number | null
    initialUsedDomains?: Domain[]
}) {
    const [usedDomains, setUsedDomains] = useState<Domain[]>(initialUsedDomains);
    const [disableDomainSelector, setDisableDomainSelector] = useState<boolean>(false);
    const domainsForMatches = useRef<Domain[] | null>(null);
    const needWaitHackToSave = useRef<boolean>(hackId == null)
    const reverseIndexForTempDomains = useRef<number>(-1); // starts from minus


    const syncDomains = async (domains: {
        id?: number, // id is not nessesary for new domains
        name: string
    }[]) => {
        let boundedIds: number[] = [];
        let syncResponse: any;

        if (hackId === null) {
            // NO HACK.ID, NEED TO SAVE BUFFER
            domains.forEach((currentElement, index) => {
                if (currentElement.id == undefined) {
                    // temp object, until you can't get Id from backend (no hack.id == no save)
                    const tempDomain: Domain = {
                        id: reverseIndexForTempDomains.current--, // <-- key moment
                        alias: null,
                        created_at: new Date().toString(),
                        name: currentElement.name,
                        published: false,
                        updated_at: new Date().toString()
                    }
                    domains[index] = tempDomain;
                }
            });

            boundedIds = domains.map(el => el.id!);


        } else {
            // ALL OK, CAN BE SAVED ON BACKEND
            setDisableDomainSelector(true);
            domains = domains.map(el => (el.id && el.id > 0) ? el : { ...el, id: undefined })

            syncResponse = await Post(`user/hacks/sync-domens/${hackId}`, {
                domains: domains
            });

            boundedIds = syncResponse.bounded;
        }



        const newUsedDomains: Domain[] = [];
        const oldUsedDomains = usedDomains;

        boundedIds.forEach((id: number) => {
            let domain: Domain | undefined = oldUsedDomains.find(dom => dom.id == id);
            if (domain != undefined) {
                newUsedDomains.push(domain);
            } else {
                // search in old usedDomains
                domain = domainsForMatches.current!.find(dom => dom.id == id);
                if (domain != undefined) {
                    newUsedDomains.push(domain);
                } else {
                    // TEMPORALLY BUFFER SAVING:
                    domain = domains.find(dom => dom.id == id) as Domain | undefined;
                    if (domain != undefined) {
                        newUsedDomains.push(domain);
                    }
                }

                // maybe it's a new Domain and it will be in response.new_domains  
            }
        });


        if (syncResponse && Array.isArray(syncResponse.new_domains) && syncResponse.new_domains.length > 0) {
            newUsedDomains.push(...syncResponse.new_domains);
        }


        setUsedDomains(newUsedDomains);

        setDisableDomainSelector(false);
    }


    useEffect(() => {
        if (hackId != null && needWaitHackToSave.current) {
            needWaitHackToSave.current = false;
            syncDomains(usedDomains); // save Domains after creatign Hack
        }
    }, [hackId])


    useEffect(() => {
        if (domainsForMatches.current === null) {
            (async () => {
                let domainsForMathces: Domain[] = [];
                await Get('user/get-used-domains-in-hacks')
                    .then(usedDomainsResponse => {
                        domainsForMathces.push(...usedDomainsResponse);
                    })

                await Fetch('feed/domains', Number(0), ['domains'])
                    .then(publicDomains => {
                        const domainsForMathcesCurrentIds = domainsForMathces.map(el => el.id);
                        domainsForMathces.push(...publicDomains.filter((el: Domain) => !domainsForMathcesCurrentIds.includes(el.id)))
                    })


                domainsForMatches.current = domainsForMathces;
            })()
        }
    }, []);



    return (
        <DomainsSelector
            boundDomain={async (domain: string | Domain) => {
                const domains = [...usedDomains.map((el: Domain) => ({
                    id: el.id,
                    name: el.name
                })), (typeof domain == "string" ? { name: domain } : { id: domain.id, name: domain.name })];
                syncDomains(domains);
            }}
            DomainsForMatches={domainsForMatches.current || []}
            selectedDomains={usedDomains}
            unboundDomain={(id: number) => {
                const newDomains = [...usedDomains.filter((el: Domain) => el.id != id)];
                syncDomains(newDomains);
            }}

            initialMatches={domainsForMatches.current || []}
            disabled={disableDomainSelector}
        />
    )
}