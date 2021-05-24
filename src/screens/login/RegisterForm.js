import React, { useState } from 'react';
import { FormControl, FormHelperText, InputLabel, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { register } from '../../common/scripts/api/auth';
import { isValidEmailAddress } from '../../common/scripts/utils/validators';

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

function RegisterForm(props) {
  const { classes } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [reqFirstName, setReqFirstName] = useState('dispNone');
  const [reqLastName, setReqLastName] = useState('dispNone');
  const [reqPassword, setReqPassword] = useState('dispNone');
  const [reqEmailAddress, setReqEmailAddress] = useState('dispNone');
  const [emailAddressErrorMessage, setEmailAddressErrorMessage] = useState('Required');
  const [reqMobileNumber, setReqMobileNumber] = useState('dispNone');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationFail, setRegistrationFail] = useState(false);

  const onSubmit = async () => {
    if (!firstName) {
      setReqFirstName('dispBlock');
    } else {
      setReqFirstName('dispNone');
    }

    if (!password) {
      setReqPassword('dispBlock');
    } else {
      setPassword('dispNone');
    }

    if (!lastName) {
      setReqLastName('dispBlock');
    } else {
      setReqLastName('dispNone');
    }

    if (!emailAddress) {
      setReqEmailAddress('dispBlock');
      setEmailAddressErrorMessage('required');
    } else if (!isValidEmailAddress(emailAddress)) {
      setReqEmailAddress('dispBlock');
      setEmailAddressErrorMessage('Invalid emailAddress');
    } else {
      setReqEmailAddress('dispNone');
    }

    if (!mobileNumber) {
      setReqMobileNumber('dispBlock');
    } else {
      setReqMobileNumber('dispNone');
    }

    if (
      !firstName ||
      !password ||
      !lastName ||
      !emailAddress ||
      !mobileNumber ||
      !isValidEmailAddress(emailAddress)
    ) {
      console.log('not submitted');
      return;
    }

    try {
      const user = await register({ firstName, lastName, emailAddress, mobileNumber, password });
      setRegistrationSuccess(true);
    } catch (error) {
      console.log(error);
      setRegistrationFail(true);
    }
  };

  const successMessage = <div className="mt-2">Registration Successful. Please Login.</div>;
  const errorMessage = <div className="mt-2">Error Message</div>;

  return (
    <div>
      <form className={classes.form}>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <FormHelperText className={reqFirstName}>
            <span className="red">Required</span>
          </FormHelperText>
        </FormControl>

        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <FormHelperText className={reqLastName}>
            <span className="red">Required</span>
          </FormHelperText>
        </FormControl>

        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="emailAddress">Email</InputLabel>
          <Input
            id="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <FormHelperText className={reqEmailAddress}>
            <span className="red">{emailAddressErrorMessage}</span>
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

        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="mobileNumber">Contact No.</InputLabel>
          <Input
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <FormHelperText className={reqMobileNumber}>
            <span className="red">Required</span>
          </FormHelperText>
        </FormControl>
        <div className={classes.buttonWrapper}>
          <Button onClick={onSubmit} variant="contained" color="primary">
            Register
          </Button>
        </div>
      </form>
      {registrationSuccess && successMessage}
      {registrationFail && errorMessage}
    </div>
  );
}

export default withStyles(styles)(RegisterForm);
