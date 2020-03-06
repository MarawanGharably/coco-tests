import React, { useState, useEffect, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
    buttonTextByPathname,
    // routesInOrder,
    // findNextPagePath,
    // findPrevPagePath,
} from './buttonNavUtil';

const initialContext = {};

export const FooterNavContext = createContext(initialContext);

const FooterNavigation = ({ children }) => {
    const [currentPath, setCurrentPath] = useState(''); // eslint-disable-line
    const [nextPath, setNextPath] = useState(''); // eslint-disable-line
    const [prevPath, setPrevPath] = useState(''); // eslint-disable-line
    const [text, setText] = useState(''); // eslint-disable-line

    const location = useLocation();
    // const nextPagePath = findNextPagePath(location.pathname, routesInOrder);
    // const prevPagePath = findPrevPagePath(location.pathname, routesInOrder);

    useEffect(() => {
        // setCurrentPath(location.pathname);
        // setNextPath(nextPagePath);
        // setPrevPath(prevPagePath);
        setText(buttonTextByPathname[location.pathname]);
    }, [location]);

    // console.log(location);
    // console.log(location.pathname);
    // console.log(nextPagePath);
    // console.log(location);
    // console.log(currentPath);
    // console.log(nextPath);
    // console.log(prevPath);

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
