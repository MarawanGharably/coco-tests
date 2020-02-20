import React, { useState } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavBarItem = ({
    pathName, name, child, children,
}) => {
    const [showChildren, setShowChildren] = useState(false);

    const childNavigationStyle = css`
        overflow-y: hidden;
        max-height: ${showChildren ? '100px' : '0'};
        transition: max-height 400ms ease;
    `;

    return (
        <>
            <li className={child ? 'nav-bar-item-child-container' : 'nav-bar-item-container'}>
                <div className="nav-bar-link-container">
                    <NavLink
                        className={child ? 'nav-bar-link-child' : 'nav-bar-link'}
                        activeClassName={child ? 'nav-bar-link-child-selected' : 'nav-bar-link-selected'}
                        to={pathName}
                        isActive={(match) => {
                            if (!match) {
                                setShowChildren(false);
                                return false;
                            }
                            setShowChildren(true);
                            return true;
                        }}
                    >
                        {name}
                    </NavLink>
                </div>
                {children && (
                    <ul css={childNavigationStyle}>
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
