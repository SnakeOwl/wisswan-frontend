export type Hack = {
    id: number
    created_at: string | null
    updated_at: string | null
    domen: string | null
    subdomen: string | null
    group: string | null
    is_global: boolean // global Hack - show in public part of the site
    title: string | null
    value: string | null
    rating: number
    ip_last_updated: string | null
    user_id: number | null
    shared_link: string | null
    status: number // Status in fact
}