import React from 'react';
import { Col, Row } from 'react-bootstrap';
import StoreThumbnail from './StoreThumbnail';


export default function StoresList({ stores }) {
    if(!stores) return false;

    // turn storeThumbnail array into a map
    return(
        <Row xs={1} sm={2} md={4} lg={5} className="storeRecordsList g-4">
            {stores.map((storeInfo, idx) => (
                <Col className="mb-4" key={idx}>
                    <StoreThumbnail
                        key={storeInfo._id.$oid}
                        storeInfo={storeInfo}
                    />
                </Col>
            ))}
        </Row>
    );
}
