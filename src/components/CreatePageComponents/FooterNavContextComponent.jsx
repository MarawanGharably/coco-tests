import React, { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router'


const buttonTextByPathname = Object.freeze({
    '/create/product-placement': 'PUBLISH',
});

export const routesInOrder = [
    '/create/product-placement',
    '/',
];

const initialState = {};
export const FooterNavContext = createContext(initialState);

const FooterNavContextComponent = ({ children }) => {
    const [currentPath, setCurrentPath] = useState(''); // eslint-disable-line
    const [text, setText] = useState('');
    const router = useRouter();


    useEffect(() => {
        setText(buttonTextByPathname[router.pathname]);
        setCurrentPath(router.pathname);
    }, [router]);

    const goToNextPage = () => {
        const currentPageIndex = routesInOrder.indexOf(router.pathname);
        if (currentPageIndex === -1) { return; }
        const nextPagePath = routesInOrder[currentPageIndex + 1];
        router.push(nextPagePath);
    };

    return (
        <FooterNavContext.Provider value={{currentPath, text, goToNextPage}}>
            {children}
        </FooterNavContext.Provider>
    );
};

export default FooterNavContextComponent;
