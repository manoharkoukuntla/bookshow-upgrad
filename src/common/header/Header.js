import React, { useState, useEffect } from 'react';
import './Header.css';
import Logo from '../../assets/logo.svg';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import LoginModal from '../../screens/login/LoginModal';
import { logout } from '../scripts/api/auth';
import { withRouter } from 'react-router-dom';

const styles = (theme) => ({
  mr1: {
    marginRight: theme.spacing.unit,
  },
});

function Header(props) {
  const authCookie = Cookies.get('accessToken');
  const [accessToken, setAccessToken] = useState(authCookie);
  const { showBookShow = false, classes } = props;
  const [isLoginModalOpen, openLoginModal] = useState(false);

  useEffect(() => {
    setAccessToken(Cookies.get('accessToken'));
  }, [isLoginModalOpen]);

  const loginLogoutButtonHandler = async (event) => {
    if (accessToken) {
      try {
        await logout({ accessToken });
        Cookies.remove('accessToken');
        setAccessToken('');
      } catch (e) {
        Cookies.remove('accessToken');
        setAccessToken('');
      }
    } else {
      openLoginModal(true);
    }
  };

  const bookShowButtonHandler = () => {
    if (accessToken) {
      props.history.push(`/bookshow/${props.movieId}`);
    } else {
      openLoginModal(true);
    }
  };

  const LoginLogoutButton = () => (
    <Button variant="contained" onClick={loginLogoutButtonHandler}>
      {accessToken ? 'Logout' : 'Login'}
    </Button>
  );

  const BookShowButton = () =>
    showBookShow ? (
      <Button
        className={classes.mr1}
        variant="contained"
        color="primary"
        onClick={bookShowButtonHandler}
      >
        Book Show
      </Button>
    ) : (
      ''
    );

  return (
    <header className="header flex">
      <img src={Logo} alt="Logo" className="logo" />
      <div className="ml-a">
        <BookShowButton />
        <LoginLogoutButton />
        <LoginModal isOpen={isLoginModalOpen} onClose={(e) => openLoginModal(false)} />
      </div>
    </header>
  );
}

export default withRouter(withStyles(styles)(Header));
