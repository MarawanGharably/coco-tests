import React, { useState, useEffect, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
    buttonTextByPathname,
    // routesInOrder,
} from './createStoreNavUtil';

const initialContext = {};

export const FooterNavContext = createContext(initialContext);

const FooterNavigation = ({ children }) => {
    const [currentPath, setCurrentPath] = useState(''); // eslint-disable-line
    const [nextPath, setNextPath] = useState(''); // eslint-disable-line
    const [prevPath, setPrevPath] = useState(''); // eslint-disable-line
    const [text, setText] = useState(''); // eslint-disable-line

    const location = useLocation();

    useEffect(() => {
        setText(buttonTextByPathname[location.pathname]);
    }, [location]);


    return (
        <FooterNavContext.Provider value={{
            currentPath, nextPath, prevPath, text,
        }}
        >
            {children}
        </FooterNavContext.Provider>
    );
};

export default FooterNavigation;
