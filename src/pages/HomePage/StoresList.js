import React from "react";
import {Col, Row} from "react-bootstrap";
import StoreThumbnail from "./StoreThumbnail";


export default function StoresList({stores, storeThumbnails, handleEditStore}){
    if(!stores && storeThumbnails) return false;

    // turn storeThumbnail array into a map
     const homepageThumbnailReducer = (storeThumbnails) => {
        const thumbnailMap = {};
        // eslint-disable-next-line
        for (const storeThumbnailInfo of storeThumbnails) {
            if (storeThumbnailInfo && storeThumbnailInfo.thumbnailUrl) {
                const { storeId } = storeThumbnailInfo;
                thumbnailMap[storeId] = storeThumbnailInfo.thumbnailUrl;
            }
        }
        return thumbnailMap;
    };

    const thumbnailUrlMap = homepageThumbnailReducer(storeThumbnails);

    return(<Row xs={1} sm={2}  md={4}  lg={5} className="storeRecordsList g-4">
        {stores.map((storeInfo, idx) => (
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