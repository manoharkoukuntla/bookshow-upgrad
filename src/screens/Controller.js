import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../common/header/Header'
import BookShow from './bookshow/BookShow'

export default function Controller() {
  return (
    <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={BookShow} />
      </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}