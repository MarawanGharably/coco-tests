import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../image-item/ImageItem';

import {
    Container,
} from './styles';

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
        <Container>
            {images.map((image) => (
                <ImageItem
                    key={image.id}
                    id={image.id}
                    src={image.content}
                    updateImage={updateImage}
                />
            ))}
        </Container>
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
