import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from "react-redux";
import { Navbar, Container } from 'react-bootstrap';
import Logo from '../Logo';
import HeaderMenu from '../HeaderMenu';
import styles from './header.module.scss';
import { getCurrentUserData } from "../../../../APImethods";

const Header = ({ session, user }) => {

  const dispatch = useDispatch();


  if (!Object.keys(user).length) {
    dispatch(getCurrentUserData());
  }

  return (
      <Navbar className={styles.header} bg="dark" expand="lg">
          <Container>
              <Logo />
              {session && session.isAuthenticated && user && <HeaderMenu/>}
          </Container>
      </Navbar>
  );
};



Header.propTypes = {
    session: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};

const mapStateToProps = ({ session, user }) => ({
  session,
  user
});

export default connect(mapStateToProps, {})(Header);
