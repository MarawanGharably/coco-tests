import React from 'react';
import { css, keyframes } from '@emotion/react';

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
})

const baseCss = css`
    border-style: solid;
    border-width: 16px;
    border-color: #f3f3f3;
    border-top-style: solid;
    border-top-width: 16px;
    border-top-color: #555;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: ${spin} 2s linear infinite;
`;

const SpinLoader = ({ style }) => (
    <div className="full-width flex flex-center">
        <div css={[baseCss, style]}></div>
    </div>
);

SpinLoader.propTypes = {
    style: PropTypes.func,
};

SpinLoader.defaultProps = {
    style: null,
};

export default SpinLoader;
