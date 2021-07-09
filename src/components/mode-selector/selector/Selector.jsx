import React from 'react';
import { Radio } from '../../FormComponents'
import { PRODUCT_TAGGING, PRODUCT_PLACEMENT } from '../../../store/types/productLibrary';
import './Selector.scss';

const Selector = () => {
    return (
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
    );
};

export default Selector;