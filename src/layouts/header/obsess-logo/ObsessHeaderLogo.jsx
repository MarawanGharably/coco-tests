import React from 'react';
import { NavLink } from 'react-router-dom';

const OBSESS_LOGO_URL = 'https://cdn.obsessvr.com/coco/coco-header-logo-blue.png';

const ObsessHeaderLogo = () => (
    <NavLink to="/" tabIndex="0">
        <div id="obsess-header-logo-container" className="flex">
            <img id="obsess-header-logo" alt="obsess logo" src={OBSESS_LOGO_URL} />
        </div>
    </NavLink>
);

export default ObsessHeaderLogo;
