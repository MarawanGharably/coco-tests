import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withKnobs, text } from '@storybook/addon-knobs';
import { SketchPicker } from 'react-color'
import Input from '../../src/components/FormComponents/Input';


const ColorSelector = ({ labelId, labelTitle }) => {
    const [selectedColor, setSelectedColor] = useState('#000');
    const [showingSelector, setShowingSelector] = useState(false);
    const colorSelectorRef = useRef(null);

    const handlePicker = (color) => {
        setSelectedColor(color.hex);
    }

    const handleChange = (e) => {
        setSelectedColor(e.target.value)
    }

    const togglePicker = (e) => {
        document.addEventListener('click', handleClickOutside)
        setShowingSelector(!showingSelector);
    }

    const handleClickOutside = (e) => {
        if (!colorSelectorRef.current.contains(e.target)) {
            setShowingSelector(false);
            document.removeEventListener('click', handleClickOutside)
        }
    }

    const previewColor = {
        backgroundColor: selectedColor,
    };

    const decorator = <button type="button" aria-label="Toggle color picker" onClick={togglePicker} style={previewColor} className="color-selector-preview" />;

return (
    <div>
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
    </div>
);
}

export default {
    title: 'ColorSelector',
    component: ColorSelector,
    decorators: [withKnobs],
};

// stories: each function is a state (aka 'story') - export when you want to render to storybook and to pass props or styles
export const ColorSelectorTest = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ margin: '0 50px 0 0' }}>
            <ColorSelector labelId='primary-color' labelTitle='primary'/>
            </div>
            <ColorSelector labelId='secondary-color' labelTitle='secondary'/>
        </div>
    );
};
