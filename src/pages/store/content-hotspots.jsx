import React from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';
import StoreLayout from '../../components/layouts/StoreLayout';
import SceneEditor from '../../components/SceneEditor';


export default function ContentHotspotsPage(){
    const router = useRouter();
    const { id: storeId } = router.query;

    return (
        <StoreLayout >
            <Row style={{ color: '#fff' }}>
                <Col sm={12} md={6}>
                    <h1 style={{ lineHeight: '0.7' }}>Hotspots</h1>
                    <h6 style={{ fontSize: '14px', fontWeight: '300', color: '#efefef' }}>
                        Click anywhere on the scene image to add a hotspot. <br /> Your changes will be saved immediately
                    </h6>
                </Col>
            </Row>
            <SceneEditor storeId={storeId} mode='content_hotspots'/>
        </StoreLayout>
    );
}