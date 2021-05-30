import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withStyles, Typography, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { getMovieById } from '../../common/scripts/api/movies';
import YouTube from 'react-youtube';
import IconButton from '@material-ui/core/Icon';

import Header from '../../common/header/Header';
import moment from 'moment';
import { times } from 'lodash';

const styles = (theme) => ({
  back: {
    cursor: 'pointer',
    margin: '8px 24px 0px 24px',
    height: '24px',
  },
  property: {
    fontWeight: 'bold',
  },
  propertyValue: {
    padding: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    margin: '24px',
  },
  poster: {
    width: '20%',
  },
  details: {
    width: '60%',
  },
  artists: {
    width: '20%',
  },
  ratingsIcon: {
    cursor: 'pointer',
  },
  ratingsIconSelected: {
    cursor: 'pointer',
    color: 'yellow',
  },
  artistsHeading: {
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
  },
  image: {
    objectFit: 'scale-down',
  },
});

function MovieDetails(props) {
  const { classes } = props;
  const [movie, setMovie] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    (async () => {
      const movieResponse = await getMovieById(props.match.params.id);
      setMovie(movieResponse);

      const url = new URL(movieResponse.trailerUrl);
      setVideoId(url.searchParams.get('v'));
    })();
  }, []);

  const artistsComponent = (
    <GridList cols={2}>
      {movie &&
        movie.artists.map((artist) => (
          <GridListTile key={artist.id} style={{ height: '320px' }}>
            <img src={artist.profileUrl} alt={artist.firstName} className={classes.image} />
            <GridListTileBar title={`${artist.firstName} ${artist.lastName}`} />
          </GridListTile>
        ))}
    </GridList>
  );

  const ratingsComponent = (
    <React.Fragment>
      {times(5).map((currentRating) => (
        <IconButton
          key={currentRating}
          className={rating > currentRating ? classes.ratingsIconSelected : classes.ratingsIcon}
          onClick={() => setRating(currentRating + 1)}
        >
          star_border
        </IconButton>
      ))}
    </React.Fragment>
  );

  return (
    <div>
      <Header
        baseUrl={props.baseUrl}
        showBookShow={movie && movie.status === 'RELEASED'}
        movieId={movie && movie.id}
      />
      <Typography className={classes.back}>
        <Link to={'/'}>&#60; Back to Home</Link>
      </Typography>
      {movie && (
        <div className={classes.container}>
          <div className={classes.poster}>
            <img src={movie.posterUrl} alt={movie.title}></img>
          </div>
          <div className={classes.details}>
            <Typography variant="headline" component="h2" paragraph>
              {movie.title}
            </Typography>
            <Typography variant="inherit" className={classes.property} inline paragraph>
              Genre:
            </Typography>
            <Typography variant="inherit" inline paragraph className={classes.propertyValue}>
              {movie.genres.join(', ')}
            </Typography>
            <br />
            <Typography variant="inherit" className={classes.property} inline paragraph>
              Duration:
            </Typography>
            <Typography variant="inherit" inline paragraph className={classes.propertyValue}>
              {movie.duration} min
            </Typography>
            <br />
            <Typography variant="inherit" className={classes.property} inline paragraph>
              Release Date:
            </Typography>
            <Typography variant="inherit" inline paragraph className={classes.propertyValue}>
              {moment(movie.releaseDate).format('ddd MMMM DD YYYY')}
            </Typography>
            <br />
            <Typography variant="inherit" className={classes.property} inline paragraph>
              Rating:
            </Typography>
            <Typography variant="inherit" inline paragraph className={classes.propertyValue}>
              {movie.rating}
            </Typography>
            <div className="mt-3">
              <Typography variant="inherit" className={classes.property} inline paragraph>
                Plot:
              </Typography>
              <Typography variant="inherit" inline paragraph className={classes.propertyValue}>
                <a href={movie.wikiUrl} target="_blank">
                  (Wiki Link)
                </a>{' '}
                {movie.storyline}
              </Typography>
            </div>
            <div className="mt-3">
              <Typography variant="inherit" className={classes.property} paragraph>
                Trailer:
              </Typography>
              <YouTube videoId={videoId}></YouTube>
            </div>
          </div>
          <div className={classes.artists}>
            <Typography variant="inherit" className={classes.property} paragraph>
              Rate this Movie:
            </Typography>

            {ratingsComponent}

            <div>
              <Typography variant="inherit" className={classes.artistsHeading} paragraph>
                Artists:
              </Typography>
              {artistsComponent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(withStyles(styles)(MovieDetails));
