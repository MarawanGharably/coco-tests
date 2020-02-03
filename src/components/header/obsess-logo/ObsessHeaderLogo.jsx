import React from "react";

const OBSESS_LOGO_URL = "https://cdn.obsessvr.com/coco-header-logo.png";

const ObsessHeaderLogo = () => (
    <div id="obsess-header-logo-container" className="flex">
        <img id="obsess-header-logo" alt="obsess logo" src={OBSESS_LOGO_URL} />
    </div>
);

export default ObsessHeaderLogo;
