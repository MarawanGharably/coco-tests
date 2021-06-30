import React from 'react';
import PropTypes from 'prop-types';
import './NavBar.scss';

const NavBar = ({ children }) => (
    <nav className="nav-bar full-height flex flex-column">
        <ul className="nav-bar-container">
            {children}
        </ul>
    </nav>
);

NavBar.propTypes = {
    children: PropTypes.element,
};

NavBar.defaultProps = {
    children: null,
};

export default NavBar;
