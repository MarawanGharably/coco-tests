import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../../../../checkbox/Checkbox';
import { useProductLibrary } from '../../../../store/ProductLibraryStore';

import {
    Container,
    Image,
} from './styles';

const ImageItem = ({ id, src, updateImage }) => {
    const [{ isLoading }] = useProductLibrary();
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
        <Container>
            <Image src={src} />
            <Checkbox
                name={id}
                label="Remove Background"
                value={hasBackground}
                disabled={isLoading}
                handleChange={handleBackgroundChange}
            />
        </Container>
    );
};

ImageItem.propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    updateImage: PropTypes.func.isRequired,
};

export default ImageItem;
