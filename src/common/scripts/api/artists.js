import axios from 'axios';
import { toSnakeCase, toCamelCase } from '../utils/converter';

export const getAllArtists = async () => {
  const artistUrl = '/api/v1/artists';
  let response = await axios.get(artistUrl, { params: toSnakeCase({ limit: 0 }) });

  let artistData = toCamelCase(response.data);
  const totalCount = artistData.totalCount;

  response = await axios.get(artistUrl, { params: toSnakeCase({ limit: totalCount }) });

  return toCamelCase(response.data);
};
