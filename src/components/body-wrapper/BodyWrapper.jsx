import React from "react";

// Wrapper that will be in charge of rendering main bulk of content. Will probably be rendering output of react router here
const BodyWrapper = ({ children }) => (
    <div id="body-wrapper" className="flex full-width full-height flex-grow">
        {children}
    </div>
);

export default BodyWrapper;
