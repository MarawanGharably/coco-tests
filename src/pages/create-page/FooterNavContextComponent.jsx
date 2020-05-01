import React, { useState, useEffect, createContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
    buttonTextByPathname,
    routesInOrder,
} from './createStoreNavUtil';

const initialState = {};

export const FooterNavContext = createContext(initialState);

const FooterNavContextComponent = ({ children }) => {
    const [currentPath, setCurrentPath] = useState(''); // eslint-disable-line
    const [nextPath, setNextPath] = useState(''); // eslint-disable-line
    const [prevPath, setPrevPath] = useState(''); // eslint-disable-line
    const [text, setText] = useState('');

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        setText(buttonTextByPathname[location.pathname]);
        setCurrentPath(location.pathname);
    }, [location]);

    const goToNextPage = () => {
        const currentPageIndex = routesInOrder.indexOf(location.pathname);
        if (currentPageIndex === -1) { return; }
        const nextPagePath = routesInOrder[currentPageIndex + 1];
        history.push(nextPagePath);
    };

    return (
        <FooterNavContext.Provider value={{
            currentPath, text, goToNextPage,
        }}
        >
            {children}
        </FooterNavContext.Provider>
    );
};

export default FooterNavContextComponent;
