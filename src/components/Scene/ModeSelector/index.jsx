import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { setModeAction } from '../../../store/actions/productLibraryActions';
import styles from './ModeSelector.module.scss';

const options = [
    { label: 'Product tagging', value: 'product_tagging' },
    { label: 'Product placement', value: 'product_placement' },
    // { label: 'Content Hotspots', value:'content_hotspots'},
];





const ModeSelector = ({ productLibrary }) => {
    const { mode, isEnabled } = productLibrary;
    const dispatch = useDispatch();

    //Display options only when store config data is ready. Prevent flickering.
    if(isEnabled == null) return false;

    //TODO: mode must != label text, use value instead
    const onModeChanged = (e) => {
        const {value} = e.target;
        const option = options.find((item) => item.value == value);
        dispatch(setModeAction(option));
    };

    const selectedOption = options.find((opt) => opt.label == mode);

    return (
        <div className={styles.modeSelector}>
                    {options.map((item, i) => {
                        const isChecked = item.label == selectedOption.label ? true : false;
                        if(!isEnabled && item.value == 'product_placement') return false;

                        return (
                            <Form.Check
                                key={i}
                                name="modeSelector"
                                type="radio"
                                // defaultChecked={i==0 ? true:false}
                                checked={isChecked}
                                inline={true}
                                id={`default-radio-${i}`}
                                label={item.label}
                                value={item.value}
                                onChange={onModeChanged}
                                className={`${styles['item']} ${isChecked ? styles['checkedSelector'] : ''}`}
                            />
                        );
                    })}

        </div>
    );
};

ModeSelector.propTypes = {
    setModeAction: PropTypes.func.isRequired,
    productLibrary: PropTypes.shape({
        mode: PropTypes.string,
        isEnabled: PropTypes.bool,
    }).isRequired,
};




const mapStateToProps = ({ productLibrary }) => ({
    productLibrary
});

export default connect(mapStateToProps, { setModeAction })(ModeSelector);
