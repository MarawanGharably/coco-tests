import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import styles from './ImageItem.module.scss';

const ImageItem = ({ isLoading, id, src, updateImage }) => {
    const [hasBackground, setBackground] = useState(false);

    const handleBackgroundChange = (e) => {
        const { checked } = e.target;

        setBackground(checked);
        updateImage({
            id,
            remove_background: checked,
        });
    };

    return (
        <li className={styles['upload-dialog-item-container']} >
            <img className={styles['upload-dialog-item-image']}  src={src} alt="Product" />
            <Form.Check
                inline
                className={styles['upload-dialog-item-checkbox']}
                type="checkbox"
                id={id}
                label="Remove Background"
                value={hasBackground}
                disabled={isLoading}
                onChange={handleBackgroundChange}
            />
        </li>
    );
};

ImageItem.propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    updateImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { isLoading } = state.productLibrary;

    return { isLoading };
};

export default connect(
    mapStateToProps,
)(ImageItem);
