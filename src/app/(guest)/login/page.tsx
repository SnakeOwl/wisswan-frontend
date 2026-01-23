import LoginFormWrapper from "./_components/LoginFormWrapper";

export default async function Page() {
    return (
        <main className="flex-1 flex flex-col items-center justify-around">
            <div className="w-full lg:w-[400px] flex flex-col gap-4">
                <h1>Вход</h1>

                <LoginFormWrapper />

                <p className="text-sm">
                    Отправляя форму, вы&nbsp;даёте своё согласие на&nbsp;обработку ваших персональных данных.
                </p>
            </div>
        </main>
    )
}