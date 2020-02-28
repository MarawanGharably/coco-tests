import React from 'react';

// PageItem is a wrapper for a component:

// <PageRow>
//     <PageItem>
//         <Component />
//     </PageItem>
//     <PageItem>
//         <Component />
//     </PageItem>
// </PageRow>


// eslint-disable-next-line
const PageItem = ({ children }) => (
    <div className="page-item flex-1">
        {children}
    </div>
);

export default PageItem;
