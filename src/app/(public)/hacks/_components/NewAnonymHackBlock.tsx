
import HackForm from "@/app/(auth)/dashboard/hacks/_components/HackForm";

export default function NewAnonymHackBlock() {
    return (
        <div>
            <div>
                <h3>Что-то забыли? Предложите свой хак:</h3>
                <HackForm showToastAfterSave />
            </div>
        </div>
    )
}