import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { formURL } from '../../utils/urlHelper';


const StoreThumbnail = ({ storeInfo, handleEditStore }) => {
    const { _id, name } = storeInfo;
    const storeId = _id.$oid;
    return (
        <Card style={{ height: '100%' }}>
            <Card.Img variant="top" alt={name} src={formURL(storeInfo?.general?.og_image)} style={{ minHeight: '12em' }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{name}</Card.Title>
                <Button onClick={() => handleEditStore(storeId)} variant="primary" className="mt-auto" style={{ width: '100%' }}>
                    EDIT
                </Button>
            </Card.Body>
        </Card>
    );
};

StoreThumbnail.propTypes = {
    storeInfo: PropTypes.InstanceOf(PropTypes.Object).isRequired,
    handleEditStore: PropTypes.func.isRequired,
};

export default StoreThumbnail;
