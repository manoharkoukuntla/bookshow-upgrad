import axios from 'axios';
import { toSnakeCase, toCamelCase } from '../utils/converter';

export const getMovies = async (params) => {
  const moviesUrl = '/api/v1/movies';

  const response = await axios.get(moviesUrl, { params: toSnakeCase(params) });

  return toCamelCase(response.data);
};
