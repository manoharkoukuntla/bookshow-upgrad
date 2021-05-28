import React, { useState, useEffect } from 'react';
import { GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import { getMovies } from '../../common/scripts/api/movies';
import moment from 'moment';

import './movies.css';

const styles = (theme) => ({
  gridList: {
    marginLeft: 'auto',
    marginRight: '30px',
  },
  gridListTile: {
    cursor: 'pointer',
  },
  upcomingMoviesComponent: {
    overflow: 'scroll',
    width: '100%',
  },
  singleLineGridList: {
    flexWrap: 'nowrap',
  },
});

const pageLimit = 10;

function Movies(props) {
  const { classes } = props;
  const [movies, setMovies] = useState([]);
  const [releasedMoviesPages, setReleasedMoviesPages] = useState(1);
  const [upComingMoviesPages, setUpComingMoviesPages] = useState(1);
  const [upComingMovies, setUpComingMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const moviesResponse = await getMovies({ status: 'RELEASED' });
      const upComingMoviesResponse = await getMovies({ status: 'PUBLISHED' });

      setMovies(moviesResponse.movies);
      setReleasedMoviesPages(Math.ceil(moviesResponse.totalCount / pageLimit));
      setUpComingMoviesPages(Math.ceil(upComingMoviesResponse.totalCount / pageLimit));
      setUpComingMovies(upComingMoviesResponse.movies);
    })();
  }, []);

  const moviesComponent = (
    <GridList
      cols={4}
      cellHeight={350}
      className={classes.gridList}
      spacing={32}
      style={{ margin: '24px auto 24px 32px' }}
    >
      {movies.map((movie) => (
        <GridListTile key={movie.id} className={classes.gridListTile}>
          <img src={movie.posterUrl} alt={movie.title} />
          <GridListTileBar
            title={movie.title}
            subtitle={
              <span>Release Date: {moment(movie.releaseDate).format('dddd MMMM Do YYYY')}</span>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  );

  const upcomingMoviesComponent = (
    <GridList className={classes.singleLineGridList} cols={6}>
      {upComingMovies.map((movie) => (
        <GridListTile key={movie.id}>
          <img src={movie.posterUrl} alt={movie.title} />
          <GridListTileBar title={movie.title} />
        </GridListTile>
      ))}
    </GridList>
  );
  return (
    <div>
      <Header baseUrl={props.baseUrl} />
      <div className="upComingMovies">Upcoming Movies</div>
      <div className={classes.upcomingMoviesComponent}>{upcomingMoviesComponent}</div>
      <div className="flex">
        <div className="moviesList">{moviesComponent}</div>
        <div className="moviesFilter">Filters</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Movies);
