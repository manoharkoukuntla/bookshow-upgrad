import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Movies from './movies/Movies';
import MovieDetails from './movieDetails/MovieDetails';
import BookShow from './bookshow/BookShow';

export default function Controller() {
  return (
    <BrowserRouter baseUrl="/api/v1">
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route exact path="/bookshow/:id" component={BookShow} />
          <Route exact path="/movie/:id" component={MovieDetails} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}
