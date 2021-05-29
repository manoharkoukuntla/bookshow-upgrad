import axios from 'axios';
import { toSnakeCase, toCamelCase } from '../utils/converter';

export const getMovies = async (params) => {
  const moviesUrl = '/api/v1/movies';

  const response = await axios.get(moviesUrl, { params: toSnakeCase(params) });

  return toCamelCase(response.data);
};

export const getMovieById = async (id) => {
  const movieUrl = `/api/v1/movies/${id}`;

  const response = await axios.get(movieUrl);

  return toCamelCase(response.data);
};

export const getShowsByMovieId = async (id) => {
  const showsUrl = `/api/v1/movies/${id}/shows`;

  const response = await axios.get(showsUrl);

  return toCamelCase(response.data);
};
