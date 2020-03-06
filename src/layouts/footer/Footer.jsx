import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import FancyButton from '../../components/fancy-button/FancyButton';
import { buttonTextByPathname, routesInOrder } from '../../pages/create-page/createStoreNavUtil';

const Footer = () => {
    const location = useLocation();
    const history = useHistory();
    const text = buttonTextByPathname[location.pathname];

    const goToNextPage = () => {
        const currentPageIndex = routesInOrder.indexOf(location.pathname);
        // if it's not yet mapped, the button has no functionality
        if (currentPageIndex === -1) { return; }
        const nextPagePath = routesInOrder[currentPageIndex + 1];

        history.push(nextPagePath);
    };

    return (
        <footer className="footer-container full-width flex flex-center">
            <div className="footer-button-container">
                {text && (
                    <FancyButton
                        onClick={goToNextPage}
                        text={text}
                    />
                )}
            </div>
        </footer>
    );
};
export default Footer;
