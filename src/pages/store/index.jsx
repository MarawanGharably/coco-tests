import React, { useEffect } from 'react';
import StoreLayout from '../../components/layouts/StoreLayout';
import { useRouter } from 'next/router';


export default function StorePage() {
    const router = useRouter();
    const {id} =router.query;

    useEffect(()=>{
        // router.push(`/store/storeinfo/?id=${id}`);
    });


    return (
    <StoreLayout fluid={'xl'} title="General">

    </StoreLayout>);
}
