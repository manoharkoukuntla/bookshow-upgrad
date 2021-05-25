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
  singleLineGridList: {
    flex: 'nowrap',
  },
});

function Movies(props) {
  const { classes } = props;
  const [movies, setMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const tomorrow = moment().add(1, 'day').format('yyyy-MM-DD');

  useEffect(() => {
    (async () => {
      const moviesResponse = await getMovies({ status: 'RELEASED' });
      const upComingMoviesResponse = await getMovies({ page: 1, limit: 6, startDate: tomorrow });

      setMovies(moviesResponse.movies);
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
        <GridListTile key={movie.id}>
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
    <GridList className={classes.singleLineGridList} cols={5}>
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
      <div>Upcoming Movies</div>
      {upcomingMoviesComponent}
      <div className="flex">
        <div className="moviesList">{moviesComponent}</div>
        <div className="moviesFilter">Filters</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Movies);
