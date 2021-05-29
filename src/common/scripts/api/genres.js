import axios from 'axios';
import { toSnakeCase, toCamelCase } from '../utils/converter';

export const getAllGenres = async () => {
  const genreUrl = '/api/v1/genres';

  let response = await axios.get(genreUrl);

  return toCamelCase(response.data);
};
