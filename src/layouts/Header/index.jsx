import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from './Logo';
import UserHeaderMenu from './UserHeaderMenu';
import { useHomePageDataStore } from '../../data-store/home-page-data-store/HomePageDataStore';
import './header.scss';

const Header = ({ session }) => {
    const [state] = useHomePageDataStore();

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <Logo />
            </Navbar.Brand>

            <Nav className="nav-center justify-content-center">
                <Navbar.Text className="pageTitle hide-on-xs">{state.pageHeaderTitle}</Navbar.Text>
            </Nav>

            {session && session.isAuthenticated && <UserHeaderMenu />}
        </Navbar>
    );
};


Header.propTypes = {
    session: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};

const mapStateToProps = ({ session }) => ({
    session,
});

export default connect(mapStateToProps, {})(Header);
