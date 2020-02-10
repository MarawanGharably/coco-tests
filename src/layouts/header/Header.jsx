import React from 'react';
import ObsessHeaderLogo from './obsess-logo/ObsessHeaderLogo';
import UserIcon from './user-icon/UserIcon';

// imgUrl passed down just for testing purposes for now...
const Header = () => (
    <header className="header-container full-width flex">
        <div className="header-left-side flex flex-center">
            <ObsessHeaderLogo />
        </div>
        <div className="header-right-side flex flex-center">
            <UserIcon />
        </div>
    </header>
);

export default Header;
