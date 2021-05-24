import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { Card, Tabs, Tab, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import './LoginModal.css';

const styles = (theme) => ({
  card: {
    maxWidth: '400px',
    paddingLeft: '16px',
  },
});

const modalStyle = {
  content: {
    width: '400px',
    height: 'fit-content',
    margin: 'auto',
    padding: '0',
  },
};

function LoginModal(props) {
  const { classes, isOpen, onClose } = props;
  const [selectedTab, setTab] = useState(0);

  const handleChange = (event, value) => {
    setTab(value);
  };

  const afterOpenModal = () => {};

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={modalStyle}
    >
      <Card className={classes.card}>
        <CardContent>
          <Tabs variant="fullWidth" value={selectedTab} onChange={handleChange}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {selectedTab === 0 && (
            <div className="p-6">
              <LoginForm onClose={onClose} />
            </div>
          )}
          {selectedTab === 1 && <div className="p-6">Register</div>}
        </CardContent>
      </Card>
    </Modal>
  );
}

export default withStyles(styles)(LoginModal);
