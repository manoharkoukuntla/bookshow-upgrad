import React, { useState, useEffect } from 'react';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControl,
  Select,
  InputLabel,
  Input,
  Button,
  MenuItem,
  TextField,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import { getMovies } from '../../common/scripts/api/movies';
import moment from 'moment';

import './movies.css';
import { getAllArtists } from '../../common/scripts/api/artists';
import { getAllGenres } from '../../common/scripts/api/genres';

const styles = (theme) => ({
  formControl: {
    maxWidth: 240,
    minWidth: 240,
    margin: theme.spacing.unit,
  },
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
  image: {
    objectFit: 'scale-down',
  },
  filterHeader: {
    color: theme.palette.primary.light,
    marginBottom: theme.spacing.unit,
  },
});

const pageLimit = 10;

function Movies(props) {
  const { classes } = props;
  const [movies, setMovies] = useState([]);
  const [releasedMoviesPages, setReleasedMoviesPages] = useState(1);
  const [upComingMoviesPages, setUpComingMoviesPages] = useState(1);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [title, setFilterTitle] = useState('');
  const [genre, setFilterGenre] = useState([]);
  const [artists, setFilterArtist] = useState([]);
  const [startDate, setFilterStartDate] = useState('');
  const [endDate, setFilterEndDate] = useState('');
  const [artistData, setArtistData] = useState([]);
  const [genreData, setGenreData] = useState([]);

  useEffect(() => {
    (async () => {
      const moviesResponse = await getMovies({ status: 'RELEASED' });
      const upComingMoviesResponse = await getMovies({ status: 'PUBLISHED' });
      const artistsResponse = await getAllArtists();
      const genresResponse = await getAllGenres();

      setMovies(moviesResponse.movies);
      setReleasedMoviesPages(Math.ceil(moviesResponse.totalCount / pageLimit));
      setUpComingMoviesPages(Math.ceil(upComingMoviesResponse.totalCount / pageLimit));
      setUpComingMovies(upComingMoviesResponse.movies);
      setArtistData(artistsResponse.artists);
      setGenreData(genresResponse.genres);
    })();
  }, []);

  const gotoBookShow = (movie) => {
    props.history.push(`/movie/${movie.id}`);
  };

  const moviesComponent = (
    <GridList
      cols={4}
      cellHeight={350}
      className={classes.gridList}
      spacing={32}
      style={{ margin: '24px auto 24px 32px' }}
    >
      {movies.map((movie) => (
        <GridListTile
          key={movie.id}
          className={classes.gridListTile}
          onClick={(e) => gotoBookShow(movie)}
        >
          <img src={movie.posterUrl} alt={movie.title} className={classes.image} />
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
          <img src={movie.posterUrl} alt={movie.title} className={classes.image} />
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
        <div className="moviesFilter">
          <Card>
            <CardContent>
              <Typography className={classes.filterHeader}>FIND MOVIES BY:</Typography>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="Title">Username</InputLabel>
                <Input id="title" value={title} onChange={(e) => setFilterTitle(e.target.value)} />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="Genre">Genres</InputLabel>
                <Select
                  multiple
                  value={genre}
                  onChange={(e) => setFilterGenre(e.target.value)}
                  renderValue={(selected) =>
                    genreData
                      .filter((genreItem) => selected.includes(genreItem.id))
                      .map((genreItem) => genreItem.genre)
                      .join(', ')
                  }
                  inputProps={{
                    name: 'genre',
                    id: 'genre',
                  }}
                >
                  <MenuItem value="" />
                  {genreData.map((genreItem) => (
                    <MenuItem key={genreItem.id} value={genreItem.id}>
                      <Checkbox checked={genre.indexOf(genreItem.id) > -1} />
                      <ListItemText primary={genreItem.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="Artist">Artist</InputLabel>
                <Select
                  multiple
                  value={artists}
                  onChange={(e) => setFilterArtist(e.target.value)}
                  renderValue={(selected) =>
                    artistData
                      .filter((artistItem) => selected.includes(artistItem.id))
                      .map((artistItem) => `${artistItem.firstName} ${artistItem.lastName}`)
                      .join(', ')
                  }
                  inputProps={{
                    name: 'artists',
                    id: 'artists',
                  }}
                >
                  <MenuItem value="" />
                  {artistData.map((artistItem) => (
                    <MenuItem key={artistItem.id} value={artistItem.id}>
                      <Checkbox checked={artists.indexOf(artistItem.id) > -1} />
                      <ListItemText primary={`${artistItem.firstName} ${artistItem.lastName}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="Release Date">Release Date Start</InputLabel>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Movies);
