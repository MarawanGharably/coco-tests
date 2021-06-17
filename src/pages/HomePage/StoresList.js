import {homepageThumbnailReducer} from "./homepageUtil";
import {Col, Row} from "react-bootstrap";
import StoreThumbnail from "./StoreThumbnail";
import React from "react";

export default function StoresList({storeData, storeThumbnails, handleEditStore}){
    if(!storeData && storeThumbnails) return false;

    const thumbnailUrlMap = homepageThumbnailReducer(storeThumbnails);

    return(<Row xs={1} sm={2}  md={4}  lg={5} className="storeRecordsList g-4">
        {storeData.map((storeInfo, idx) => (
            <Col className='mb-4' key={idx}>
                <StoreThumbnail
                    key={storeInfo._id.$oid}
                    storeInfo={storeInfo}
                    handleEditStore={handleEditStore}
                    thumbnailUrl={thumbnailUrlMap[storeInfo._id.$oid]}
                />
            </Col>
        ))}
    </Row>)
}