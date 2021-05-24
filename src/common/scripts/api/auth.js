import axios from 'axios';

export const login = async ({username, password}) => {
  const loginUrl = '/api/v1/auth/login';

  try {
    const response = await axios.post(loginUrl,{}, {
      auth: {
        username,
        password
      }
    })
    const accessToken = response.headers['access-token'];
    const user = response.data

    return {
      accessToken, user
    }
  }
  catch(error){
    
  }
}

export const logout = async ({ accessToken }) => {
  const logoutUrl = '/api/v1/auth/logout';

  try {
    await axios.post(logoutUrl, {}, {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })

    return true;
  }
  catch(error){
    
  }
}