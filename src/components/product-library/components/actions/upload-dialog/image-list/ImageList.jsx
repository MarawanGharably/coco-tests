import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../image-item/ImageItem';
import styles from './ImageList.module.scss';

const ImageList = ({ images, setImages }) => {
    const updateImage = (image) => {
        const index = images.findIndex(({ id }) => id === image.id);
        const newImages = [...images];

        newImages[index] = {
            ...newImages[index],
            ...image,
        };

        setImages(newImages);
    };

    return (
        <div className={styles['upload-dialog-list']}>
            {images.map((image) => (
                <ImageItem
                    key={image.id}
                    id={image.id}
                    src={image.content}
                    updateImage={updateImage}
                />
            ))}
        </div>
    );
};

ImageList.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string,
        filename: PropTypes.string,
    })).isRequired,
    setImages: PropTypes.func.isRequired,
};

export default ImageList;
