import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from './Logo';
import UserHeaderMenu from './UserHeaderMenu';
import styles from './header.module.scss';

const Header = ({ session, HomePageStore }) => {
    const {pageHeaderTitle} = HomePageStore;

    return (
        <Navbar className={styles.header} bg="light" expand="lg">
            <Link href="/">
                <a><Logo /></a>
            </Link>

            <Nav className={`${styles['nav-center']} justify-content-center`}>
                <Navbar.Text className={`${styles['pageTitle']} hide-on-xs`}>{pageHeaderTitle}</Navbar.Text>
            </Nav>

            {session && session.isAuthenticated && <UserHeaderMenu />}
        </Navbar>
    );
};


Header.propTypes = {
    session: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};

const mapStateToProps = ({ session, HomePageStore }) => ({
    session, HomePageStore
});

export default connect(mapStateToProps, {})(Header);
