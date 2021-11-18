import React, { useEffect } from 'react';
import StoreLayout from '../../components/layouts/StoreLayout';
import { useRouter } from 'next/router';


export default function Icons() {
    const router = useRouter();
    const {id} =router.query;


    return (
    <StoreLayout fluid={'xl'} title="Icons">

    </StoreLayout>);
}
