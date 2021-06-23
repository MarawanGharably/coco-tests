import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setMode as setModeAction } from '../../store/actions/productLibraryActions';
import Selector from './selector/Selector';
import RadioGroup, { RadioSelectionContext } from '../FormComponents/RadioGroup';


import { PRODUCT_TAGGING, PRODUCT_PLACEMENT } from '../../store/types/productLibrary';

const title = {
    [PRODUCT_TAGGING]: 'Click on 360 image to place hotspot and enter SKU ID',
    [PRODUCT_PLACEMENT]: 'Select the “Products” tab, add/delete products and drag them inside the 360 image to apply on the scene',
};

const ModeSelector = ({ setMode, productLibrary }) => {
    const { optionSelected } = useContext(RadioSelectionContext);
    const { mode, isEnabled } = productLibrary;

    useEffect(() => {
        if (optionSelected) {
            setMode(optionSelected);
        }
    }, [optionSelected, setMode]);

    return (
        <>
            {isEnabled && <Selector />}

            <div className="title">{title[mode]}</div>
        </>
    );
};

ModeSelector.propTypes = {
    setMode: PropTypes.func.isRequired,
    productLibrary: PropTypes.shape({
        mode: PropTypes.string,
        isEnabled: PropTypes.bool,
    }).isRequired,
};

const withRadioGroup = (Component) => (props) => (
    <div className="mode-selector">
        <RadioGroup>
            <Component {...props /* eslint-disable-line */} />
        </RadioGroup>
    </div>
);

const ModeWithRadio = withRadioGroup(ModeSelector);

const mapStateToProps = ({ productLibrary }) => {
    return { productLibrary };
};

export default connect(mapStateToProps, { setMode: setModeAction })(ModeWithRadio);
