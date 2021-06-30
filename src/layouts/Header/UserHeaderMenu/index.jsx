import React from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import { logOut } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserHeaderMenu.scss';

const DROPDOWN_ICON_URL = 'https://cdn.obsessvr.com/coco/Default-Profile-Icon.png';
const icon = <img className="dropdown-icon" alt="dropdown icon" src={DROPDOWN_ICON_URL} />;

const UserHeaderMenu = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logOut())
            .then(() => {
                history.push('/');
            })
            .catch(() => {
                alert('Server Error');
            });
    };

    return (
        <Nav className="justify-content-end userHeaderMenu">
            <NavDropdown title={icon} id="userMenu" alignRight>
                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
};

export default UserHeaderMenu;
