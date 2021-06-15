import React, { useContext, useEffect } from 'react';
import RadioGroup, { RadioSelectionContext } from '../radio/RadioGroup';
import { useProductLibrary } from '../product-library/store/ProductLibraryStore';
import Radio from '../radio/Radio';

import {
    SET_MODE,
} from '../product-library/store/productLibraryActionEnums';

import {
    PRODUCT_TAGGING,
    PRODUCT_PLACEMENT,
} from './modeOptions';

const title = {
    [PRODUCT_TAGGING]: 'Click on 360 image to place hotspot and enter SKU ID',
    [PRODUCT_PLACEMENT]: 'Select the “Products” tab, add/delete products and drag them inside the 360 image to apply on the scene',
};

const ModeSelector = () => {
    const { optionSelected } = useContext(RadioSelectionContext);
    const [{ mode }, dispatch] = useProductLibrary();

    useEffect(() => {
        dispatch({
            type: SET_MODE,
            payload: optionSelected,
        });
    }, [optionSelected, dispatch]);

    return (
        <>
            <div className="radio-container">
                <Radio
                    formField="mode"
                    value={PRODUCT_TAGGING}
                    isLabelShowing
                    isDefaultSelected
                />
                <Radio
                    formField="mode"
                    value={PRODUCT_PLACEMENT}
                    isLabelShowing
                />
            </div>

            <div className="title">{title[mode]}</div>
        </>
    );
};

const withRadioGroup = (Component) => () => (
    <div className="mode-selector">
        <RadioGroup>
            <Component />
        </RadioGroup>
    </div>
);

const ModeWithRadio = withRadioGroup(ModeSelector);

export default ModeWithRadio;