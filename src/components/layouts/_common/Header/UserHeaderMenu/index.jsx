import React from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import { logOut } from '../../../../../APImethods/AuthAPI';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './UserHeaderMenu.module.scss';
import { getHomePageURL, getLoginRedirectPath } from "../../../../../utils/urlHelper";

const DROPDOWN_ICON_URL = 'https://cdn.obsessvr.com/coco/Default-Profile-Icon.png';
const icon = <img className={styles['dropdown-icon']} alt="dropdown icon" src={DROPDOWN_ICON_URL} />;

const UserHeaderMenu = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const logoutEvent = () => {
        dispatch(logOut())
            .then(() => {
                router.push(getLoginRedirectPath(getHomePageURL()));
            })
            .catch(() => {
                alert('Server Error');
            });
    };

    return (
        <Nav className={`${styles.userHeaderMenu} justify-content-end`} >
            <NavDropdown title={icon} className={styles.userMenu} alignRight={true}>
                <NavDropdown.Item onClick={logoutEvent}>Log Out</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
};

export default UserHeaderMenu;
