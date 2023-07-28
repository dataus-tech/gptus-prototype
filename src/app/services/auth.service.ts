import { instance } from 'app/instance/axios.instance';
import axios from 'axios';

const register = (nickname: string, email: string, password: string) => {
  return instance.post('/users', {
    username: nickname,
    email,
    password,
  });
};

const login = (email: string, password: string) => {
  return instance
    .post('/users/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        const { accessToken, refreshToken, name } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('username', name);
      }

      return response.data;
    });
};

const logout = (refreshToken: string, accessToken: string) => {
  return instance
    .post(
      '/users/logout',
      {
        refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
      }
    })
    .catch((err) => console.log(err));
};

const reissuanceToken = (refreshToken: string) => {
  return axios
    .post('http://localhost:8080/user/refreshToken', {
      refreshToken,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

const AuthService = {
  register,
  login,
  logout,
  reissuanceToken,
};

export default AuthService;
