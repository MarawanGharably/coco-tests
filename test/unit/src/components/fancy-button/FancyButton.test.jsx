import '@testing-library/jest-dom/extend-expect';
/** @jsx jsx */
import serializer from 'jest-emotion';
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';
import FancyButton from '../../../../../src/components/fancy-button/FancyButton';

expect.addSnapshotSerializer(serializer);


const testText = 'Successful Click!';

const SpecialTestButton = () => {
    const [text, setText] = useState('text');

    const onClick = () => {
        setText(testText);
    };

    return (<FancyButton text={text} onClick={onClick} />);
};

describe('Fancy Button', () => {
    // Snapshot Unit test of Fancy Button
    test('Button Renders Correctly', () => {
        const button = render(<FancyButton buttonStyle={css`background-color: green;`} text="This is a button" />);
        expect(button).toMatchSnapshot();
    });
    // Unit test of onclick functionality, uses wrapper test component
    test('Text changes on click', () => {
        let component;

        act(() => {
            component = render(<SpecialTestButton />);
        });
        const { getByLabelText } = component;

        act(() => {
            fireEvent.click(getByLabelText('fancy button'));
        });

        expect(getByLabelText('fancy button')).toHaveTextContent(testText);
    });
});
