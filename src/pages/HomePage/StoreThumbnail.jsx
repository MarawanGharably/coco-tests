import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';


const StoreThumbnail = ({ storeInfo, handleEditStore, thumbnailUrl }) => {
    const { _id, name } = storeInfo;
    const storeId = _id.$oid;

    return (
        <Card style={{ height: '100%' }}>
            <Card.Img variant="top" alt={name} src={thumbnailUrl} style={{ minHeight: '18em' }} />
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
    thumbnailUrl: PropTypes.string.isRequired,
};

export default StoreThumbnail;
