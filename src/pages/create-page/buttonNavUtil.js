export const buttonTextByPathname = Object.freeze({
    '/profile': 'SAVE',
    '/create/design/products': 'NEXT',
    '/create/design/layout': 'NEXT',
    '/create/design/style': 'NEXT',
    '/create/design/materials': 'NEXT',
    '/create/brand-elements': 'NEXT',
    '/create/product-data': 'NEXT',
    '/create/product-placement': 'NEXT',
    '/create/content-interactions': 'NEXT',
    '/create/submit': 'SUBMIT',
});

export const routesInOrder = [
    '/profile',
    '/create/design/products',
    '/create/design/layout',
    '/create/design/style',
    '/create/design/materials',
    '/create/brand-elements',
    '/create/product-data',
    '/create/product-placement',
    '/create/content-interactions',
    '/create/submit',
];


export const findNextPagePath = (currentPath, routes) => {
    // if (!currentPath.includes('/profile') || !currentPath.includes('/create')) { return null; }
    // if (currentPath === '/') { return null; }
    let nextPageIndex = 0;
    // console.log(currentPath);
    for (let i = 0; i < routes.length; i + 1) {
        if (currentPath === routes[i]) {
            nextPageIndex = i + 1;
        }
    }
    // if (!routes[nextPageIndex]) return;
    return routes[nextPageIndex];
};

export const findPrevPagePath = (currentPath, routes) => {
    let nextPageIndex = 0;
    for (let i = 0; i < routes.length; i + 1) {
        if (currentPath === routes[i]) {
            nextPageIndex = i - 1;
        }
    }
    return routes[nextPageIndex];
};

// eslint-disable-next-line
export const findLastVisitedPageByStoreId = (storeId) => {
    // having persistence on the last page visited by storeId (?)
};

// eslint-disable-next-line
export const findNextUnvisitedPageByStoreId = (storeId) => {
    // having persistence on the last page visited via storeId (?)
};
