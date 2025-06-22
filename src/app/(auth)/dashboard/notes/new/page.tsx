import Form from "../_components/Form";

export default async function Page() {
    return (
        <main>
            <Form defaultData={{
                name: ""
            }} />
        </main>
    )
}