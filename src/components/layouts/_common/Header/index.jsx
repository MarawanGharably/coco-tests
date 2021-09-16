import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container } from 'react-bootstrap';
import Logo from '../Logo';
import HeaderMenu from '../HeaderMenu';
import styles from './header.module.scss';


const Header = () => {
  return (
      <Navbar className={styles.header} bg="dark" expand="lg">
          <Container>
              <Logo />
              <HeaderMenu/>
          </Container>
      </Navbar>
  );
};



Header.propTypes = {
    session: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};


export default Header;
