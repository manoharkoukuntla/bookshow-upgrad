import React, { useState } from 'react';
import { FormControl, FormHelperText, InputLabel, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { login } from '../../common/scripts/api/auth';
import Cookies from 'js-cookie';

const styles = (theme) => ({
  formControl: {
    width: '280px',
    marginTop: '24px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '32px',
  },
});

function LoginForm(props) {
  const { classes } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reqUsername, setReqUsername] = useState('dispNone');
  const [reqPassword, setReqPassword] = useState('dispNone');
  const [loginError, setLoginError] = useState(false);

  const onSubmit = async () => {
    if (!username) {
      setReqUsername('dispBlock');
    } else {
      setReqUsername('dispNone');
    }

    if (!password) {
      setReqPassword('dispBlock');
    } else {
      setReqPassword('dispNone');
    }

    if (!username || !password) {
      return;
    }

    try {
      const { accessToken } = await login({ username, password });
      Cookies.set('accessToken', accessToken);
      props.onClose();
    } catch (error) {
      setLoginError(true);
    }
  };

  const errorMessage = loginError ?  <div className="red mt-2">Invalid Credentials</div> : ''

  return (
    <form className={classes.form}>
      {errorMessage}
      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <FormHelperText className={reqUsername}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormHelperText className={reqPassword}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <div className={classes.buttonWrapper}>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
}

export default withStyles(styles)(LoginForm);
