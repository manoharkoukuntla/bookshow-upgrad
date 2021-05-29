import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Movies from './movies/Movies';
import BookShow from './bookshow/BookShow';

export default function Controller() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route exact path="/bookshow/:id" component={BookShow} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}
