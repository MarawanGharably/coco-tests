import React from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/react';

const closeIconTextStyle = css`
    font-size: 24px;
    color: white;
`;

const Modal = ({ onClose, children }) => {
    const overlayStyle = css`
        position: absolute;
    `;

    return ReactDOM.createPortal(
        <div id="modal-position-wrapper" className="full-width full-height flex flex-center">
            <button
                id="modal-overlay"
                css={overlayStyle}
                className="full-height full-width"
                onClick={onClose}
                onKeyDown={(e) => {
                    if (e.target.key === '27') {
                        onClose();
                    }
                }}
                type="button"
                aria-label="modal overlay"
            />
            <div id="modal-content-container" className="flex flex-column">
                <button type="button" aria-label="modal close icon" id="modal-close-icon" className="flex flex-center" onClick={onClose}>
                    <span css={closeIconTextStyle}>x</span>
                </button>
                {children}
            </div>
        </div>, document.getElementById('obsessvr-webstore-react-embed-root'),
    );
};

export default Modal;
