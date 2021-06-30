import PropTypes from 'prop-types';
import { withKnobs, text } from '@storybook/addon-knobs';

// in this case the Button component is not rendered but will be used within stories
const Button = ({ textProp }) => (
    <button type="button">
        <span>{textProp}</span>
    </button>
);

Button.propTypes = {
    textProp: PropTypes.string,
};

Button.defaultProps = {
    textProp: '',
};

export default {
    title: 'Buttons',
    component: Button,
    decorators: [withKnobs],
};


// stories: each function is a state (aka 'story') - export when you want to render to storybook and to pass props or styles
export const SubmitButton = () => {
    const textProp = text('label', 'test');

    return (
        <Button textProp={textProp} />
    );
};
