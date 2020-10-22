import React from 'react';
import ObsessHeaderLogo from './obsess-logo/ObsessHeaderLogo';
import UserIcon from './user-icon/UserIcon';
import HeaderTitle from './title/HeaderTitle';

const Header = () => (
    <header className="header-container full-width flex">
        <div className="header-left-side flex flex-center">
            <ObsessHeaderLogo />
        </div>
        <HeaderTitle />
        <div className="header-right-side flex flex-center">
            <UserIcon />
        </div>
    </header>
);

export default Header;
