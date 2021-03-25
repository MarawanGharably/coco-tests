import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ObsessHeaderLogo from './obsess-logo/ObsessHeaderLogo';
import UserIcon from './user-icon/UserIcon';
import HeaderTitle from './title/HeaderTitle';

const Header = ({ session }) => (
    <header className="header-container full-width flex">
        <div className="header-left-side flex flex-center">
            <ObsessHeaderLogo />
        </div>
        <HeaderTitle />

        {session && session.isAuthenticated && (
            <div className="header-right-side flex flex-center">
                <UserIcon />
            </div>
        )}

    </header>
);

Header.propTypes = {
    session: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};

const mapStateToProps = ({ session }) => ({
    session,
});
export default connect(mapStateToProps, {})(Header);
