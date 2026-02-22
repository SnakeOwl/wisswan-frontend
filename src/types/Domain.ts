import { Hack } from "./Hack"

export type Domain = {
    id: number
    created_at: string | null
    updated_at: string | null
    name: string
    alias: string | null
    published: boolean // used on public hart of the site

    hacks?: Hack[]
}