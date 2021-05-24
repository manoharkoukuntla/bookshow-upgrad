import axios from 'axios';
import { toSnakeCase } from '../utils/converter';

export const login = async ({ username, password }) => {
  const loginUrl = '/api/v1/auth/login';

  const response = await axios.post(
    loginUrl,
    {},
    {
      auth: {
        username,
        password,
      },
    }
  );
  const accessToken = response.headers['access-token'];
  const user = response.data;

  return {
    accessToken,
    user,
  };
};

export const logout = async ({ accessToken }) => {
  const logoutUrl = '/api/v1/auth/logout';

  try {
    await axios.post(
      logoutUrl,
      {},
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return true;
  } catch (error) {}
};

export const register = async (body) => {
  const registerUrl = '/api/v1/signup';

  const response = await axios.post(registerUrl, toSnakeCase(body), {
    header: {
      accepts: 'application/json',
    },
  });

  return response.data;
};
