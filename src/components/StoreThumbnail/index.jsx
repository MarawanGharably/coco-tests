import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { formURL } from '../../utils/urlHelper';
import { setSelectedStoreID } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import config from '../../config';
import styles from './storeThumbnail.module.scss';

const StoreThumbnail = ({ data }) => {
    const { _id, name, general } = data;
    const dispatch = useDispatch();
    const storeId = _id.$oid;
    const router = useRouter();

    const handleEditStore = (storeId) => {
        dispatch(setSelectedStoreID(storeId));
        router.push('/create');
    };

    const image = formURL(general?.og_image) || `${config['CDN_HOST']}/noImage.png`;

    return (
        <Card className={styles['item']}>

            {/* Card Image */}
            <div className={styles.image} style={{ backgroundImage: `url(${image})` }}>
                <figcaption className={`${styles.figcaption}`}>
                    <Button onClick={() => handleEditStore(storeId)} variant="primary" className="" style={{}}>
                        Edit Store
                    </Button>
                </figcaption>
            </div>

            <Card.Body className={`${styles['card-body']} d-flex flex-column`}>
                <Card.Title className={`${styles.title} text-center`}>{name}</Card.Title>
            </Card.Body>
        </Card>
    );
};

StoreThumbnail.propTypes = {
    data: PropTypes.InstanceOf(PropTypes.Object).isRequired,
    handleEditStore: PropTypes.func.isRequired,
};

export default StoreThumbnail;
