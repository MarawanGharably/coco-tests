import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap';
import Logo from './Logo';
// import UserHeaderMenu from './UserHeaderMenu';
import HeaderMenu from './HeaderMenu';
import styles from './header.module.scss';

const Header = ({ session, HomePageStore }) => {
    const {pageHeaderTitle} = HomePageStore;

    return (
        <Navbar className={styles.header} bg="dark" expand="lg">
            <Container>
                <Logo />
                {session && session.isAuthenticated && <HeaderMenu/>}
            </Container>
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
