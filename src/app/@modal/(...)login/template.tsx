'use client'

import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react';
import ModalWrapper from './_components/ModalWrapper';
import ContextUser from '@/context/ContextUser';

export default function Template({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const [showModal, setShowModal] = useState<boolean>(true);
    const { stateUser } = useContext(ContextUser);

    useEffect(() => {
        if (
            pathname.includes('/login')
        ) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }

    }, [pathname]);


    if (stateUser.authentication_status == "authorized" || showModal === false)
        return null;


    return (
        <ModalWrapper>
            <div className='px-1'>
                {children}
            </div>

        </ModalWrapper>
    )
}