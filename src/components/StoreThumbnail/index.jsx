import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { formURL } from '../../utils/urlHelper';
import Link from 'next/link';
import config from '../../config';
import styles from './storeThumbnail.module.scss';

const StoreThumbnail = ({ data }) => {
    const { _id, name, general, baseUrl } = data;
    const storeId = _id.$oid;
    const image = formURL(general?.og_image) || `${config['CDN_HOST']}/noImage.png`;

    return (
        <Card className={styles['item']}>

            {/* Card Image */}
            <div className={styles.image} style={{ backgroundImage: `url(${image})` }}>
                <figcaption className={`${styles.figcaption}`}>
                    <Link href={`${baseUrl}/?id=${storeId}`}><a>
                        <Button  variant="primary" >
                            Edit Store
                        </Button>
                    </a>
                    </Link>

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
