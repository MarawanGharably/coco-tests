import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './NavBarItem.scss';

const NavBarItem = ({ pathName, name, child, children }) => {
    const history  = useHistory();
    const path = history.location.pathname;
    const isActive = path == pathName;

    return (
        <>
            <li className={child ? 'nav-bar-item-child-container' : 'nav-bar-item-container'}>
                <div className="nav-bar-link-container">
                    <NavLink to={pathName} className={`nav-bar-link ${isActive ? 'selected':''}`} >
                        {name}
                    </NavLink>
                </div>
                {children && (
                    <ul className={`nav-bar-item-children ${isActive && 'nav-bar-item-children--show'}`}>
                        {children}
                    </ul>
                )}
            </li>
            {!child && <hr className="nav-bar-section-break" />}
        </>
    );
};

NavBarItem.propTypes = {
    pathName: PropTypes.string.isRequired,
    name: PropTypes.string,
    child: PropTypes.bool,
    children: PropTypes.element,
};

NavBarItem.defaultProps = {
    name: '',
    child: false,
    children: null,
};

export default NavBarItem;
