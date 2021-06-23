import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Checkbox from '../../../../../FormComponents/Checkbox';


import {
    Container,
    Image,
} from './styles';

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

const mapStateToProps = (state) => {
    const { isLoading } = state.productLibrary;

    return { isLoading };
};

export default connect(
    mapStateToProps,
)(ImageItem);
