import React, { useEffect, useState } from 'react';
import StoreLayout from '../../components/layouts/StoreLayout';
import { useRouter } from 'next/router';
import { getStoreInfo } from '../../APImethods';
import Loader from '../../components/loader/Loader';
//import styles from "../../assets/scss/StoreInfoPage.module.scss"


export default function StoreInfoPage() {
    const router = useRouter();
    const {id} =router.query;

    return (
    <StoreLayout fluid={'xl'} title="Store Info">

    </StoreLayout>
    );
}
