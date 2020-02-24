import React, {
    useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { SketchPicker } from 'react-color';
import Input from '../input/Input';

const ColorSelector = ({ labelTitle, labelId }) => {
    const [selectedColor, setSelectedColor] = useState('#000');
    const [showingSelector, setShowingSelector] = useState(false);
    const colorSelectorRef = useRef(null);

    const handlePicker = (color) => {
        setSelectedColor(color.hex);
    };

    const handleChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const handleClickOutside = useCallback((e) => {
        if (!colorSelectorRef.current.contains(e.target)) {
            setShowingSelector(false);
            document.removeEventListener('click', handleClickOutside);
        }
    }, [colorSelectorRef]);

    const togglePicker = () => {
        if (!showingSelector) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        setShowingSelector(!showingSelector);
    };


    const previewColor = css`
        background-color: ${selectedColor};
    `;

    // Immediately returns cleanUp function to remove event listener on unmount
    useEffect(() => () => { document.removeEventListener('click', handleClickOutside); }, [handleClickOutside]);

    const decorator = <button type="button" aria-label="Toggle color picker" onClick={togglePicker} css={previewColor} className="color-selector-preview" />;

    return (
        <>
            <Input
                labelTitle={labelTitle}
                labelId={labelId}
                value={selectedColor}
                handleChange={handleChange}
                decoratorComponent={decorator}
            />
            {showingSelector && (
                <div className="color-picker-container" ref={colorSelectorRef}>
                    <SketchPicker
                        width="140px"
                        color={selectedColor}
                        onChange={handlePicker}
                        presetColors={[]}
                    />
                </div>
            )}
        </>
    );
};

ColorSelector.propTypes = {
    labelTitle: PropTypes.string.isRequired,
    labelId: PropTypes.string.isRequired,
};

export default ColorSelector;
