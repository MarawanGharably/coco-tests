import React from 'react';
import PropTypes from 'prop-types';
import './NavBar.scss';
import {NavLink, useHistory} from "react-router-dom";

const NavBar = ({ children }) => (
    <nav className="nav-bar full-height flex flex-column">
        <ul className="nav-bar-container">
            {children}
        </ul>
    </nav>
);

NavBar.Item=({ pathName, name, child, children })=>{
    const history  = useHistory();
    const path = history.location.pathname;
    const isActive = path == pathName;

    return(<>
        <li className={child ? 'NavBar-item-child-container' : 'NavBar-item-container'}>
            <div className="nav-bar-link-container">
                <NavLink to={pathName} className={`nav-bar-link ${isActive ? 'selected':''}`} >
                    {name}
                </NavLink>
            </div>
            {children && (
                <ul className={`nav-bar-item-children ${isActive && 'NavBar-item-children--show'}`}>
                    {children}
                </ul>
            )}
        </li>
        {!child && <hr className="nav-bar-section-break" />}
    </>)

}


NavBar.propTypes = {
    children: PropTypes.element,
};

NavBar.defaultProps = {
    children: null,
};

export default NavBar;
