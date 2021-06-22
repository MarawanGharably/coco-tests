import React from 'react';

//TODO: replace by bootstrap Row flex-column mb-4

const PageItem = ({ children }) => (
    <div className="page-item flex-1">
        {children}
    </div>
);

export default PageItem;
