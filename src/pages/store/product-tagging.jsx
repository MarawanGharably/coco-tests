import React from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';
import StoreLayout from '../../components/layouts/StoreLayout';
import SceneEditor from '../../components/SceneEditor';


export default function ProductTaggingPage(){
    const router = useRouter();
    const { id: storeId } = router.query;

    return (
        <StoreLayout title="Product Tagging" subTitle="Click anywhere on the store to add a hotspot.">
            <SceneEditor storeId={storeId} mode='product_tagging'/>
        </StoreLayout>
    );
}


