"use client"

import Pagination from "@/app/_components/Paginations/Pagination";
import { Get } from "@/libs/Fetch";
import { User } from "@/types/User";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function UsersList() {
    const searchParams = useSearchParams();
    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);


    useEffect(() => {
        const sparams = new URLSearchParams(searchParams);

        Get(`admin/users?${sparams.toString()}`).then(usersPaginationResponse => {
            if (usersPaginationResponse?.data == undefined)
                throw new Error("Не смог получить пользователей");


            setUsers(usersPaginationResponse.data);
            setTotalPages(usersPaginationResponse.last_page);
        })

    }, [searchParams]);


    return (
        <div>
            <div className="flex flex-col w-full gap-3">
                {users.map(user => (
                    <div key={user.id}
                        className="flex flex-row gap-2 border-b dark:border-neutral-800 border-neutral-200 py-2 px-1 hover:border-neutral-500"
                    >
                        <div className="flex-1 flex gap-3">
                            <span className="w-12 text-right">
                                {user.id}
                            </span>

                            <span>
                                {user.email}
                            </span>
                            <span>
                                {user.name}
                            </span>
                        </div>



                        <Link
                            href={`/admin/users/${user.id}`}
                        >
                            <Settings />
                        </Link>
                    </div>
                ))
                }
            </div>

            {totalPages > 1 &&
                <Pagination totalPages={totalPages} />
            }
        </div>
    )
}